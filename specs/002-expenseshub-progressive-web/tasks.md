# Task Breakdown: ExpensesHub PWA

**Created:** 2025-10-03  
**Project:** ExpensesHub Progressive Web Application  
**Total Tasks:** 130  
**Duration:** 6 weeks (8 milestones)

## Overview

This document provides dependency-ordered, actionable tasks for implementing ExpensesHub PWA. Tasks marked with **[P]** can be executed in parallel. The order follows TDD principles: Tests → Models → Implementation.

**Legend:**

- **[P]** = Can be executed in parallel with other [P] tasks at same level
- **Priority:** Critical | High | Medium | Low
- **Estimate:** Hours
- **File Path:** Exact file to create/modify

## Parallel Execution with Task Agent

Tasks marked [P] can run simultaneously when they modify different files. Example batches:

```bash
# Batch 1: Models (T012, T012b, T012c) - All parallel, different files
Task: Create Transaction model in server/models/Transaction.ts
Task: Create Category model in server/models/Category.ts
Task: Create Settings model in server/models/Settings.ts

# Batch 2: API Routes (T032a-e) - All parallel, different files
Task: Create GET /api/transactions in server/api/transactions/index.get.ts
Task: Create POST /api/transactions in server/api/transactions/index.post.ts
Task: Create PATCH /api/transactions/[id] in server/api/transactions/[id].patch.ts

# Batch 3: Chart Components (T053-T056) - All parallel, different files
Task: Create BarChart component in components/Chart/BarChart.vue
Task: Create PieChart component in components/Chart/PieChart.vue
Task: Create DoughnutChart component in components/Chart/DoughnutChart.vue
Task: Create LineChart component in components/Chart/LineChart.vue
```

**TDD Approach:** Write Playwright tests BEFORE implementing features where possible.

---

## Milestone 1: Project Setup & Infrastructure (Week 1)

**Target Date:** 2025-10-10  
**Total Tasks:** 15

### T001: Initialize Nuxt 3 Project

- **Priority:** Critical
- **Category:** Infrastructure
- **Estimate:** 2h
- **Dependencies:** None
- **File:** `nuxt.config.ts`, `tsconfig.json`, `package.json`
- **Description:** Create Nuxt 3 project with TypeScript strict mode
- **Commands:**
  ```bash
  pnpm dlx nuxi@latest init .
  # Configure TypeScript strict mode
  # Update nuxt.config.ts with initial settings
  ```
- **Acceptance Criteria:**
  - [ ] Nuxt 3 project created with `nuxi init`
  - [ ] TypeScript strict mode enabled in `tsconfig.json`
  - [ ] Project runs with `pnpm dev`
  - [ ] No TypeScript errors
- **Constitutional Compliance:** Code Quality (TypeScript strict)

### T002: Configure MongoDB Connection

- **Priority:** Critical
- **Category:** Infrastructure
- **Estimate:** 3h
- **Dependencies:** T001
- **Description:** Set up MongoDB Atlas cluster and Mongoose connection
- **Acceptance Criteria:**
  - [ ] MongoDB Atlas cluster created (free tier)
  - [ ] Mongoose installed and configured
  - [ ] Connection plugin in `server/plugins/mongodb.ts`
  - [ ] Environment variables configured
  - [ ] Connection successful on server start
- **Constitutional Compliance:** Code Quality (error handling)

### T003: Install PrimeVue with Aura Preset

- **Priority:** Critical
- **Category:** Infrastructure
- **Estimate:** 2h
- **Dependencies:** T001
- **Description:** Install and configure PrimeVue component library
- **Acceptance Criteria:**
  - [ ] PrimeVue and primeicons installed
  - [ ] Aura light theme configured in `nuxt.config.ts`
  - [ ] PrimeVue transpile configured
  - [ ] Test component renders correctly
- **Constitutional Compliance:** UX Consistency (design system)

### T004: Install Chart.js and vue-chartjs

- **Priority:** High
- **Category:** Infrastructure
- **Estimate:** 1h
- **Dependencies:** T001
- **Description:** Install charting libraries for data visualization
- **Acceptance Criteria:**
  - [ ] chart.js and vue-chartjs installed
  - [ ] Transpile configured for Chart.js
  - [ ] Test chart component renders
- **Constitutional Compliance:** Performance (code splitting planned)

### T005: Configure PWA Module

- **Priority:** High
- **Category:** Infrastructure
- **Estimate:** 2h
- **Dependencies:** T001
- **Description:** Install and configure @vite-pwa/nuxt module
- **Acceptance Criteria:**
  - [ ] @vite-pwa/nuxt installed
  - [ ] PWA manifest configured
  - [ ] Service worker configuration added
  - [ ] PWA icons added to public/
  - [ ] Installable on mobile device
- **Constitutional Compliance:** Performance (caching strategy)

### T006: Setup ESLint Configuration

- **Priority:** Critical
- **Category:** Code Quality
- **Estimate:** 1h
- **Dependencies:** T001
- **Description:** Configure ESLint with TypeScript and Vue rules
- **Acceptance Criteria:**
  - [ ] ESLint config file created
  - [ ] TypeScript parser configured
  - [ ] Vue 3 rules enabled
  - [ ] Function size limit (50 lines) enforced
  - [ ] `pnpm lint` command works
- **Constitutional Compliance:** Code Quality (linting enforcement)

### T007: Setup Prettier Configuration

- **Priority:** High
- **Category:** Code Quality
- **Estimate:** 0.5h
- **Dependencies:** T006
- **Description:** Configure Prettier for consistent formatting
- **Acceptance Criteria:**
  - [ ] Prettier config file created
  - [ ] ESLint-Prettier integration configured
  - [ ] `pnpm format` command works
  - [ ] VS Code format-on-save enabled
- **Constitutional Compliance:** Code Quality (formatting)

### T008: Configure Git Hooks

- **Priority:** Medium
- **Category:** Code Quality
- **Estimate:** 1h
- **Dependencies:** T006, T007
- **Description:** Setup pre-commit hooks for linting and formatting
- **Acceptance Criteria:**
  - [ ] Husky or simple-git-hooks installed
  - [ ] Pre-commit hook runs ESLint
  - [ ] Pre-commit hook runs Prettier
  - [ ] Pre-commit hook runs TypeScript check
  - [ ] Cannot commit with errors
- **Constitutional Compliance:** Code Quality (enforcement)

### T009: Setup Playwright Framework

- **Priority:** Critical
- **Category:** Testing
- **Estimate:** 2h
- **Dependencies:** T001
- **Description:** Install and configure Playwright for E2E testing
- **Acceptance Criteria:**
  - [ ] @playwright/test installed
  - [ ] Playwright config file created
  - [ ] Browsers installed (Chromium, Firefox, WebKit)
  - [ ] Test directory structure created
  - [ ] Sample test passes
- **Constitutional Compliance:** Testing Standards (Playwright exclusively)

### T010: Create Design Tokens

- **Priority:** High
- **Category:** UX Enhancement
- **Estimate:** 3h
- **Dependencies:** T003
- **Description:** Extract design tokens from SVG specifications
- **Acceptance Criteria:**
  - [ ] Color palette defined (CSS variables)
  - [ ] Typography scale defined
  - [ ] Spacing scale defined (8px grid)
  - [ ] Tokens file in `assets/css/tokens.css`
  - [ ] Tokens documented
- **Constitutional Compliance:** UX Consistency (design system)

### T011: Create Base Styles

- **Priority:** Medium
- **Category:** UX Enhancement
- **Estimate:** 2h
- **Dependencies:** T010
- **Description:** Set up base CSS with reset and global styles
- **Acceptance Criteria:**
  - [ ] CSS reset applied
  - [ ] Inter font loaded
  - [ ] Global styles for body, headings
  - [ ] Base styles in `assets/css/main.css`
- **Constitutional Compliance:** UX Consistency (typography)

### T012: [P] Create Transaction Model

- **Priority:** Critical
- **Category:** Infrastructure
- **Estimate:** 1.5h
- **Dependencies:** T002
- **File:** `server/models/Transaction.ts`
- **Description:** Define Mongoose schema for Transaction with validation
- **Acceptance Criteria:**
  - [ ] ITransaction interface defined
  - [ ] TransactionSchema with all fields and validation
  - [ ] Indexes: date, categoryId, type
  - [ ] Virtual for formattedAmount
  - [ ] JSDoc comments
- **Constitutional Compliance:** Code Quality (type safety, documentation)

### T012b: [P] Create Category Model

- **Priority:** Critical
- **Category:** Infrastructure
- **Estimate:** 1.5h
- **Dependencies:** T002
- **File:** `server/models/Category.ts`
- **Description:** Define Mongoose schema for Category with validation
- **Acceptance Criteria:**
  - [ ] ICategory interface defined
  - [ ] CategorySchema with all fields and validation
  - [ ] Indexes: type, order
  - [ ] Unique constraint on name+type
  - [ ] JSDoc comments
- **Constitutional Compliance:** Code Quality (type safety, documentation)

### T012c: [P] Create Settings Model

- **Priority:** Critical
- **Category:** Infrastructure
- **Estimate:** 1h
- **Dependencies:** T002
- **File:** `server/models/Settings.ts`
- **Description:** Define Mongoose schema for Settings
- **Acceptance Criteria:**
  - [ ] ISettings interface defined
  - [ ] SettingsSchema with defaults
  - [ ] Enum validation for all fields
  - [ ] JSDoc comments
