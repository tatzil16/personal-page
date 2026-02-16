"use client";

interface NowCardProps {
  icon: React.ReactNode;
  title: string;
  imageUrl?: string | null;
  onHoverImage?: (url: string | null) => void;
  children: React.ReactNode;
}

export default function NowCard({ icon, title, imageUrl, onHoverImage, children }: NowCardProps) {
  return (
    <div
      onMouseEnter={() => onHoverImage?.(imageUrl ?? null)}
      onMouseLeave={() => onHoverImage?.(null)}
      className="relative overflow-hidden rounded-lg border border-border/50 bg-surface p-6 transition-all duration-300 hover:border-accent/30"
    >
      <div className="relative z-10">
        <div className="mb-4 flex items-center gap-2 text-accent">
          {icon}
          <h2 className="font-mono text-sm font-semibold">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
}
