"use client";

import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AdminNowPage() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/now")
      .then((r) => r.json())
      .then((d) => {
        setContent(d.content);
        setLoading(false);
      });
  }, []);

  async function handleSave() {
    setSaving(true);
    await fetch("/api/admin/now", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (loading) return <p className="text-muted">Loading...</p>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Now Page</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-accent-hover disabled:opacity-50"
        >
          {saving ? "Saving..." : saved ? "Saved!" : "Save"}
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-medium text-muted">Editor</p>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="h-[500px] w-full rounded-lg border border-border bg-background p-4 font-mono text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none"
          />
        </div>
        <div>
          <p className="mb-2 text-xs font-medium text-muted">Preview</p>
          <div className="h-[500px] overflow-auto rounded-lg border border-border bg-background p-4">
            <article className="prose prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-h1:text-2xl prose-h2:text-lg prose-h2:text-foreground prose-p:text-muted prose-a:text-accent prose-strong:text-foreground prose-li:text-muted prose-hr:border-border">
              <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
