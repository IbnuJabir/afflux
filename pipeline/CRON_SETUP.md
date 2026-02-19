# Afflux Blog Pipeline - Cron Setup

## OpenClaw Cron Configuration

This document explains how to set up automated blog generation using OpenClaw cron jobs.

## Pipeline Execution

The pipeline is a standalone script that:
1. Selects a random topic from the topic pool
2. Generates a full article with affiliate links
3. Validates all images and links
4. Publishes as DRAFT to database
5. Outputs a notification payload

## Cron Schedule (5 posts/day)

Schedule the pipeline to run 5 times per day at these intervals:

```
06:00 UTC - Morning post 1
10:00 UTC - Morning post 2
14:00 UTC - Afternoon post 1
18:00 UTC - Evening post 1
22:00 UTC - Night post 1
```

## OpenClaw Cron Job Setup

Add these cron jobs via the OpenClaw Gateway:

```json
{
  "name": "afflux-blog-1",
  "schedule": { "kind": "cron", "expr": "0 6 * * *", "tz": "UTC" },
  "sessionTarget": "isolated",
  "payload": {
    "kind": "agentTurn",
    "message": "Run the Afflux blog pipeline: cd /home/builder/code/afflux && npx tsx pipeline/run-pipeline.ts. After completion, send me a notification with the article title and slug."
  },
  "delivery": { "mode": "announce" }
}
```

Repeat for hours 10, 14, 18, 22.

## Environment Variables

For production (PostgreSQL instead of SQLite):

```env
DATABASE_URL="postgresql://user:password@host:5432/afflux?schema=public"
```

## Notification Format

After each successful run, the agent should send:

```
📝 New Draft Created!

Title: [Article Title]
Category: [Category]
URL: /blog/[slug]
Words: [count] | Images: [count] | Links: [count]
Status: DRAFT - Ready for review
```

## Deployment Notes

### Option 1: SQLite with Persistent Storage
- Keep using SQLite (current setup)
- Ensure `/home/builder/code/afflux/prisma/dev.db` persists
- Works for single-instance deployments

### Option 2: PostgreSQL (Recommended for Production)
1. Provision a PostgreSQL database
2. Update DATABASE_URL in environment
3. Run `npx prisma migrate deploy`
4. Cron jobs will connect to remote database

### Option 3: API-Based Publishing
If you prefer not to give direct database access:
1. Deploy the Next.js app
2. Create an API key for pipeline access
3. Modify pipeline to POST to /api/admin/posts
4. Requires authentication handling

## Monitoring

Check pipeline health:
```bash
# View recent posts created by pipeline
cd /home/builder/code/afflux
npx tsx -e "
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  prisma.post.findMany({
    where: { status: 'DRAFT' },
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: { title: true, slug: true, createdAt: true }
  }).then(console.log).finally(() => prisma.\$disconnect());
"
```

## Troubleshooting

### Pipeline fails with "No admin user found"
Run the seed script to create admin user:
```bash
cd /home/builder/code/afflux
npx prisma db seed
```

### Images fail validation
The pipeline automatically filters out broken images. If all images fail, check network connectivity.

### Duplicate slug error
The pipeline appends a timestamp to slugs if duplicates are detected.
