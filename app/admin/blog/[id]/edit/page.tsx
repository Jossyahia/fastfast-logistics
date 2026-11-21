import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import BlogPostEditor from "@/components/admin/BlogPostEditor";

export const dynamic = "force-dynamic";

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  const post = await prisma.blogPost.findUnique({ where: { id: params.id } });
  if (!post) notFound();

  return (
    <BlogPostEditor
      initial={{
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        category: post.category,
        content: post.content,
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
        googleBusinessUpdate: post.googleBusinessUpdate,
        status: post.status,
      }}
    />
  );
}
