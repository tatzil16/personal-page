"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { TechItem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TechStackProps {
  items: TechItem[];
}

const categoryColors: Record<string, string> = {
  language: "border-violet-500/40 text-violet-300",
  framework: "border-blue-500/40 text-blue-300",
  tool: "border-amber-500/40 text-amber-300",
  database: "border-emerald-500/40 text-emerald-300",
  cloud: "border-rose-500/40 text-rose-300",
};

export default function TechStack({ items }: TechStackProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end 0.8"],
  });

  const lineWidth = useTransform(scrollYProgress, [0, 0.3], ["0%", "100%"]);

  return (
    <section ref={ref} className="mx-auto max-w-3xl px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-2 font-mono text-sm text-accent"
      >
        Tech Stack
      </motion.h2>
      <motion.div
        style={{ width: lineWidth }}
        className="mb-8 h-px bg-gradient-to-r from-accent to-transparent"
      />
      <div className="flex flex-wrap gap-3">
        {items.map((item, i) => (
          <motion.span
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: i * 0.04,
              duration: 0.4,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.15 },
            }}
            className={cn(
              "cursor-default rounded-full border px-3 py-1 font-mono text-xs transition-shadow hover:shadow-[0_0_12px_rgba(167,139,250,0.15)]",
              categoryColors[item.category] ?? "border-border text-muted"
            )}
          >
            {item.name}
          </motion.span>
        ))}
      </div>
    </section>
  );
}
