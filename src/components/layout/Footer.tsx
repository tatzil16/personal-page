import { getBio } from "@/lib/data";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const iconMap: Record<string, React.ReactNode> = {
  FaGithub: <FaGithub size={18} />,
  FaLinkedin: <FaLinkedin size={18} />,
  FaXTwitter: <FaXTwitter size={18} />,
};

export default async function Footer() {
  const bio = await getBio();

  return (
    <footer className="border-t border-border/50">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} {bio.name}
        </p>
        <div className="flex items-center gap-4">
          {bio.socials.map((social) => (
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
        </div>
      </div>
    </footer>
  );
}
