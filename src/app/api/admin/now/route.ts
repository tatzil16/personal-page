import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { getNow, saveNow } from "@/lib/data";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const content = await getNow();
  return NextResponse.json({ content });
}

export async function PUT(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { content } = await req.json();
  await saveNow(content);

  return NextResponse.json({ content });
}
