"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Parse headings from TipTap JSON content
    try {
      const parsed = JSON.parse(content);
      const extractedHeadings: Heading[] = [];

      const extractHeadings = (nodes: unknown[]) => {
        for (const node of nodes) {
          const n = node as { type?: string; attrs?: { level?: number }; content?: unknown[] };
          if (n.type === "heading" && n.attrs?.level && n.attrs.level >= 2) {
            const text = n.content
              ?.map((c: unknown) => (c as { text?: string }).text || "")
              .join("") || "";
            const id = text
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");
            extractedHeadings.push({ id, text, level: n.attrs.level });
          }
          if (n.content) {
            extractHeadings(n.content);
          }
        }
      };

      if (parsed.content) {
        extractHeadings(parsed.content);
      }
      setHeadings(extractedHeadings);
    } catch (e) {
      console.error("Failed to parse content for TOC", e);
    }
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24 p-4 bg-card border border-border rounded-lg">
      <h2 className="font-semibold text-foreground mb-4">Table of Contents</h2>
      <ul className="space-y-2">
        {headings.map(({ id, text, level }) => (
          <li
            key={id}
            style={{ paddingLeft: `${(level - 2) * 12}px` }}
          >
            <a
              href={`#${id}`}
              className={`block text-sm transition-colors ${
                activeId === id
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
