# Afflux Blog Pipeline - Editorial Guidelines

## Overview
This document defines the standards and guidelines for all AI-generated blog content on Afflux. Every article must follow these rules to maintain quality, SEO performance, and affiliate marketing effectiveness.

---

## Content Categories & Niches

### Primary Niches (High Affiliate Potential)
1. **Technology & Software** - SaaS tools, AI products, developer tools
2. **Personal Finance** - Investing, budgeting apps, fintech
3. **Productivity** - Apps, workflows, digital tools
4. **Health & Wellness** - Fitness tech, supplements, wellness apps
5. **Online Business** - Hosting, marketing tools, e-commerce platforms

### Content Types
- **Listicles**: "7 Best X for Y in 2025"
- **Comparisons**: "X vs Y: Which Is Better?"
- **How-To Guides**: "How to X: Complete Guide"
- **Reviews**: "X Review: Is It Worth It?"
- **Roundups**: "Best X Tools/Products Roundup"

---

## Article Structure

### Required Elements

1. **Title** (50-60 characters for SEO)
   - Include primary keyword
   - Include year if relevant (2025)
   - Use power words: "Complete", "Ultimate", "Proven", "Best"
   - Example: "7 Best AI Writing Tools in 2025: Complete Comparison"

2. **Meta Description** (150-160 characters)
   - Summarize value proposition
   - Include primary keyword naturally
   - End with implicit CTA

3. **Featured Image**
   - High-quality, relevant image from Unsplash
   - Must be working URL (verify before publishing)
   - Recommended size: 1200x630px (or w=1200 parameter)

4. **Introduction** (100-200 words)
   - Hook the reader with a problem or statistic
   - Establish credibility
   - Preview what they'll learn
   - NO heading (starts as paragraph)

5. **Body Content** (2,000-4,000 words minimum)
   - H2 for main sections
   - H3 for subsections within H2
   - One H2 per main topic/product
   - Each section: 200-400 words minimum

6. **Conclusion** (100-150 words)
   - Summarize key takeaways
   - Final recommendation
   - Call to action

---

## Formatting Rules

### Headings
- **H2**: Main sections (products, strategies, topics)
- **H3**: Subsections within H2
- Never skip heading levels (no H2 → H4)
- Only ONE H1 per page (the title - handled by template)

### Lists
- Use bullet lists for features, pros/cons
- Use numbered lists for steps, rankings
- Each list item: 1-2 sentences max

### Images
- Minimum 3 images per article, maximum 7
- Place image after relevant H2 heading
- Always include descriptive alt text
- Use Unsplash URLs with ?w=1200&q=80 parameters
- Verify all image URLs before publishing

### Links
- External links: Open in new tab (rel="noopener noreferrer")
- Affiliate links: Natural placement, not forced
- Internal links: Link to related posts when available
- 3-7 affiliate links per article

### Text Formatting
- **Bold**: For emphasis, product names on first mention, key terms
- *Italic*: For quotes, titles of works
- `Code`: For technical terms, commands, file names

---

## Affiliate Integration

### Link Placement Guidelines
1. **In-context links**: Natural mention within paragraph
2. **CTA after description**: "👉 [Try Product Name](url)"
3. **Comparison tables**: Link each product name
4. **Conclusion**: Final CTA with top recommendation

### Affiliate Link Format
```
👉 [Try ProductName](https://product-url.com)
```
or
```
👉 [Get ProductName (Special Offer)](https://product-url.com)
```

### Disclosure
Add at the end of introduction (implicit in blog design):
> Note: This article contains affiliate links. We may earn a commission if you make a purchase through our links, at no extra cost to you.

---

## SEO Requirements

