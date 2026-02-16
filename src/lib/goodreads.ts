import { XMLParser } from "fast-xml-parser";

export interface Book {
  title: string;
  author: string;
  url: string;
  imageUrl?: string;
}

const GOODREADS_USER_ID = "147308960";
const FEED_URL = `https://www.goodreads.com/review/list_rss/${GOODREADS_USER_ID}?shelf=currently-reading`;

export async function getCurrentlyReading(): Promise<Book[]> {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 3600 } });
    const xml = await res.text();
    const parser = new XMLParser();
    const feed = parser.parse(xml);

    const channel = feed?.rss?.channel;
    if (!channel?.item) return [];

    const items = Array.isArray(channel.item)
      ? channel.item
      : [channel.item];

    return items.map((item: Record<string, string>) => ({
      title: item.title,
      author: item.author_name,
      url: item.link,
      imageUrl: item.book_large_image_url || item.book_image_url || undefined,
    }));
  } catch {
    return [];
  }
}
