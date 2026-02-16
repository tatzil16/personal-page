import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl gap-0 px-4 py-8 md:gap-8">
      <AdminSidebar userName={session.user.name ?? "Admin"} />
      <div className="flex-1">{children}</div>
    </div>
  );
}
