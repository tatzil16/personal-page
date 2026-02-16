import { getProjects, getBio, getNow } from "@/lib/data";
import Link from "next/link";
import {
  HiOutlineCollection,
  HiOutlineDocumentText,
  HiOutlineUser,
} from "react-icons/hi";

export default async function AdminDashboard() {
  const [projects, bio, now] = await Promise.all([
    getProjects(),
    getBio(),
    getNow(),
  ]);

  const stats = [
    {
      label: "Projects",
      value: projects.length,
      href: "/admin/projects",
      icon: HiOutlineCollection,
    },
    {
      label: "Tech Stack",
      value: bio.techStack.length,
      href: "/admin/bio",
      icon: HiOutlineUser,
    },
    {
      label: "Now Page",
      value: `${now.split("\n").length} lines`,
      href: "/admin/now",
      icon: HiOutlineDocumentText,
    },
  ];

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold tracking-tight">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="rounded-lg border border-border/50 bg-surface p-6 transition-colors hover:border-accent/30"
            >
              <div className="mb-2 flex items-center gap-2 text-muted">
                <Icon size={16} />
                <span className="text-sm">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
