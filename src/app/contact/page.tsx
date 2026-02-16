import { getBio } from "@/lib/data";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import PageTransition from "@/components/layout/PageTransition";

const iconMap: Record<string, React.ReactNode> = {
  FaGithub: <FaGithub size={22} />,
  FaLinkedin: <FaLinkedin size={22} />,
  FaXTwitter: <FaXTwitter size={22} />,
};

export const metadata = {
  title: "Contact | Portfolio",
};

export default async function ContactPage() {
  const bio = await getBio();

  return (
    <PageTransition>
      <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-24 text-center">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">
          Get In Touch
        </h1>
        <p className="mb-10 max-w-md text-muted">
          I&apos;m always open to new opportunities and interesting
          conversations. Feel free to reach out.
        </p>

        <a
          href={`mailto:${bio.email}`}
          className="mb-12 inline-flex items-center gap-2 rounded-md border border-accent px-6 py-3 font-mono text-sm text-accent transition-colors hover:bg-accent/10"
        >
          <HiOutlineMail size={18} />
          {bio.email}
        </a>

        <div className="flex items-center gap-6">
          {bio.socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 text-muted transition-colors hover:text-accent"
              aria-label={social.platform}
            >
              {iconMap[social.icon] ?? social.platform}
              <span className="text-xs">{social.platform}</span>
            </a>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
