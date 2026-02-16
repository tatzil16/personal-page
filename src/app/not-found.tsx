import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="mb-2 font-mono text-6xl font-bold text-accent">404</p>
      <h1 className="mb-2 text-xl font-semibold">Page not found</h1>
      <p className="mb-8 text-sm text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="rounded-md border border-accent px-5 py-2.5 font-mono text-sm text-accent transition-colors hover:bg-accent/10"
      >
        Go Home
      </Link>
    </div>
  );
}
