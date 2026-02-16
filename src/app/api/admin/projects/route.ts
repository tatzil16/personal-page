import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { requireAdmin } from "@/lib/admin";
import { getProjects, saveProjects } from "@/lib/data";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await req.json();
  const projects = await getProjects();

  const newProject = {
    id: uuid(),
    title: body.title ?? "",
    description: body.description ?? "",
    longDescription: body.longDescription ?? "",
    tech: body.tech ?? [],
    githubUrl: body.githubUrl ?? "",
    liveUrl: body.liveUrl ?? "",
    featured: body.featured ?? false,
  };

  projects.push(newProject);
  await saveProjects(projects);

  return NextResponse.json(newProject, { status: 201 });
}
