🧠 ROLE

You are a senior fullstack engineer and SEO specialist.

Your task is to build a production-ready SEO-focused affiliate blog platform using Next.js (App Router) with:
 • Fully dynamic blog system (like WordPress)
 • Advanced SEO optimization
 • Admin dashboard with full CMS capabilities
 • Flexible rich content (multiple images, custom placement, embeds)
 • Built for affiliate marketing monetization

The platform must be scalable, cleanly structured, and production-ready.

⸻

🏗️ TECH STACK REQUIREMENTS

Core:
 • Next.js 14+ (App Router)
 • TypeScript
 • Tailwind CSS
 • ShadCN UI (optional but preferred)
 • Prisma ORM
 • PostgreSQL (or MySQL if easier)
 • NextAuth (Admin authentication)
 • UploadThing or Cloudinary (image uploads)
 • TipTap or Editor.js (rich text editor like WordPress)

⸻

📁 PROJECT STRUCTURE

Use App Router architecture:

app/
  (public)/
    page.tsx
    blog/
      [slug]/page.tsx
    category/
      [slug]/page.tsx
    tag/
      [slug]/page.tsx
  admin/
    layout.tsx
    dashboard/page.tsx
    posts/page.tsx
    posts/new/page.tsx
    posts/[id]/edit/page.tsx
  sitemap.ts
  robots.ts
  layout.tsx
  globals.css

lib/
  prisma.ts
  seo.ts
  slug.ts

components/
  SEO/
  Blog/
  Admin/


⸻

🗄️ DATABASE SCHEMA (PRISMA)

Create models:

Post
 • id
 • title
 • slug (unique)
 • excerpt
 • content (JSON for rich editor blocks)
 • featuredImage
 • author
 • status (draft | published)
 • metaTitle
 • metaDescription
 • keywords
 • categoryId
 • createdAt
 • updatedAt

Category
 • id
 • name
 • slug

Tag
 • id
 • name
 • slug

PostTags (Many-to-Many)

User (Admin)
 • id
 • email
 • password
 • role

⸻

🖊️ BLOG FUNCTIONAL REQUIREMENTS

The blog must:

✅ Support:
 • Multiple images per article
 • Images placed anywhere in content
 • YouTube embeds
 • Affiliate buttons
 • Tables
 • Code blocks
 • Headings (H1, H2, H3)
 • Quotes
 • Lists
 • Internal linking

Use block-based editor (TipTap or Editor.js).

Content must be stored as structured JSON, not plain text.

⸻

🔐 ADMIN DASHBOARD REQUIREMENTS

Admin must be able to:
 • Login securely
 • Create post
 • Edit post
 • Delete post
 • Save draft
 • Publish post
 • Schedule post (optional)
 • Upload multiple images
 • Manage categories
 • Manage tags
 • Edit SEO fields manually

Admin UI should feel like a lightweight WordPress.

⸻

🌍 PUBLIC WEBSITE REQUIREMENTS

Homepage:
 • Featured posts section
 • Latest posts
 • Categories section
 • SEO optimized

Blog Post Page:
 • Clean layout
 • Sticky table of contents (auto-generated from H2/H3)
 • Author info
 • Published date
 • Related posts
 • Category + tags
 • Affiliate call-to-action section
 • Share buttons

⸻

🚀 SEO REQUIREMENTS (VERY IMPORTANT)

You MUST implement full SEO optimization:

1️⃣ Metadata

Use Next.js generateMetadata() per page:
 • Dynamic title
 • Meta description
 • Canonical URL
 • OpenGraph
 • Twitter card

2️⃣ Structured Data (JSON-LD)

Add schema:
 • Article schema
 • Breadcrumb schema
 • Organization schema

3️⃣ Technical SEO
 • sitemap.xml auto-generated
 • robots.txt
 • Proper heading hierarchy (ONLY ONE H1 per page)
 • Slug-based URLs
 • Static generation when possible (SSG)
 • Incremental Static Regeneration (ISR)

4️⃣ Performance
 • Use next/image
 • Lazy loading
 • Dynamic imports for heavy components
 • Lighthouse score target: 95+

5️⃣ Internal Linking System
 • Automatically suggest related posts
 • Category linking
 • Tag linking

6️⃣ URL Structure

/blog/best-laptop-for-developers-2026
/category/tech
/tag/affiliate


⸻

💰 AFFILIATE OPTIMIZATION FEATURES

Must include:
 • Custom affiliate button block
 • Comparison table component
 • Pros/Cons component
 • Product card component
 • Auto “Best Pick” badge
 • Sticky affiliate CTA (optional)
 • Click tracking system

⸻

🔎 SEO CONTENT RULES

Agent must enforce:
 • SEO title length 50–60 characters
 • Meta description 150–160 characters
 • Keyword density not spammy
 • Auto slug generation
 • Table of contents auto-generated
 • Proper H2/H3 structure

⸻

📈 SCALABILITY

Must support:
 • 1000+ posts
 • Pagination
• Search functionality
 • Category filtering
 • Tag filtering

Optional:
 • Algolia search integration

⸻

🔐 SECURITY
 • Protect admin routes
 • Role-based access
 • CSRF protection
 • Input validation (Zod)

⸻

🎨 UI/UX
 • Clean, minimal, modern
 • Optimized for reading
 • Mobile-first
 • Dark mode
 • Fast loading

⸻

⚡ DEPLOYMENT READY
 • Environment variables structured
 • .env.example provided
 • Docker-ready (optional)
 • Vercel optimized

⸻

🧪 BONUS (IF POSSIBLE)
 • AI-powered SEO suggestion tool in admin
 • Read time calculation
 • View counter
 • Trending posts section

⸻

📌 OUTPUT REQUIREMENTS

Generate:
 1. Full folder structure
 2. Prisma schema
 3. Core layout files
 4. Admin dashboard
 5. Blog page example
 6. SEO implementation
 7. Deployment instructions

Write production-level code, not pseudocode.
