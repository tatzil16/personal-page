import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { getBio, saveBio } from "@/lib/data";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const bio = await getBio();
  return NextResponse.json(bio);
}

export async function PUT(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await req.json();
  await saveBio(body);

  return NextResponse.json(body);
}
