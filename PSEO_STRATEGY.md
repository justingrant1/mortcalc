# MortCalc.org — Programmatic SEO Strategy
**Version:** 1.0 | **Date:** March 2026 | **Author:** pSEO Strategy Session

---

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Current State Audit](#current-state-audit)
3. [Strategic Philosophy](#strategic-philosophy)
4. [Page Matrix Architecture](#page-matrix-architecture)
5. [Phase-by-Phase Rollout](#phase-by-phase-rollout)
6. [Content Uniqueness Framework](#content-uniqueness-framework)
7. [Technical Implementation](#technical-implementation)
8. [Internal Linking Architecture](#internal-linking-architecture)
9. [Sitemap & Crawl Strategy](#sitemap--crawl-strategy)
10. [Data Architecture](#data-architecture)
11. [Realistic Projections](#realistic-projections)
12. [Monitoring & Expansion Signals](#monitoring--expansion-signals)
13. [Anti-Patterns to Avoid](#anti-patterns-to-avoid)

---

## Executive Summary

MortCalc.org is a single-page Next.js 14 mortgage calculator with solid on-page SEO but only **1 indexed URL**. This strategy transforms it into a **quality-first programmatic SEO hub** targeting 3,000+ long-tail keywords across geographic and loan-type dimensions.

**Core insight:** The site already has the most valuable asset — a working, accurate calculator. pSEO multiplies that asset across thousands of high-intent search queries without rebuilding the core product.

**Guiding principle:** Launch fewer, better pages. Expand only when indexing and ranking signals confirm Google values the content. Never sacrifice quality for scale.

---

## Current State Audit

| Attribute | Current State | Target State |
|-----------|--------------|--------------|
| Indexed URLs | 1 | 500–1,000 (Phase 1-3) |
| Keyword coverage | ~10 head terms | 10,000+ long-tail |
| Domain authority | Low (new domain) | Building via content + links |
| Sitemap | Static, 1 URL | Dynamic, segmented |
| Internal links | None (single page) | Hub-and-spoke architecture |
| Schema markup | WebApp + FAQ + Org | + BreadcrumbList + FinancialProduct per page |
| Calculator defaults | Generic | Location/loan-type pre-filled |

**Strengths to build on:**
- Clean Next.js 14 App Router architecture (ideal for `generateStaticParams`)
- Existing JSON-LD schema implementation
- Google Analytics already configured
- Accurate mortgage calculation logic in `utils/calculateMortgage.ts`
- Good Core Web Vitals baseline (static-first architecture)

**Gaps to address:**
- Zero internal linking structure
- No programmatic routes
- Static sitemap with 1 URL
- No location or loan-type specific content
- No data layer for dynamic content

---

## Strategic Philosophy

### Quality-First, Signal-Driven Expansion

This is NOT a "build 5,000 pages in a month" strategy. Google's Helpful Content system actively penalizes thin, templated content at scale. The approach is:

```
Phase 1: Build ~60 high-quality pages
         ↓
Phase 2: Monitor GSC for indexing rate, impressions, clicks
         ↓
Phase 3: Expand only into categories showing traction
         ↓
Phase 4: Repeat signal-driven expansion
```

### The Thin Content Test

Before any page goes live, it must pass this test:
> "Would a first-time homebuyer in [location] find this page more useful than a generic mortgage calculator page?"

If the answer is no, the page needs more content before publishing.

### What Makes Each Page Genuinely Different

NOT this (thin content):
> "The average home in Houston, TX costs $310,000. With a 30-year mortgage at 7.25%, your monthly payment would be $2,118."

YES this (genuine utility):
> "Houston's housing market spans dramatically different price points — from $180K starter homes in Pasadena to $800K+ properties in River Oaks. Texas has no state income tax, which effectively increases your purchasing power compared to states like California or New York. However, Texas has some of the highest property tax rates in the nation (averaging 1.80%), which adds significantly to your monthly PITI payment. Texas also offers the Homestead Exemption, which can reduce your assessed value by up to $100,000 for school district taxes..."

---

## Page Matrix Architecture

### Three Dimensions

```
DIMENSION 1: Geography
├── 50 State pages
└── 25 City pages (top metros only, initially)

DIMENSION 2: Loan Type
├── FHA Mortgage Calculator
├── VA Loan Calculator
├── USDA Loan Calculator
├── Jumbo Mortgage Calculator
├── Refinance Calculator
└── 15-Year Mortgage Calculator

DIMENSION 3: Scenario/Tool
├── Affordability Calculator
├── Amortization Schedule
└── Rent vs. Buy Calculator
```

### Cross-Dimensional Pages (Phase 2+)

```
Loan Type × State:
/fha-mortgage-calculator/texas
/va-loan-calculator/california
/usda-loan-calculator/iowa
```

### URL Structure

```
/                                           → Homepage (existing)
/mortgage-calculator                        → State listing hub
/mortgage-calculator/[state-slug]           → State page
/mortgage-calculator/[state-slug]/[city]    → City page (top 25 only)
/fha-mortgage-calculator                    → FHA hub
/fha-mortgage-calculator/[state-slug]       → FHA × State
/va-loan-calculator                         → VA hub
/va-loan-calculator/[state-slug]            → VA × State
/usda-loan-calculator                       → USDA hub
/jumbo-mortgage-calculator                  → Jumbo hub
/refinance-calculator                       → Refinance hub
/15-year-mortgage-calculator                → 15yr hub
/affordability-calculator                   → Affordability tool
/amortization-schedule                      → Amortization tool
/rent-vs-buy-calculator                     → Rent vs Buy tool
```

---

## Phase-by-Phase Rollout

### Phase 1: Foundation (Weeks 1–2)
**Target: ~60 pages**

| Page Type | Count | Rationale |
|-----------|-------|-----------|
| State pages | 50 | Broadest geographic coverage, unique content per state |
| Loan-type hub pages | 6 | High search volume, clear intent |
| Scenario/tool pages | 3 | Backlink magnets, high utility |
| State listing hub | 1 | Internal link equity distributor |
| **Total** | **60** | |

**Success criteria to advance to Phase 2:**
- GSC shows 40+ of 50 state pages indexed within 30 days
- At least 5 state pages appearing in top 50 for target keywords
- No manual actions or quality warnings in GSC

### Phase 2: Loan-Type × State Cross (Weeks 3–4)
**Target: ~100 pages**

Start with FHA + VA only (highest search volume, clearest intent):
- 50 FHA × State pages
- 50 VA × State pages

**Success criteria to advance to Phase 3:**
- FHA/VA hub pages indexed and showing impressions
- At least 10 loan-type × state pages ranking in top 100
- Average indexing time < 14 days per new page

### Phase 3: City Pages — Top 25 Metros Only (Weeks 5–6)
**Target: ~25 pages**

Cities: Houston, Los Angeles, Chicago, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, Austin, Jacksonville, Fort Worth, Columbus, Charlotte, Indianapolis, San Francisco, Seattle, Denver, Nashville, Portland, Las Vegas, Miami, Atlanta, Tampa, Minneapolis, Detroit

**Content standard:** Each city page requires neighborhood breakdowns, local market context, and city-specific insights. No city page launches without this depth.

### Phase 4: Signal-Driven Expansion (Month 2–3+)
Based on GSC data:
- Expand remaining loan types × states (USDA, Jumbo, Refinance)
- Add more cities based on which state pages rank
- Add city × loan-type crossovers for high-performing combinations

---

## Content Uniqueness Framework

### State Content Modules

Each state page pulls from a set of **pre-authored content modules** based on that state's characteristics. These are NOT templates with variable injection — they are written content blocks that apply to specific states.

#### Module 1: Tax Environment
```
NO_INCOME_TAX (TX, FL, TN, NV, WA, WY, SD, NH, AK):
  "Texas has no state income tax, which meaningfully increases your 
  effective purchasing power compared to high-tax states. A household 
  earning $100,000 in Texas keeps roughly $5,000–$8,000 more annually 
  than the same household in California, directly affecting how much 
  mortgage payment they can comfortably afford."

HIGH_PROPERTY_TAX (NJ, IL, TX, CT, NH):
  "New Jersey has the highest effective property tax rate in the nation, 
  averaging 2.23%. On a $400,000 home, that's approximately $745/month 
  in property taxes alone — a significant portion of your total PITI 
  payment that many buyers underestimate."

PROP_13 (CA):
  "California's Proposition 13 caps annual property tax increases at 2% 
  for existing homeowners, but new buyers are assessed at current market 
  value. This creates a significant disparity: long-term homeowners may 
  pay taxes on a $200,000 assessed value while their neighbor in an 
  identical home pays on $900,000."

HOMESTEAD_EXEMPTION (TX, FL):
  "Texas offers a Homestead Exemption that reduces your home's assessed 
  value by $100,000 for school district taxes. For a $350,000 home, this 
  effectively reduces your taxable value to $250,000 for school taxes, 
  saving approximately $1,500–$2,000 annually depending on your district."
```

#### Module 2: Market Context
```
HOT_MARKET (CA, WA, CO, TX-Austin):
  Discussion of competitive bidding, appraisal gaps, escalation clauses

COOLING_MARKET (specific metros post-2024):
  Buyer leverage, price reductions, days on market trends

RURAL_DOMINANT (IA, ND, SD, WY, MT, VT, ME):
  USDA loan eligibility prominence, rural property considerations

HIGH_COST (CA, NY, HI, MA, CT):
  Jumbo loan thresholds, conforming loan limits, high-cost area limits
```

#### Module 3: State Programs
Each state has specific first-time buyer programs, down payment assistance, and housing finance agency programs. These are authored per state, not templated.

Examples:
- Texas: TSAHC My First Texas Home, Texas Mortgage Credit Certificate
- California: CalHFA MyHome Assistance, CalHFA Zero Interest Program
- Florida: Florida Housing Finance Corporation, Florida Assist
- New York: SONYMA programs, NYC HomeFirst Down Payment Assistance

#### Module 4: Military/VA Prominence
States with major military installations get a dedicated VA loan section:
- Texas (Fort Hood, Fort Sam Houston, Lackland AFB, etc.)
- California (Camp Pendleton, Travis AFB, Naval Base San Diego)
- Virginia (Pentagon, Quantico, Norfolk Naval Station)
- North Carolina (Fort Bragg, Camp Lejeune)
- Georgia (Fort Benning, Fort Stewart)
- Florida (MacDill AFB, Eglin AFB, NAS Jacksonville)

#### Module 5: Climate/Insurance
```
HURRICANE_ZONE (FL, TX, LA, SC, NC):
  "Florida homeowners face some of the highest insurance costs in the 
  nation due to hurricane risk. Windstorm insurance is often required 
  separately from standard homeowners insurance, and in coastal areas 
  can add $200–$500/month to your housing costs. Factor this into your 
  calculator inputs."

EARTHQUAKE_ZONE (CA, OR, WA, AK):
  "Standard homeowners insurance does not cover earthquake damage. 
  California homeowners should budget for separate earthquake insurance, 
  which averages $800–$3,000 annually depending on location and 
  construction type."

FLOOD_ZONE (FL, LA, TX coast, NJ):
  "Many properties in [state] fall within FEMA flood zones requiring 
  mandatory flood insurance. NFIP policies average $700–$1,200 annually, 
  though private flood insurance may offer better rates for some properties."

TORNADO_ALLEY (OK, KS, NE, IA, MO):
  "Oklahoma's location in Tornado Alley means homeowners insurance 
  premiums are among the highest in the nation, averaging $3,500–$5,000 
  annually. This significantly impacts your monthly PITI calculation."
```

### City Page Content Standard

Each of the 25 city pages must include:

1. **Neighborhood price tiers** — At least 3 distinct neighborhoods with price ranges
2. **Local market trend** — YoY price change, days on market, inventory levels
3. **School district impact** — How top-rated districts affect pricing
4. **Local loan programs** — City/county-specific DPA programs
5. **Commute/location factor** — How location within metro affects affordability
6. **Local lender landscape** — Credit unions, community banks with competitive rates

---

## Technical Implementation

### File Structure

```
app/
├── page.tsx                                    (homepage — updated with browse sections)
├── mortgage-calculator/
│   ├── page.tsx                                (state listing hub)
│   └── [stateSlug]/
│       ├── page.tsx                            (state page template)
│       └── [citySlug]/
│           └── page.tsx                        (city page template)
├── fha-mortgage-calculator/
│   ├── page.tsx                                (FHA hub)
│   └── [stateSlug]/
│       └── page.tsx                            (FHA × state)
├── va-loan-calculator/
│   ├── page.tsx                                (VA hub)
│   └── [stateSlug]/
│       └── page.tsx                            (VA × state)
├── usda-loan-calculator/
│   └── page.tsx                                (USDA hub — Phase 4)
├── jumbo-mortgage-calculator/
│   └── page.tsx                                (Jumbo hub — Phase 4)
├── refinance-calculator/
│   └── page.tsx                                (Refinance hub)
├── 15-year-mortgage-calculator/
│   └── page.tsx                                (15yr hub)
├── affordability-calculator/
│   └── page.tsx                                (Affordability tool)
├── amortization-schedule/
│   └── page.tsx                                (Amortization tool)
├── rent-vs-buy-calculator/
│   └── page.tsx                                (Rent vs Buy tool)
└── sitemap.ts                                  (dynamic sitemap index)

data/
├── states.json                                 (50 states — full content modules)
├── cities.json                                 (25 metros — rich content)
└── loan-types.json                             (loan type specifications)

components/
├── MortgageCalculator.tsx                      (refactored from HomeClient.tsx — accepts defaultValues)
├── StateBrowseGrid.tsx                         (state listing component)
├── LoanTypeBrowseGrid.tsx                      (loan type listing component)
├── BreadcrumbNav.tsx                           (breadcrumb component)
└── RelatedLinks.tsx                            (internal linking component)
```

### Key Next.js Patterns

#### generateStaticParams (state pages)
```typescript
export async function generateStaticParams() {
  const states = await import('@/data/states.json')
  return Object.keys(states.default).map((slug) => ({ stateSlug: slug }))
}
```

#### generateMetadata (dynamic per page)
```typescript
export async function generateMetadata({ params }: { params: { stateSlug: string } }) {
  const state = statesData[params.stateSlug]
  return {
    title: `${state.name} Mortgage Calculator 2026 | MortCalc.org`,
    description: `Calculate your monthly mortgage payment in ${state.name}. Current ${state.name} mortgage rates, property taxes (avg ${state.avgPropertyTaxRate}%), and state-specific loan programs for 2026.`,
    alternates: { canonical: `https://mortcalc.org/mortgage-calculator/${params.stateSlug}` }
  }
}
```

#### ISR Strategy
```typescript
// For pages using static data from JSON files:
// NO revalidate needed — rebuild on deploy is sufficient and honest

// If/when live rates API is integrated:
export const revalidate = 86400 // 24 hours
```

#### Calculator Component (refactored)
```typescript
interface CalculatorDefaults {
  purchasePrice?: number
  downPaymentPercent?: number
  annualRate?: number
  termYears?: number
  monthlyTax?: number
  monthlyInsurance?: number
}

export default function MortgageCalculator({ defaults }: { defaults?: CalculatorDefaults }) {
  // Pre-fills with location/loan-type specific values
}
```

### Schema Markup Per Page Type

#### State Pages
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Texas Mortgage Calculator 2026",
  "applicationCategory": "FinanceApplication",
  "areaServed": {
    "@type": "State",
    "name": "Texas",
    "addressCountry": "US"
  }
}
```

#### Loan-Type Pages
```json
{
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  "name": "FHA Mortgage Loan",
  "description": "FHA loans are government-backed mortgages...",
  "feesAndCommissionsSpecification": "3.5% minimum down payment required"
}
```

#### All Pages
- `BreadcrumbList` — navigation path
- `FAQPage` — 3-5 unique questions per page
- `WebApplication` — calculator tool

---

## Internal Linking Architecture

### Link Flow Diagram

```
Homepage
│
├──→ /mortgage-calculator (hub)
│    ├──→ /mortgage-calculator/texas
│    │    ├──→ /mortgage-calculator/texas/houston
│    │    ├──→ /mortgage-calculator/texas/dallas
│    │    ├──→ /fha-mortgage-calculator/texas  [cross-dimension]
│    │    ├──→ /va-loan-calculator/texas       [cross-dimension]
│    │    └──→ /mortgage-calculator/oklahoma   [neighboring state]
│    └──→ (all 50 states)
│
├──→ /fha-mortgage-calculator (hub)
│    └──→ /fha-mortgage-calculator/[all 50 states]
│
├──→ /va-loan-calculator (hub)
│    └──→ /va-loan-calculator/[all 50 states]
│
├──→ /affordability-calculator
├──→ /amortization-schedule
└──→ /rent-vs-buy-calculator
```

### Linking Rules Per Page Type

**State pages link to:**
- Parent: `/mortgage-calculator` (hub)
- Children: Top 3-5 city pages within that state
- Siblings: 2-3 neighboring/similar states
- Cross-dimension: FHA, VA, Refinance variants for that state
- Tools: `/affordability-calculator`, `/amortization-schedule`

**City pages link to:**
- Parent: State page (breadcrumb)
- Siblings: 3-4 other major cities in same state
- Cross-dimension: FHA, VA variants for that city (when they exist)
- Tools: `/affordability-calculator`

**Loan-type hub pages link to:**
- All 50 state variants
- Related loan types (FHA → VA → USDA comparison)
- `/mortgage-calculator` hub

**Homepage additions:**
- "Browse by State" grid (all 50 states)
- "Browse by Loan Type" section (6 loan types)
- "Tools & Calculators" section (scenario pages)

---

## Sitemap & Crawl Strategy

### Segmented Sitemap Architecture

```
/sitemap.xml                    → Sitemap index
/sitemaps/core.xml              → Homepage + hubs + tools (~15 URLs)
/sitemaps/states.xml            → 50 state pages
/sitemaps/cities.xml            → 25 city pages
/sitemaps/loan-types.xml        → 6 hubs + 100 state variants
```

### GSC Submission Order
1. Submit `core.xml` first (homepage + hubs)
2. Submit `states.xml` after Phase 1 launch
3. Submit `loan-types.xml` after Phase 2 launch
4. Submit `cities.xml` after Phase 3 launch

**Never submit all sitemaps at once.** Batch submission allows you to monitor indexing rate per segment and identify issues early.

### Priority & Changefreq Settings

| Page Type | Priority | Changefreq |
|-----------|----------|------------|
| Homepage | 1.0 | monthly |
| State listing hub | 0.9 | monthly |
| Loan-type hubs | 0.9 | monthly |
| State pages | 0.8 | monthly |
| Loan-type × state | 0.7 | monthly |
| City pages | 0.7 | monthly |
| Tool pages | 0.8 | monthly |

---

## Data Architecture

### states.json Structure

```json
{
  "texas": {
    "name": "Texas",
    "slug": "texas",
    "abbreviation": "TX",
    "avgHomePrice": 310000,
    "avgPropertyTaxRate": 1.80,
    "avgMonthlyInsurance": 175,
    "avgRate30yr": 7.25,
    "avgRate15yr": 6.50,
    "conformingLoanLimit": 766550,
    "topCities": ["houston", "dallas", "san-antonio", "austin", "fort-worth"],
    "neighboringStates": ["oklahoma", "new-mexico", "louisiana", "arkansas"],
    "contentModules": {
      "taxEnvironment": "NO_INCOME_TAX",
      "propertyTax": "HIGH_PROPERTY_TAX",
      "homesteadExemption": true,
      "climateRisk": "HURRICANE_ZONE",
      "militaryPresence": "HIGH",
      "marketType": "LARGE_DIVERSE"
    },
    "statePrograms": [
      {
        "name": "My First Texas Home",
        "agency": "TSAHC",
        "description": "30-year fixed-rate mortgage with down payment and closing cost assistance up to 5% of the loan amount.",
        "url": "https://www.tsahc.org/homebuyers/my-first-texas-home"
      }
    ],
    "fhaLoanLimit": 472030,
    "vaEntitlement": true,
    "usdaEligibleAreas": true,
    "jumboThreshold": 766550,
    "metaTitle": "Texas Mortgage Calculator 2026 | TX Home Loan Payment Estimator",
    "metaDescription": "Calculate your Texas mortgage payment with current TX rates, property taxes (avg 1.80%), and state programs. Free calculator updated for 2026.",
    "h1": "Texas Mortgage Calculator 2026",
    "intro": "Texas is one of the most active real estate markets in the nation..."
  }
}
```

### cities.json Structure

```json
{
  "houston": {
    "name": "Houston",
    "slug": "houston",
    "stateSlug": "texas",
    "stateName": "Texas",
    "stateAbbr": "TX",
    "medianHomePrice": 310000,
    "avgPropertyTaxRate": 2.09,
    "avgMonthlyInsurance": 195,
    "medianHouseholdIncome": 57791,
    "yoyPriceChange": -2.1,
    "avgDaysOnMarket": 45,
    "neighborhoods": [
      { "name": "River Oaks", "priceRange": "$800K–$5M+", "notes": "Houston's most prestigious neighborhood" },
      { "name": "The Heights", "priceRange": "$400K–$900K", "notes": "Trendy urban neighborhood, strong appreciation" },
      { "name": "Katy (suburb)", "priceRange": "$280K–$500K", "notes": "Family-friendly, top-rated schools, high growth" },
      { "name": "Pasadena", "priceRange": "$150K–$280K", "notes": "Affordable entry-level market" }
    ],
    "localPrograms": [
      {
        "name": "Houston Homebuyer Assistance Program",
        "description": "Up to $30,000 in down payment assistance for income-qualified buyers",
        "url": "https://www.houstontx.gov/housing/homebuyer.html"
      }
    ],
    "metaTitle": "Houston, TX Mortgage Calculator 2026 | Monthly Payment Estimator",
    "metaDescription": "Calculate your Houston mortgage payment. Houston median home price $310K, avg property tax 2.09%. Includes local programs and neighborhood breakdowns."
  }
}
```

### loan-types.json Structure

```json
{
  "fha": {
    "name": "FHA Mortgage",
    "slug": "fha-mortgage-calculator",
    "shortName": "FHA",
    "minDownPayment": 3.5,
    "minCreditScore": 580,
    "mip": {
      "upfront": 1.75,
      "annual": 0.85
    },
    "loanLimits2026": {
      "standard": 472030,
      "highCost": 1089300
    },
    "targetBorrower": "First-time buyers with lower credit scores or limited down payment savings",
    "pros": ["Low down payment (3.5%)", "More flexible credit requirements", "Competitive rates"],
    "cons": ["Requires mortgage insurance for life of loan (if < 10% down)", "Loan limits may restrict high-cost markets", "Property must meet FHA standards"],
    "monthlySearchVolume": 14000,
    "metaTitle": "FHA Mortgage Calculator 2026 | FHA Loan Payment Estimator",
    "metaDescription": "Calculate your FHA loan payment including MIP. FHA loans require just 3.5% down with a 580+ credit score. Free FHA calculator updated for 2026."
  }
}
```

---

## Realistic Projections

### Traffic Projections (Conservative)

| Metric | Month 1 | Month 3 | Month 6 | Month 12 |
|--------|---------|---------|---------|----------|
| Indexed Pages | 40–60 | 150–200 | 300–500 | 500–800 |
| Organic Keywords | 100–300 | 1,000–3,000 | 5,000–10,000 | 15,000–25,000 |
| Monthly Organic Sessions | 200–500 | 2,000–6,000 | 8,000–20,000 | 20,000–50,000 |
| Avg Position (tracked KWs) | 50–80 | 30–60 | 20–40 | 10–30 |

**Caveats:**
- New domain with no backlink profile — Google will crawl slowly initially
- Helpful Content system may sandbox new programmatic content for 3-6 months
- Projections assume no manual actions and consistent content quality
- Backlink acquisition (even modest) would significantly accelerate these numbers

### Keyword Opportunity by Phase

| Phase | Target Keywords | Avg Monthly Volume | Competition |
|-------|----------------|-------------------|-------------|
| State pages | "mortgage calculator [state]" × 50 | 200–2,000/state | Medium |
| FHA × State | "FHA mortgage calculator [state]" × 50 | 100–800/state | Low-Medium |
| VA × State | "VA loan calculator [state]" × 50 | 100–600/state | Low-Medium |
| City pages | "mortgage calculator [city]" × 25 | 300–5,000/city | Medium-High |
| Tool pages | "affordability calculator", "amortization schedule" | 5,000–20,000 | High |

---

## Monitoring & Expansion Signals

### Google Search Console Metrics to Track

**Weekly:**
- New pages indexed (Coverage report)
- Impressions for new pages (Performance report, filtered by page)
- Average position for target keywords

**Monthly:**
- Indexing rate: % of submitted URLs indexed within 30 days
- Click-through rate by page type
- Top performing state/loan-type combinations

### Expansion Decision Framework

```
IF (state page indexed AND impressions > 50/month):
  → Create loan-type × state variants for that state

IF (loan-type × state page indexed AND impressions > 20/month):
  → Consider city pages for top cities in that state

IF (city page indexed AND impressions > 30/month):
  → Create city × loan-type crossover pages

IF (indexing rate < 50% after 30 days):
  → STOP expansion, audit content quality, check for crawl issues
```

### Red Flags to Watch

- **Indexing rate drops below 50%** — Google may be deprioritizing the site
- **"Crawled but not indexed"** status in GSC — Content quality issue
- **Manual action notification** — Thin/duplicate content penalty
- **Impressions without clicks** — Title/description optimization needed
- **High bounce rate on calculator pages** — Calculator UX issue

---

## Anti-Patterns to Avoid

### 1. String Interpolation Masquerading as Content
❌ "The average home in {city} costs ${price}. Your payment would be ${payment}."
✅ Authored paragraphs with genuine local insight, using data to support narrative

### 2. Launching All Pages at Once
❌ Deploy 3,000 pages on day one
✅ Phase rollout, monitor indexing signals, expand based on data

### 3. Identical Pages with Different Parameters
❌ Two pages that differ only in city name and median price
✅ Each page has unique content modules, neighborhood data, local programs

### 4. Ignoring Crawl Budget
❌ Submitting all sitemaps simultaneously
✅ Segmented sitemaps, batch GSC submission, monitor crawl stats

### 5. Over-Optimizing Titles
❌ "Houston TX Mortgage Calculator | Houston Mortgage | Houston Home Loan | Houston TX"
✅ "Houston, TX Mortgage Calculator 2026 | MortCalc.org"

### 6. No Internal Links from Homepage
❌ Homepage doesn't link to any programmatic pages
✅ Homepage has "Browse by State" and "Browse by Loan Type" sections

### 7. Thin City Pages
❌ City page = state page with city name swapped in
✅ City page has neighborhood breakdowns, local programs, market trends

### 8. Static Sitemap
❌ Manually updating sitemap.xml as pages are added
✅ Dynamic `app/sitemap.ts` that auto-generates from data files

---

## Implementation Checklist

### Phase 1 (Weeks 1–2)
- [ ] Create `data/states.json` (50 states, full content modules)
- [ ] Create `data/loan-types.json` (6 loan types)
- [ ] Refactor `HomeClient.tsx` → `MortgageCalculator.tsx` (accepts `defaultValues` prop)
- [ ] Build `app/mortgage-calculator/page.tsx` (state listing hub)
- [ ] Build `app/mortgage-calculator/[stateSlug]/page.tsx` (state template)
- [ ] Build loan-type hub pages (6 pages)
- [ ] Build scenario/tool pages (3 pages)
- [ ] Create `app/sitemap.ts` (dynamic, segmented)
- [ ] Update `app/page.tsx` (add browse sections)
- [ ] Update `public/robots.txt`
- [ ] Submit `core.xml` + `states.xml` to GSC

### Phase 2 (Weeks 3–4)
- [ ] Build `app/fha-mortgage-calculator/[stateSlug]/page.tsx`
- [ ] Build `app/va-loan-calculator/[stateSlug]/page.tsx`
- [ ] Submit `loan-types.xml` to GSC
- [ ] Monitor Phase 1 indexing in GSC

### Phase 3 (Weeks 5–6)
- [ ] Create `data/cities.json` (25 metros, rich content)
- [ ] Build `app/mortgage-calculator/[stateSlug]/[citySlug]/page.tsx`
- [ ] Submit `cities.xml` to GSC
- [ ] Monitor Phase 2 indexing in GSC

### Phase 4 (Month 2–3+)
- [ ] Expand loan types (USDA, Jumbo, Refinance) × states
- [ ] Expand city count based on state page performance
- [ ] Add city × loan-type crossovers for top performers
- [ ] Begin backlink outreach (calculator embeds, resource pages)

---

*This document should be updated as phases complete and new data informs strategy. Last updated: March 2026.*
