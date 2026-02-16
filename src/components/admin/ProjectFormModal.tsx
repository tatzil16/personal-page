"use client";

import { useState } from "react";
import type { Project } from "@/lib/types";
import { HiX } from "react-icons/hi";

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectFormModal({ project, onClose }: Props) {
  const isEdit = !!project;
  const [form, setForm] = useState({
    title: project?.title ?? "",
    description: project?.description ?? "",
    longDescription: project?.longDescription ?? "",
    tech: project?.tech.join(", ") ?? "",
    githubUrl: project?.githubUrl ?? "",
    liveUrl: project?.liveUrl ?? "",
    featured: project?.featured ?? false,
  });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      tech: form.tech
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    if (isEdit) {
      await fetch(`/api/admin/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    onClose();
  }

  const inputClass =
    "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-lg border border-border bg-surface p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold">
            {isEdit ? "Edit Project" : "New Project"}
          </h2>
          <button
            onClick={onClose}
            className="text-muted transition-colors hover:text-foreground"
          >
            <HiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className={inputClass}
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <textarea
            className={inputClass}
            rows={2}
            placeholder="Short description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <textarea
            className={inputClass}
            rows={3}
            placeholder="Long description (optional)"
            value={form.longDescription}
            onChange={(e) =>
              setForm({ ...form, longDescription: e.target.value })
            }
          />
          <input
            className={inputClass}
            placeholder="Tech (comma-separated)"
            value={form.tech}
            onChange={(e) => setForm({ ...form, tech: e.target.value })}
          />
          <input
            className={inputClass}
            placeholder="GitHub URL"
            value={form.githubUrl}
            onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
          />
          <input
            className={inputClass}
            placeholder="Live URL"
            value={form.liveUrl}
            onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
          />
          <label className="flex items-center gap-2 text-sm text-muted">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="accent-accent"
            />
            Featured project
          </label>

          <div className="mt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-4 py-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-accent-hover disabled:opacity-50"
            >
              {saving ? "Saving..." : isEdit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
