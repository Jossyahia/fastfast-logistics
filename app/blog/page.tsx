import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "@/lib/blogPosts";

export const metadata: Metadata = {
  title: "Logistics Tips and Delivery Guides",
  description:
    "Helpful delivery guides, Pay on Delivery advice and logistics tips for individuals and online vendors in Sapele, Warri and Asaba.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "FastFast Logistics Blog",
    description:
      "Delivery guides and practical logistics advice for Delta State customers and online vendors.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = [...blogPosts].sort(
    (a, b) => b.publishedAt.localeCompare(a.publishedAt)
  );

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-14">
      <header className="mb-12 max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-indigo-600">
          FastFast Logistics Journal
        </p>
        <h1 className="mb-4 text-4xl font-extrabold md:text-5xl">
          Delivery advice for people and growing businesses
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300">
          Practical guides on local delivery, Pay on Delivery and order
          fulfilment for customers and online vendors in Sapele, Warri and Asaba.
        </p>
      </header>

      <section aria-label="Latest articles" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="flex flex-col rounded-2xl border bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-800"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-wide text-indigo-600">
              {post.category}
            </p>
            <h2 className="mb-3 text-xl font-bold leading-snug">
              <Link className="hover:text-indigo-600" href={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h2>
            <p className="mb-6 flex-1 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between border-t pt-4 text-xs text-neutral-500 dark:border-neutral-700">
              <time dateTime={post.publishedAt}>
                {new Date(`${post.publishedAt}T12:00:00Z`).toLocaleDateString("en-NG", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </time>
              <span>{post.readTime}</span>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