### Keywords
- Primary keyword in: title, first paragraph, one H2, meta description
- 2-3 secondary keywords distributed naturally
- Keyword density: 1-2% (don't stuff)

### Content Quality Signals
- Original insights, not just summaries
- Specific numbers and data when available
- Real examples and case studies
- Comparison tables for product roundups
- Pros and cons for each product

### Technical SEO
- Slug: lowercase, hyphens, max 5-7 words
- Example: `best-ai-writing-tools-2025`

---

## Writing Style

### Tone
- Professional but conversational
- Authoritative without being stuffy
- Helpful and actionable
- First person plural ("we recommend") for authority
- Second person ("you'll find") for engagement

### Avoid
- Clickbait without substance
- Excessive superlatives
- Vague claims without evidence
- Walls of text (break into paragraphs)
- Generic filler content

### Include
- Specific prices (when stable)
- Concrete numbers and percentages
- Real comparisons
- Honest pros AND cons
- Personal experience language ("in our testing...")

---

## Product Review Template

When reviewing a product, include:

1. **Quick Overview Box**
   - Best for: [use case]
   - Pricing: [price/plans]
   - Rating: ⭐⭐⭐⭐⭐ (if applicable)

2. **What It Is** (2-3 sentences)

3. **Key Features** (bullet list)

4. **Pros & Cons** (bullet lists)

5. **Pricing Details**

6. **Who Should Use It**

7. **Affiliate CTA**

---

## Image Sources

### Approved Sources
- Unsplash (primary): https://unsplash.com
- Use direct URLs with parameters: `?w=1200&q=80`

### URL Format
```
https://images.unsplash.com/photo-{ID}?w=1200&q=80
```

### Image Verification
Before including an image, verify:
1. URL returns 200 status
2. Image loads correctly
3. Alt text is descriptive

---

## Quality Checklist

Before submitting for review:

- [ ] Title is 50-60 characters with primary keyword
- [ ] Meta description is 150-160 characters
- [ ] Featured image URL is verified working
- [ ] Article is 2,000+ words
- [ ] At least 3 images throughout content
- [ ] All image URLs are verified working
- [ ] 3-7 affiliate links included naturally
- [ ] All external links are valid
- [ ] Proper heading hierarchy (H2 → H3)
- [ ] At least one comparison table or list
- [ ] Conclusion with clear CTA
- [ ] Slug is SEO-friendly
- [ ] Category and tags assigned

---

## TipTap JSON Structure Reference

All content must be stored as valid TipTap JSON:

```json
{
  "type": "doc",
  "content": [
    {
      "type": "paragraph",
      "content": [{"type": "text", "text": "..."}]
    },
    {
      "type": "heading",
      "attrs": {"level": 2},
      "content": [{"type": "text", "text": "..."}]
    },
    {
      "type": "image",
      "attrs": {"src": "https://...", "alt": "..."}
    },
    {
      "type": "bulletList",
      "content": [
        {
          "type": "listItem",
          "content": [
            {"type": "paragraph", "content": [...]}
          ]
        }
      ]
    }
  ]
}
```

### Supported Node Types
- `paragraph`
- `heading` (attrs: level 1-3)
- `bulletList` / `orderedList`
- `listItem`
- `blockquote`
- `image` (attrs: src, alt)
- `table` / `tableRow` / `tableCell` / `tableHeader`
- `horizontalRule`
- `hardBreak`

### Supported Marks (for text)
- `bold`
- `italic`
- `code`
- `link` (attrs: href)

---

## Pipeline Agent Responsibilities

### Agent 1: Ideation Agent
- Research trending topics in approved niches
- Identify affiliate potential (available programs)
- Generate title and outline
- Output: Topic brief with title, outline, affiliate opportunities

### Agent 2: Writing Agent
- Follow this BLOG_GUIDELINES.md strictly
- Generate full article in TipTap JSON format
- Include all required elements
- Output: Complete draft article

### Agent 3: Review Agent
- Check word count (2,000+ words)
- Verify heading structure
- Check affiliate link placement
- Review for quality and engagement
- Output: Reviewed article with suggested changes

### Agent 4: Validation Agent
- Verify all image URLs return 200
- Verify all external links are valid
- Check affiliate links are functional
- Validate TipTap JSON structure
- Output: Validation report, fixed article

### Agent 5: Publishing Agent
- Format final payload
- Submit to database/API
- Confirm successful creation
- Send notification with summary
- Output: Published confirmation

---

## Version History

- v1.0 (2025-02-20): Initial guidelines established
