"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BlogContent from "@/components/BlogContent";

export type BlogEditorValues = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  googleBusinessUpdate: string;
  status: "DRAFT" | "PUBLISHED";
};

const emptyValues: BlogEditorValues = {
  title: "",
  slug: "",
  excerpt: "",
  category: "For Online Vendors",
  content: "",
  seoTitle: "",
  seoDescription: "",
  googleBusinessUpdate: "",
  status: "DRAFT",
};

function makeSlug(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function BlogPostEditor({ initial }: { initial?: BlogEditorValues }) {
  const router = useRouter();
  const [values, setValues] = useState<BlogEditorValues>(initial ?? emptyValues);
  const [slugEdited, setSlugEdited] = useState(Boolean(initial?.slug));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [copiedUpdate, setCopiedUpdate] = useState(false);

  const wordCount = useMemo(() => values.content.trim().split(/\s+/).filter(Boolean).length, [values.content]);
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  function update<K extends keyof BlogEditorValues>(key: K, value: BlogEditorValues[K]) {
    setValues((current) => {
      const next = { ...current, [key]: value };
      if (key === "title" && !slugEdited) {
        next.slug = makeSlug(String(value));
        next.seoTitle = String(value).slice(0, 70);
      }
      if (key === "title" && !current.seoTitle) next.seoTitle = String(value).slice(0, 70);
      if (key === "excerpt" && !current.seoDescription) next.seoDescription = String(value).slice(0, 170);
      return next;
    });
  }

  async function save(status: "DRAFT" | "PUBLISHED") {
    setSaving(true);
    setError("");
    setSuccess("");
    const payload = { ...values, status };
    try {
      const response = await fetch(values.id ? `/api/admin/blog/${values.id}` : "/api/admin/blog", {
        method: values.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.error || "We could not save this article. Please check the fields.");
        return;
      }
      setSuccess(status === "PUBLISHED" ? "Article published successfully." : "Draft saved successfully.");
      router.push("/admin/blog");
      router.refresh();
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSaving(false);
    }
  }

  const inputClass = "mt-2 w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:focus:ring-indigo-950";
  const labelClass = "block text-sm font-semibold text-neutral-800 dark:text-neutral-100";

  return (
    <div className="mx-auto max-w-5xl pb-4">
      <div className="mb-5 flex flex-col gap-4 rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:mb-6 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="text-sm font-semibold text-indigo-600">FASTFAST CONTENT STUDIO</p>
          <h1 className="mt-1 text-2xl font-bold">{values.id ? "Edit article" : "Create an article"}</h1>
          <p className="mt-1 text-sm text-neutral-500">Write once. Publish to your website, then reuse a shorter local update on Google Business Profile.</p>
        </div>
        <Link href="/admin/blog" className="inline-flex min-h-11 items-center justify-center rounded-xl border px-4 py-2 text-sm font-bold transition hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800">Back to articles</Link>
      </div>

      {error && <div role="alert" className="mb-4 rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-800">{error}</div>}
      {success && <div role="status" className="mb-4 rounded-xl border border-green-300 bg-green-50 p-3 text-sm text-green-800">{success}</div>}

      <div className="space-y-4 sm:space-y-6">
        <section className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-7">
          <h2 className="mb-5 text-lg font-bold">Article details</h2>
          <div className="space-y-5">
            <label className={labelClass}>Article title
              <input className={inputClass} value={values.title} maxLength={140} onChange={(e) => update("title", e.target.value)} placeholder="Example: How Warri online vendors can prepare orders for delivery" />
              <span className="mt-1 block text-xs font-normal text-neutral-500">{values.title.length}/140 characters</span>
            </label>
            <label className={labelClass}>Website URL
              <div className="mt-2 flex items-center overflow-hidden rounded-xl border border-neutral-300 dark:border-neutral-700">
                <span className="bg-neutral-100 px-3 py-3 text-xs text-neutral-500 dark:bg-neutral-800">/blog/</span>
                <input className="min-w-0 flex-1 bg-white px-3 py-3 text-sm text-neutral-900 outline-none dark:bg-neutral-900 dark:text-white" value={values.slug} onChange={(e) => { setSlugEdited(true); update("slug", e.target.value); }} placeholder="article-url-slug" />
              </div>
            </label>
            <label className={labelClass}>Category
              <select className={inputClass} value={values.category} onChange={(e) => update("category", e.target.value)}>
                <option>For Online Vendors</option>
                <option>Delivery Guides</option>
                <option>Logistics Tips</option>
                <option>Pay on Delivery</option>
                <option>Business Growth</option>
                <option>Customer Advice</option>
                <option>FastFast News</option>
              </select>
            </label>
            <label className={labelClass}>Short introduction
              <textarea className={inputClass} rows={3} maxLength={300} value={values.excerpt} onChange={(e) => update("excerpt", e.target.value)} placeholder="Explain what readers will learn. This appears on the blog listing and search results." />
              <span className="mt-1 block text-xs font-normal text-neutral-500">{values.excerpt.length}/300 characters</span>
            </label>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className={labelClass}>Article body</span>
              <button type="button" onClick={() => setShowPreview((value) => !value)} className="rounded-lg border px-3 py-2 text-xs font-semibold text-indigo-700 dark:text-indigo-300">{showPreview ? "Hide preview" : "Preview article"}</button>
            </div>
            <label className={labelClass}>
              <textarea className={inputClass + " min-h-[260px] leading-7 sm:min-h-[320px]"} rows={14} maxLength={60000} value={values.content} onChange={(e) => update("content", e.target.value)} placeholder={"Write your article here. Separate paragraphs with a blank line.\n\nUse ## before a section heading.\n\nUse - at the start of a line for a bullet point.\n\nFastFast local coverage: Sapele, Warri, Asaba, Oghara and Koko. Pay on Delivery is confirmed in Sapele, Warri and Asaba only; confirm Oghara and Koko first."} />
              <span className="mt-1 flex justify-between text-xs font-normal text-neutral-500"><span>{wordCount} words · about {readingTime} min read</span><span>{values.content.length}/60,000</span></span>
            </label>
            {showPreview && (
              <div className="rounded-2xl border bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-neutral-950">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-indigo-600">Reader preview</p>
                <h3 className="mb-2 text-2xl font-extrabold">{values.title || "Your article title"}</h3>
                <p className="mb-5 text-sm text-neutral-500">{values.excerpt || "Your introduction will appear here."}</p>
                <BlogContent content={values.content || "Your article body preview will appear here."} />
              </div>
            )}
          </div>
        </section>

        <section className="rounded-2xl border bg-white p-5 shadow-sm dark:border-neutral-700 dark:bg-neutral-900 sm:p-7">
          <h2 className="mb-1 text-lg font-bold">Search appearance</h2>
          <p className="mb-5 text-sm text-neutral-500">These fields help search engines understand and display the article.</p>
          <div className="space-y-5">
            <label className={labelClass}>SEO title
              <input className={inputClass} maxLength={70} value={values.seoTitle} onChange={(e) => update("seoTitle", e.target.value)} />
              <span className="mt-1 block text-xs font-normal text-neutral-500">{values.seoTitle.length}/70 characters</span>
            </label>
            <label className={labelClass}>SEO description
              <textarea className={inputClass} rows={3} maxLength={170} value={values.seoDescription} onChange={(e) => update("seoDescription", e.target.value)} />
              <span className="mt-1 block text-xs font-normal text-neutral-500">{values.seoDescription.length}/170 characters</span>
            </label>
          </div>
        </section>

        <section className="rounded-2xl border bg-white p-5 shadow-sm dark:border-neutral-700 dark:bg-neutral-900 sm:p-7">
          <h2 className="mb-1 text-lg font-bold">Google Business Profile update</h2>
          <p className="mb-5 text-sm text-neutral-500">A shorter post to accompany this article. Copy and publish it to your Google Business Profile after the article is live.</p>
          <label className={labelClass}>Ready-to-use local update
            <textarea className={inputClass} rows={4} maxLength={1500} value={values.googleBusinessUpdate} onChange={(e) => update("googleBusinessUpdate", e.target.value)} placeholder="Write a helpful local update and invite customers to read the full article." />
          </label>
          <button type="button" disabled={!values.googleBusinessUpdate.trim()} onClick={async () => {
            try {
              await navigator.clipboard.writeText(values.googleBusinessUpdate);
              setCopiedUpdate(true);
              window.setTimeout(() => setCopiedUpdate(false), 2000);
            } catch {
              setError("Your browser could not copy the update. You can select the text and copy it manually.");
            }
          }} className="mt-3 rounded-lg border border-indigo-500 px-4 py-2 text-sm font-semibold text-indigo-700 disabled:opacity-40 dark:text-indigo-300">{copiedUpdate ? "Copied to clipboard" : "Copy Google Business Profile update"}</button>
        </section>

        <div className="sticky bottom-[calc(88px+env(safe-area-inset-bottom))] z-20 grid grid-cols-2 gap-2 rounded-2xl border border-neutral-200 bg-white/95 p-2 shadow-xl backdrop-blur dark:border-neutral-700 dark:bg-neutral-950/95 sm:bottom-2 sm:flex sm:justify-end sm:p-3">
          <button type="button" disabled={saving} onClick={() => save("DRAFT")} className="min-h-12 rounded-xl border px-3 py-3 text-xs font-extrabold disabled:opacity-50 sm:px-5 sm:text-sm">{saving ? "Saving..." : "Save as draft"}</button>
          <button type="button" disabled={saving} onClick={() => save("PUBLISHED")} className="min-h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-3 py-3 text-xs font-extrabold text-white shadow-md shadow-indigo-900/15 hover:brightness-110 disabled:opacity-50 sm:px-6 sm:text-sm">{saving ? "Publishing..." : values.status === "PUBLISHED" ? "Save & keep published" : "Publish article"}</button>
        </div>
      </div>
    </div>
  );
}
