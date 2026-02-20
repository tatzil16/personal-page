export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  image?: string;
}

export interface Bio {
  name: string;
  tagline: string;
  about: string;
  avatar?: string;
  email?: string;
  socials: Social[];
  techStack: TechItem[];
}

export interface Social {
  platform: string;
  url: string;
  icon: string;
}

export interface TechItem {
  name: string;
  category: "language" | "framework" | "tool" | "database" | "cloud";
}
