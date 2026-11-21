"use client";

import { useState } from "react";

type Props = {
  updateText: string;
  articleUrl: string;
};

export default function BlogShareActions({ updateText, articleUrl }: Props) {
  const [copied, setCopied] = useState(false);

  async function copyGoogleBusinessUpdate() {
    const text = `${updateText}\n\nRead more: ${articleUrl}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copyGoogleBusinessUpdate}
      className="rounded-full border border-indigo-500 px-5 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-50 dark:text-indigo-300 dark:hover:bg-indigo-950"
    >
      {copied ? "Copied update" : "Copy Google Business Profile update"}
    </button>
  );
}
