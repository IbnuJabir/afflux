# Afflux - SEO Affiliate Blog Platform

A production-ready SEO-focused affiliate blog platform built with Next.js 16, featuring a complete CMS dashboard, rich text editing, and advanced SEO optimization.

## Features

### Public Website
- 📰 Dynamic blog with categories and tags
- 🔍 Full SEO optimization (meta tags, Open Graph, JSON-LD)
- 📖 Auto-generated table of contents
- 🔗 Related posts suggestions
- 📱 Responsive design with dark mode
- ⚡ Static generation with ISR

### Admin Dashboard
- 🔐 Secure authentication with NextAuth
- ✍️ TipTap rich text editor (images, links, YouTube, tables)
- 📝 Post management (create, edit, delete, draft/publish)
- 🏷️ Category and tag management
- 📊 Dashboard with stats overview
- 🔧 SEO validation in editor

### Affiliate Features
- 🛒 Product card component
- 📊 Comparison table component
- ✅ Pros/Cons component
- 🎯 Affiliate CTA buttons
- 📈 Click tracking ready

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Database:** SQLite (dev) / PostgreSQL (prod)
- **ORM:** Prisma
- **Auth:** NextAuth v5
- **Editor:** TipTap
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/afflux.git
cd afflux
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Initialize the database:
```bash
pnpm db:push
pnpm db:seed
```

5. Start the development server:
```bash
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000)

### Default Admin Credentials
- Email: `admin@afflux.dev`
- Password: `admin123`

## Project Structure

```
afflux/
├── app/
│   ├── (public)/           # Public pages
│   │   ├── page.tsx        # Homepage
│   │   ├── blog/[slug]/    # Blog posts
│   │   ├── category/[slug]/ # Category pages
│   │   └── tag/[slug]/     # Tag pages
│   ├── admin/              # Admin dashboard
│   │   ├── dashboard/
│   │   ├── posts/
│   │   ├── categories/
│   │   └── tags/
│   ├── api/                # API routes
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── Admin/              # Admin components
│   ├── Blog/               # Blog components
│   ├── SEO/                # Affiliate components
│   └── ui/                 # Base UI components
├── lib/
│   ├── auth.ts             # NextAuth config
│   ├── prisma.ts           # Prisma client
│   ├── seo.ts              # SEO utilities
│   ├── slug.ts             # Slug generation
│   └── utils.ts            # General utilities
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Seed data
└── types/                  # TypeScript types
```

## Database Schema

- **User** - Admin users
- **Post** - Blog posts with rich content (JSON)
- **Category** - Post categories
- **Tag** - Post tags
- **PostTag** - Many-to-many post-tag relation

## SEO Features

- Dynamic meta tags via `generateMetadata()`
- Open Graph and Twitter cards
- JSON-LD structured data (Article, Breadcrumb, Organization)
- Auto-generated sitemap.xml
- Configured robots.txt
- Canonical URLs
- SEO validation in admin (title/description length)

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Set environment variables
4. Deploy

### Environment Variables

```env
DATABASE_URL="postgresql://user:pass@host:5432/db"
AUTH_SECRET="your-secret-key"
AUTH_URL="https://yourdomain.com"
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
NEXT_PUBLIC_SITE_NAME="Your Site Name"
```

## Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm db:seed      # Seed the database
pnpm db:push      # Push schema changes
pnpm db:studio    # Open Prisma Studio
```

## License

MIT
