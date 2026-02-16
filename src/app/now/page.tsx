import { getNow } from "@/lib/data";
import { getCurrentlyReading } from "@/lib/goodreads";
import { fetchGameImage } from "@/lib/wikipedia-image";
import PageTransition from "@/components/layout/PageTransition";
import NowPageClient from "@/components/now/NowPageClient";

export const metadata = {
  title: "Now | Portfolio",
};

function parseNowSections(md: string) {
  const sections: Record<string, string[]> = {};
  let current = "";
  for (const line of md.split("\n")) {
    if (line.startsWith("## ")) {
      current = line.replace("## ", "").trim();
      sections[current] = [];
    } else if (current && line.startsWith("- ")) {
      sections[current].push(line.replace("- ", "").trim());
    }
  }
  return sections;
}

export default async function NowPage() {
  const [content, books] = await Promise.all([
    getNow(),
    getCurrentlyReading(),
  ]);

  const sections = parseNowSections(content);
  const playingItems = sections["Playing"] ?? [];
  const sideProjectItems = sections["Side Projects"] ?? [];

  // Extract first game name for the Playing card image
  const firstGame = playingItems[0]?.split(";")[0]?.trim();

  const [playingImage] = await Promise.all([
    firstGame ? fetchGameImage(firstGame) : null,
  ]);

  const readingImage = books[0]?.imageUrl ?? null;

  return (
    <PageTransition>
      <NowPageClient
        books={books}
        playingItems={playingItems}
        sideProjectItems={sideProjectItems}
        readingImage={readingImage}
        playingImage={playingImage}
      />
    </PageTransition>
  );
}
