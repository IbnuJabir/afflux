# Afflux Blog Pipeline

Automated blog generation pipeline using multi-agent system.

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Ideation Agent │───▶│  Writing Agent  │───▶│  Review Agent   │
│  (Topic Brief)  │    │  (Full Draft)   │    │  (Quality Check)│
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                       │
                                                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Notification  │◀───│ Publishing Agent│◀───│Validation Agent │
│   (Telegram)    │    │  (DB Insert)    │    │ (URL Checks)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Agent Responsibilities

### Agent 1: Ideation Agent
- Research trending topics in approved niches
- Check affiliate program availability
- Generate SEO-optimized title (50-60 chars)
- Create outline with H2/H3 sections
- List affiliate opportunities with URLs
- Output: `TopicBrief` object

### Agent 2: Writing Agent
- Read and follow `BLOG_GUIDELINES.md` strictly
- Generate 2000+ word article
- Use TipTap JSON format
- Include 3-7 affiliate links naturally
- Add 3-7 images from Unsplash
- Output: `ArticleDraft` object

### Agent 3: Review Agent
- Check word count (2000+ minimum)
- Verify heading structure (H2 → H3)
- Check affiliate link placement
- Review for quality and engagement
- Suggest improvements or revisions
- Output: Approved/rejected with feedback

### Agent 4: Validation Agent
- Verify all image URLs return 200 OK
- Verify all external links are valid
- Check affiliate links are functional
- Validate TipTap JSON structure
- Output: Validation report

### Agent 5: Publishing Agent
- Create/get category and tags
- Format final payload
- Insert into database as DRAFT
- Return post ID and slug
- Output: Publish confirmation

## Files

- `BLOG_GUIDELINES.md` - Editorial guidelines (root of project)
- `pipeline/agents.ts` - Agent function implementations
- `pipeline/run-pipeline.ts` - CLI runner for testing
- `pipeline/cron-job.ts` - Scheduled job for daily posts

## Database Access

The pipeline uses direct Prisma database access for:
1. **Security**: No API keys to manage
2. **Reliability**: No network requests to fail
3. **Speed**: Direct database operations

For production deployment:
- Set `DATABASE_URL` environment variable
- For SQLite: Use file path or deploy with persistent storage
- For PostgreSQL: Use connection string

## Running the Pipeline

### Manual Test
```bash
cd /home/builder/code/afflux
npx tsx pipeline/run-pipeline.ts
```

### Cron Integration
The pipeline is designed to be triggered by OpenClaw cron jobs.
Each run generates 1 blog post. Schedule 5 runs per day.

## Topic Ideas Queue

The ideation agent can pull from these high-performing niches:

### Tech & AI
- Best AI tools for [use case]
- [Tool] vs [Tool] comparison
- How to use [AI Tool] for [task]

### Finance
- Passive income strategies
- Best investment apps
- Budgeting tool comparisons

### Productivity
- Best [category] tools for [persona]
- How to automate [workflow]
- [Tool] complete guide

### Business
- Best hosting for [use case]
- Email marketing tool comparisons
- E-commerce platform reviews

## Notification Format

After successful publish:
```
📝 New Draft Created!
Title: [Article Title]
Category: [Category Name]
URL: /blog/[slug]
Word Count: [count] | Images: [count] | Links: [count]
Status: DRAFT - Ready for review
```
