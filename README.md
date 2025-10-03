# ExpensesHub PWA

A modern, mobile-first Progressive Web Application for personal expense and income tracking.

## 🚀 Features

- **Mobile-First Design**: Optimized for smartphones (320px-767px), scales to desktop
- **Offline Capable**: Full PWA with service worker caching
- **Real-Time Insights**: Track expenses and incomes with instant calculations
- **Interactive Charts**: 4 chart types (Bar, Pie, Doughnut, Line) with vue-chartjs
- **Customizable Categories**: Manage expense and income categories
- **CSV Export**: Export data for external analysis
- **Accessible**: WCAG 2.1 AA compliant
- **Fast**: Meets Core Web Vitals targets (LCP < 2.5s, FID < 100ms, CLS < 0.1)

## 🛠️ Tech Stack

- **Framework**: Nuxt 3 (Vue 3 with SSR/SSG)
- **UI Library**: PrimeVue with Aura preset
- **Language**: TypeScript (strict mode)
- **Database**: MongoDB (cloud-hosted via MongoDB Atlas)
- **Charts**: vue-chartjs (Chart.js wrapper for Vue 3)
- **Testing**: Playwright (E2E only, no unit/integration tests)
- **PWA**: @vite-pwa/nuxt (Workbox-based)

## 📋 Prerequisites

- Node.js v18.x or later
- npm v9.x or later
- MongoDB Atlas account (free tier)
- Modern browser (Chrome, Firefox, Safari, Edge)

## 🏁 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create a `.env` file in the project root:

```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
MONGODB_DB_NAME=expenseshub_dev
NUXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important**: Never commit `.env` to version control.

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 4. Run Tests

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run E2E tests
npm run test:e2e

# Run tests with UI
npm run test:e2e:ui
```

## 📂 Project Structure

```
expenseshub-project/
├── server/              # Backend code (Nuxt server)
│   ├── api/            # API routes
│   ├── models/         # Mongoose models
│   ├── plugins/        # Server plugins
│   └── utils/          # Server utilities
├── pages/              # Vue pages (file-based routing)
│   ├── index.vue      # Landing page
│   ├── charts.vue     # Charts page
│   └── settings.vue   # Settings page
├── components/         # Vue components
├── composables/        # Vue composables
├── types/             # TypeScript types
├── assets/            # CSS, images
├── tests/             # Playwright E2E tests
└── public/            # Static files
```

## 🎯 Constitutional Principles

This project adheres to strict constitutional principles:

1. **Code Quality Excellence**: TypeScript strict mode, JSDoc documentation, functions < 50 lines
2. **Testing Standards (Playwright)**: E2E testing exclusively with Page Object Model pattern
3. **User Experience Consistency**: PrimeVue Aura design system, WCAG 2.1 AA accessibility
4. **Performance Requirements**: Bundle < 200KB, Core Web Vitals targets, MongoDB optimization

See `.specify/memory/constitution.md` for complete details.

## 🧪 Testing

All testing is done with Playwright (no unit or integration tests per constitutional requirements):

```bash
# Run all tests
npm run test:e2e

# Run tests in headed mode
npm run test:e2e:headed

# Run tests in UI mode (interactive debugging)
npm run test:e2e:ui

# Run specific test file
npx playwright test tests/e2e/landing.spec.ts
```

### Test Coverage

- Landing Page: Transaction CRUD, period filtering, CSV export
- Charts Page: Chart type switching, data filtering
- Settings Page: Category management, preferences
- PWA: Installation flow, offline functionality
- Responsive Design: Mobile, tablet, desktop
- Accessibility: WCAG 2.1 AA compliance

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Deploy

This project is optimized for deployment to Vercel or Netlify with automatic Node.js server support.

**Vercel:**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Environment Variables (Production):**

- `MONGODB_URI`: MongoDB Atlas connection string
- `MONGODB_DB_NAME`: Database name (e.g., expenseshub_prod)
- `NUXT_PUBLIC_APP_URL`: Production URL

## 📖 Documentation

- **Specification**: `specs/002-expenseshub-progressive-web/spec.md`
- **Implementation Plan**: `specs/002-expenseshub-progressive-web/plan.md`
- **Task Breakdown**: `specs/002-expenseshub-progressive-web/tasks.md`
- **Data Model**: `specs/002-expenseshub-progressive-web/data-model.md`
- **Quick Start Guide**: `specs/002-expenseshub-progressive-web/quickstart.md`

## 🤝 Contributing

1. Read the project constitution (`.specify/memory/constitution.md`)
2. Ensure code meets quality standards (TypeScript strict, linting, formatting)
3. Write Playwright E2E tests for all user-facing features
4. Verify accessibility and responsive design
5. Check performance impact (bundle size, Core Web Vitals)

All pull requests must pass:

- ESLint and Prettier checks
- All Playwright E2E tests
- TypeScript type checking
- Code review

## 📄 License

TBD

---

**Built with ❤️ following strict quality and testing standards**
