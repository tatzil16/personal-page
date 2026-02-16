"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
  HiOutlineViewGrid,
  HiOutlineCollection,
  HiOutlineDocumentText,
  HiOutlineUser,
  HiOutlineLogout,
} from "react-icons/hi";

const links = [
  { href: "/admin", label: "Dashboard", icon: HiOutlineViewGrid },
  { href: "/admin/projects", label: "Projects", icon: HiOutlineCollection },
  { href: "/admin/now", label: "Now Page", icon: HiOutlineDocumentText },
  { href: "/admin/bio", label: "Bio", icon: HiOutlineUser },
];

export default function AdminSidebar({ userName }: { userName: string }) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-56 shrink-0 md:block">
      <div className="sticky top-24 flex flex-col gap-1">
        <p className="mb-4 truncate px-3 font-mono text-xs text-muted">
          {userName}
        </p>
        {links.map((link) => {
          const Icon = link.icon;
          const active =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-surface text-accent"
                  : "text-muted hover:text-foreground"
              )}
            >
              <Icon size={16} />
              {link.label}
            </Link>
          );
        })}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="mt-4 flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          <HiOutlineLogout size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
