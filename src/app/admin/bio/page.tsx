"use client";

import { useEffect, useState } from "react";
import type { Bio } from "@/lib/types";

export default function AdminBioPage() {
  const [bio, setBio] = useState<Bio | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/bio")
      .then((r) => r.json())
      .then((d) => {
        setBio(d);
        setLoading(false);
      });
  }, []);

  async function handleSave() {
    if (!bio) return;
    setSaving(true);
    setSaveError(null);
    const res = await fetch("/api/admin/bio", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bio),
    });
    setSaving(false);
    if (!res.ok) {
      const { error } = await res.json().catch(() => ({ error: "Unknown error" }));
      setSaveError(error ?? "Failed to save");
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (loading || !bio) return <p className="text-muted">Loading...</p>;

  const inputClass =
    "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none";

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Bio</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-accent-hover disabled:opacity-50"
        >
          {saving ? "Saving..." : saved ? "Saved!" : "Save"}
        </button>
      </div>

      {saveError && (
        <p className="mb-4 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {saveError}
        </p>
      )}

      <div className="flex max-w-lg flex-col gap-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">
            Name
          </label>
          <input
            className={inputClass}
            value={bio.name}
            onChange={(e) => setBio({ ...bio, name: e.target.value })}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">
            Tagline
          </label>
          <input
            className={inputClass}
            value={bio.tagline}
            onChange={(e) => setBio({ ...bio, tagline: e.target.value })}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">
            About
          </label>
          <textarea
            className={inputClass}
            rows={4}
            value={bio.about}
            onChange={(e) => setBio({ ...bio, about: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
