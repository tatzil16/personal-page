"use client";

import { useEffect, useState } from "react";
import type { Project } from "@/lib/types";
import { HiPlus, HiPencil, HiTrash } from "react-icons/hi";
import ProjectFormModal from "@/components/admin/ProjectFormModal";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);

  async function fetchProjects() {
    const res = await fetch("/api/admin/projects");
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    fetchProjects();
  }

  function handleEdit(project: Project) {
    setEditing(project);
    setShowForm(true);
  }

  function handleAdd() {
    setEditing(null);
    setShowForm(true);
  }

  function handleClose() {
    setShowForm(false);
    setEditing(null);
    fetchProjects();
  }

  if (loading) {
    return <p className="text-muted">Loading...</p>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
        <button
          onClick={handleAdd}
          className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-accent-hover"
        >
          <HiPlus size={16} />
          Add Project
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border/50">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border/50 bg-surface text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="hidden px-4 py-3 font-medium sm:table-cell">
                Tech
              </th>
              <th className="px-4 py-3 font-medium">Featured</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b border-border/30">
                <td className="px-4 py-3 font-medium">{project.title}</td>
                <td className="hidden px-4 py-3 sm:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {project.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded bg-background px-1.5 py-0.5 font-mono text-xs text-secondary"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-xs text-muted">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  {project.featured ? (
                    <span className="text-accent">Yes</span>
                  ) : (
                    <span className="text-muted">No</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="text-muted transition-colors hover:text-accent"
                      aria-label="Edit"
                    >
                      <HiPencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="text-muted transition-colors hover:text-red-400"
                      aria-label="Delete"
                    >
                      <HiTrash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && <ProjectFormModal project={editing} onClose={handleClose} />}
    </div>
  );
}
