import Link from "next/link";
import prisma from "@/lib/prisma";
import { FilePlus2, FileText, Eye, Pencil, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: [{ updatedAt: "desc" }] });
  const published = posts.filter((post) => post.status === "PUBLISHED").length;
  const drafts = posts.length - published;

  return (
    <div className="mx-auto max-w-6xl space-y-7">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-bold tracking-widest text-indigo-600">FASTFAST CONTENT STUDIO</p>
          <h1 className="mt-2 text-3xl font-extrabold">Your blog, under your control.</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600 dark:text-neutral-300">
            Create useful local delivery guides, reach online vendors and turn readers into WhatsApp enquiries. Designed to work comfortably on your phone.
          </p>
        </div>
        <Link href="/admin/blog/new" className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700">
          <FilePlus2 size={18} /> Write an article
        </Link>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
          <p className="text-sm text-neutral-500">All articles</p><p className="mt-2 text-3xl font-extrabold">{posts.length}</p>
        </div>
        <div className="rounded-2xl border bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
          <p className="text-sm text-neutral-500">Published and live</p><p className="mt-2 text-3xl font-extrabold text-green-600">{published}</p>
        </div>
        <div className="rounded-2xl border bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
          <p className="text-sm text-neutral-500">Drafts to finish</p><p className="mt-2 text-3xl font-extrabold text-amber-600">{drafts}</p>
        </div>
      </section>

      <section className="rounded-2xl border bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
        <div className="flex items-center justify-between border-b p-5 dark:border-neutral-700">
          <div><h2 className="text-lg font-bold">Article library</h2><p className="mt-1 text-xs text-neutral-500">Your original three blog articles are already imported and editable.</p></div>
          <FileText className="text-indigo-600" />
        </div>
        {posts.length === 0 ? (
          <div className="p-10 text-center"><p className="font-semibold">Your article library is ready.</p><p className="mt-2 text-sm text-neutral-500">Write your first article to get started.</p></div>
        ) : (
          <div className="divide-y dark:divide-neutral-700">
            {posts.map((post) => (
              <article key={post.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className={post.status === "PUBLISHED" ? "rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-800" : "rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800"}>{post.status === "PUBLISHED" ? "Published" : "Draft"}</span>
                    <span className="text-xs text-neutral-500">{post.category}</span>
                  </div>
                  <h3 className="truncate text-base font-bold">{post.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-neutral-500">{post.excerpt}</p>
                  <p className="mt-2 text-xs text-neutral-400">Updated {post.updatedAt.toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}</p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  {post.status === "PUBLISHED" && <Link href={`/blog/${post.slug}`} target="_blank" className="inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-sm font-medium"><Eye size={15}/> View <ExternalLink size={13}/></Link>}
                  <Link href={`/admin/blog/${post.id}/edit`} className="inline-flex items-center gap-1 rounded-lg bg-neutral-900 px-3 py-2 text-sm font-semibold text-white dark:bg-neutral-700"><Pencil size={15}/> Edit</Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <aside className="rounded-2xl bg-indigo-50 p-5 dark:bg-indigo-950/50">
        <h2 className="font-bold">A FastFast content rule</h2>
        <p className="mt-2 text-sm leading-6 text-neutral-700 dark:text-neutral-200">Write for a real customer first. Be specific about Sapele, Warri and Asaba, explain that deliveries are within each city, and never promise an unconfirmed price or delivery time. Every published article includes a WhatsApp path for readers who need a delivery.</p>
      </aside>
    </div>
  );
}
