# Technical Research: ExpensesHub PWA

**Date:** 2025-10-03  
**Author:** Samuel Fernandez

## Executive Summary

This document outlines the technical research and architectural decisions for ExpensesHub PWA. Key decisions include using Nuxt 3 for full-stack capabilities, MongoDB for centralized data storage, PrimeVue for consistent UI components, and Playwright for comprehensive E2E testing.

## Technology Stack Analysis

### Frontend Framework: Nuxt 3

**Decision:** Use Nuxt 3 instead of plain Vue 3

**Rationale:**

- **SSR/SSG Support:** Better initial load performance and SEO (even for PWA)
- **File-based Routing:** Reduces boilerplate, matches page structure naturally
- **Auto-imports:** Components, composables, and utilities imported automatically
- **Server Routes:** Built-in API routes for MongoDB integration (/server/api/)
- **PWA Module:** @vite-pwa/nuxt provides seamless PWA setup
- **TypeScript:** First-class TypeScript support with better inference
- **Developer Experience:** Hot Module Replacement, better error messages
- **Future-proof:** Easier to add server-side features (auth, API, etc.)

**Trade-offs:**

- Slightly larger framework size (mitigated by tree-shaking)
- Learning curve for Nuxt-specific patterns
- More abstraction compared to plain Vue

**Alternatives Considered:**

- **Plain Vue 3:** Simpler but requires manual routing, state, and API setup
- **Next.js + React:** Wrong framework (not Vue), heavier bundle size
- **SvelteKit:** Less mature ecosystem, smaller community

---

### UI Component Library: PrimeVue with Aura Preset

**Decision:** Use PrimeVue instead of building custom components

**Rationale:**

- **Design System Match:** Aura preset aligns with specification colors and design
- **Accessibility:** WCAG compliant out of the box (constitutional requirement)
- **Comprehensive:** 90+ components cover all needs (buttons, forms, modals, etc.)
- **Vue 3 Native:** Built specifically for Vue 3 Composition API
- **Customizable:** Theme system allows easy customization
- **TypeScript Support:** Full TypeScript definitions
- **Maintainability:** Less custom code to maintain
- **Documentation:** Excellent docs and examples

**Trade-offs:**

- Bundle size larger than minimal custom components (mitigated with tree-shaking)
- Some learning curve for PrimeVue APIs
- Potential over-engineering for simple components

**Alternatives Considered:**

- **Vuetify:** Material Design aesthetic doesn't match spec
- **Element Plus:** Good but less aligned with Aura design
- **Custom Components:** More control but higher maintenance burden

---

### Database: MongoDB

**Decision:** Use MongoDB instead of IndexedDB

**Rationale:**

- **Centralized Storage:** Enables future multi-device sync
- **Better Queries:** Complex filtering, aggregation for charts and reports
- **Scalability:** Easier to add features (budgets, recurring transactions, etc.)
- **Backup/Restore:** Server-side backups more reliable
- **Data Integrity:** Server validation and transactions
- **Future Features:** Easier to add multi-user, sharing, cloud sync

**Schema Design:**

```javascript
// Collections: transactions, categories, settings

// Transactions: ~1000 docs/user/year = manageable size
// Categories: ~20 docs/user = tiny
// Settings: 1 doc/user = minimal

// Indexing strategy:
// transactions: { userId: 1, date: -1 } - for date range queries
// transactions: { userId: 1, categoryId: 1 } - for category filtering
// categories: { userId: 1, type: 1 } - for category lists
```

**Trade-offs:**

- Requires internet connection (mitigated with PWA caching)
- MongoDB Atlas free tier limits (512MB storage, sufficient for MVP)
- Latency vs IndexedDB (mitigated with caching and optimistic updates)

**Alternatives Considered:**

- **IndexedDB:** Fully offline but no multi-device sync
- **PostgreSQL:** More complex setup, less flexible schema
- **Supabase:** Good but adds another service dependency

---

### Charts Library: vue-chartjs

**Decision:** Use vue-chartjs (Chart.js wrapper)

**Rationale:**

- **Vue 3 Integration:** Official Vue 3 wrapper for Chart.js
- **Comprehensive:** Supports all required chart types (Bar, Pie, Doughnut, Line)
- **Responsive:** Works well on mobile, adapts to container size
- **Customizable:** Full control over colors, labels, tooltips
- **Performance:** Efficient rendering with canvas
- **TypeScript Support:** Full type definitions
- **Active Maintenance:** Regular updates and bug fixes
- **Documentation:** Extensive examples and guides

**Configuration Approach:**

