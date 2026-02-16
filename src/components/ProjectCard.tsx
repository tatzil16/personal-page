import type { Project } from "@/lib/types";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group flex h-full flex-col rounded-lg border border-border/50 bg-surface p-6 transition-colors hover:border-accent/30">
      <h3 className="mb-2 text-lg font-semibold text-foreground">
        {project.title}
      </h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">
        {project.description}
      </p>
      <div className="mb-4 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded bg-background px-2 py-0.5 font-mono text-xs text-secondary"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-3">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-accent"
            aria-label={`${project.title} GitHub`}
          >
            <FaGithub size={18} />
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-accent"
            aria-label={`${project.title} live site`}
          >
            <FaExternalLinkAlt size={15} />
          </a>
        )}
      </div>
    </div>
  );
}