- **Constitutional Compliance:** Code Quality (type safety, documentation)

### T013: Create Database Initialization Script

- **Priority:** High
- **Category:** Infrastructure
- **Estimate:** 2h
- **Dependencies:** T012, T012b, T012c
- **File:** `server/utils/initDatabase.ts`, `server/plugins/mongodb.ts`
- **Description:** Script to initialize database with default categories
- **Commands:**
  ```typescript
  // Create default expense categories: Food, Transport, Bills, Shopping, Other
  // Create default income categories: Salary, Freelance, Gifts, Other
  // Create default settings
  // Make idempotent (check before inserting)
  ```
- **Acceptance Criteria:**
  - [ ] Default expense categories created (5 categories with icons/colors)
  - [ ] Default income categories created (4 categories with icons/colors)
  - [ ] Default settings created
  - [ ] Idempotent (safe to run multiple times)
  - [ ] Runs automatically on server start
  - [ ] Logs success/failure clearly
- **Constitutional Compliance:** Code Quality (error handling)

### T014: Setup CI/CD Pipeline

- **Priority:** Medium
- **Category:** Infrastructure
- **Estimate:** 3h
- **Dependencies:** T006, T007, T009
- **Description:** Configure GitHub Actions for automated testing
- **Acceptance Criteria:**
  - [ ] GitHub Actions workflow file created
  - [ ] Runs on push and PR
  - [ ] Executes lint checks
  - [ ] Executes type checks
  - [ ] Executes Playwright tests
  - [ ] Fails PR if tests fail
- **Constitutional Compliance:** Testing Standards (CI integration)

### T015: Create Project Documentation

- **Priority:** Medium
- **Category:** Documentation
- **Estimate:** 2h
- **Dependencies:** T001-T014
- **Description:** Write comprehensive README with setup instructions
- **Acceptance Criteria:**
  - [ ] README with project overview
  - [ ] Setup instructions
  - [ ] Development commands
  - [ ] Testing instructions
  - [ ] Contributing guidelines
- **Constitutional Compliance:** Code Quality (documentation)

---

## Milestone 2: Core Components & Design System (Week 1-2)

**Target Date:** 2025-10-17  
**Total Tasks:** 15

### T016: [P] Create Button Component

- **Priority:** High
- **Category:** Feature Development
- **Estimate:** 2h
- **Dependencies:** T010
- **File:** `components/UI/Button.vue`
- **Description:** Reusable button component with variants
- **Acceptance Criteria:**
  - [ ] Props: variant (primary/secondary/danger), loading, disabled
  - [ ] 44px height (constitutional touch target requirement)
  - [ ] Disabled and loading states
  - [ ] Emits @click event
  - [ ] role="button", proper aria-labels
- **Constitutional Compliance:** UX Consistency, Accessibility

### T017: [P] Create Input Component

- **Priority:** High
- **Category:** Feature Development
- **Estimate:** 2h
- **Dependencies:** T010
- **File:** `components/UI/Input.vue`
- **Description:** Reusable input field component
- **Acceptance Criteria:**
  - [ ] Props: type, label, error, placeholder, modelValue
  - [ ] 48px height, proper focus styles
  - [ ] Error state display
  - [ ] v-model support, emits update:modelValue
  - [ ] aria-label, aria-describedby for errors
- **Constitutional Compliance:** UX Consistency, Accessibility

### T018: [P] Create Dropdown Component

- **Priority:** High
- **Category:** Feature Development
- **Estimate:** 2h
- **Dependencies:** T010
- **File:** `components/UI/Dropdown.vue` (or use PrimeVue Dropdown directly)
- **Description:** Dropdown/select component wrapping PrimeVue
- **Acceptance Criteria:**
  - [ ] Wrap PrimeVue Dropdown with custom styling
  - [ ] Props: options, modelValue, placeholder
  - [ ] Keyboard navigation (Tab, Arrow keys)
  - [ ] aria-label, proper semantics
- **Constitutional Compliance:** UX Consistency, Accessibility

### T019: [P] Create Card Component

- **Priority:** Medium
- **Category:** Feature Development
- **Estimate:** 1h
- **Dependencies:** T010
- **File:** `components/UI/Card.vue`
- **Description:** Card container component
- **Acceptance Criteria:**
  - [ ] 12px border radius, white background
  - [ ] Consistent 16px padding
  - [ ] Optional shadow prop
  - [ ] Slot for content
- **Constitutional Compliance:** UX Consistency

### T020: Create Modal Base Component

- **Priority:** Critical
- **Category:** Feature Development
- **Estimate:** 4h
- **Dependencies:** T016, T010
- **Description:** Base modal component with overlay
- **Acceptance Criteria:**
  - [ ] Semi-transparent overlay (50% black)
  - [ ] Center positioning
  - [ ] Close button (X)
  - [ ] ESC key closes
  - [ ] Click outside closes (optional)
  - [ ] Focus trap
  - [ ] Smooth animations
  - [ ] ARIA role="dialog"
- **Constitutional Compliance:** UX Consistency, Accessibility

### T021: Create Add Transaction Modal

- **Priority:** Critical
- **Category:** Feature Development
- **Estimate:** 5h
- **Dependencies:** T020, T017, T018
- **Description:** Modal for adding/editing transactions
- **Acceptance Criteria:**
  - [ ] Type toggle (Expense/Income)
  - [ ] Amount input with € symbol
  - [ ] Category dropdown
  - [ ] Description input (optional)
  - [ ] Cancel and Save buttons
  - [ ] Form validation
  - [ ] Error messages
  - [ ] Matches SVG design
- **Constitutional Compliance:** UX Consistency, Testing Standards (E2E tests required)

### T022: Create Delete Confirmation Modal

- **Priority:** High
- **Category:** Feature Development
- **Estimate:** 2h
- **Dependencies:** T020, T016
- **Description:** Confirmation modal for destructive actions
- **Acceptance Criteria:**
  - [ ] Warning icon (red)
  - [ ] Clear message
  - [ ] Cancel and Delete buttons
  - [ ] Delete button is red
  - [ ] Matches SVG design
- **Constitutional Compliance:** UX Consistency

### T023: Create Export CSV Modal

- **Priority:** Medium
- **Category:** Feature Development
- **Estimate:** 3h
- **Dependencies:** T020, T016
- **Description:** Modal for CSV export configuration
- **Acceptance Criteria:**
  - [ ] Export icon
  - [ ] Period selector (Monthly/Yearly)
  - [ ] Cancel and Export buttons
  - [ ] Matches SVG design
- **Constitutional Compliance:** UX Consistency

### T024: Create Period Selector Component

- **Priority:** Critical
- **Category:** Feature Development
- **Estimate:** 3h
- **Dependencies:** T016, T010
- **Description:** Toggle button group for period selection
- **Acceptance Criteria:**
  - [ ] Options configurable (3 or 4 options)
  - [ ] Active state styling (green)
  - [ ] Inactive state styling (gray)
  - [ ] Emits change event
  - [ ] Keyboard navigation
  - [ ] Reusable across pages
- **Constitutional Compliance:** UX Consistency, Code Quality (SRP)

### T025: Create Category Icon Component

- **Priority:** Medium
- **Category:** Feature Development
- **Estimate:** 2h
- **Dependencies:** T010
- **Description:** Component to display category icon with background
- **Acceptance Criteria:**
  - [ ] Circular background
  - [ ] Category color background
  - [ ] Emoji or icon support
  - [ ] Size variants
  - [ ] Accessible (aria-label)
- **Constitutional Compliance:** UX Consistency, Accessibility

### T026: Create Transaction List Item Component

- **Priority:** Critical
- **Category:** Feature Development
- **Estimate:** 4h
- **Dependencies:** T025, T016
- **Description:** Component for displaying single transaction
- **Acceptance Criteria:**
  - [ ] Category icon
  - [ ] Category name
  - [ ] Description
  - [ ] Formatted amount (€XX.XX)
  - [ ] Edit button
  - [ ] Delete button
  - [ ] Amount color (red for expense, green for income)
  - [ ] Matches SVG design
  - [ ] < 50 lines of code
- **Constitutional Compliance:** Code Quality (SRP, function size), UX Consistency

### T027: Create Layout Component

- **Priority:** High
- **Category:** Feature Development
- **Estimate:** 3h
- **Dependencies:** T010
- **Description:** Main layout with header and bottom navigation
- **Acceptance Criteria:**
  - [ ] Header with page title
  - [ ] Settings icon (top-right)
  - [ ] Bottom navigation bar
  - [ ] Home and Charts tabs
  - [ ] Center FAB button
  - [ ] Active state indicators
  - [ ] Fixed positioning
  - [ ] Responsive layout
- **Constitutional Compliance:** UX Consistency

### T028: Create Loading Skeleton Component

- **Priority:** Medium
- **Category:** UX Enhancement
- **Estimate:** 2h
- **Dependencies:** T010
- **Description:** Skeleton screens for loading states
- **Acceptance Criteria:**
  - [ ] Transaction list skeleton
  - [ ] Card skeleton
  - [ ] Smooth animation
  - [ ] Accessible (aria-busy)
