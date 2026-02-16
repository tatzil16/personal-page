"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/types";
import ProjectCard from "@/components/ProjectCard";

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8 font-mono text-sm text-accent"
      >
        Featured Projects
      </motion.h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              delay: i * 0.12,
              duration: 0.5,
              ease: "easeOut",
            }}
            whileHover={{
              y: -6,
              transition: { duration: 0.2 },
            }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
