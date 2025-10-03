# Quick Start Guide: ExpensesHub PWA

**Last Updated:** 2025-10-03  
**Target Audience:** Developers setting up the project for the first time

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js:** v18.x or later ([Download](https://nodejs.org/))
- **pnpm:** v8.x or later (recommended) or npm v9.x
  ```bash
  npm install -g pnpm
  ```
- **Git:** Latest version ([Download](https://git-scm.com/))
- **MongoDB Atlas Account:** Free tier ([Sign up](https://www.mongodb.com/cloud/atlas/register))
- **VS Code:** (Recommended) with extensions:
  - Vue - Official (Vue.volar)
  - TypeScript Vue Plugin (Volar)
  - ESLint
  - Prettier
  - Playwright Test for VSCode

## 1. Project Setup (5 minutes)

### Clone Repository

```bash
git clone https://github.com/yourusername/expenseshub-project.git
cd expenseshub-project
```

### Install Dependencies

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

## 2. MongoDB Setup (10 minutes)

### Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster (M0 Sandbox - 512MB)
3. Set up database access:
   - Create a database user (username + password)
   - Save credentials securely
4. Set up network access:
   - Add your current IP address
   - Or allow access from anywhere (0.0.0.0/0) for development
5. Get your connection string:
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password

### Configure Environment Variables

Create `.env` file in project root:

```bash
# .env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
MONGODB_DB_NAME=expenseshub_dev
```

**Important:** Never commit `.env` file to git. It's already in `.gitignore`.

## 3. Initialize Nuxt Project (First Time Only)

If the Nuxt project doesn't exist yet, initialize it:

```bash
# Create Nuxt 3 project
pnpm dlx nuxi@latest init .

# Select options:
# - Package manager: pnpm
# - Initialize git repository: Yes
```

### Install Core Dependencies

```bash
# PrimeVue and styling
pnpm add primevue primeicons

# Charts
pnpm add vue-chartjs chart.js

# MongoDB and validation
pnpm add mongoose zod

# PWA support
pnpm add -D @vite-pwa/nuxt

# Testing
pnpm add -D @playwright/test
pnpm dlx playwright install
```

### Configure Nuxt

Create/update `nuxt.config.ts`:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ["@vite-pwa/nuxt"],

  css: [
    "primevue/resources/themes/aura-light-green/theme.css",
    "primeicons/primeicons.css",
  ],

  build: {
    transpile: ["primevue", "chart.js"],
  },

  typescript: {
    strict: true,
    typeCheck: true,
  },

  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
    mongodbDbName: process.env.MONGODB_DB_NAME || "expenseshub_dev",
  },

  pwa: {
    manifest: {
      name: "ExpensesHub",
      short_name: "ExpensesHub",
      description: "Personal expense and income tracking",
      theme_color: "#10B981",
      background_color: "#FAFAFA",
      display: "standalone",
      start_url: "/",
      icons: [
        {
          src: "/icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
      cleanupOutdatedCaches: true,
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/.*\.mongodb\.net\/.*/i,
          handler: "NetworkFirst",
          options: {
            cacheName: "api-cache",
            expiration: { maxEntries: 50, maxAgeSeconds: 300 },
          },
        },
      ],
    },
  },
});
```

### Configure TypeScript

Update `tsconfig.json`:

```json
{
  "extends": "./.nuxt/tsconfig.json",
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### Configure ESLint

Create `.eslintrc.js`:

```javascript
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "@nuxtjs/eslint-config-typescript",
    "plugin:vue/vue3-recommended",
    "prettier",
  ],
  rules: {
    "vue/multi-word-component-names": "off",
    "vue/max-attributes-per-line": ["error", { singleline: 3 }],
    "max-len": ["error", { code: 100, ignoreUrls: true }],
    complexity: ["error", 10],
    "max-lines-per-function": ["warn", { max: 50, skipBlankLines: true }],
  },
};
```

### Configure Prettier

Create `.prettierrc`:

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "none",
  "tabWidth": 2,
  "printWidth": 100,
  "arrowParens": "avoid"
}
```

## 4. Project Structure

Create the recommended directory structure:

```
expenseshub-project/
├── .nuxt/                  # Auto-generated (gitignored)
├── .output/                # Build output (gitignored)
├── node_modules/           # Dependencies (gitignored)
├── public/                 # Static assets
│   ├── icon-192x192.png   # PWA icons
│   └── icon-512x512.png
├── server/                 # Backend code
│   ├── api/               # API routes
│   │   ├── transactions/
│   │   │   ├── index.get.ts
│   │   │   ├── index.post.ts
│   │   │   ├── [id].get.ts
│   │   │   ├── [id].patch.ts
│   │   │   └── [id].delete.ts
│   │   ├── categories/
│   │   │   └── ... (similar structure)
│   │   └── settings/
│   │       └── ... (similar structure)
│   ├── models/            # Mongoose models
│   │   ├── Transaction.ts
│   │   ├── Category.ts
│   │   └── Settings.ts
│   ├── utils/             # Server utilities
│   │   ├── db.ts
│   │   └── validation.ts
│   └── plugins/           # Server plugins
│       └── mongodb.ts
├── pages/                 # Vue pages (file-based routing)
│   ├── index.vue          # Landing page
│   ├── charts.vue         # Charts page
│   └── settings.vue       # Settings page
├── components/            # Vue components
│   ├── Transaction/
│   ├── Chart/
│   ├── Category/
│   ├── Modal/
│   └── UI/
├── composables/           # Vue composables
│   ├── useTransactions.ts
│   ├── useCategories.ts
│   ├── useCharts.ts
│   └── useSettings.ts
├── types/                 # TypeScript types
│   └── models.ts
├── assets/                # CSS, images
│   └── css/
│       └── main.css
├── tests/                 # Playwright tests
│   ├── e2e/
│   │   ├── landing.spec.ts
│   │   ├── charts.spec.ts
│   │   └── settings.spec.ts
│   └── fixtures/
│       └── test-data.ts
├── specs/                 # Specification documents
│   └── 002-expenseshub-progressive-web/
│       ├── spec.md
│       ├── plan.md
│       ├── research.md
│       ├── data-model.md
│       ├── quickstart.md
│       └── tasks.md
├── .env                   # Environment variables (gitignored)
├── .eslintrc.js          # ESLint config
├── .prettierrc           # Prettier config
├── .gitignore            # Git ignore rules
├── nuxt.config.ts        # Nuxt configuration
├── package.json          # Dependencies and scripts
├── pnpm-lock.yaml        # Lock file
├── playwright.config.ts  # Playwright config
├── tsconfig.json         # TypeScript config
└── README.md             # Project documentation
```

## 5. Development Workflow

### Start Development Server

```bash
# Start Nuxt dev server
pnpm dev

# Server runs at http://localhost:3000
```

### Run Linting

```bash
# Run ESLint
pnpm lint

# Fix auto-fixable issues
pnpm lint:fix

# Format with Prettier
pnpm format
```

### Run Tests

```bash
# Install Playwright browsers (first time only)
pnpm dlx playwright install

# Run all E2E tests
pnpm test:e2e

# Run tests in headed mode (see browser)
pnpm test:e2e:headed

# Run tests in UI mode (interactive)
pnpm test:e2e:ui

# Run specific test file
pnpm dlx playwright test tests/e2e/landing.spec.ts
```

### Database Operations

```bash
# Initialize database with default data
# This runs automatically on first server start
# Or manually:
pnpm db:init

# View MongoDB data
# Use MongoDB Compass or Atlas web interface
```

## 6. Useful Commands

```bash
# Development
pnpm dev                    # Start dev server
pnpm build                  # Build for production
pnpm preview                # Preview production build
pnpm generate               # Generate static site

# Code Quality
pnpm lint                   # Run ESLint
pnpm lint:fix               # Fix ESLint issues
pnpm format                 # Format code with Prettier
pnpm typecheck              # Type check TypeScript

# Testing
pnpm test:e2e               # Run Playwright tests
pnpm test:e2e:headed        # Run tests with browser visible
pnpm test:e2e:ui            # Run tests in UI mode
pnpm test:e2e:debug         # Debug specific test

# Dependencies
pnpm install                # Install dependencies
pnpm update                 # Update dependencies
pnpm audit                  # Check for vulnerabilities
```

## 7. First-Time Checklist

After setup, verify everything works:

- [ ] MongoDB connection successful (check server logs)
- [ ] Dev server runs without errors
- [ ] Default categories created in database
- [ ] Can navigate to all pages (/, /charts, /settings)
- [ ] ESLint passes with no errors
- [ ] TypeScript compiles without errors
- [ ] Can create a transaction
- [ ] Can view charts
- [ ] Can manage categories
- [ ] Playwright tests run successfully
- [ ] PWA manifest loads correctly

## 8. Troubleshooting

### MongoDB Connection Issues

**Problem:** `MongoNetworkError: failed to connect to server`

**Solutions:**

- Check MongoDB Atlas cluster is running
- Verify IP whitelist includes your current IP
- Check username/password in connection string
- Ensure connection string format is correct

### Port Already in Use

**Problem:** `Port 3000 is already in use`

**Solutions:**

```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Kill process on port 3000 (Mac/Linux)
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 pnpm dev
```

### TypeScript Errors

**Problem:** TypeScript strict mode errors

**Solutions:**

- Ensure all imports have proper types
- Use `as const` for literal types
- Add explicit type annotations
- Check `.nuxt/tsconfig.json` is generated

### Playwright Tests Failing

**Problem:** Tests timeout or fail

**Solutions:**

- Ensure dev server is running
- Clear browser cache: `pnpm dlx playwright install --with-deps`
- Increase timeout in `playwright.config.ts`
- Use `page.pause()` to debug

### PrimeVue Components Not Working

**Problem:** Components not styled or not found

**Solutions:**

- Check PrimeVue CSS is imported in `nuxt.config.ts`
- Verify PrimeVue is in `build.transpile`
- Clear `.nuxt` and restart: `rm -rf .nuxt && pnpm dev`

## 9. Next Steps

Once setup is complete:

1. **Read the specification:** `specs/002-expenseshub-progressive-web/spec.md`
2. **Review the plan:** `specs/002-expenseshub-progressive-web/plan.md`
3. **Check the tasks:** `specs/002-expenseshub-progressive-web/tasks.md`
4. **Start with Phase 1:** Setup and infrastructure tasks
5. **Follow the constitution:** `.specify/memory/constitution.md`

## 10. Resources

### Documentation

- [Nuxt 3 Docs](https://nuxt.com/docs)
- [Vue 3 Docs](https://vuejs.org/)
- [PrimeVue Docs](https://primevue.org/)
- [Playwright Docs](https://playwright.dev/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Mongoose Docs](https://mongoosejs.com/)

### Tools

- [MongoDB Compass](https://www.mongodb.com/products/compass) - MongoDB GUI
- [Postman](https://www.postman.com/) - API testing
- [Playwright Inspector](https://playwright.dev/docs/debug) - Test debugging

### Community

- [Nuxt Discord](https://discord.com/invite/nuxt)
- [Vue Discord](https://discord.com/invite/vue)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/nuxt.js)

---

**Need Help?**

- Check the troubleshooting section above
- Review the specification and plan documents
- Open an issue on GitHub
- Contact the team lead

---

**Quick Start Complete!** 🎉

You're now ready to start development. Happy coding!
