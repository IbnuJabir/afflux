# Product Research Agent Guidelines

## Mission
Search Amazon and affiliate marketing platforms to find high-potential products for blog content. Focus on products that will drive both traffic and affiliate revenue.

## Selection Criteria (Priority Order)

### 1. Affiliate Commission Rate
- **High priority:** Products with 5%+ commission rates
- Amazon categories with higher rates: Luxury Beauty (10%), Amazon Coins (10%), Digital Music/Videos (5%)
- Avoid low-commission categories: Video Games (1%), Gift Cards (0%)

### 2. Product Demand Signals
- **Best Sellers Rank (BSR):** Look for products in top 1000 of their category
- **Review Count:** 500+ reviews indicates established demand
- **Review Velocity:** New products with fast-growing reviews
- **"Amazon's Choice" badge:** High conversion indicator

### 3. Discount & Promotion Indicators
- Products with active coupons or deals
- Lightning deals or limited-time offers
- Price drops (shown as "Was $X, Now $Y")
- Prime Day / Holiday seasonal promotions

### 4. Rating Quality
- Target products with 4.0+ star rating
- Prioritize 4.3-4.7 range (realistic, trustworthy)
- Be cautious of perfect 5.0 ratings (may be fake)

### 5. Content Opportunity
- Products that can be compared (Best X vs Y articles)
- Products with clear use cases (How to use X)
- Products solving specific problems (pain point content)
- Evergreen products (not one-time fads)

## Search Strategy

### Amazon Search Patterns
1. **Category Browse:** Start with high-commission categories
2. **Best Sellers Page:** `/gp/bestsellers/[category]`
3. **New Releases:** `/gp/new-releases/[category]`
4. **Movers & Shakers:** `/gp/movers-and-shakers/[category]`
5. **Most Wished For:** `/gp/most-wished-for/[category]`

### Keyword Patterns
- "Best [product type] 2025"
- "[Product] vs [Product]"
- "Top rated [product]"
- "[Product] with [feature]"
- "[Product] under $[price]"

## Output Format

For each product found, extract:

```json
{
  "name": "Product Name",
  "asin": "B0XXXXXXXX",
  "url": "https://amazon.com/dp/B0XXXXXXXX",
  "category": "Electronics > Headphones",
  "price": 79.99,
  "originalPrice": 99.99,
  "discountPercent": 20,
  "rating": 4.5,
  "reviewCount": 12500,
  "bestSellerRank": 15,
  "isPrimeEligible": true,
  "hasCoupon": true,
  "couponValue": "20% off",
  "amazonChoice": true,
  "imageUrl": "https://...",
  "keyFeatures": ["Feature 1", "Feature 2", "Feature 3"],
  "affiliatePotential": "HIGH|MEDIUM|LOW",
  "contentAngle": "Comparison article: X vs Y vs Z"
}
```

## Categories to Focus On

### High Commission + High Demand
1. **Software & Apps** - SaaS tools, productivity apps
2. **Online Courses** - Udemy, Skillshare, Coursera
3. **Web Hosting** - Recurring commissions
4. **VPNs** - High demand, good commissions
5. **Audio Equipment** - Headphones, speakers, mics

### Medium Commission + Very High Demand
1. **Electronics** - Laptops, tablets, phones
2. **Home Office** - Desks, chairs, monitors
3. **Fitness** - Equipment, wearables, supplements
4. **Kitchen** - Appliances, gadgets

### Seasonal Opportunities
- Q1: Fitness, organization, productivity
- Q2: Outdoor, travel, summer gear
- Q3: Back to school, tech
- Q4: Holiday gifts, Black Friday deals

## Browser Agent Commands

### Open Amazon Category
```bash
agent-browser open "https://www.amazon.com/gp/bestsellers/electronics" && agent-browser wait --load networkidle && agent-browser snapshot -i
```

### Extract Product Info
```bash
agent-browser get text @productElement
agent-browser screenshot --annotate
```

### Navigate Product Pages
```bash
agent-browser click @productLink
agent-browser wait --load networkidle
agent-browser snapshot -i
```

## Rate Limiting
- Wait 2-3 seconds between page loads
- Avoid rapid-fire requests
- Use `agent-browser wait 3000` between navigations

## Output to Pipeline
After collecting products, format them into a research brief that the Ideation Agent can use to create article topics.

```json
{
  "researchDate": "2026-02-26",
  "productsFound": 10,
  "topPicks": [...],
  "suggestedArticles": [
    {
      "type": "comparison",
      "title": "Best Noise-Canceling Headphones 2025: AirPods Max vs Sony WH-1000XM5",
      "products": ["B0XXXXXXXX", "B0YYYYYYYY"],
      "estimatedCommission": "$15-25 per sale"
    }
  ]
}
```
