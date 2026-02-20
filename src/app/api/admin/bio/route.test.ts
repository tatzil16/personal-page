import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest, NextResponse } from "next/server";
import type { Bio } from "@/lib/types";

// Mock dependencies before importing the route
vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("@/lib/admin", () => ({
  requireAdmin: vi.fn(),
}));

vi.mock("@/lib/data", () => ({
  getBio: vi.fn(),
  saveBio: vi.fn(),
}));

import { GET, PUT } from "./route";
import * as adminLib from "@/lib/admin";
import * as dataLib from "@/lib/data";
import { revalidatePath } from "next/cache";

const mockBio: Bio = {
  name: "Tomer",
  tagline: "AI Engineer",
  about: "I build things.",
  email: "old@example.com",
  socials: [],
  techStack: [],
};

function makeRequest(body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/admin/bio", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("GET /api/admin/bio", () => {
  it("returns the bio when authenticated as admin", async () => {
    vi.mocked(adminLib.requireAdmin).mockResolvedValue({ session: {} as never });
    vi.mocked(dataLib.getBio).mockResolvedValue(mockBio);

    const res = await GET();
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual(mockBio);
  });

  it("returns 401 when not authenticated", async () => {
    const errorRes = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    vi.mocked(adminLib.requireAdmin).mockResolvedValue({ error: errorRes });

    const res = await GET();
    expect(res.status).toBe(401);
  });
});

describe("PUT /api/admin/bio", () => {
  it("saves the bio and revalidates paths", async () => {
    vi.mocked(adminLib.requireAdmin).mockResolvedValue({ session: {} as never });
    vi.mocked(dataLib.saveBio).mockResolvedValue(undefined);

    const updatedBio = { ...mockBio, email: "new@example.com" };
    const req = makeRequest(updatedBio);

    const res = await PUT(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual(updatedBio);
    expect(dataLib.saveBio).toHaveBeenCalledWith(updatedBio);
    expect(revalidatePath).toHaveBeenCalledWith("/contact");
    expect(revalidatePath).toHaveBeenCalledWith("/");
  });

  it("returns 403 when user is not admin", async () => {
    const errorRes = NextResponse.json({ error: "Forbidden" }, { status: 403 });
    vi.mocked(adminLib.requireAdmin).mockResolvedValue({ error: errorRes });

    const req = makeRequest(mockBio);
    const res = await PUT(req);

    expect(res.status).toBe(403);
    expect(dataLib.saveBio).not.toHaveBeenCalled();
  });

  it("does not call revalidatePath when save is blocked", async () => {
    const errorRes = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    vi.mocked(adminLib.requireAdmin).mockResolvedValue({ error: errorRes });

    const req = makeRequest(mockBio);
    await PUT(req);

    expect(revalidatePath).not.toHaveBeenCalled();
  });
});
