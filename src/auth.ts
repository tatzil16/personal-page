import NextAuth from "next-auth";
import authConfig from "./auth.config";

const ALLOWED_ADMIN_EMAIL = process.env.ALLOWED_ADMIN_EMAIL;

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    authorized({ auth: session, request: { nextUrl } }) {
      const isLoggedIn = !!session?.user;
      const isAdmin = nextUrl.pathname.startsWith("/admin");
      if (isAdmin) return isLoggedIn;
      return true;
    },
    signIn({ user }) {
      if (!ALLOWED_ADMIN_EMAIL) return false;
      return user.email === ALLOWED_ADMIN_EMAIL;
    },
  },
});