- **Constitutional Compliance:** UX Consistency (loading states)

### T029: Setup Responsive Breakpoints

- **Priority:** High
- **Category:** UX Enhancement
- **Estimate:** 2h
- **Dependencies:** T010
- **Description:** Define and implement responsive CSS breakpoints
- **Acceptance Criteria:**
  - [ ] Mobile: 320px-767px
  - [ ] Tablet: 768px-1023px
  - [ ] Desktop: 1024px+
  - [ ] CSS variables for breakpoints
  - [ ] Utility composable for screen size
- **Constitutional Compliance:** UX Consistency (responsive design)

### T030: Accessibility Audit - Components

- **Priority:** High
- **Category:** UX Enhancement
- **Estimate:** 3h
- **Dependencies:** T016-T028
- **Description:** Audit all components for WCAG 2.1 AA compliance
- **Acceptance Criteria:**
  - [ ] Color contrast verified
  - [ ] Keyboard navigation tested
  - [ ] Screen reader tested
  - [ ] ARIA labels added
  - [ ] Focus indicators visible
  - [ ] Documentation updated
- **Constitutional Compliance:** UX Consistency (accessibility)

---

## Milestone 3: Landing Page Implementation (Week 2-3)

**Target Date:** 2025-10-24  
**Total Tasks:** 20

### T031: Create Transaction Composable

- **Priority:** Critical
- **Category:** Feature Development
- **Estimate:** 4h
- **Dependencies:** T012
- **Description:** Composable for transaction CRUD operations
- **Acceptance Criteria:**
  - [ ] fetchTransactions(filter)
  - [ ] addTransaction(data)
  - [ ] updateTransaction(id, data)
  - [ ] deleteTransaction(id)
  - [ ] State management with useState
  - [ ] Error handling
  - [ ] TypeScript types
  - [ ] JSDoc documentation
- **Constitutional Compliance:** Code Quality (documentation, error handling)

### T032: [P] Create API Route - Get Transactions

- **Priority:** Critical
- **Category:** Feature Development
- **Estimate:** 2h
- **Dependencies:** T012, T012b
- **File:** `server/api/transactions/index.get.ts`
- **Description:** API endpoint to fetch transactions with filtering
- **Acceptance Criteria:**
  - [ ] GET /api/transactions with query params
  - [ ] Parse startDate, endDate, type from query
  - [ ] MongoDB query using indexes
  - [ ] Populate categoryId
  - [ ] Sort by date desc
  - [ ] Error handling with try-catch
  - [ ] Returns Transaction[]
- **Constitutional Compliance:** Code Quality, Performance (query optimization)

### T033: [P] Create API Route - Create Transaction

- **Priority:** Critical
- **Category:** Feature Development
- **Estimate:** 2h
- **Dependencies:** T012
- **File:** `server/api/transactions/index.post.ts`
- **Description:** API endpoint to create new transaction
- **Acceptance Criteria:**
  - [ ] POST /api/transactions
  - [ ] Zod schema validation (amount, categoryId, type, date)
  - [ ] Create in MongoDB using Transaction.create()
  - [ ] Return created transaction with 201 status
  - [ ] Error handling (400 for validation, 500 for server)
- **Constitutional Compliance:** Code Quality (validation, error handling)

### T034: [P] Create API Route - Update Transaction

- **Priority:** High
- **Category:** Feature Development
- **Estimate:** 1.5h
- **Dependencies:** T012
- **File:** `server/api/transactions/[id].patch.ts`
- **Description:** API endpoint to update transaction
- **Acceptance Criteria:**
  - [ ] PATCH /api/transactions/:id
  - [ ] Zod validation for updates
  - [ ] findByIdAndUpdate in MongoDB
  - [ ] Return updated transaction
  - [ ] 404 if not found, 400 for validation
- **Constitutional Compliance:** Code Quality

### T035: [P] Create API Route - Delete Transaction

- **Priority:** High
- **Category:** Feature Development
- **Estimate:** 1.5h
- **Dependencies:** T012
- **File:** `server/api/transactions/[id].delete.ts`
- **Description:** API endpoint to delete transaction
- **Acceptance Criteria:**
  - [ ] DELETE /api/transactions/:id
  - [ ] findByIdAndDelete in MongoDB
  - [ ] 204 No Content on success
  - [ ] 404 if not found
  - [ ] Error handling
- **Constitutional Compliance:** Code Quality

### T036: Implement Available Money Card

- **Priority:** Critical
- **Category:** Feature Development
- **Estimate:** 3h
- **Dependencies:** T031, T019
- **Description:** Card displaying available money calculation
- **Acceptance Criteria:**
  - [ ] Calculation: Incomes - Expenses
  - [ ] Large, bold display
  - [ ] € symbol
  - [ ] Two decimal precision
  - [ ] Color: green (positive), red (negative)
  - [ ] Label: "Available this month"
  - [ ] Updates in real-time
- **Constitutional Compliance:** UX Consistency

### T037: Implement Period Selector on Landing

- **Priority:** High
- **Category:** Feature Development
- **Estimate:** 2h
- **Dependencies:** T024, T031
- **Description:** Integrate period selector on landing page
- **Acceptance Criteria:**
  - [ ] Options: Weekly, Monthly, Yearly
  - [ ] Monthly default
  - [ ] Updates all page data on change
  - [ ] State persisted in session
- **Constitutional Compliance:** UX Consistency

### T038: Integrate vue-chartjs Doughnut Chart

- **Priority:** Critical
- **Category:** Feature Development
- **Estimate:** 5h
- **Dependencies:** T004, T031
- **Description:** Implement doughnut chart for category breakdown
- **Acceptance Criteria:**
  - [ ] Doughnut chart component
  - [ ] Data from transactions by category
  - [ ] Category colors from design system
  - [ ] Legend with percentages
  - [ ] Toggle between Expenses/Incomes
  - [ ] Responsive sizing
  - [ ] Accessible (aria-label)
- **Constitutional Compliance:** UX Consistency, Accessibility

### T039: Implement Transaction List

- **Priority:** Critical
- **Category:** Feature Development
- **Estimate:** 4h
- **Dependencies:** T026, T031
- **Description:** List component with date grouping
- **Acceptance Criteria:**
  - [ ] Sorted by date (newest first)
  - [ ] Grouped by date headers (Today, Yesterday, Oct 1)
  - [ ] Uses TransactionListItem component
  - [ ] Scrollable list
  - [ ] Loading skeleton
  - [ ] Empty state message
- **Constitutional Compliance:** UX Consistency (loading states)

### T040: Implement Add Transaction Flow

- **Priority:** Critical
- **Category:** Feature Development
- **Estimate:** 4h
- **Dependencies:** T021, T031
- **Description:** Complete flow for adding transaction
- **Acceptance Criteria:**
  - [ ] FAB button opens modal
  - [ ] Form validation
  - [ ] Optimistic update
  - [ ] Success message
  - [ ] Error handling
  - [ ] Modal closes on success
  - [ ] Transaction appears in list
- **Constitutional Compliance:** UX Consistency (optimistic updates, feedback)

### T041: Implement Edit Transaction Flow

- **Priority:** High
- **Category:** Feature Development
- **Estimate:** 3h
- **Dependencies:** T021, T031
- **Description:** Edit existing transaction
- **Acceptance Criteria:**
  - [ ] Edit button opens modal
  - [ ] Pre-fills form with existing data
  - [ ] Updates transaction on save
  - [ ] Optimistic update
  - [ ] Success feedback
- **Constitutional Compliance:** UX Consistency

### T042: Implement Delete Transaction Flow

- **Priority:** High
- **Category:** Feature Development
- **Estimate:** 3h
- **Dependencies:** T022, T031
- **Description:** Delete transaction with confirmation
- **Acceptance Criteria:**
  - [ ] Delete button opens confirmation
  - [ ] Confirmation modal shows warning
  - [ ] Deletes on confirm
  - [ ] Optimistic update
  - [ ] Success feedback
- **Constitutional Compliance:** UX Consistency

### T043: Create CSV Export Service

- **Priority:** Medium
- **Category:** Feature Development
- **Estimate:** 4h
- **Dependencies:** T031
- **Description:** Service to generate CSV from transactions
- **Acceptance Criteria:**
  - [ ] Format: date, type, category, description, amount
  - [ ] Proper CSV escaping
  - [ ] Downloads as file
  - [ ] Filename with date
  - [ ] Works with filtered data
- **Constitutional Compliance:** Code Quality (function size, documentation)

### T044: Implement Export CSV Flow

- **Priority:** Medium
- **Category:** Feature Development
- **Estimate:** 3h
- **Dependencies:** T023, T043
- **Description:** Complete CSV export flow
- **Acceptance Criteria:**
  - [ ] Export button opens modal
  - [ ] Period selection (Monthly/Yearly)
  - [ ] Export generates CSV
  - [ ] File downloads automatically
  - [ ] Success feedback
- **Constitutional Compliance:** UX Consistency

### T045: Add Form Validation

- **Priority:** High
- **Category:** Code Quality
- **Estimate:** 3h
- **Dependencies:** T021
- **Description:** Comprehensive client-side validation
- **Acceptance Criteria:**
  - [ ] Amount required, positive, max 2 decimals
  - [ ] Category required
  - [ ] Description max 200 chars
  - [ ] Date required, valid
  - [ ] Error messages user-friendly
  - [ ] Prevents submission if invalid
