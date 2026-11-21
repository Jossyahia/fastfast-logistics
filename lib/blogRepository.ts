import prisma from "@/lib/prisma";
import { blogPosts, type BlogPost } from "@/lib/blogPosts";

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

function toBlogPost(record: {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  googleBusinessUpdate: string;
  publishedAt: Date | null;
  updatedAt: Date;
}): BlogPost {
  return {
    id: record.id,
    slug: record.slug,
    title: record.title,
    excerpt: record.excerpt,
    category: record.category,
    content: record.content,
    publishedAt: (record.publishedAt ?? record.updatedAt).toISOString().slice(0, 10),
    readTime: readingTime(record.content),
    seoTitle: record.seoTitle,
    seoDescription: record.seoDescription,
    googleBusinessUpdate: record.googleBusinessUpdate,
    status: "PUBLISHED",
    updatedAt: record.updatedAt.toISOString(),
    sections: [],
  };
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const builtInPosts = blogPosts.filter((post) => post.status !== "DRAFT");
  try {
    const records = await prisma.blogPost.findMany({
      orderBy: [{ publishedAt: "desc" }, { updatedAt: "desc" }],
    });
    const databasePosts = records
      .filter((record) => record.status === "PUBLISHED" && record.publishedAt && record.publishedAt <= new Date())
      .map(toBlogPost);

    // Built-in articles keep the journal populated when the CMS has no matching
    // record. Once an editor creates a CMS record, its status is authoritative:
    // drafts and scheduled posts must not leak through the static fallback.
    const postsBySlug = new Map<string, BlogPost>();
    for (const post of builtInPosts) postsBySlug.set(post.slug, post);
    for (const record of records) {
      if (record.status === "PUBLISHED" && record.publishedAt && record.publishedAt <= new Date()) {
        postsBySlug.set(record.slug, toBlogPost(record));
      } else {
        postsBySlug.delete(record.slug);
      }
    }
    return [...postsBySlug.values()].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  } catch (error) {
    console.error("Could not load CMS articles; showing built-in articles:", error);
    return builtInPosts;
  }
}

export async function getPublishedBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const record = await prisma.blogPost.findUnique({ where: { slug } });
    if (record) {
      if (record.status === "PUBLISHED" && record.publishedAt && record.publishedAt <= new Date()) {
        return toBlogPost(record);
      }
      return undefined;
    }
  } catch (error) {
    console.error("Could not load CMS article; checking built-in articles:", error);
  }
  return blogPosts.find((post) => post.slug === slug && post.status !== "DRAFT");
}
