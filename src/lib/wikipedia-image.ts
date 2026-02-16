interface SteamSearchResult {
  items: { id: number; name: string }[];
}

export async function fetchGameImage(term: string): Promise<string | null> {
  try {
    const url = `https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(term)}&cc=us&l=en`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    const data: SteamSearchResult = await res.json();
    const appId = data?.items?.[0]?.id;
    if (!appId) return null;
    return `https://cdn.akamai.steamstatic.com/steam/apps/${appId}/header.jpg`;
  } catch {
    return null;
  }
}