- **Constitutional Compliance:** Code Quality (error handling), UX Consistency

### T046: Implement Error Handling - Landing

- **Priority:** High
- **Category:** Code Quality
- **Estimate:** 2h
- **Dependencies:** T031-T035
- **Description:** Comprehensive error handling for landing page
- **Acceptance Criteria:**
  - [ ] API errors caught and displayed
  - [ ] Network errors handled
  - [ ] User-friendly error messages
  - [ ] Retry options where appropriate
  - [ ] Error boundaries
- **Constitutional Compliance:** Code Quality (error handling), UX Consistency

### T047: Add Loading States - Landing

- **Priority:** Medium
- **Category:** UX Enhancement
- **Estimate:** 2h
- **Dependencies:** T028, T036-T044
- **Description:** Loading indicators for all async operations
- **Acceptance Criteria:**
  - [ ] Skeleton screens for list
  - [ ] Button loading states
  - [ ] Chart loading indicator
  - [ ] > 200ms operations show loading
  - [ ] Accessible (aria-busy, aria-live)
- **Constitutional Compliance:** UX Consistency (loading states), Accessibility

### T048: Optimize Landing Page Performance

- **Priority:** Medium
- **Category:** Performance
- **Estimate:** 3h
- **Dependencies:** T036-T044
- **Description:** Performance optimization for landing page
- **Acceptance Criteria:**
  - [ ] Lazy load chart component
  - [ ] Virtualize list if > 100 items
  - [ ] Debounce search/filter inputs
  - [ ] Memoize computed values
  - [ ] Optimize re-renders
  - [ ] Meet Core Web Vitals targets
- **Constitutional Compliance:** Performance Requirements

### T049: Write Playwright Tests - Landing (Add Transaction)

- **Priority:** Critical
- **Category:** Testing
- **Estimate:** 4h
- **Dependencies:** T040
- **Description:** E2E tests for add transaction flow
- **Acceptance Criteria:**
  - [ ] Test: Add expense transaction
  - [ ] Test: Add income transaction
  - [ ] Test: Form validation errors
  - [ ] Test: Cancel button
  - [ ] Page Object Model pattern
  - [ ] Tests pass on all 3 browsers
- **Constitutional Compliance:** Testing Standards (Playwright, POM)

### T050: Write Playwright Tests - Landing (Edit/Delete)

- **Priority:** Critical
- **Category:** Testing
- **Estimate:** 4h
- **Dependencies:** T041, T042
- **Description:** E2E tests for edit/delete flows
- **Acceptance Criteria:**
  - [ ] Test: Edit transaction
  - [ ] Test: Delete transaction with confirmation
  - [ ] Test: Cancel delete
  - [ ] Test: Period filtering
  - [ ] Tests pass on all 3 browsers
- **Constitutional Compliance:** Testing Standards

---

## Milestone 4: Charts Page Implementation (Week 3)

**Target Date:** 2025-10-31  
**Total Tasks:** 15

### T051: Create Charts Composable

- **Priority:** Critical
- **Category:** Feature Development
- **Estimate:** 4h
- **Dependencies:** T031
- **Description:** Composable for chart data processing
- **Acceptance Criteria:**
  - [ ] processCategoryBreakdown(transactions)
  - [ ] calculateTotals(transactions)
  - [ ] formatChartData(data, type)
  - [ ] TypeScript types
  - [ ] JSDoc documentation
- **Constitutional Compliance:** Code Quality

### T052: Create API Route - Chart Data

- **Priority:** High
- **Category:** Feature Development
- **Estimate:** 3h
- **Dependencies:** T012
- **Description:** Optimized endpoint for chart data
- **Acceptance Criteria:**
  - [ ] GET /api/charts/breakdown
  - [ ] Query params: startDate, endDate, type
  - [ ] MongoDB aggregation pipeline
  - [ ] Returns category totals and percentages
  - [ ] Cached for 5 minutes
- **Constitutional Compliance:** Performance (query optimization)

### T053: [P] Create Bar Chart Component

- **Priority:** Critical
- **Category:** Feature Development
- **Estimate:** 3h
- **Dependencies:** T004, T051
- **File:** `components/Chart/BarChart.vue`
- **Description:** Bar chart component with vue-chartjs
- **Acceptance Criteria:**
  - [ ] Import Bar from vue-chartjs
  - [ ] Category colors from design system
  - [ ] Y-axis: amounts with € symbol
  - [ ] X-axis: category names
  - [ ] Grid lines, responsive sizing
  - [ ] Tooltips with formatted values
  - [ ] aria-label describing chart data
- **Constitutional Compliance:** UX Consistency, Accessibility

### T054: [P] Create Pie Chart Component

- **Priority:** High
- **Category:** Feature Development
- **Estimate:** 2.5h
- **Dependencies:** T004, T051
- **File:** `components/Chart/PieChart.vue`
- **Description:** Pie chart component
- **Acceptance Criteria:**
  - [ ] Import Pie from vue-chartjs
  - [ ] Category colors and labels
  - [ ] Legend with percentages
  - [ ] Tooltips, responsive sizing
  - [ ] aria-label describing chart
- **Constitutional Compliance:** UX Consistency, Accessibility

### T055: [P] Create Doughnut Chart Component

- **Priority:** High
- **Category:** Feature Development
- **Estimate:** 2.5h
- **Dependencies:** T004, T051
- **File:** `components/Chart/DoughnutChart.vue`
- **Description:** Doughnut chart component (pie with center hole)
- **Acceptance Criteria:**
  - [ ] Import Doughnut from vue-chartjs
  - [ ] Same features as pie chart
  - [ ] Center cutout configuration
  - [ ] Responsive, accessible
- **Constitutional Compliance:** UX Consistency, Accessibility

### T056: [P] Create Line Chart Component

- **Priority:** High
- **Category:** Feature Development
- **Estimate:** 3h
- **Dependencies:** T004, T051
- **File:** `components/Chart/LineChart.vue`
- **Description:** Line chart component for trends over time
- **Acceptance Criteria:**
  - [ ] Import Line from vue-chartjs
  - [ ] X-axis: dates, Y-axis: amounts
  - [ ] Category colors for multiple lines
  - [ ] Grid lines, responsive
  - [ ] Tooltips, accessible
- **Constitutional Compliance:** UX Consistency, Accessibility

### T057: Create Dynamic Chart Container

- **Priority:** Critical
- **Category:** Feature Development
- **Estimate:** 3h
- **Dependencies:** T053-T056
- **Description:** Container that switches between chart types
- **Acceptance Criteria:**
  - [ ] Renders selected chart type
  - [ ] Smooth transitions
  - [ ] Fixed height container
  - [ ] Loading state
  - [ ] Empty state
  - [ ] Proper cleanup on unmount
- **Constitutional Compliance:** UX Consistency (loading states), Performance (CLS)

### T058: Implement Period Selector on Charts (4 options)

- **Priority:** High
- **Category:** Feature Development
- **Estimate:** 2h
- **Dependencies:** T024, T051
- **Description:** Period selector with Daily/Weekly/Monthly/Yearly
- **Acceptance Criteria:**
  - [ ] 4 options displayed
  - [ ] Monthly default
  - [ ] Updates chart data
  - [ ] State persisted
- **Constitutional Compliance:** UX Consistency

### T059: Implement Data Type Selector

- **Priority:** High
- **Category:** Feature Development
- **Estimate:** 2h
- **Dependencies:** T024, T051
- **Description:** Toggle between Expenses and Incomes
- **Acceptance Criteria:**
  - [ ] 2 options: Expenses (default), Incomes
  - [ ] Updates chart data
  - [ ] Visual active state
- **Constitutional Compliance:** UX Consistency

### T060: Implement Chart Type Selector

- **Priority:** High
- **Category:** Feature Development
- **Estimate:** 2h
- **Dependencies:** T024, T057
- **Description:** Selector for 4 chart types
- **Acceptance Criteria:**
  - [ ] 4 options: Bar (default), Pie, Doughnut, Line
  - [ ] Updates chart rendering
  - [ ] Visual active state
- **Constitutional Compliance:** UX Consistency

### T061: Create Charts Page

- **Priority:** Critical
- **Category:** Feature Development
- **Estimate:** 3h
- **Dependencies:** T057-T060
- **Description:** Complete charts page with all selectors
- **Acceptance Criteria:**
  - [ ] Period selector at top
  - [ ] Data type selector
  - [ ] Chart type selector
  - [ ] Dynamic chart display
  - [ ] Page title shows period and data type
  - [ ] Matches SVG design
- **Constitutional Compliance:** UX Consistency

### T062: Add Error Handling - Charts

- **Priority:** High
- **Category:** Code Quality
- **Estimate:** 2h
- **Dependencies:** T051, T052
- **Description:** Error handling for charts page
- **Acceptance Criteria:**
  - [ ] API errors caught
  - [ ] User-friendly messages
  - [ ] Retry options
  - [ ] Empty state handling
- **Constitutional Compliance:** Code Quality (error handling)

### T063: Optimize Charts Performance

