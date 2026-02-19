import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface TopicBrief {
  title: string;
  slug: string;
  category: string;
  tags: string[];
  outline: string[];
  affiliateOpportunities: { name: string; url: string; commission: string }[];
  targetKeywords: string[];
  metaDescription: string;
}

interface ArticleDraft {
  title: string;
  slug: string;
  excerpt: string;
  content: object; // TipTap JSON
  featuredImage: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  categorySlug: string;
  tagSlugs: string[];
  images: { src: string; alt: string }[];
  affiliateLinks: { text: string; url: string }[];
}

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  fixedContent?: object;
}

interface PublishResult {
  success: boolean;
  postId?: string;
  postSlug?: string;
  error?: string;
}

// ============================================
// AGENT 1: IDEATION AGENT
// ============================================
export async function ideationAgent(): Promise<TopicBrief> {
  // This would be called by an LLM sub-agent
  // The sub-agent should:
  // 1. Research trending topics in approved niches
  // 2. Check affiliate program availability
  // 3. Generate SEO-optimized title
  // 4. Create outline with H2 sections
  // 5. List affiliate opportunities with URLs
  
  // Placeholder structure - actual implementation via LLM
  const brief: TopicBrief = {
    title: "",
    slug: "",
    category: "",
    tags: [],
    outline: [],
    affiliateOpportunities: [],
    targetKeywords: [],
    metaDescription: "",
  };
  
  return brief;
}

// ============================================
// AGENT 2: WRITING AGENT
// ============================================
export async function writingAgent(brief: TopicBrief): Promise<ArticleDraft> {
  // This would be called by an LLM sub-agent
  // The sub-agent should:
  // 1. Read BLOG_GUIDELINES.md
  // 2. Follow the structure strictly
  // 3. Generate 2000+ word article
  // 4. Use TipTap JSON format
  // 5. Include affiliate links naturally
  // 6. Add images from Unsplash
  
  const draft: ArticleDraft = {
    title: brief.title,
    slug: brief.slug,
    excerpt: "",
    content: { type: "doc", content: [] },
    featuredImage: "",
    metaTitle: "",
    metaDescription: brief.metaDescription,
    keywords: brief.targetKeywords.join(", "),
    categorySlug: brief.category,
    tagSlugs: brief.tags,
    images: [],
    affiliateLinks: [],
  };
  
  return draft;
}

// ============================================
// AGENT 3: REVIEW AGENT
// ============================================
export async function reviewAgent(draft: ArticleDraft): Promise<{
  approved: boolean;
  feedback: string[];
  revisedDraft?: ArticleDraft;
}> {
  // This would be called by an LLM sub-agent
  // The sub-agent should:
  // 1. Check word count (2000+ words)
  // 2. Verify heading structure
  // 3. Check affiliate link placement (3-7 links)
  // 4. Review for quality and engagement
  // 5. Suggest improvements
  // 6. Make revisions if needed
  
  const feedback: string[] = [];
  let approved = true;
  
  // Basic validation checks
  const contentStr = JSON.stringify(draft.content);
  const wordCount = contentStr.split(/\s+/).length;
  
  if (wordCount < 2000) {
    feedback.push(`Word count too low: ${wordCount} (minimum 2000)`);
    approved = false;
  }
  
  if (draft.affiliateLinks.length < 3) {
    feedback.push(`Not enough affiliate links: ${draft.affiliateLinks.length} (minimum 3)`);
    approved = false;
  }
  
  if (draft.images.length < 3) {
    feedback.push(`Not enough images: ${draft.images.length} (minimum 3)`);
    approved = false;
  }
  
  if (draft.title.length < 50 || draft.title.length > 70) {
    feedback.push(`Title length issue: ${draft.title.length} chars (target 50-60)`);
  }
  
  if (draft.metaDescription.length < 140 || draft.metaDescription.length > 165) {
    feedback.push(`Meta description length: ${draft.metaDescription.length} chars (target 150-160)`);
  }
  
  return { approved, feedback, revisedDraft: draft };
}

