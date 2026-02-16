import { getProjects } from "@/lib/data";
import ProjectsScrollView from "@/components/projects/ProjectsScrollView";

export const metadata = {
  title: "Projects | Portfolio",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <ProjectsScrollView projects={projects} />;
}
