import Link from "next/link";
import prisma from "@/lib/prisma";
import {
  FilePlus2, FileText, Eye, Pencil, ExternalLink, CheckCircle2,
  Clock3, Sparkles, ArrowUpRight, MapPin, Smartphone, PenLine,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  let posts: Awaited<ReturnType<typeof prisma.blogPost.findMany>> = [];
  let cmsReady = true;
  try {
    posts = await prisma.blogPost.findMany({ orderBy: [{ updatedAt: "desc" }] });
  } catch (error) {
    cmsReady = false;
    console.error("Blog CMS is not available in this deploy context yet:", error);
  }
  const published = posts.filter((post) => post.status === "PUBLISHED").length;
  const drafts = posts.length - published;

  return (
    <div className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
      <section className="relative isolate overflow-hidden rounded-[28px] bg-[#11172b] px-5 py-6 text-white shadow-xl shadow-indigo-950/10 sm:px-8 sm:py-8">
        <div className="absolute -right-16 -top-24 -z-10 h-64 w-64 rounded-full bg-fuchsia-500/30 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 -z-10 h-56 w-56 rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-100"><Sparkles className="h-3.5 w-3.5" /> FastFast Content Studio</div>
            <h1 className="text-2xl font-black tracking-tight sm:text-4xl">Your stories. Your audience. Your growth.</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">Create local delivery guides that help customers find FastFast, build trust with online vendors and turn useful content into real enquiries.</p>
          </div>
          <Link href="/admin/blog/new" className="hidden shrink-0 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-fuchsia-950/20 transition hover:-translate-y-0.5 hover:brightness-110 sm:inline-flex"><FilePlus2 size={18} /> Write an article</Link>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-300">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-2"><Smartphone className="h-3.5 w-3.5" /> Built for your phone</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-2"><MapPin className="h-3.5 w-3.5" /> Five local service areas</span>
        </div>
      </section>

      {!cmsReady && (
        <div role="status" className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
          The publishing database is not available in this deploy context yet. The production deployment must complete its database migration before articles can be managed here.
        </div>
      )}

      <section className="grid grid-cols-3 gap-2 sm:gap-4">
        <div className="rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:rounded-3xl sm:p-5">
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300"><FileText className="h-4 w-4" /></div>
          <p className="text-[11px] font-semibold text-neutral-500 sm:text-sm">All articles</p><p className="mt-1 text-2xl font-black tabular-nums sm:text-3xl">{posts.length}</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:rounded-3xl sm:p-5">
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300"><CheckCircle2 className="h-4 w-4" /></div>
          <p className="text-[11px] font-semibold text-neutral-500 sm:text-sm">Published</p><p className="mt-1 text-2xl font-black tabular-nums text-emerald-600 sm:text-3xl">{published}</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:rounded-3xl sm:p-5">
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-300"><Clock3 className="h-4 w-4" /></div>
          <p className="text-[11px] font-semibold text-neutral-500 sm:text-sm">Drafts</p><p className="mt-1 text-2xl font-black tabular-nums text-amber-600 sm:text-3xl">{drafts}</p>
        </div>
      </section>

      <section className="overflow-hidden rounded-[26px] border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex items-center justify-between gap-3 border-b border-neutral-100 px-4 py-4 dark:border-neutral-800 sm:px-6">
          <div><h2 className="text-base font-extrabold sm:text-lg">Your article library</h2><p className="mt-1 text-xs text-neutral-500">Manage website articles and their Google update copy.</p></div>
          <Link href="/admin/blog/new" className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-700 sm:hidden" aria-label="Write an article"><PenLine className="h-4 w-4" /></Link>
          <span className="hidden rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-bold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 sm:inline-flex">{posts.length} articles</span>
        </div>
        {posts.length === 0 ? (
          <div className="px-5 py-14 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300"><FileText className="h-6 w-6" /></span>
            <h3 className="mt-4 font-extrabold">Your content workspace is ready</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-neutral-500">Create your first useful local delivery guide and publish it to the FastFast website.</p>
            <Link href="/admin/blog/new" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white">Create first article <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {posts.map((post) => (
              <article key={post.id} className="flex flex-col gap-4 px-4 py-5 transition hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className={post.status === "PUBLISHED" ? "inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300" : "inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"}>{post.status === "PUBLISHED" ? <CheckCircle2 className="h-3 w-3" /> : <Clock3 className="h-3 w-3" />}{post.status === "PUBLISHED" ? "Live on website" : "Draft"}</span>
                    <span className="text-[11px] font-semibold text-neutral-400">{post.category}</span>
                  </div>
                  <h3 className="text-[15px] font-extrabold leading-snug sm:text-base">{post.title}</h3>
                  <p className="mt-1.5 line-clamp-2 max-w-3xl text-xs leading-5 text-neutral-500 sm:text-sm">{post.excerpt}</p>
                  <p className="mt-2 text-[10px] font-medium text-neutral-400">Updated {post.updatedAt.toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:flex sm:shrink-0">
                  {post.status === "PUBLISHED" && <Link href={`/blog/${post.slug}`} target="_blank" className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-neutral-200 px-3 py-2.5 text-xs font-bold transition hover:border-indigo-300 hover:text-indigo-700 dark:border-neutral-700 dark:hover:border-indigo-700 dark:hover:text-indigo-300"><Eye size={14} /> View <ExternalLink size={12} /></Link>}
                  <Link href={`/admin/blog/${post.id}/edit`} className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-neutral-900 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-indigo-700 dark:bg-neutral-700 dark:hover:bg-indigo-600"><Pencil size={14} /> Edit article</Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <aside className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-fuchsia-50 p-5 dark:border-indigo-900/60 dark:from-indigo-950/40 dark:to-fuchsia-950/20 sm:p-6">
        <div className="flex items-start gap-3"><span className="rounded-xl bg-white p-2.5 text-indigo-600 shadow-sm dark:bg-neutral-900 dark:text-indigo-300"><MapPin className="h-5 w-5" /></span><div><h2 className="font-extrabold">FastFast publishing guide</h2><p className="mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-300">Cover local delivery within Sapele, Warri, Asaba, Oghara and Koko. Pay on Delivery is confirmed for Sapele, Warri and Asaba only; confirm Oghara and Koko before making that promise. Do not advertise intercity delivery between the five locations.</p></div></div>
      </aside>

      <Link href="/admin/blog/new" className="fixed bottom-24 right-4 z-30 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-5 py-3.5 text-sm font-extrabold text-white shadow-xl shadow-indigo-950/25 transition hover:-translate-y-0.5 sm:hidden"><FilePlus2 className="h-4 w-4" /> New article</Link>
    </div>
  );
}