- **Priority:** High
- **Category:** Performance
- **Estimate:** 3h
- **Dependencies:** T057-T061
- **Description:** Performance optimization for charts
- **Acceptance Criteria:**
  - [ ] Lazy load chart components
  - [ ] Memoize chart data processing
  - [ ] Debounce selector changes
  - [ ] Canvas optimization
  - [ ] Meet performance targets
- **Constitutional Compliance:** Performance Requirements

### T064: Write Playwright Tests - Charts (Type Switching)

- **Priority:** Critical
- **Category:** Testing
- **Estimate:** 3h
- **Dependencies:** T061
- **Description:** E2E tests for chart type switching
- **Acceptance Criteria:**
  - [ ] Test: Switch between chart types
  - [ ] Test: Data persists across types
  - [ ] Test: All chart types render correctly
  - [ ] Page Object Model
  - [ ] Tests pass on all browsers
- **Constitutional Compliance:** Testing Standards

### T065: Write Playwright Tests - Charts (Data Filtering)

- **Priority:** Critical
- **Category:** Testing
- **Estimate:** 3h
- **Dependencies:** T061
- **Description:** E2E tests for data filtering
- **Acceptance Criteria:**
  - [ ] Test: Switch between Expenses/Incomes
  - [ ] Test: Change period selection
  - [ ] Test: Chart updates correctly
  - [ ] Tests pass on all browsers
- **Constitutional Compliance:** Testing Standards

---

## Milestone 5: Settings Page Implementation (Week 4)

**Target Date:** 2025-11-07  
**Total Tasks:** 15

### T066: Create Categories Composable

- **Priority:** Critical
- **Category:** Feature Development
- **Estimate:** 4h
- **Dependencies:** T012
- **Description:** Composable for category CRUD operations
- **Acceptance Criteria:**
  - [ ] fetchCategories(type)
  - [ ] addCategory(data)
  - [ ] updateCategory(id, data)
  - [ ] deleteCategory(id)
  - [ ] checkCategoryUsage(id)
  - [ ] TypeScript types
  - [ ] JSDoc documentation
- **Constitutional Compliance:** Code Quality

### T067: Create API Routes - Categories

- **Priority:** Critical
- **Category:** Feature Development
- **Estimate:** 4h
- **Dependencies:** T012
- **Description:** CRUD API endpoints for categories
- **Acceptance Criteria:**
  - [ ] GET /api/categories (with type filter)
  - [ ] POST /api/categories
  - [ ] PATCH /api/categories/[id]
  - [ ] DELETE /api/categories/[id]
  - [ ] Validation with Zod
  - [ ] Error handling
  - [ ] Check usage before delete
- **Constitutional Compliance:** Code Quality

### T068: Create Settings Composable

- **Priority:** High
- **Category:** Feature Development
- **Estimate:** 2h
- **Dependencies:** T012
- **Description:** Composable for settings operations
- **Acceptance Criteria:**
  - [ ] fetchSettings()
  - [ ] updateSettings(data)
  - [ ] TypeScript types
  - [ ] JSDoc documentation
- **Constitutional Compliance:** Code Quality

### T069: Create API Routes - Settings

- **Priority:** High
- **Category:** Feature Development
- **Estimate:** 2h
- **Dependencies:** T012
- **Description:** API endpoints for settings
- **Acceptance Criteria:**
  - [ ] GET /api/settings
  - [ ] PATCH /api/settings
  - [ ] Creates default if not exists
  - [ ] Validation
- **Constitutional Compliance:** Code Quality

### T070: Create Category List Component

- **Priority:** Critical
- **Category:** Feature Development
- **Estimate:** 4h
- **Dependencies:** T066, T025, T016
- **Description:** Component to display category list
- **Acceptance Criteria:**
  - [ ] Displays all categories of type
  - [ ] Shows icon, name, color
  - [ ] Edit and delete buttons
  - [ ] Sorted by order
  - [ ] - Add Category button
  - [ ] Empty state
- **Constitutional Compliance:** UX Consistency

### T071: Create Category Edit Modal

- **Priority:** Critical
- **Category:** Feature Development
- **Estimate:** 4h
- **Dependencies:** T020, T017, T066
- **Description:** Modal for adding/editing categories
- **Acceptance Criteria:**
  - [ ] Name input (1-30 chars)
  - [ ] Icon picker (emojis)
  - [ ] Color picker (hex colors)
  - [ ] Type selection (if new)
  - [ ] Order input
  - [ ] Validation
  - [ ] Save and Cancel buttons
- **Constitutional Compliance:** UX Consistency

### T072: Implement Expense Categories Section

- **Priority:** Critical
- **Category:** Feature Development
- **Estimate:** 3h
- **Dependencies:** T070, T071
- **Description:** Complete expense categories management
- **Acceptance Criteria:**
  - [ ] Section labeled "EXPENSE CATEGORIES"
  - [ ] List of expense categories
  - [ ] Add, edit, delete functionality
  - [ ] Delete confirmation
  - [ ] Prevent delete if in use
  - [ ] Matches SVG design
- **Constitutional Compliance:** UX Consistency

### T073: Implement Income Categories Section

- **Priority:** Critical
- **Category:** Feature Development
- **Estimate:** 3h
- **Dependencies:** T070, T071
- **Description:** Complete income categories management
- **Acceptance Criteria:**
  - [ ] Section labeled "INCOME CATEGORIES"
  - [ ] List of income categories
  - [ ] Add, edit, delete functionality
  - [ ] Delete confirmation
  - [ ] Prevent delete if in use
  - [ ] Matches SVG design
- **Constitutional Compliance:** UX Consistency

### T074: Create Default Options Form

- **Priority:** High
- **Category:** Feature Development
- **Estimate:** 3h
- **Dependencies:** T068, T018
- **Description:** Form for user preferences
- **Acceptance Criteria:**
  - [ ] Default Period dropdown
  - [ ] Default Chart Type dropdown
  - [ ] Default Data View (optional)
  - [ ] Auto-save on change
  - [ ] Success feedback
  - [ ] Matches SVG design
- **Constitutional Compliance:** UX Consistency

### T075: Implement Settings Page

- **Priority:** Critical
- **Category:** Feature Development
- **Estimate:** 3h
- **Dependencies:** T072-T074
- **Description:** Complete settings page
- **Acceptance Criteria:**
  - [ ] Expense categories section
  - [ ] Income categories section
  - [ ] Default options section
  - [ ] Proper spacing and layout
  - [ ] Scrollable if content overflows
  - [ ] Matches SVG design
- **Constitutional Compliance:** UX Consistency

### T076: Implement Category Drag-and-Drop Reordering

- **Priority:** Low
- **Category:** UX Enhancement
- **Estimate:** 4h
- **Dependencies:** T070
- **Description:** Allow users to reorder categories by dragging
- **Acceptance Criteria:**
  - [ ] Drag handle on category items
  - [ ] Visual feedback during drag
  - [ ] Updates order on drop
  - [ ] Saves to database
  - [ ] Keyboard accessible
- **Constitutional Compliance:** UX Consistency, Accessibility

### T077: Add Error Handling - Settings

- **Priority:** High
- **Category:** Code Quality
- **Estimate:** 2h
- **Dependencies:** T066-T069
- **Description:** Error handling for settings page
- **Acceptance Criteria:**
  - [ ] API errors caught
  - [ ] User-friendly messages
  - [ ] Retry options
  - [ ] Validation errors displayed
- **Constitutional Compliance:** Code Quality

### T078: Add Loading States - Settings

- **Priority:** Medium
- **Category:** UX Enhancement
- **Estimate:** 2h
- **Dependencies:** T070-T075
- **Description:** Loading indicators for settings page
- **Acceptance Criteria:**
  - [ ] Skeleton for category lists
  - [ ] Button loading states
  - [ ] Form loading states
  - [ ] Accessible
- **Constitutional Compliance:** UX Consistency

### T079: Write Playwright Tests - Settings (Category CRUD)

- **Priority:** Critical
- **Category:** Testing
- **Estimate:** 4h
- **Dependencies:** T075
- **Description:** E2E tests for category management
- **Acceptance Criteria:**
  - [ ] Test: Add expense category
  - [ ] Test: Edit category
  - [ ] Test: Delete category
  - [ ] Test: Prevent delete if in use
  - [ ] Page Object Model
  - [ ] Tests pass on all browsers
- **Constitutional Compliance:** Testing Standards

### T080: Write Playwright Tests - Settings (Preferences)

- **Priority:** Critical
- **Category:** Testing
- **Estimate:** 2h
- **Dependencies:** T075
- **Description:** E2E tests for default options
- **Acceptance Criteria:**
  - [ ] Test: Update default period
  - [ ] Test: Update default chart type
  - [ ] Test: Settings persist across sessions
  - [ ] Tests pass on all browsers
- **Constitutional Compliance:** Testing Standards

---

## Milestone 6: PWA Features & Offline Support (Week 4-5)

**Target Date:** 2025-11-14  
**Total Tasks:** 15

### T081: Configure Service Worker Caching

- **Priority:** Critical
- **Category:** Performance
- **Estimate:** 4h
- **Dependencies:** T005
- **Description:** Configure Workbox caching strategies
- **Acceptance Criteria:**
  - [ ] Static assets: cache-first
  - [ ] API calls: network-first with fallback
  - [ ] Images: cache-first with limits
  - [ ] HTML: network-first
  - [ ] Cache versioning
  - [ ] Cache cleanup on update
