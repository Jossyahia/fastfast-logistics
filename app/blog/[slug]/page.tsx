import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blogPosts";
import BlogShareActions from "@/components/BlogShareActions";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = blogPosts.find((item) => item.slug === params.slug);
  if (!post) return { title: "Article not found" };

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: new Date(`${post.publishedAt}T12:00:00Z`).toISOString(),
      siteName: "FastFast Logistics Services",
    },
    twitter: {
      card: "summary",
      title: post.seoTitle,
      description: post.seoDescription,
    },
  };
}

export default function BlogArticlePage({ params }: Props) {
  const post = blogPosts.find((item) => item.slug === params.slug);
  if (!post) notFound();

  const articleUrl = `https://fastfast.ng/blog/${post.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription,
    datePublished: new Date(`${post.publishedAt}T12:00:00Z`).toISOString(),
    dateModified: new Date(`${post.publishedAt}T12:00:00Z`).toISOString(),
    author: { "@type": "Organization", name: "FastFast Logistics Services" },
    publisher: { "@type": "Organization", name: "FastFast Logistics Services", url: "https://fastfast.ng" },
    mainEntityOfPage: articleUrl,
  };

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }}
      />
      <Link href="/blog" className="mb-8 inline-block text-sm font-semibold text-indigo-600 hover:underline">
        ← Back to all articles
      </Link>
      <article>
        <p className="mb-3 text-sm font-bold uppercase tracking-wider text-indigo-600">
          {post.category}
        </p>
        <h1 className="mb-5 text-3xl font-extrabold leading-tight md:text-5xl">
          {post.title}
        </h1>
        <p className="mb-6 text-lg leading-8 text-neutral-600 dark:text-neutral-300">
          {post.excerpt}
        </p>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-y py-4 text-sm text-neutral-500 dark:border-neutral-700">
          <time dateTime={post.publishedAt}>
            {new Date(`${post.publishedAt}T12:00:00Z`).toLocaleDateString("en-NG", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          <span>{post.readTime}</span>
        </div>
        <div className="mb-10">
          <BlogShareActions updateText={post.googleBusinessUpdate} articleUrl={articleUrl} />
          <p className="mt-2 text-xs text-neutral-500">
            Copy a shorter update and article link to publish manually on your Google Business Profile.
          </p>
        </div>
        <div className="space-y-9">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="mb-3 text-2xl font-bold">{section.heading}</h2>
              <div className="space-y-4 text-base leading-8 text-neutral-700 dark:text-neutral-200">
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              {section.bullets && (
                <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-7 text-neutral-700 dark:text-neutral-200">
                  {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>
      <div className="mt-12 rounded-2xl bg-indigo-50 p-6 dark:bg-indigo-950">
        <h2 className="mb-2 text-xl font-bold">Need a local delivery?</h2>
        <p className="mb-4 text-sm leading-6">
          FastFast Logistics serves Sapele, Warri and Asaba. Pay on Delivery is available in all three cities.
        </p>
        <a
          href="https://wa.me/2348156067874"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Chat with FastFast on WhatsApp
        </a>
      </div>
    </main>
  );
}