// ============================================
// AGENT 4: VALIDATION AGENT
// ============================================
export async function validationAgent(draft: ArticleDraft): Promise<ValidationResult> {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Validate all image URLs
  for (const img of draft.images) {
    try {
      const response = await fetch(img.src, { method: "HEAD" });
      if (!response.ok) {
        errors.push(`Broken image: ${img.alt} - ${img.src} (status ${response.status})`);
      }
    } catch {
      errors.push(`Image fetch failed: ${img.alt} - ${img.src}`);
    }
  }
  
  // Validate featured image
  try {
    const response = await fetch(draft.featuredImage, { method: "HEAD" });
    if (!response.ok) {
      errors.push(`Broken featured image: ${draft.featuredImage}`);
    }
  } catch {
    errors.push(`Featured image fetch failed: ${draft.featuredImage}`);
  }
  
  // Validate affiliate links
  for (const link of draft.affiliateLinks) {
    try {
      const response = await fetch(link.url, { 
        method: "HEAD",
        redirect: "follow",
      });
      if (!response.ok && response.status !== 403) {
        // 403 is common for affiliate links that block HEAD requests
        warnings.push(`Affiliate link may be broken: ${link.text} - ${link.url}`);
      }
    } catch {
      warnings.push(`Could not verify affiliate link: ${link.text} - ${link.url}`);
    }
  }
  
  // Validate TipTap JSON structure
  try {
    const content = draft.content as { type: string; content?: unknown[] };
    if (content.type !== "doc" || !Array.isArray(content.content)) {
      errors.push("Invalid TipTap JSON structure: missing doc type or content array");
    }
  } catch {
    errors.push("Invalid TipTap JSON structure");
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings,
    fixedContent: draft.content,
  };
}

// ============================================
// AGENT 5: PUBLISHING AGENT
// ============================================
export async function publishingAgent(draft: ArticleDraft): Promise<PublishResult> {
  try {
    // Get or create category
    let category = await prisma.category.findUnique({
      where: { slug: draft.categorySlug },
    });
    
    if (!category) {
      category = await prisma.category.create({
        data: {
          name: draft.categorySlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
          slug: draft.categorySlug,
        },
      });
    }
    
    // Get or create tags
    const tagIds: string[] = [];
    for (const tagSlug of draft.tagSlugs) {
      let tag = await prisma.tag.findUnique({ where: { slug: tagSlug } });
      if (!tag) {
        tag = await prisma.tag.create({
          data: {
            name: tagSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
            slug: tagSlug,
          },
        });
      }
      tagIds.push(tag.id);
    }
    
    // Get admin user
    const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
    if (!admin) {
      return { success: false, error: "No admin user found" };
    }
    
    // Check for duplicate slug
    const existing = await prisma.post.findUnique({ where: { slug: draft.slug } });
    if (existing) {
      return { success: false, error: `Slug already exists: ${draft.slug}` };
    }
    
    // Calculate read time (rough estimate: 200 words per minute)
    const contentStr = JSON.stringify(draft.content);
    const wordCount = contentStr.split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));
    
    // Create the post as DRAFT
    const post = await prisma.post.create({
      data: {
        title: draft.title,
        slug: draft.slug,
        excerpt: draft.excerpt,
        content: JSON.stringify(draft.content),
        featuredImage: draft.featuredImage,
        status: "DRAFT", // Always draft for pipeline
        metaTitle: draft.metaTitle,
        metaDescription: draft.metaDescription,
        keywords: draft.keywords,
        readTime,
        featured: false,
        publishedAt: null, // Not published
        authorId: admin.id,
        categoryId: category.id,
        tags: {
          create: tagIds.map((tagId) => ({ tagId })),
        },
      },
    });
    
    return {
      success: true,
      postId: post.id,
      postSlug: post.slug,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// ============================================
// PIPELINE ORCHESTRATOR
// ============================================
export interface PipelineResult {
  success: boolean;
  postId?: string;
  postSlug?: string;
  title?: string;
  excerpt?: string;
  errors: string[];
  warnings: string[];
}

export async function runPipeline(topicBrief: TopicBrief): Promise<PipelineResult> {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  try {
    // Step 1: Writing (assumes brief is already provided)
    console.log("📝 Step 1: Writing article...");
    const draft = await writingAgent(topicBrief);
    
    // Step 2: Review
    console.log("🔍 Step 2: Reviewing article...");
    const review = await reviewAgent(draft);
    warnings.push(...review.feedback);
    
    if (!review.approved) {
      // In real implementation, this would loop back to writing agent
      console.log("⚠️ Review feedback:", review.feedback);
    }
    
    const finalDraft = review.revisedDraft || draft;
    
    // Step 3: Validation
    console.log("✅ Step 3: Validating content...");
    const validation = await validationAgent(finalDraft);
    errors.push(...validation.errors);
    warnings.push(...validation.warnings);
    
    if (!validation.valid) {
      return {
        success: false,
        errors,
        warnings,
      };
    }
    
    // Step 4: Publishing
    console.log("📤 Step 4: Publishing as draft...");
    const result = await publishingAgent(finalDraft);
    
    if (!result.success) {
      errors.push(result.error || "Publishing failed");
      return { success: false, errors, warnings };
    }
    
    return {
      success: true,
      postId: result.postId,
      postSlug: result.postSlug,
      title: finalDraft.title,
      excerpt: finalDraft.excerpt,
      errors,
      warnings,
    };
  } catch (error) {
    errors.push(error instanceof Error ? error.message : "Pipeline error");
    return { success: false, errors, warnings };
  }
}

// Export for use by cron/sub-agents
export { prisma };
