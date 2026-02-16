# Personal Portfolio

A personal website built with Next.js 16 (App Router), Tailwind CSS v4, and NextAuth.js. Features a dark Charcoal + Violet theme, animated page transitions, and an admin dashboard for content management.

## Features

- **Public pages**: Home, Projects, Now, Contact
- **Admin dashboard**: Manage projects, bio, and Now page content
- **Authentication**: Google OAuth via NextAuth.js, restricted to a single admin email
- **File-based storage**: Content stored in JSON/Markdown files in `data/`
- **Responsive**: Mobile-first design with backdrop-blur navbar

## Getting Started

### Prerequisites

- Node.js 18+
- A Google OAuth app ([create one here](https://console.cloud.google.com/apis/credentials))

### Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Generate an auth secret
npx auth secret
```

Edit `.env.local` and fill in:

```
AUTH_SECRET=<generated-secret>
AUTH_GOOGLE_ID=<your-google-client-id>
AUTH_GOOGLE_SECRET=<your-google-client-secret>
ALLOWED_ADMIN_EMAIL=<your-email@gmail.com>
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build && npm start
```

## Project Structure

```
src/
  app/
    page.tsx              # Home
    projects/page.tsx     # Projects grid
    now/page.tsx          # Now page (markdown)
    contact/page.tsx      # Contact info
    admin/                # Admin dashboard (auth-protected)
    api/admin/            # Admin CRUD API routes
    auth/signin/          # Sign-in page
  components/
    layout/               # Navbar, Footer, PageTransition
    home/                 # Home page sections
    admin/                # Admin components
  lib/
    data.ts               # File-based read/write functions
    types.ts              # TypeScript interfaces
    admin.ts              # Admin auth helper
    utils.ts              # cn() utility
data/
  projects.json           # Project data
  bio.json                # Bio & tech stack
  now.md                  # Now page content
```

## Content Editing

### Via Admin Dashboard

1. Visit `/admin` and sign in with your authorized Google account
2. Use the dashboard to manage projects, edit your bio, and update the Now page

### Via Files

Edit the JSON/Markdown files in `data/` directly.

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

> **Note**: File-based storage is ephemeral on Vercel. Edits made via the admin dashboard will reset on each deployment. For persistent storage, consider migrating to a database.
