"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface AboutSectionProps {
  about: string;
}

export default function AboutSection({ about }: AboutSectionProps) {
  const paragraphs = about.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8 font-mono text-sm text-accent"
      >
        About
      </motion.h2>
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="shrink-0 self-center md:self-start"
        >
          <div className="relative">
            <div className="h-64 w-52 overflow-hidden rounded-lg border border-border/50 sm:h-72 sm:w-60">
              <Image
                src="/avatar-large.jpg"
                alt="Tomer"
                width={240}
                height={288}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="pointer-events-none absolute -inset-1 rounded-lg bg-accent/10 blur-xl" />
          </div>
        </motion.div>

        <div className="flex flex-1 gap-6">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden w-0.5 origin-top shrink-0 rounded-full bg-gradient-to-b from-accent via-accent/40 to-transparent md:block"
          />
          <div className="flex flex-col gap-4">
            {paragraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 * (i + 1) }}
                className="text-lg leading-relaxed text-muted"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
