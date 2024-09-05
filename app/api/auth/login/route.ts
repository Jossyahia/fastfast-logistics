import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import { sign } from "jsonwebtoken";
import { z } from "zod";

// Validation schema for login
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      // Collect and return validation errors
      const errors = result.error.errors.map(
        (error) => `${error.path}: ${error.message}`
      );
      return NextResponse.json(
        { message: "Validation failed", errors },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    // Attempt to find the user by email
    let user = await prisma.user.findUnique({ where: { email } });

    // If not found in User, check in the Rider model
    if (!user) {
      const rider = await prisma.rider.findUnique({ where: { email } });
      if (rider) {
        user = await prisma.user.findUnique({ where: { id: rider.userId } });
      }
    }

    // If no user is found or the user lacks a password, return an error
    if (!user || !user.password) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Compare the provided password with the stored hash
    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate a JWT token
    const token = sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    // Respond with the user data and JWT token
    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
