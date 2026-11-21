import Link from "next/link";
import prisma from "@/lib/prisma";
import {
  FilePlus2, FileText, Eye, Pencil, CheckCircle2, Clock3,
  MapPin, ArrowUpRight, PenLine, BookOpen, Sparkles,
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
    <div className="mx-auto w-full max-w-6xl space-y-5 pb-5 sm:space-y-7">
      <section className="relative isolate overflow-hidden rounded-[26px] bg-[#11172b] p-5 text-white shadow-xl sm:rounded-[30px] sm:p-8">
        <div className="absolute -right-16 -top-24 -z-10 h-64 w-64 rounded-full bg-fuchsia-500/25 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 -z-10 h-56 w-56 rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10"><BookOpen className="h-5 w-5" /></span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-200">FastFast · Content workspace</p>
            <h1 className="mt-1 text-2xl font-black leading-tight tracking-tight sm:text-4xl">Blog Studio</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">Create helpful delivery content for local customers and online vendors. Publish your article here, then reuse its Google Business Profile update.</p>
          </div>
          <Sparkles className="mt-1 hidden h-6 w-6 shrink-0 text-fuchsia-200 sm:block" />
        </div>
        <div className="mt-5 grid grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center">
          <Link href="/admin/blog/new" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-5 py-3 text-sm font-extrabold text-white shadow-lg transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-950">
            <FilePlus2 className="h-4 w-4" /> Create new article <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link href="/blog" target="_blank" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            <Eye className="h-4 w-4" /> View public blog
          </Link>
        </div>
        <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-slate-300"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-indigo-200" /><span>Main service hubs: Sapele, Warri, Asaba, Oghara and Koko, plus surrounding communities where pickup and drop-off can be confirmed. Pay on Delivery is available across all five main areas. Deliveries are local within each service area; intercity delivery between hubs is not currently offered.</span></p>
      </section>

      {!cmsReady && (
        <div role="alert" className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
          <strong className="block">Publishing is temporarily unavailable</strong>
          The blog database could not be reached in this deployment. Please check the production database migration and connection before creating or publishing articles.
        </div>
      )}

      <section aria-label="Blog statistics" className="grid grid-cols-3 gap-2 sm:gap-4">
        {[
          { label: "All articles", value: posts.length, Icon: FileText, tone: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300" },
          { label: "Published", value: published, Icon: CheckCircle2, tone: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" },
          { label: "Drafts", value: drafts, Icon: Clock3, tone: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300" },
        ].map(({ label, value, Icon, tone }) => (
          <div key={label} className="min-w-0 rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:rounded-3xl sm:p-5">
            <span className={`mb-2 flex h-9 w-9 items-center justify-center rounded-xl ${tone}`}><Icon className="h-4 w-4" /></span>
            <p className="truncate text-[11px] font-semibold text-neutral-500 sm:text-sm">{label}</p>
            <p className="mt-0.5 text-2xl font-black tabular-nums sm:text-3xl">{value}</p>
          </div>
        ))}
      </section>

      <section className="overflow-hidden rounded-[24px] border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:rounded-[28px]">
        <div className="flex items-center justify-between gap-3 border-b border-neutral-100 px-4 py-4 dark:border-neutral-800 sm:px-6">
          <div className="min-w-0"><h2 className="text-base font-extrabold sm:text-lg">Article library</h2><p className="mt-1 text-xs leading-5 text-neutral-500 sm:text-sm">Your website posts, drafts and Google update copy.</p></div>
          <span className="shrink-0 rounded-full bg-neutral-100 px-3 py-1.5 text-[11px] font-bold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">{posts.length} total</span>
        </div>
        {posts.length === 0 ? (
          <div className="px-5 py-12 text-center sm:py-16">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300"><FileText className="h-6 w-6" /></span>
            <h3 className="mt-4 font-extrabold">Your first article starts here</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-neutral-500">Share useful local delivery advice, answer customer questions and help more people discover FastFast.</p>
            <Link href="/admin/blog/new" className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-700"><PenLine className="h-4 w-4" /> Write your first article</Link>
          </div>
        ) : (
          <div className="grid gap-3 p-3 sm:gap-4 sm:p-5">
            {posts.map((post) => (
              <article key={post.id} className="min-w-0 rounded-2xl border border-neutral-200 bg-white p-4 transition-colors hover:border-indigo-200 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-indigo-900 sm:rounded-3xl sm:p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={post.status === "PUBLISHED" ? "inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wide text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300" : "inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wide text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"}>
                    {post.status === "PUBLISHED" ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock3 className="h-3.5 w-3.5" />}
                    {post.status === "PUBLISHED" ? "Published" : "Draft"}
                  </span>
                  <span className="max-w-full truncate rounded-full bg-neutral-100 px-2.5 py-1.5 text-[10px] font-bold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">{post.category}</span>
                </div>
                <h3 className="mt-3 break-words text-base font-extrabold leading-snug sm:text-lg">{post.title}</h3>
                <p className="mt-2 break-words text-sm leading-6 text-neutral-600 dark:text-neutral-300">{post.excerpt}</p>
                <p className="mt-3 text-[11px] text-neutral-400">Updated {post.updatedAt.toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}</p>
                <div className="mt-4 grid grid-cols-1 gap-2 sm:flex sm:flex-wrap">
                  <Link href={`/admin/blog/${post.id}/edit`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-neutral-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-neutral-700 dark:hover:bg-indigo-600"><Pencil className="h-4 w-4" /> Edit article</Link>
                  {post.status === "PUBLISHED" && <Link href={`/blog/${post.slug}`} target="_blank" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-neutral-200 px-4 py-3 text-sm font-bold text-neutral-700 transition hover:border-indigo-300 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-neutral-700 dark:text-neutral-200 dark:hover:text-indigo-300"><Eye className="h-4 w-4" /> View live article <ArrowUpRight className="h-3.5 w-3.5" /></Link>}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
