import fs from "fs/promises";
import path from "path";
import type { Project, Bio } from "./types";

const dataDir = path.join(process.cwd(), "data");

// Projects
export async function getProjects(): Promise<Project[]> {
  const raw = await fs.readFile(path.join(dataDir, "projects.json"), "utf-8");
  return JSON.parse(raw);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((p) => p.featured);
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.id === id);
}

export async function saveProjects(projects: Project[]): Promise<void> {
  await fs.writeFile(
    path.join(dataDir, "projects.json"),
    JSON.stringify(projects, null, 2),
    "utf-8"
  );
}

// Bio
export async function getBio(): Promise<Bio> {
  const raw = await fs.readFile(path.join(dataDir, "bio.json"), "utf-8");
  return JSON.parse(raw);
}

export async function saveBio(bio: Bio): Promise<void> {
  await fs.writeFile(
    path.join(dataDir, "bio.json"),
    JSON.stringify(bio, null, 2),
    "utf-8"
  );
}

// Now page
export async function getNow(): Promise<string> {
  return fs.readFile(path.join(dataDir, "now.md"), "utf-8");
}

export async function saveNow(content: string): Promise<void> {
  await fs.writeFile(path.join(dataDir, "now.md"), content, "utf-8");
}
