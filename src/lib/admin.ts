import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.email) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  const allowed = process.env.ALLOWED_ADMIN_EMAIL;
  if (!allowed || session.user.email !== allowed) {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }

  return { session };
}
