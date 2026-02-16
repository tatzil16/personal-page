"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import type { Social } from "@/lib/types";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const iconMap: Record<string, React.ReactNode> = {
  FaGithub: <FaGithub size={20} />,
  FaLinkedin: <FaLinkedin size={20} />,
  FaXTwitter: <FaXTwitter size={20} />,
};

interface HeroSectionProps {
  name: string;
  tagline: string;
  socials: Social[];
}

export default function HeroSection({ name, tagline, socials }: HeroSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -60]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5], [0.15, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* Floating glow orb */}
      <motion.div
        style={{ scale: glowScale, opacity: glowOpacity }}
        className="pointer-events-none absolute h-[400px] w-[400px] rounded-full bg-accent blur-[120px]"
      />

      <motion.div style={{ opacity, scale, y }} className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05, duration: 0.5 }}
          className="mb-6 h-28 w-28 overflow-hidden rounded-full border-2 border-accent/30 shadow-[0_0_30px_rgba(167,139,250,0.15)]"
        >
          <Image
            src="/avatar-small.jpg"
            alt="Tomer"
            width={112}
            height={112}
            className="h-full w-full object-cover"
            priority
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4 font-mono text-sm text-accent"
        >
          Hi, my name is
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
        >
          {name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 max-w-lg text-lg text-muted sm:text-xl"
        >
          {tagline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 flex items-center gap-5"
        >
          {socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-accent"
              aria-label={social.platform}
            >
              {iconMap[social.icon] ?? social.platform}
            </a>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <a
            href="/projects"
            className="rounded-md border border-accent px-6 py-3 font-mono text-sm text-accent transition-all hover:bg-accent/10 hover:shadow-[0_0_20px_rgba(167,139,250,0.15)]"
          >
            View My Work
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-5 rounded-full border-2 border-muted/30 p-1"
        >
          <motion.div className="mx-auto h-1.5 w-1.5 rounded-full bg-accent/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
