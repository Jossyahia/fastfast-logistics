import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import { sign } from "jsonwebtoken";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      const errors = result.error.errors.map(
        (error) => `${error.path}: ${error.message}`
      );
      return NextResponse.json(
        { message: "Validation failed", errors },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    // First, check in the User model
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // If not found, check the Rider model
      const rider = await prisma.rider.findUnique({
        where: { email },
      });

      if (!rider) {
        return NextResponse.json(
          { message: "Invalid credentials" },
          { status: 401 }
        );
      }

      user = await prisma.user.findUnique({
        where: { id: rider.userId },
      });

      if (!user) {
        return NextResponse.json(
          { message: "Invalid credentials" },
          { status: 401 }
        );
      }
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password!);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create a JWT token
    const token = sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

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
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