- **Constitutional Compliance:** Performance Requirements

### T082: Implement Offline Detection

- **Priority:** High
- **Category:** Feature Development
- **Estimate:** 2h
- **Dependencies:** T081
- **Description:** Detect and show offline status
- **Acceptance Criteria:**
  - [ ] Detect navigator.onLine
  - [ ] Listen to online/offline events
  - [ ] Composable: useOnline()
  - [ ] Visual indicator in UI
  - [ ] Toast notification on status change
- **Constitutional Compliance:** UX Consistency (feedback)

### T083: Implement Offline Transaction Queue

- **Priority:** High
- **Category:** Feature Development
- **Estimate:** 5h
- **Dependencies:** T082
- **Description:** Queue transactions created offline
- **Acceptance Criteria:**
  - [ ] Store in IndexedDB queue
  - [ ] Show "pending" status in UI
  - [ ] Auto-sync when online
  - [ ] Handle conflicts
  - [ ] Remove from queue on success
- **Constitutional Compliance:** UX Consistency

### T084: Implement Background Sync

- **Priority:** Medium
- **Category:** Performance
- **Estimate:** 4h
- **Dependencies:** T083
- **Description:** Background sync for offline actions
- **Acceptance Criteria:**
  - [ ] Register sync event
  - [ ] Process queue in background
  - [ ] Retry failed syncs
  - [ ] Notification on success
  - [ ] Handle errors gracefully
- **Constitutional Compliance:** Performance Requirements

### T085: Cache Transaction Data

- **Priority:** High
- **Category:** Performance
- **Estimate:** 3h
- **Dependencies:** T081
- **Description:** Cache transaction data for offline viewing
- **Acceptance Criteria:**
  - [ ] Cache recent transactions
  - [ ] Cache categories
  - [ ] Cache settings
  - [ ] Stale-while-revalidate strategy
  - [ ] 5-minute cache lifetime
- **Constitutional Compliance:** Performance Requirements

### T086: Implement PWA Install Prompt

- **Priority:** Medium
- **Category:** Feature Development
- **Estimate:** 3h
- **Dependencies:** T005
- **Description:** Custom install prompt for PWA
- **Acceptance Criteria:**
  - [ ] Detect beforeinstallprompt event
  - [ ] Show custom install button
  - [ ] Trigger install on click
  - [ ] Hide if already installed
  - [ ] Track install metrics (optional)
- **Constitutional Compliance:** UX Consistency

### T087: Design PWA Icons

- **Priority:** High
- **Category:** UX Enhancement
- **Estimate:** 2h
- **Dependencies:** None
- **Description:** Create PWA icons in multiple sizes
- **Acceptance Criteria:**
  - [ ] 192x192 icon
  - [ ] 512x512 icon
  - [ ] Maskable icon variants
  - [ ] Favicon
  - [ ] Apple touch icon
  - [ ] Icons match brand colors
- **Constitutional Compliance:** UX Consistency

### T088: Configure PWA Manifest

- **Priority:** High
- **Category:** Infrastructure
- **Estimate:** 2h
- **Dependencies:** T087
- **Description:** Complete PWA manifest configuration
- **Acceptance Criteria:**
  - [ ] App name and short name
  - [ ] Description
  - [ ] Icons configured
  - [ ] Theme color: #10B981
  - [ ] Background color: #FAFAFA
  - [ ] Display: standalone
  - [ ] Start URL: /
- **Constitutional Compliance:** Performance Requirements

### T089: Test PWA Installation - iOS

- **Priority:** High
- **Category:** Testing
- **Estimate:** 2h
- **Dependencies:** T086, T088
- **Description:** Test PWA installation on iOS devices
- **Acceptance Criteria:**
  - [ ] Installable on iOS Safari
  - [ ] Icons display correctly
  - [ ] Splash screen works
  - [ ] Runs in standalone mode
  - [ ] No iOS-specific bugs
- **Constitutional Compliance:** Testing Standards

### T090: Test PWA Installation - Android

- **Priority:** High
- **Category:** Testing
- **Estimate:** 2h
- **Dependencies:** T086, T088
- **Description:** Test PWA installation on Android devices
- **Acceptance Criteria:**
  - [ ] Installable on Chrome
  - [ ] Icons display correctly
  - [ ] Splash screen works
  - [ ] Runs in standalone mode
  - [ ] No Android-specific bugs
- **Constitutional Compliance:** Testing Standards

### T091: Optimize Service Worker Size

- **Priority:** Medium
- **Category:** Performance
- **Estimate:** 2h
- **Dependencies:** T081
- **Description:** Minimize service worker bundle size
- **Acceptance Criteria:**
  - [ ] Remove unused Workbox modules
  - [ ] Minify service worker
  - [ ] Lazy load strategies
  - [ ] < 50KB service worker size
- **Constitutional Compliance:** Performance Requirements

### T092: Implement Update Notification

- **Priority:** Medium
- **Category:** UX Enhancement
- **Estimate:** 3h
- **Dependencies:** T081
- **Description:** Notify users when new version available
- **Acceptance Criteria:**
  - [ ] Detect service worker update
  - [ ] Show update notification
  - [ ] "Refresh" button to activate
  - [ ] Skip waiting on user action
  - [ ] Reload page after update
- **Constitutional Compliance:** UX Consistency (feedback)

### T093: Add Offline Indicators

- **Priority:** Medium
- **Category:** UX Enhancement
- **Estimate:** 2h
- **Dependencies:** T082
- **Description:** Visual indicators for offline status
- **Acceptance Criteria:**
  - [ ] Offline badge in header
  - [ ] Disabled state for online-only features
  - [ ] "Pending sync" badges
  - [ ] Clear messaging
- **Constitutional Compliance:** UX Consistency

### T094: Write Playwright Tests - PWA (Installation)

- **Priority:** Critical
- **Category:** Testing
- **Estimate:** 3h
- **Dependencies:** T086-T088
- **Description:** E2E tests for PWA installation
- **Acceptance Criteria:**
  - [ ] Test: Manifest is valid
  - [ ] Test: Service worker registers
  - [ ] Test: Install prompt appears
  - [ ] Test: Icons load correctly
  - [ ] Tests pass on all browsers
- **Constitutional Compliance:** Testing Standards

### T095: Write Playwright Tests - PWA (Offline)

- **Priority:** Critical
- **Category:** Testing
- **Estimate:** 4h
- **Dependencies:** T081-T085
- **Description:** E2E tests for offline functionality
- **Acceptance Criteria:**
  - [ ] Test: App loads offline
  - [ ] Test: View cached data offline
  - [ ] Test: Create transaction offline
  - [ ] Test: Sync when back online
  - [ ] Tests pass on all browsers
- **Constitutional Compliance:** Testing Standards

---

## Milestone 7: Testing & Optimization (Week 5-6)

**Target Date:** 2025-11-21  
**Total Tasks:** 20

### T096: Create Page Object Models

- **Priority:** Critical
- **Category:** Testing
- **Estimate:** 6h
- **Dependencies:** T009
- **Description:** Page Object Models for all pages
- **Acceptance Criteria:**
  - [ ] LandingPage POM
  - [ ] ChartsPage POM
  - [ ] SettingsPage POM
  - [ ] Common components POM
  - [ ] Reusable methods
  - [ ] Well documented
- **Constitutional Compliance:** Testing Standards (POM pattern)

### T097: Write Playwright Tests - Navigation

- **Priority:** Critical
- **Category:** Testing
- **Estimate:** 3h
- **Dependencies:** T096
- **Description:** E2E tests for navigation flows
- **Acceptance Criteria:**
  - [ ] Test: Bottom nav tabs work
  - [ ] Test: Settings icon navigation
  - [ ] Test: Active states correct
  - [ ] Test: Back button behavior
  - [ ] Tests pass on all browsers
- **Constitutional Compliance:** Testing Standards

### T098: Write Playwright Tests - Responsive Design

- **Priority:** Critical
- **Category:** Testing
- **Estimate:** 4h
- **Dependencies:** T096
- **Description:** E2E tests for responsive layouts
- **Acceptance Criteria:**
  - [ ] Test: Mobile (375px) layout
  - [ ] Test: Tablet (768px) layout
  - [ ] Test: Desktop (1440px) layout
  - [ ] Test: All interactions work on each
  - [ ] Tests pass on all browsers
- **Constitutional Compliance:** Testing Standards, UX Consistency

### T099: Write Playwright Tests - Accessibility

- **Priority:** High
- **Category:** Testing
- **Estimate:** 4h
- **Dependencies:** T096
- **Description:** Automated accessibility tests
- **Acceptance Criteria:**
  - [ ] Axe core integration
  - [ ] Test: Color contrast
  - [ ] Test: ARIA labels
  - [ ] Test: Keyboard navigation
  - [ ] Test: Focus indicators
  - [ ] WCAG 2.1 AA violations = 0
- **Constitutional Compliance:** Testing Standards, UX Consistency (accessibility)

### T100: Write Playwright Tests - CSV Export

- **Priority:** Critical
- **Category:** Testing
- **Estimate:** 3h
- **Dependencies:** T096
- **Description:** E2E tests for CSV export
- **Acceptance Criteria:**
  - [ ] Test: Export monthly data
  - [ ] Test: Export yearly data
  - [ ] Test: CSV format correct
  - [ ] Test: File downloads
  - [ ] Tests pass on all browsers
