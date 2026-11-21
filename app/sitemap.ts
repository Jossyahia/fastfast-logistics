import type { MetadataRoute } from "next";
import { getPublishedBlogPosts } from "@/lib/blogRepository";

export const dynamic = "force-dynamic";

const baseUrl = "https://fastfast.ng";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "", "/services", "/about", "/contact-us", "/booking",
    "/tracking", "/booking-guide", "/blog",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/blog" ? "weekly" as const : "monthly" as const,
    priority: route === "" ? 1 : route === "/blog" ? 0.8 : 0.6,
  }));

  const posts = await getPublishedBlogPosts();
  const articles = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(`${post.publishedAt}T12:00:00Z`),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...articles];
}