```typescript
// Shared chart configuration
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "right" },
    tooltip: { enabled: true },
  },
  animation: { duration: 300 }, // Fast for mobile
};

// Category colors from design system
// Dynamic data processing in composables
```

**Trade-offs:**

- Bundle size ~100KB (mitigated with code splitting)
- Canvas-based (can't be styled with CSS)

**Alternatives Considered:**

- **ApexCharts:** Heavier, more features than needed
- **ECharts:** Large bundle, overkill for this use case
- **D3.js:** Too low-level, requires more custom code

---

### Testing Strategy: Playwright (E2E Only)

**Decision:** Use Playwright exclusively for E2E testing

**Rationale:**

- **Constitutional Requirement:** Playwright mandated by project constitution
- **Cross-browser:** Tests on Chromium, Firefox, WebKit automatically
- **Reliable:** No flaky tests with proper waits and locators
- **Fast:** Parallel execution, efficient browser automation
- **PWA Support:** Can test installation, offline mode, service workers
- **TypeScript:** First-class TypeScript support
- **Developer Experience:** Excellent debugging tools, trace viewer
- **Mobile Testing:** Emulate mobile devices accurately

**Testing Approach:**

- Page Object Model pattern (constitutional requirement)
- One test file per page/feature
- Test all critical user paths (no unit/integration tests)
- Run in CI on every PR
- Use test fixtures for data setup/teardown

**Coverage Strategy:**

```
Landing Page Tests (8 scenarios):
- Add/edit/delete transactions
- Period filtering
- Chart interactions
- CSV export

Charts Page Tests (5 scenarios):
- Chart type switching
- Data type toggle
- Period selection

Settings Page Tests (6 scenarios):
- Category CRUD
- Settings persistence

PWA Tests (2 scenarios):
- Installation flow
- Offline functionality

Responsive Tests (3 scenarios):
- Mobile, tablet, desktop viewports
```

**Trade-offs:**

- No unit tests (rely on E2E to catch bugs)
- Slower than unit tests (mitigated with parallel execution)
- Requires running dev server for tests

---

### State Management: Nuxt State + Pinia (if needed)

**Decision:** Start with Nuxt built-in state (useState), add Pinia only if needed

**Rationale:**

- **Simplicity:** Nuxt's useState is sufficient for most cases
- **Auto-imports:** No setup required
- **SSR-safe:** Works with server-side rendering
- **TypeScript:** Type-safe by default
- **Lightweight:** No extra dependencies

**When to add Pinia:**

- Complex state relationships across many components
- Need for actions and getters with logic
- DevTools debugging required
- State persistence (can use Pinia plugins)

**State Structure:**

```typescript
// Global state with useState
const user = useState("user", () => ({}));
const settings = useState("settings", () => ({}));
const transactions = useState("transactions", () => []);
const categories = useState("categories", () => []);

// Or with Pinia if needed
interface TransactionsStore {
  transactions: Transaction[];
  fetchTransactions(period: PeriodFilter): Promise<void>;
  addTransaction(data: CreateTransactionInput): Promise<Transaction>;
  // ...
}
```

---

### PWA Implementation: @vite-pwa/nuxt

**Decision:** Use official Vite PWA plugin for Nuxt

**Rationale:**

- **Workbox Integration:** Industry-standard service worker toolkit
- **Auto-generated:** Manifest and service worker generated automatically
- **Caching Strategies:** Preconfigured strategies (cache-first, network-first, etc.)
- **Offline Support:** Works offline out of the box
- **Update Flow:** Handles service worker updates gracefully
- **TypeScript:** Full type support
- **Nuxt Integration:** Seamless integration with Nuxt build

**Caching Strategy:**

```javascript
// Static assets: cache-first (long-term caching)
// API calls: network-first with cache fallback
// Images: cache-first with cache size limits
// HTML: network-first (always fresh)

workbox: {
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/.*\.mongodb\.net\/.*/,
      handler: "NetworkFirst",
      options: { cacheName: "api-cache", expiration: { maxEntries: 50 } },
    },
    {
      urlPattern: /\.(png|jpg|jpeg|svg|gif)$/,
      handler: "CacheFirst",
      options: { cacheName: "images", expiration: { maxEntries: 100 } },
    },
  ];
}
```

---

## Architecture Patterns

### 1. Page Object Model (Testing)

Constitutional requirement for Playwright tests.

```typescript
// tests/pages/landing.page.ts
export class LandingPage {
  constructor(private page: Page) {}

  async addTransaction(data: TransactionInput) {
    await this.page.click('[data-testid="fab-add"]');
    await this.page.fill('[data-testid="amount-input"]', data.amount);
    // ...
    await this.page.click('[data-testid="save-button"]');
  }

  async getTransactionCount() {
    return await this.page.locator('[data-testid="transaction-item"]').count();
  }
}
```

### 2. Composables Pattern (Business Logic)

Nuxt composables for reusable logic.

```typescript
// composables/useTransactions.ts
export const useTransactions = () => {
  const transactions = useState<Transaction[]>("transactions", () => []);

  const fetchTransactions = async (filter: PeriodFilter) => {
    const data = await $fetch("/api/transactions", { query: filter });
    transactions.value = data;
  };

  const addTransaction = async (input: CreateTransactionInput) => {
    const transaction = await $fetch("/api/transactions", {
      method: "POST",
      body: input,
    });
    transactions.value.unshift(transaction);
    return transaction;
  };

  return { transactions, fetchTransactions, addTransaction };
};
```

### 3. Server API Routes (Backend)

Nuxt server routes for MongoDB operations.

```typescript
// server/api/transactions/index.get.ts
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { startDate, endDate } = parsePeriodFilter(query);

  const transactions = await Transaction.find({
    date: { $gte: startDate, $lte: endDate },
  })
    .sort({ date: -1 })
    .lean();

  return transactions;
});

// server/api/transactions/index.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const validatedData = transactionSchema.parse(body);

  const transaction = await Transaction.create(validatedData);
  return transaction;
});
```

### 4. Component Composition

Small, focused components following SRP.

```vue
<!-- components/Transaction/ListItem.vue -->
<template>
  <div class="transaction-item">
    <CategoryIcon :category="category" />
    <div class="transaction-details">
      <p class="transaction-category">{{ category.name }}</p>
      <p class="transaction-description">{{ transaction.description }}</p>
    </div>
    <p class="transaction-amount" :class="amountClass">
      {{ formattedAmount }}
    </p>
    <TransactionActions
      @edit="$emit('edit', transaction)"
      @delete="$emit('delete', transaction)" />
  </div>
</template>

<script setup lang="ts">
// Small, focused component < 50 lines
// Single responsibility: display one transaction
// Emits events, no business logic
</script>
```

---

## Performance Optimization Strategy

### 1. Bundle Size Optimization

**Target:** < 200KB gzipped initial load

**Techniques:**

- Code splitting by route (Nuxt automatic)
- Lazy load chart components
- Tree-shake PrimeVue (import only needed components)
- Dynamic imports for modals
- Optimize images (WebP format, proper sizing)
- Remove unused CSS

**Monitoring:**

```bash
# Analyze bundle
npx nuxi analyze

# Check after build
ls -lh .output/public/_nuxt/*.js

# Target breakdown:
# - Nuxt core: ~80KB
# - PrimeVue: ~60KB
# - vue-chartjs: ~50KB (lazy loaded)
# - App code: ~40KB
# Total: ~180KB gzipped
```

### 2. MongoDB Query Optimization

**Target:** < 200ms P95 response time

**Techniques:**

- Proper indexing on date and categoryId
- Use projections to limit fields
- Aggregation pipelines for chart data
- Connection pooling
- Caching frequently accessed data

**Index Strategy:**

```javascript
// transactions collection
db.transactions.createIndex({ date: -1 });
db.transactions.createIndex({ categoryId: 1, date: -1 });

// categories collection (small, no index needed)

// Query patterns:
// 1. Get transactions by date range (most common)
db.transactions
  .find({
    date: { $gte: startDate, $lte: endDate },
  })
  .sort({ date: -1 })
  .limit(100);

// 2. Aggregation for charts
db.transactions.aggregate([
  { $match: { date: { $gte: startDate, $lte: endDate } } },
  { $group: { _id: "$categoryId", total: { $sum: "$amount" } } },
]);
```

### 3. Rendering Optimization

**Target:** CLS < 0.1, no layout shifts

**Techniques:**

- Define fixed heights for chart containers
- Use skeleton screens for loading states
- Avoid dynamic content insertion above fold
- Reserve space for images
- Use `v-memo` for list items
- Implement virtual scrolling for large lists (if > 100 items)

### 4. Caching Strategy

**PWA Caching:**

- Static assets: cache-first, 1 year expiry
- API responses: network-first with 5-minute cache fallback
- Fonts: cache-first, immutable
- Images: cache-first with 100-entry limit

**Client-side Caching:**

- Cache categories in memory (rarely change)
- Cache settings in localStorage
- Optimistic updates for better UX

---

## Security Considerations

### 1. Data Validation

**Client-side:**

```typescript
// Zod schemas for runtime validation
const transactionSchema = z.object({
  type: z.enum(["expense", "income"]),
  amount: z.number().positive().max(1000000),
  categoryId: z.string().uuid(),
  description: z.string().max(200).optional(),
  date: z.date(),
});
```

**Server-side:**

```typescript
// Validate all inputs on server
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const validatedData = transactionSchema.parse(body);
    // Process valid data
  } catch (error) {
    throw createError({ statusCode: 400, message: "Invalid input" });
  }
});
```

### 2. MongoDB Security

- Use MongoDB Atlas with IP whitelist
- Store connection string in environment variables
- Use least-privilege database user
- Enable audit logging
- Regular backups

### 3. Content Security Policy

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        {
          "http-equiv": "Content-Security-Policy",
          content:
            "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://*.mongodb.net",
        },
      ],
    },
  },
});
```

### 4. Input Sanitization

- Sanitize all user inputs (descriptions, category names)
- Use Vue's automatic XSS protection
- Validate file exports (CSV generation)
- Prevent injection attacks

---

## Accessibility Research

### WCAG 2.1 AA Compliance Checklist

**Color Contrast:**

- Normal text: ≥ 4.5:1 ratio
- Large text (18pt+): ≥ 3:1 ratio
- Check all color combinations in design system
- Use online contrast checkers

**Keyboard Navigation:**

- All interactive elements focusable with Tab
- Logical tab order (top to bottom, left to right)
- Focus indicators visible (outline or custom style)
- Escape key closes modals
- Enter/Space activates buttons

**ARIA Labels:**

- Icon-only buttons need aria-label
- Form inputs need labels (or aria-label)
- Loading states need aria-live regions
- Charts need aria-label describing data

**Screen Reader Support:**

- Semantic HTML (nav, main, article, etc.)
- Skip links to main content
- Announce dynamic content updates
- Descriptive link text (avoid "click here")

**Playwright Accessibility Tests:**

```typescript
test("Landing page meets accessibility standards", async ({ page }) => {
  await page.goto("/");

  // Check for accessibility violations
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
```

---

## Deployment Strategy

### Hosting Options

**Recommended: Vercel**

- Excellent Nuxt 3 support
- Edge functions for API routes
- Automatic HTTPS and CDN
- Preview deployments for PRs
- Environment variable management
- Free tier sufficient for MVP

**Alternative: Netlify**

- Good Nuxt support
- Similar features to Vercel
- Split testing capabilities

**Not Recommended:**

- Traditional hosting (requires Node.js server setup)
- Heroku (more expensive, slower deployments)

### Environment Variables

```bash
# .env (not committed)
MONGODB_URI=mongodb+srv://...
MONGODB_DB_NAME=expenseshub_prod
NUXT_PUBLIC_APP_URL=https://expenseshub.app
```

### Deployment Checklist

- [ ] MongoDB Atlas production cluster created
- [ ] Environment variables configured in hosting
- [ ] HTTPS enabled (automatic with Vercel/Netlify)
- [ ] Custom domain configured (if applicable)
- [ ] PWA manifest with production URLs
- [ ] Service worker registered
- [ ] Error tracking setup (Sentry recommended)
- [ ] Analytics setup (optional, privacy-conscious)
- [ ] Backup strategy implemented
- [ ] Monitoring and alerts configured

---

## Future Enhancements (Out of Scope)

**Phase 2 Features:**

- Multi-user support with authentication
- Cloud sync across devices
- Budget limits and alerts
- Recurring transactions
- Bank account integration (Plaid API)
- Receipt photo attachments
- Advanced analytics and insights
- Export to PDF/Excel
- Dark mode
- Multi-currency support

**Technical Debt to Address:**

- Add unit tests for complex logic (after MVP)
- Implement proper error tracking (Sentry)
- Add performance monitoring (Web Vitals API)
- Implement data migrations strategy
- Add A/B testing framework
- Internationalization (i18n)

---

## References

- Nuxt 3 Docs: https://nuxt.com/docs
- PrimeVue Docs: https://primevue.org/
- vue-chartjs Docs: https://vue-chartjs.org/
- Playwright Docs: https://playwright.dev/
- MongoDB Node.js Driver: https://www.mongodb.com/docs/drivers/node/
- Mongoose Docs: https://mongoosejs.com/
- Web Vitals: https://web.dev/vitals/
- WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- PWA Best Practices: https://web.dev/progressive-web-apps/

---

**Document Status:** Complete  
**Last Updated:** 2025-10-03  
**Next Review:** After Milestone 1 (2025-10-10)