- **Constitutional Compliance:** Testing Standards

### T101: Code Review - All Components

- **Priority:** Critical
- **Category:** Code Quality
- **Estimate:** 8h
- **Dependencies:** T001-T095
- **Description:** Comprehensive code review of all components
- **Acceptance Criteria:**
  - [ ] All code reviewed
  - [ ] Function size < 50 lines enforced
  - [ ] TypeScript strict mode verified
  - [ ] JSDoc comments present
  - [ ] No `any` types (or justified)
  - [ ] SRP followed
  - [ ] Review checklist completed
- **Constitutional Compliance:** Code Quality Excellence

### T102: Code Review - API Routes

- **Priority:** Critical
- **Category:** Code Quality
- **Estimate:** 4h
- **Dependencies:** T032-T069
- **Description:** Code review of all API routes
- **Acceptance Criteria:**
  - [ ] All routes reviewed
  - [ ] Validation implemented
  - [ ] Error handling comprehensive
  - [ ] Security verified
  - [ ] Performance optimized
- **Constitutional Compliance:** Code Quality Excellence

### T103: Analyze Bundle Size

- **Priority:** High
- **Category:** Performance
- **Estimate:** 3h
- **Dependencies:** T001-T095
- **Description:** Analyze and optimize bundle size
- **Acceptance Criteria:**
  - [ ] Run `nuxi analyze`
  - [ ] Identify large dependencies
  - [ ] Initial bundle < 200KB gzipped
  - [ ] Code splitting implemented
  - [ ] Tree-shaking verified
  - [ ] Document bundle composition
- **Constitutional Compliance:** Performance Requirements

### T104: Optimize MongoDB Queries

- **Priority:** High
- **Category:** Performance
- **Estimate:** 4h
- **Dependencies:** T032, T052, T067
- **Description:** Optimize database queries
- **Acceptance Criteria:**
  - [ ] Indexes verified and optimized
  - [ ] Aggregation pipelines optimized
  - [ ] Query response time < 200ms P95
  - [ ] Explain plans analyzed
  - [ ] N+1 queries eliminated
- **Constitutional Compliance:** Performance Requirements

### T105: Measure Core Web Vitals

- **Priority:** Critical
- **Category:** Performance
- **Estimate:** 3h
- **Dependencies:** T001-T095
- **Description:** Measure and verify Core Web Vitals
- **Acceptance Criteria:**
  - [ ] Install web-vitals library
  - [ ] Measure LCP, FID, CLS
  - [ ] Test on 3G network
  - [ ] LCP < 2.5s
  - [ ] FID < 100ms
  - [ ] CLS < 0.1
  - [ ] Document results
- **Constitutional Compliance:** Performance Requirements

### T106: Optimize Images and Assets

- **Priority:** Medium
- **Category:** Performance
- **Estimate:** 2h
- **Dependencies:** T087
- **Description:** Optimize all images and static assets
- **Acceptance Criteria:**
  - [ ] Convert to WebP where possible
  - [ ] Proper sizing (no oversized images)
  - [ ] Lazy loading implemented
  - [ ] Icons optimized
  - [ ] Total page weight < 1MB
- **Constitutional Compliance:** Performance Requirements

### T107: Implement Virtual Scrolling

- **Priority:** Low
- **Category:** Performance
- **Estimate:** 4h
- **Dependencies:** T039
- **Description:** Virtual scrolling for large transaction lists
- **Acceptance Criteria:**
  - [ ] Only renders visible items
  - [ ] Smooth scrolling
  - [ ] Works with date grouping
  - [ ] Performance improvement measured
  - [ ] Only if list > 100 items
- **Constitutional Compliance:** Performance Requirements

### T108: Accessibility Audit - Manual Testing

- **Priority:** Critical
- **Category:** UX Enhancement
- **Estimate:** 6h
- **Dependencies:** T001-T095
- **Description:** Manual accessibility testing
- **Acceptance Criteria:**
  - [ ] Keyboard navigation tested
  - [ ] Screen reader tested (NVDA/JAWS)
  - [ ] Focus indicators verified
  - [ ] Color contrast checked
  - [ ] ARIA labels verified
  - [ ] WCAG 2.1 AA checklist completed
  - [ ] Issues documented and fixed
- **Constitutional Compliance:** UX Consistency (accessibility)

### T109: Cross-Browser Testing

- **Priority:** Critical
- **Category:** Testing
- **Estimate:** 4h
- **Dependencies:** T001-T095
- **Description:** Manual testing on all target browsers
- **Acceptance Criteria:**
  - [ ] Chrome (latest) tested
  - [ ] Firefox (latest) tested
  - [ ] Safari (latest) tested
  - [ ] Edge (latest) tested
  - [ ] iOS Safari tested
  - [ ] Chrome Mobile tested
  - [ ] All bugs fixed
- **Constitutional Compliance:** Testing Standards

### T110: Mobile Device Testing

- **Priority:** High
- **Category:** Testing
- **Estimate:** 4h
- **Dependencies:** T001-T095
- **Description:** Test on real mobile devices
- **Acceptance Criteria:**
  - [ ] iPhone tested (iOS Safari)
  - [ ] Android phone tested (Chrome)
  - [ ] Touch interactions work
  - [ ] PWA installation works
  - [ ] Performance acceptable
  - [ ] Bugs fixed
- **Constitutional Compliance:** Testing Standards

### T111: Performance Profiling

- **Priority:** High
- **Category:** Performance
- **Estimate:** 4h
- **Dependencies:** T001-T095
- **Description:** Profile and optimize runtime performance
- **Acceptance Criteria:**
  - [ ] Chrome DevTools profiling
  - [ ] Identify performance bottlenecks
  - [ ] Optimize re-renders
  - [ ] Optimize animations
  - [ ] Memory leaks checked
  - [ ] Performance improvements measured
- **Constitutional Compliance:** Performance Requirements

### T112: Security Audit

- **Priority:** High
- **Category:** Code Quality
- **Estimate:** 3h
- **Dependencies:** T001-T095
- **Description:** Security audit and fixes
- **Acceptance Criteria:**
  - [ ] Input sanitization verified
  - [ ] XSS protection verified
  - [ ] MongoDB injection prevented
  - [ ] CSP headers configured
  - [ ] Dependencies audited (npm audit)
  - [ ] Environment variables secure
  - [ ] No secrets in code
- **Constitutional Compliance:** Code Quality (error handling)

### T113: Error Tracking Setup

- **Priority:** Medium
- **Category:** Infrastructure
- **Estimate:** 2h
- **Dependencies:** T001
- **Description:** Set up error tracking (optional, e.g., Sentry)
- **Acceptance Criteria:**
  - [ ] Error tracking service configured
  - [ ] Client errors tracked
  - [ ] Server errors tracked
  - [ ] Source maps uploaded
  - [ ] Alerts configured
- **Constitutional Compliance:** Code Quality

### T114: Complete Test Coverage Report

- **Priority:** Critical
- **Category:** Testing
- **Estimate:** 2h
- **Dependencies:** T049-T100
- **Description:** Generate test coverage report
- **Acceptance Criteria:**
  - [ ] All Playwright tests documented
  - [ ] Coverage map created
  - [ ] 100% critical paths covered
  - [ ] Test results report
  - [ ] Document any uncovered areas
- **Constitutional Compliance:** Testing Standards

### T115: QA Testing Round

- **Priority:** Critical
- **Category:** Testing
- **Estimate:** 8h
- **Dependencies:** T001-T114
- **Description:** Comprehensive QA testing
- **Acceptance Criteria:**
  - [ ] All features tested
  - [ ] All edge cases tested
  - [ ] All bugs documented
  - [ ] Critical bugs fixed
  - [ ] Sign-off for launch
- **Constitutional Compliance:** Testing Standards

---

## Milestone 8: Polish, Documentation & Deployment (Week 6)

**Target Date:** 2025-11-28  
**Total Tasks:** 15

### T116: Polish Animations and Transitions

- **Priority:** Medium
- **Category:** UX Enhancement
- **Estimate:** 4h
- **Dependencies:** T001-T095
- **Description:** Add smooth animations and transitions
- **Acceptance Criteria:**
  - [ ] Modal enter/exit animations
  - [ ] Page transitions
  - [ ] Button hover effects
  - [ ] Loading animations
  - [ ] Consistent timing (300ms)
  - [ ] Respect prefers-reduced-motion
- **Constitutional Compliance:** UX Consistency, Accessibility

### T117: Refine Loading States

- **Priority:** Medium
- **Category:** UX Enhancement
- **Estimate:** 3h
- **Dependencies:** T047, T078
- **Description:** Polish all loading states
- **Acceptance Criteria:**
  - [ ] Consistent skeleton screens
  - [ ] Smooth loading transitions
  - [ ] Progress indicators where appropriate
  - [ ] No layout shift on load
  - [ ] Accessible (aria-busy, aria-live)
- **Constitutional Compliance:** UX Consistency, Performance (CLS)

### T118: Improve Error Messages

