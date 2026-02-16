"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Project } from "@/lib/types";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import FlameCanvas from "./FlameCanvas";

interface Props {
  projects: Project[];
}


function GlassProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group flex h-full flex-col rounded-xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-xl transition-colors hover:border-accent/30 hover:bg-white/[0.07]"
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-foreground">
          {project.title}
        </h3>
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
      <p className="mb-5 flex-1 text-sm leading-relaxed text-muted">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-0.5 font-mono text-xs text-muted"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function DuneLayer({
  color,
  yRange,
  clipPath,
  animationName,
  animationDuration,
  height,
  top,
  scrollYProgress,
}: {
  color: string;
  yRange: [string, string];
  clipPath: string;
  animationName: string;
  animationDuration: string;
  height: string;
  top: string;
  scrollYProgress: import("framer-motion").MotionValue<number>;
}) {
  const y = useTransform(scrollYProgress, [0, 1], yRange);
  return (
    <motion.div
      style={{
        y,
        clipPath,
        background: `linear-gradient(180deg, ${color} 0%, rgba(6,6,15,0.0) 100%)`,
        height,
        top,
        animation: `${animationName} ${animationDuration} ease-in-out infinite`,
      }}
      className="absolute left-0 w-full"
    />
  );
}

function MovingLayers() {
  const { scrollYProgress } = useScroll();

  // Layers are spread vertically via `top`. On scroll, `y` pulls each one upward.
  // Bottom layers travel more → everything compresses together toward the top.
  const layers = [
    { color: "rgba(60, 50, 120, 0.22)", top: "-10vh", travel: 0,   clip: "polygon(0% 60%, 8% 52%, 18% 46%, 30% 42%, 42% 46%, 55% 40%, 68% 44%, 80% 38%, 90% 45%, 100% 40%, 100% 100%, 0% 100%)", anim: "aurora1", dur: "12s" },
    { color: "rgba(75, 58, 140, 0.19)", top: "5vh",   travel: -8,  clip: "polygon(0% 55%, 10% 48%, 22% 52%, 35% 44%, 45% 49%, 58% 42%, 70% 47%, 82% 40%, 92% 48%, 100% 43%, 100% 100%, 0% 100%)", anim: "aurora2", dur: "16s" },
    { color: "rgba(90, 70, 165, 0.17)", top: "20vh",  travel: -18, clip: "polygon(0% 52%, 12% 46%, 25% 50%, 38% 43%, 50% 48%, 62% 42%, 75% 47%, 85% 40%, 95% 46%, 100% 43%, 100% 100%, 0% 100%)", anim: "aurora3", dur: "14s" },
    { color: "rgba(110, 85, 190, 0.15)", top: "35vh", travel: -30, clip: "polygon(0% 58%, 6% 50%, 15% 54%, 28% 46%, 40% 51%, 52% 44%, 65% 49%, 78% 42%, 88% 48%, 100% 44%, 100% 100%, 0% 100%)", anim: "aurora1", dur: "10s" },
    { color: "rgba(130, 100, 210, 0.13)", top: "50vh", travel: -45, clip: "polygon(0% 54%, 9% 47%, 20% 51%, 32% 44%, 44% 49%, 56% 41%, 68% 46%, 80% 39%, 91% 45%, 100% 41%, 100% 100%, 0% 100%)", anim: "aurora2", dur: "13s" },
    { color: "rgba(150, 120, 230, 0.11)", top: "65vh", travel: -60, clip: "polygon(0% 56%, 11% 49%, 23% 53%, 36% 45%, 48% 50%, 60% 43%, 72% 48%, 84% 41%, 93% 47%, 100% 42%, 100% 100%, 0% 100%)", anim: "aurora3", dur: "15s" },
    { color: "rgba(167, 139, 250, 0.09)", top: "80vh", travel: -75, clip: "polygon(0% 53%, 7% 46%, 17% 50%, 30% 43%, 43% 48%, 55% 41%, 67% 46%, 79% 40%, 90% 46%, 100% 42%, 100% 100%, 0% 100%)", anim: "aurora1", dur: "11s" },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {layers.map((cfg, i) => (
        <DuneLayer
          key={i}
          scrollYProgress={scrollYProgress}
          color={cfg.color}
          yRange={["0vh", `${cfg.travel}vh`]}
          clipPath={cfg.clip}
          animationName={cfg.anim}
          animationDuration={cfg.dur}
          height="55vh"
          top={cfg.top}
        />
      ))}
    </div>
  );
}

export default function ProjectsScrollView({ projects }: Props) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 0.7], [1, 0.95]);
  const heroY = useTransform(heroProgress, [0, 0.7], [0, -40]);

  return (
    <>
      <FlameCanvas />
      <MovingLayers />

      {/* Sticky hero intro */}
      <div ref={heroRef} className="relative h-[90vh]">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="sticky top-0 flex h-screen flex-col items-center justify-center px-6 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl"
          >
            Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-8 text-lg text-muted"
          >
            A collection of things I&apos;ve built.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-8 w-5 rounded-full border-2 border-muted/30 p-1"
            >
              <motion.div className="mx-auto h-1.5 w-1.5 rounded-full bg-accent/60" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Project cards */}
      <div className="relative mx-auto max-w-4xl px-6 pb-32">
        <div className="flex flex-col gap-6">
          {projects.map((project, i) => (
            <GlassProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}
