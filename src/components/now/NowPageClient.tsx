"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import type { Book } from "@/lib/goodreads";
import NowCard from "./NowCard";
import { FaGamepad, FaCode, FaBook } from "react-icons/fa6";

interface Props {
  books: Book[];
  playingItems: string[];
  sideProjectItems: string[];
  readingImage: string | null;
  playingImage: string | null;
}

export default function NowPageClient({
  books,
  playingItems,
  sideProjectItems,
  readingImage,
  playingImage,
}: Props) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const onHoverImage = useCallback((url: string | null) => {
    setActiveImage(url);
  }, []);

  const allImages = [readingImage, playingImage].filter(Boolean) as string[];

  return (
    <div className="relative mx-auto max-w-3xl px-6 py-24">
      {/* Full-page background — images + ambient gradient */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {allImages.map((url) => (
          <Image
            key={url}
            src={url}
            alt=""
            fill
            className={`object-cover transition-opacity duration-700 ${activeImage === url ? "opacity-45" : "opacity-0"}`}
            sizes="100vw"
            unoptimized
          />
        ))}
        {/* Ambient gradient for Side Projects */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${activeImage === "ambient" ? "opacity-100" : "opacity-0"}`}
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 30% 20%, rgba(167,139,250,0.45) 0%, transparent 60%), " +
              "radial-gradient(ellipse 60% 80% at 70% 80%, rgba(129,140,248,0.35) 0%, transparent 60%), " +
              "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(196,181,253,0.3) 0%, transparent 50%)",
            animation: "aurora2 16s ease-in-out infinite",
          }}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/50 transition-opacity duration-700 ${activeImage ? "opacity-100" : "opacity-0"}`}
        />
      </div>

      <div className="relative z-10">
        <h1 className="mb-2 flex items-center gap-3 text-3xl font-bold tracking-tight">
          Now
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-rose-500" />
          </span>
        </h1>
        <p className="mb-12 text-sm text-muted">
          A snapshot of what I&apos;m focused on right now. Last updated February
          2026.
        </p>

        <div className="flex flex-col gap-6">
          <NowCard
            icon={<FaBook size={18} />}
            title="Reading"
            imageUrl={readingImage}
            onHoverImage={onHoverImage}
          >
            {books.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {books.map((book) => (
                  <li
                    key={book.title}
                    className="flex items-start gap-2 text-sm text-muted"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/50" />
                    <span>
                      <a
                        href={book.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground transition-colors hover:text-accent"
                      >
                        {book.title}
                      </a>{" "}
                      by {book.author}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted">
                Nothing on the nightstand right now.
              </p>
            )}
            <p className="mt-4 text-xs text-secondary">
              Pulled automatically from Goodreads
            </p>
          </NowCard>

          <NowCard
            icon={<FaGamepad size={18} />}
            title="Playing"
            imageUrl={playingImage}
            onHoverImage={onHoverImage}
          >
            <ul className="flex flex-col gap-2">
              {playingItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-muted"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/50" />
                  {item}
                </li>
              ))}
            </ul>
          </NowCard>

          <NowCard
            icon={<FaCode size={18} />}
            title="Side Projects"
            imageUrl="ambient"
            onHoverImage={onHoverImage}
          >
            <ul className="flex flex-col gap-2">
              {sideProjectItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-muted"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/50" />
                  {item}
                </li>
              ))}
            </ul>
          </NowCard>
        </div>

        <p className="mt-12 text-center text-xs text-secondary">
          This is a{" "}
          <a
            href="https://nownownow.com/about"
            className="text-muted transition-colors hover:text-accent"
          >
            Now page
          </a>
          .
        </p>
      </div>
    </div>
  );
}
