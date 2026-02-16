"use client";

import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import PageTransition from "@/components/layout/PageTransition";

export default function SignInPage() {
  return (
    <PageTransition>
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6">
        <h1 className="mb-2 text-2xl font-bold tracking-tight">Admin Sign In</h1>
        <p className="mb-8 text-sm text-muted">
          Sign in with your authorized Google account to access the dashboard.
        </p>
        <button
          onClick={() => signIn("google", { callbackUrl: "/admin" })}
          className="inline-flex items-center gap-3 rounded-md border border-border bg-surface px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent/50 hover:text-accent"
        >
          <FaGoogle size={16} />
          Sign in with Google
        </button>
      </div>
    </PageTransition>
  );
}
