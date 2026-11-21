import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { BlogPostStatus } from "@prisma/client";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

const articleSchema = z.object({
  title: z.string().trim().min(8).max(140),
  slug: z.string().trim().min(3).max(160),
  excerpt: z.string().trim().min(30).max(300),
  category: z.string().trim().min(2).max(60),
  content: z.string().trim().min(120).max(60000),
  seoTitle: z.string().trim().min(8).max(70),
  seoDescription: z.string().trim().min(30).max(170),
  googleBusinessUpdate: z.string().trim().max(1500).default(""),
  status: z.nativeEnum(BlogPostStatus),
});

function slugify(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 160);
}

async function isAdmin() {
  const session = await auth();
  return session?.user?.role === "ADMIN";
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  const body = await request.json().catch(() => null);
  const parsed = articleSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Please check the article fields.", details: parsed.error.flatten() }, { status: 400 });

  const data = parsed.data;
  const slug = slugify(data.slug);
  if (!slug) return NextResponse.json({ error: "Please enter a valid article URL slug." }, { status: 400 });

  try {
    const existing = await prisma.blogPost.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: "Article not found." }, { status: 404 });
    const post = await prisma.blogPost.update({
      where: { id: params.id },
      data: {
        ...data,
        slug,
        publishedAt: data.status === "PUBLISHED" ? existing.publishedAt ?? new Date() : null,
      },
    });
    revalidatePath("/blog");
    revalidatePath("/sitemap.xml");
    revalidatePath(`/blog/${existing.slug}`);
    revalidatePath(`/blog/${slug}`);
    return NextResponse.json({ post });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update article.";
    if (message.includes("Unique constraint")) return NextResponse.json({ error: "That URL slug is already in use. Choose another one." }, { status: 409 });
    console.error("Blog article update failed:", error);
    return NextResponse.json({ error: "Unable to update this article right now." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  try {
    const post = await prisma.blogPost.delete({ where: { id: params.id } });
    revalidatePath("/blog");
    revalidatePath("/sitemap.xml");
    revalidatePath(`/blog/${post.slug}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Blog article delete failed:", error);
    return NextResponse.json({ error: "Unable to delete this article." }, { status: 500 });
  }
}
