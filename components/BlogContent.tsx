import React from "react";

type Block =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

function parseContent(content: string): Block[] {
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let bullets: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: "paragraph", text: paragraph.join(" ") });
      paragraph = [];
    }
  };
  const flushBullets = () => {
    if (bullets.length) {
      blocks.push({ type: "list", items: [...bullets] });
      bullets = [];
    }
  };

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      flushBullets();
      continue;
    }
    const heading = line.match(/^(##|###)\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushBullets();
      blocks.push({ type: "heading", level: heading[1].length as 2 | 3, text: heading[2] });
    } else if (/^[-*]\s+/.test(line)) {
      flushParagraph();
      bullets.push(line.replace(/^[-*]\s+/, ""));
    } else {
      flushBullets();
      paragraph.push(line);
    }
  }
  flushParagraph();
  flushBullets();
  return blocks;
}

function InlineText({ value }: { value: string }) {
  return <>{value.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={index}>{part.slice(2, -2)}</strong>
      : part
  )}</>;
}

export default function BlogContent({ content }: { content: string }) {
  return (
    <div className="space-y-6 text-base leading-8 text-neutral-700 dark:text-neutral-200">
      {parseContent(content).map((block, index) => {
        if (block.type === "heading") {
          return block.level === 2
            ? <h2 key={index} className="pt-3 text-2xl font-bold text-neutral-950 dark:text-white">{block.text}</h2>
            : <h3 key={index} className="pt-2 text-xl font-semibold text-neutral-950 dark:text-white">{block.text}</h3>;
        }
        if (block.type === "list") {
          return <ul key={index} className="list-disc space-y-2 pl-6">{block.items.map((item, itemIndex) => <li key={itemIndex}><InlineText value={item} /></li>)}</ul>;
        }
        return <p key={index}><InlineText value={block.text} /></p>;
      })}
    </div>
  );
}