- **Priority:** High
- **Category:** UX Enhancement
- **Estimate:** 3h
- **Dependencies:** T046, T062, T077
- **Description:** Review and improve all error messages
- **Acceptance Criteria:**
  - [ ] User-friendly language
  - [ ] Actionable guidance
  - [ ] No technical jargon
  - [ ] Consistent tone
  - [ ] Clear next steps
- **Constitutional Compliance:** UX Consistency (error communication)

### T119: Add Success Feedback

- **Priority:** Medium
- **Category:** UX Enhancement
- **Estimate:** 2h
- **Dependencies:** T040-T044
- **Description:** Add success feedback for all actions
- **Acceptance Criteria:**
  - [ ] Toast notifications
  - [ ] Success messages
  - [ ] Visual confirmations
  - [ ] Consistent timing
  - [ ] Accessible (aria-live)
- **Constitutional Compliance:** UX Consistency (interaction feedback)

### T120: Write Comprehensive README

- **Priority:** High
- **Category:** Documentation
- **Estimate:** 4h
- **Dependencies:** T001-T115
- **Description:** Complete project README
- **Acceptance Criteria:**
  - [ ] Project overview
  - [ ] Features list
  - [ ] Tech stack
  - [ ] Setup instructions
  - [ ] Development workflow
  - [ ] Testing guide
  - [ ] Deployment guide
  - [ ] Contributing guidelines
  - [ ] Screenshots
  - [ ] License
- **Constitutional Compliance:** Code Quality (documentation)

### T121: Write API Documentation

- **Priority:** High
- **Category:** Documentation
- **Estimate:** 4h
- **Dependencies:** T032-T069
- **Description:** Document all API endpoints
- **Acceptance Criteria:**
  - [ ] All endpoints documented
  - [ ] Request/response examples
  - [ ] Error responses documented
  - [ ] Authentication (if applicable)
  - [ ] Rate limiting (if applicable)
  - [ ] OpenAPI/Swagger spec (optional)
- **Constitutional Compliance:** Code Quality (documentation)

### T122: Write Component Documentation

- **Priority:** Medium
- **Category:** Documentation
- **Estimate:** 3h
- **Dependencies:** T016-T030
- **Description:** Document all reusable components
- **Acceptance Criteria:**
  - [ ] Component props documented (JSDoc)
  - [ ] Usage examples
  - [ ] Emit events documented
  - [ ] Slots documented
  - [ ] Storybook (optional)
- **Constitutional Compliance:** Code Quality (documentation)

### T123: Create Architecture Decision Records (ADRs)

- **Priority:** Low
- **Category:** Documentation
- **Estimate:** 3h
- **Dependencies:** research.md
- **Description:** Document key architectural decisions
- **Acceptance Criteria:**
  - [ ] Why Nuxt 3 vs Vue 3
  - [ ] Why MongoDB vs IndexedDB
  - [ ] Why PrimeVue
  - [ ] Why Playwright only
  - [ ] ADR format followed
- **Constitutional Compliance:** Code Quality (documentation)

### T124: Create Deployment Guide

- **Priority:** Critical
- **Category:** Documentation
- **Estimate:** 3h
- **Dependencies:** T001-T115
- **Description:** Complete deployment documentation
- **Acceptance Criteria:**
  - [ ] Environment setup
  - [ ] MongoDB Atlas configuration
  - [ ] Vercel/Netlify deployment steps
  - [ ] Environment variables
  - [ ] Domain configuration
  - [ ] SSL/HTTPS setup
  - [ ] Troubleshooting guide
- **Constitutional Compliance:** Code Quality (documentation)

### T125: Configure Production Environment

- **Priority:** Critical
- **Category:** Infrastructure
- **Estimate:** 4h
- **Dependencies:** T124
- **Description:** Set up production hosting
- **Acceptance Criteria:**
  - [ ] Vercel/Netlify account configured
  - [ ] GitHub repository linked
  - [ ] Environment variables set
  - [ ] MongoDB production cluster
  - [ ] Custom domain (if applicable)
  - [ ] SSL enabled
  - [ ] Auto-deploy on main branch
- **Constitutional Compliance:** Performance Requirements

### T126: Production Build and Deploy

- **Priority:** Critical
- **Category:** Infrastructure
- **Estimate:** 2h
- **Dependencies:** T125
- **Description:** Build and deploy to production
- **Acceptance Criteria:**
  - [ ] Build succeeds without errors
  - [ ] All tests pass
  - [ ] Deployed to production URL
  - [ ] PWA works in production
  - [ ] MongoDB connection works
  - [ ] No console errors
- **Constitutional Compliance:** Code Quality

### T127: Production Smoke Testing

- **Priority:** Critical
- **Category:** Testing
- **Estimate:** 3h
- **Dependencies:** T126
- **Description:** Test all features in production
- **Acceptance Criteria:**
  - [ ] All pages load
  - [ ] All CRUD operations work
  - [ ] Charts display correctly
  - [ ] CSV export works
  - [ ] PWA installable
  - [ ] Offline mode works
  - [ ] Performance acceptable
- **Constitutional Compliance:** Testing Standards

### T128: Setup Monitoring and Alerts

- **Priority:** High
- **Category:** Infrastructure
- **Estimate:** 3h
- **Dependencies:** T126
- **Description:** Configure production monitoring
- **Acceptance Criteria:**
  - [ ] Uptime monitoring
  - [ ] Error tracking active
  - [ ] Performance monitoring
  - [ ] MongoDB monitoring
  - [ ] Alerts configured
  - [ ] Dashboard accessible
- **Constitutional Compliance:** Performance Requirements

### T129: Create Launch Checklist

- **Priority:** High
- **Category:** Documentation
- **Estimate:** 2h
- **Dependencies:** T001-T128
- **Description:** Final pre-launch checklist
- **Acceptance Criteria:**
  - [ ] All tests passing
  - [ ] All documentation complete
  - [ ] Production deployed
  - [ ] Monitoring active
  - [ ] Backup strategy in place
  - [ ] Support plan ready
  - [ ] Launch announcement prepared
- **Constitutional Compliance:** Code Quality

### T130: Post-Launch Review

- **Priority:** Medium
- **Category:** Documentation
- **Estimate:** 2h
- **Dependencies:** T129
- **Description:** Post-launch retrospective and planning
- **Acceptance Criteria:**
  - [ ] Launch metrics documented
  - [ ] Lessons learned documented
  - [ ] Feedback collected
  - [ ] Bug reports tracked
  - [ ] Phase 2 planning started
  - [ ] Team retrospective held
- **Constitutional Compliance:** Code Quality

---

## Task Summary by Category

| Category            | Tasks   | Total Hours |
| ------------------- | ------- | ----------- |
| Feature Development | 56      | 180h        |
| Testing             | 24      | 80h         |
| Code Quality        | 15      | 45h         |
| Infrastructure      | 12      | 35h         |
| UX Enhancement      | 14      | 38h         |
| Performance         | 11      | 32h         |
| Documentation       | 8       | 24h         |
| **TOTAL**           | **130** | **434h**    |

**Estimated Timeline:** 6 weeks (2 developers @ 40h/week = 480h capacity)

---

## Parallel Execution Batches

Execute these task batches in parallel for maximum efficiency:

### Batch 1: MongoDB Models (After T002)

```bash
[P] T012: server/models/Transaction.ts
[P] T012b: server/models/Category.ts
[P] T012c: server/models/Settings.ts
```

### Batch 2: Transaction API Routes (After T012)

```bash
[P] T032: server/api/transactions/index.get.ts
[P] T033: server/api/transactions/index.post.ts
[P] T034: server/api/transactions/[id].patch.ts
[P] T035: server/api/transactions/[id].delete.ts
```

### Batch 3: Base UI Components (After T010)

```bash
[P] T016: components/UI/Button.vue
[P] T017: components/UI/Input.vue
[P] T018: components/UI/Dropdown.vue
[P] T019: components/UI/Card.vue
```

### Batch 4: Chart Components (After T051)

```bash
[P] T053: components/Chart/BarChart.vue
[P] T054: components/Chart/PieChart.vue
[P] T055: components/Chart/DoughnutChart.vue
[P] T056: components/Chart/LineChart.vue
```

### Batch 5: Category API Routes (After T012b)

```bash
[P] GET /api/categories
[P] POST /api/categories
[P] PATCH /api/categories/[id]
[P] DELETE /api/categories/[id]
```

### Batch 6: Settings API Routes (After T012c)

```bash
[P] GET /api/settings
[P] PATCH /api/settings
```

### Batch 7: Playwright Tests - Pages (After implementations complete)

```bash
[P] tests/e2e/landing.spec.ts
[P] tests/e2e/charts.spec.ts
[P] tests/e2e/settings.spec.ts
```

---

## Constitutional Compliance Summary

All 130 tasks are aligned with constitutional principles:

- **Code Quality Excellence:** 72 tasks enforce TypeScript strict, JSDoc, < 50 lines, code review
- **Testing Standards (Playwright):** 24 tasks for E2E testing with POM pattern, cross-browser
- **User Experience Consistency:** 68 tasks ensure design system, WCAG 2.1 AA, responsive
- **Performance Requirements:** 28 tasks optimize bundle size, Core Web Vitals, MongoDB queries

---

**Document Status:** Complete with parallel execution guidance  
**Last Updated:** 2025-10-03  
**Next Update:** Weekly during implementation
