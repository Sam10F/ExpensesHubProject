# Specification: ExpensesHub Progressive Web Application

**Created:** 2025-10-03  
**Status:** Draft  
**Author:** Samuel Fernandez  
**Reviewers:** TBD

## Overview

ExpensesHub is a mobile-first Progressive Web Application (PWA) designed for personal expense and income tracking. The application provides a comprehensive history of user's financial transactions with intuitive visualization through charts, category management, and detailed transaction history. Built with Vue.js, PrimeVue components, and vue-chartjs, the application emphasizes a clean, modern design based on the Aura preset color scheme and Inter typography.

The application features three main pages (Landing/Home, Charts, Settings) accessible via bottom navigation, with a prominent center floating action button for adding transactions. All design specifications are defined in the SVG mockups located in `DesignSVG/` folder.

**Key Features:**

- Mobile-first responsive design (320px-767px primary, scales to desktop)
- Offline-capable PWA with installable experience
- Real-time financial overview with available monthly balance
- Interactive charts with multiple visualization types
- Customizable category management
- CSV export functionality
- Period-based filtering (Daily, Weekly, Monthly, Yearly)

## Requirements

### Functional Requirements

#### 1. Landing Page (Home)

1. **Available Money Display**

   - Description: Prominent display showing calculated available money for the rest of the month
   - Calculation: Total Incomes - Total Expenses for selected period
   - Acceptance Criteria:
     - [ ] Large, bold display with € symbol and two decimal precision
     - [ ] Updates in real-time when transactions are added/modified/deleted
     - [ ] Green color (#10B981) for positive amounts
     - [ ] Red color (#EF4444) for negative amounts
     - [ ] "Available this month" label above amount

2. **Period Selector**

   - Description: Toggle button group to switch time periods
   - Acceptance Criteria:
     - [ ] Three options: Weekly, Monthly (default), Yearly
     - [ ] Monthly selected by default on initial load
     - [ ] Active state uses primary green (#10B981)
     - [ ] Inactive states use gray background (#F1F5F9)
     - [ ] Affects all data on the page (chart, transactions, available money)

3. **Doughnut Chart - Expenses by Category**

   - Description: Visual breakdown of expenses/incomes per category
   - Acceptance Criteria:
     - [ ] Default view shows expenses by category
     - [ ] Toggle switch to switch between Expenses and Incomes view
     - [ ] Category colors match defined color scheme
     - [ ] Legend displays category names with percentages
     - [ ] Chart updates based on selected period
     - [ ] Chart positioned on left side, legend on right
     - [ ] Shows "Expenses by Category" title

4. **Transaction List**

   - Description: Chronological list of all transactions for selected period
   - Acceptance Criteria:
     - [ ] Sorted from most recent to oldest
     - [ ] Grouped by date headers (Today, Yesterday, specific dates)
     - [ ] Each item displays: category icon, category name, description, amount
     - [ ] Edit icon button (gray circle with X pattern)
     - [ ] Delete icon button (red circle with X pattern)
     - [ ] Amount displayed with € symbol and two decimal precision
     - [ ] Expenses shown in red, incomes in green
     - [ ] "Recent Transactions" section title

5. **Add Transaction Modal**

   - Description: Modal popup to create new expense or income transaction
   - Acceptance Criteria:
     - [ ] Opens when FAB button in bottom nav is tapped
     - [ ] Type toggle: Expense (default, red) vs Income (gray inactive)
     - [ ] Amount input field with € symbol and placeholder "0.00"
     - [ ] Category dropdown with "Select category..." placeholder
     - [ ] Description input field (optional) with "Add description (optional)" placeholder
     - [ ] Cancel button (gray) and Save button (green)
     - [ ] Semi-transparent background overlay (50% black opacity)
     - [ ] Close button (X) in top-right corner
     - [ ] All inputs labeled in uppercase with 13px semibold font
     - [ ] Validation: Amount and Category are required
     - [ ] Modal title: "Add Transaction"

6. **Export to CSV Button**

   - Description: Secondary button to export transaction data
   - Acceptance Criteria:
     - [ ] White background with border, positioned below chart
     - [ ] "Export to CSV" text label
     - [ ] Opens export configuration modal on click

7. **Export CSV Modal**
   - Description: Configuration popup for CSV export
   - Acceptance Criteria:
     - [ ] Export icon with green circle background
     - [ ] Time period selector: Monthly (default) vs Yearly
     - [ ] Cancel and Export action buttons
     - [ ] Modal title: "Export to CSV"
     - [ ] Downloads CSV file with selected period data
     - [ ] CSV includes: date, type, category, description, amount

#### 2. Charts Page

1. **Period Selector**

   - Description: Toggle button group with four time period options
   - Acceptance Criteria:
     - [ ] Four options: Daily, Weekly, Monthly (default), Yearly
     - [ ] Monthly selected by default
     - [ ] Active state uses primary green
     - [ ] Labeled "TIME PERIOD" in uppercase

2. **Data Type Selector**

   - Description: Toggle between expense and income data
   - Acceptance Criteria:
     - [ ] Two options: Expenses (default) vs Incomes
     - [ ] Active state uses primary green
     - [ ] Labeled "DATA TYPE" in uppercase
     - [ ] Updates chart data when switched

3. **Chart Type Selector**

   - Description: Visual selector for chart visualization type
   - Acceptance Criteria:
     - [ ] Four options: Bar (default), Pie, Doughnut, Line
     - [ ] Active state uses primary green
     - [ ] Labeled "CHART TYPE" in uppercase
     - [ ] Chart re-renders with selected type

4. **Chart Display Area**
   - Description: Dynamic chart rendering based on user selections
   - Acceptance Criteria:
     - [ ] White card background with 12px border radius
     - [ ] Title shows period and data type (e.g., "October 2025 - Expenses")
     - [ ] Responsive sizing within container
     - [ ] Y-axis labels for amounts (Bar/Line charts)
     - [ ] X-axis labels for categories
     - [ ] Legend with category colors and labels
     - [ ] Grid lines for readability (Bar/Line charts)
     - [ ] Interactive tooltips on hover/tap

#### 3. Settings Page

1. **Expense Categories Management**

   - Description: List view of all expense categories with CRUD operations
   - Acceptance Criteria:
     - [ ] Section labeled "EXPENSE CATEGORIES" in uppercase
     - [ ] Each category displays: icon (emoji), name, edit button, delete button
     - [ ] Edit button opens category edit modal
     - [ ] Delete button opens confirmation modal
     - [ ] "+ Add Category" button at bottom of list
     - [ ] Default categories included: Food 🍔, Transport 🚗, Bills 📄, Shopping 🛍️, Other 🔷
     - [ ] Categories displayed in custom order

2. **Income Categories Management**

   - Description: List view of all income categories with CRUD operations
   - Acceptance Criteria:
     - [ ] Section labeled "INCOME CATEGORIES" in uppercase
     - [ ] Each category displays: icon (emoji), name, edit button, delete button
     - [ ] Edit button opens category edit modal
     - [ ] Delete button opens confirmation modal
     - [ ] "+ Add Category" button at bottom of list
     - [ ] Default categories included: Salary 💰, Freelance 💻, Gifts 🎁, Other 🔷
     - [ ] Categories displayed in custom order

3. **Delete Confirmation Modal**

   - Description: Warning modal before deleting category or transaction
   - Acceptance Criteria:
     - [ ] Red warning icon with exclamation mark
     - [ ] Title: "Delete Transaction?" or "Delete Category?"
     - [ ] Message: "This action cannot be undone."
     - [ ] Cancel button (gray) and Delete button (red)
     - [ ] Semi-transparent background overlay

4. **Default Options Configuration**
   - Description: User preferences for default views
   - Acceptance Criteria:
     - [ ] Section labeled "DEFAULT OPTIONS" in uppercase
     - [ ] Default Period dropdown (Weekly, Monthly, Yearly)
     - [ ] Default Chart Type dropdown (Bar, Pie, Doughnut, Line)
     - [ ] Dropdowns styled with gray background and down arrow
     - [ ] Settings persist in local storage

#### 4. Navigation & Global Elements

1. **Bottom Navigation Bar**

   - Description: Fixed bottom navigation with tabs and FAB
   - Acceptance Criteria:
     - [ ] Height: 68px, white background, top border
     - [ ] Left tab: Home with house icon
     - [ ] Center: Large FAB button (56px diameter, green) with + icon
     - [ ] Right tab: Charts with bar chart icon
     - [ ] Active state: green color for icon and text
     - [ ] Inactive state: gray color
     - [ ] Tab labels: 11px font size
     - [ ] Fixed at bottom of viewport
     - [ ] Maintains position when scrolling

2. **Header**
   - Description: Top header bar with title and settings icon
   - Acceptance Criteria:
     - [ ] Height: 64px, white background
     - [ ] Page title left-aligned, 24px from left edge
     - [ ] Title font: 24px bold
     - [ ] Settings gear icon in top-right corner (335px from left, 32px from top)
     - [ ] Settings icon: gray background circle, gray gear when inactive
     - [ ] Settings icon: green background, green gear when active (on Settings page)
     - [ ] Tapping settings icon navigates to Settings page

### Non-Functional Requirements

#### Code Quality (Constitutional Principle 1)

- [ ] TypeScript strict mode enabled for entire project
- [ ] All Vue components typed with proper interfaces
- [ ] All public APIs documented with JSDoc comments
- [ ] Component functions under 50 lines where possible
- [ ] ESLint configuration with Vue and TypeScript rules
- [ ] Prettier configuration for consistent formatting
- [ ] Error handling strategy with try-catch blocks and user-friendly messages
- [ ] Comprehensive error boundaries for Vue components
- [ ] No `any` types used without explicit justification

#### Testing Standards (Constitutional Principle 2)

- [ ] E2E test scenarios defined for all critical user paths
- [ ] Playwright test suite for cross-browser testing (Chromium, Firefox, WebKit)
- [ ] Page Object Models designed for Landing, Charts, and Settings pages
- [ ] Test coverage target: 100% of critical user paths
- [ ] Tests for add transaction flow
- [ ] Tests for edit/delete transaction flow
- [ ] Tests for period selector changes
- [ ] Tests for chart type switching
- [ ] Tests for category management
- [ ] Tests for CSV export functionality
- [ ] Tests for PWA installation
- [ ] Tests for offline functionality

#### User Experience (Constitutional Principle 3)

- [ ] PrimeVue Aura design system components used throughout
- [ ] Responsive breakpoints: Mobile (320-767px), Tablet (768-1023px), Desktop (1024px+)
- [ ] WCAG 2.1 AA compliance verified for color contrast
- [ ] Keyboard navigation support for all interactive elements
- [ ] ARIA labels for screen reader accessibility
- [ ] Loading states for chart rendering and data fetching
- [ ] Skeleton screens for transaction list loading
- [ ] Error messages user-friendly and actionable
- [ ] Success feedback for transaction creation/modification
- [ ] Optimistic UI updates for better perceived performance
- [ ] Touch targets minimum 44x44px
- [ ] Adequate spacing between interactive elements (8px minimum)

#### Performance (Constitutional Principle 4)

- [ ] Bundle size analyzed and optimized (target: < 200KB gzipped initial load)
- [ ] Code splitting for routes (Landing, Charts, Settings as separate chunks)
- [ ] Lazy loading for chart components
- [ ] Tree-shaking enabled in build configuration
- [ ] Core Web Vitals targets:
  - [ ] LCP < 2.5 seconds
  - [ ] FID < 100 milliseconds
  - [ ] CLS < 0.1
- [ ] IndexedDB queries optimized with proper indexing
- [ ] Service worker caching strategy for offline support
- [ ] Images optimized and properly sized
- [ ] Font loading optimized (font-display: swap)
- [ ] React (Vue) re-renders minimized with computed properties
- [ ] Large transaction lists virtualized (if > 100 items)
- [ ] Performance monitoring with web vitals library

## Design

### User Interface

**Design Reference Files:**

- `DesignSVG/ExpensesHub-Landing-Page.svg` - Home page with transaction list
- `DesignSVG/ExpensesHub-Charts-Page.svg` - Charts page with data visualization
- `DesignSVG/ExpensesHub-Settings-Page.svg` - Settings and category management
- `DesignSVG/ExpensesHub-Add-Transaction-Modal.svg` - Add/edit transaction modal
- `DesignSVG/ExpensesHub-Delete-Confirmation-Modal.svg` - Delete confirmation modal
- `DesignSVG/ExpensesHub-Export-CSV-Modal.svg` - CSV export configuration modal
- `DesignSVG/ExpensesHub-Design-System.svg` - Complete design system specifications

**Design System Summary:**

**Colors:**

- Primary: #10B981 (Green)
- Success Light: #DCFCE7
- Error/Expense: #EF4444
- Blue Accent: #3B82F6
- Orange Accent: #F59E0B
- Purple Accent: #8B5CF6
- Neutral Grays: #0F172A to #F8FAFC (9 shades)

**Typography:**

- Font: Inter, sans-serif
- H1: 24px/Bold
- H2: 20px/Bold
- H3: 16px/Semibold
- Body: 14px/Regular
- Caption: 12px/Regular
- Label: 13px/Semibold (UPPERCASE)

**Spacing:**

- Base: 8px grid
- Scale: 4px, 8px, 16px, 24px, 32px, 48px

**Components:**

- Buttons: 44px height, 8px border radius
- Input Fields: 48px height, 8px border radius
- Cards: 12px border radius
- Bottom Navigation: 68px height

### Architecture

```
ExpensesHub PWA
│
├── App Shell (Vue 3 + Vue Router)
│   ├── Header Component (Dynamic title, Settings icon)
│   ├── Router View (Page components)
│   └── Bottom Navigation (Fixed tabs + FAB)
│
├── Pages
│   ├── Landing (/)
│   │   ├── Available Money Card
│   │   ├── Period Selector
│   │   ├── Doughnut Chart Component
│   │   ├── Transaction List Component
│   │   └── Export Button
│   │
│   ├── Charts (/charts)
│   │   ├── Period Selector (4 options)
│   │   ├── Data Type Selector
│   │   ├── Chart Type Selector
│   │   └── Dynamic Chart Component
│   │
│   └── Settings (/settings)
│       ├── Expense Categories List
│       ├── Income Categories List
│       └── Default Options Form
│
├── Shared Components
│   ├── AddTransactionModal
│   ├── DeleteConfirmationModal
│   ├── ExportCSVModal
│   ├── PeriodSelector
│   ├── CategoryIcon
│   └── TransactionListItem
│
├── Composables
│   ├── useTransactions (CRUD operations)
│   ├── useCategories (Category management)
│   ├── useCharts (Chart data processing)
│   ├── useExport (CSV generation)
│   └── useSettings (User preferences)
│
├── Store (Pinia)
│   ├── transactionsStore
│   ├── categoriesStore
│   └── settingsStore
│
└── Services
    ├── IndexedDB Service (Data persistence)
    ├── Service Worker (PWA offline support)
    └── CSV Service (Export functionality)
```

### Data Models

```typescript
// Transaction Entity
interface Transaction {
  id: string; // UUID
  type: "expense" | "income";
  amount: number; // Decimal with 2 places precision
  categoryId: string; // Reference to Category
  description: string; // Optional field
  date: Date; // Transaction date
  createdAt: Date;
  updatedAt: Date;
}

// Category Entity
interface Category {
  id: string; // UUID
  name: string; // Display name (e.g., "Food", "Salary")
  icon: string; // Emoji or icon identifier (e.g., "🍔", "💰")
  color: string; // Hex color (e.g., "#10B981")
  type: "expense" | "income";
  isDefault: boolean; // True for predefined categories
  order: number; // Display order in lists
  createdAt: Date;
  updatedAt: Date;
}

// User Settings Entity
interface UserSettings {
  id: string; // Single record ID
  defaultPeriod: "daily" | "weekly" | "monthly" | "yearly";
  defaultChartType: "bar" | "pie" | "doughnut" | "line";
  defaultDataView: "expenses" | "incomes";
  currency: string; // Default: "EUR" (€)
  updatedAt: Date;
}

// Chart Data Processing Types
interface ChartDataPoint {
  label: string; // Category name
  value: number; // Amount
  color: string; // Category color
  percentage: number; // % of total
}

interface PeriodFilter {
  type: "daily" | "weekly" | "monthly" | "yearly";
  startDate: Date;
  endDate: Date;
}

// CSV Export Types
interface CSVRow {
  date: string; // ISO format
  type: "expense" | "income";
  category: string;
  description: string;
  amount: string; // Formatted with 2 decimals
}
```

### API Contracts

As this is a client-side PWA with IndexedDB storage, there are no external API contracts. However, the IndexedDB schema and service methods are defined:

```typescript
// IndexedDB Schema
const DB_NAME = "ExpensesHubDB";
const DB_VERSION = 1;

const STORES = {
  transactions: {
    keyPath: "id",
    indexes: [
      { name: "date", keyPath: "date" },
      { name: "type", keyPath: "type" },
      { name: "categoryId", keyPath: "categoryId" },
      { name: "createdAt", keyPath: "createdAt" },
    ],
  },
  categories: {
    keyPath: "id",
    indexes: [
      { name: "type", keyPath: "type" },
      { name: "order", keyPath: "order" },
    ],
  },
  settings: {
    keyPath: "id",
  },
};

// IndexedDB Service Interface
interface IDBService {
  // Transactions
  createTransaction(
    transaction: Omit<Transaction, "id" | "createdAt" | "updatedAt">
  ): Promise<Transaction>;
  getTransaction(id: string): Promise<Transaction | null>;
  getTransactionsByPeriod(filter: PeriodFilter): Promise<Transaction[]>;
  updateTransaction(
    id: string,
    updates: Partial<Transaction>
  ): Promise<Transaction>;
  deleteTransaction(id: string): Promise<void>;
  getAllTransactions(): Promise<Transaction[]>;

  // Categories
  createCategory(
    category: Omit<Category, "id" | "createdAt" | "updatedAt">
  ): Promise<Category>;
  getCategory(id: string): Promise<Category | null>;
  getCategoriesByType(type: "expense" | "income"): Promise<Category[]>;
  updateCategory(id: string, updates: Partial<Category>): Promise<Category>;
  deleteCategory(id: string): Promise<void>;
  initializeDefaultCategories(): Promise<void>;

  // Settings
  getSettings(): Promise<UserSettings>;
  updateSettings(updates: Partial<UserSettings>): Promise<UserSettings>;
}
```

## Technical Approach

### Implementation Strategy

**Phase 1: Project Setup & Core Infrastructure (Week 1)**

1. Initialize Vue 3 project with Vite
2. Configure TypeScript with strict mode
3. Install and configure PrimeVue with Aura preset
4. Set up Vue Router with three main routes
5. Configure Pinia store for state management
6. Set up ESLint, Prettier, and Git hooks
7. Create IndexedDB service with schema
8. Initialize PWA with service worker configuration

**Phase 2: Design System & Shared Components (Week 1-2)**

1. Create design tokens from SVG specifications (colors, typography, spacing)
2. Build shared UI components (buttons, inputs, cards)
3. Implement PeriodSelector component
4. Build modal components (base modal, add transaction, delete confirmation, export CSV)
5. Create CategoryIcon component
6. Build TransactionListItem component
7. Set up responsive layouts and breakpoints

**Phase 3: Landing Page Implementation (Week 2-3)**

1. Build Available Money Card with calculation logic
2. Implement Period Selector integration
3. Integrate vue-chartjs for Doughnut Chart
4. Create chart data processing composable
5. Build Transaction List with date grouping
6. Implement Add Transaction Modal with validation
7. Add edit/delete transaction functionality
8. Implement Export to CSV Modal with CSV generation

**Phase 4: Charts Page Implementation (Week 3)**

1. Create Period Selector with 4 options
2. Build Data Type Selector
3. Implement Chart Type Selector
4. Create dynamic chart component with all 4 types (Bar, Pie, Doughnut, Line)
5. Implement chart data processing for different types
6. Add responsive sizing and interactions
7. Integrate with transaction data

**Phase 5: Settings Page Implementation (Week 4)**

1. Build Category Management components
2. Implement Expense Categories List with CRUD
3. Implement Income Categories List with CRUD
4. Create category edit modal
5. Add delete confirmation flow
6. Build Default Options form
7. Implement settings persistence
8. Initialize default categories on first load

**Phase 6: PWA Features (Week 4-5)**

1. Configure service worker for offline support
2. Implement caching strategies for static assets
3. Add app manifest with icons and theme colors
4. Test installation flow on mobile devices
5. Implement offline state detection and UI feedback
6. Add background sync for data consistency

**Phase 7: Testing & Optimization (Week 5-6)**

1. Write Playwright E2E tests for all critical paths
2. Implement Page Object Models
3. Test cross-browser compatibility
4. Optimize bundle size with code splitting
5. Implement lazy loading for heavy components
6. Optimize IndexedDB queries
7. Test and optimize Core Web Vitals
8. Conduct accessibility audit and fixes
9. Performance profiling and optimization

**Phase 8: Polish & Documentation (Week 6)**

1. Refine animations and transitions
2. Add loading states and error handling
3. Improve user feedback and messages
4. Write comprehensive README
5. Create user documentation
6. Final QA testing
7. Prepare for deployment

### Technology Choices

- **Framework/Library:** Vue 3 with Composition API
  - Rationale: Modern, performant, excellent TypeScript support, great for PWAs
- **UI Component Library:** PrimeVue with Aura Preset
  - Rationale: Comprehensive component library, matches design specifications, accessible by default
- **Chart Library:** vue-chartjs (Chart.js wrapper for Vue)
  - Rationale: Popular, well-maintained, supports all required chart types, responsive by default
- **State Management:** Pinia
  - Rationale: Official Vue state management, TypeScript-first, simpler than Vuex, better DevTools
- **Routing:** Vue Router
  - Rationale: Official Vue routing solution, supports navigation guards, lazy loading
- **Data Persistence:** IndexedDB via idb library
  - Rationale: Browser-native, offline-capable, large storage capacity, transactional
- **Build Tool:** Vite
  - Rationale: Fast HMR, optimized builds, excellent Vue 3 integration, plugin ecosystem
- **PWA:** Vite PWA Plugin (workbox-based)
  - Rationale: Seamless integration with Vite, workbox best practices, easy service worker configuration
- **Testing:** Playwright
  - Rationale: Cross-browser E2E testing (constitutional requirement), reliable, fast, excellent API
- **Linting/Formatting:** ESLint + Prettier
  - Rationale: Industry standard, comprehensive Vue/TypeScript rules, automatic formatting
- **Type Checking:** TypeScript 5.x
  - Rationale: Strict type safety, excellent IDE support, reduces runtime errors

**Dependencies:**

```json
{
  "dependencies": {
    "vue": "^3.4.0",
    "vue-router": "^4.3.0",
    "pinia": "^2.1.0",
    "primevue": "^3.50.0",
    "primeicons": "^7.0.0",
    "chart.js": "^4.4.0",
    "vue-chartjs": "^5.3.0",
    "idb": "^8.0.0",
    "uuid": "^9.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "vite": "^5.2.0",
    "vite-plugin-pwa": "^0.19.0",
    "typescript": "^5.4.0",
    "@playwright/test": "^1.43.0",
    "eslint": "^8.57.0",
    "eslint-plugin-vue": "^9.24.0",
    "@typescript-eslint/parser": "^7.6.0",
    "@typescript-eslint/eslint-plugin": "^7.6.0",
    "prettier": "^3.2.0",
    "web-vitals": "^3.5.0"
  }
}
```

### Migration Strategy

N/A - This is a new application with no existing data to migrate.

**First-Time User Experience:**

1. Application loads with empty transaction list
2. Default categories are automatically initialized in IndexedDB
3. Default settings are created
4. Welcome message encourages user to add first transaction
5. Tutorial tooltips guide through main features (optional)

## Testing Strategy

### Playwright E2E Tests

#### Test Suite 1: Transaction Management

1. **Add Expense Transaction**

   - Steps:
     1. Navigate to Landing page
     2. Click FAB button in bottom navigation
     3. Verify Add Transaction modal opens
     4. Leave type as "Expense" (default)
     5. Enter amount: "25.50"
     6. Select category: "Food"
     7. Enter description: "Lunch at restaurant"
     8. Click Save button
     9. Verify modal closes
     10. Verify transaction appears in list with correct details
     11. Verify available money updates
   - Expected: Transaction created successfully, appears in list, available money decreases

2. **Add Income Transaction**

   - Steps:
     1. Open Add Transaction modal
     2. Toggle type to "Income"
     3. Enter amount: "2000.00"
     4. Select category: "Salary"
     5. Enter description: "Monthly salary"
     6. Click Save
   - Expected: Income transaction created, available money increases

3. **Edit Transaction**

   - Steps:
     1. Locate transaction in list
     2. Click edit icon button
     3. Change amount to "30.00"
     4. Update description
     5. Click Save
   - Expected: Transaction updated with new values

4. **Delete Transaction**

   - Steps:
     1. Click delete icon on transaction
     2. Verify confirmation modal appears
     3. Click Delete button
   - Expected: Transaction removed from list, available money recalculated

5. **Cancel Add Transaction**
   - Steps:
     1. Open Add Transaction modal
     2. Enter partial data
     3. Click Cancel button
   - Expected: Modal closes, no transaction created

#### Test Suite 2: Period Filtering

1. **Switch Period on Landing Page**

   - Steps:
     1. Navigate to Landing page
     2. Note current data
     3. Click "Weekly" period button
     4. Verify chart updates
     5. Verify transaction list filters to current week
     6. Verify available money recalculates
   - Expected: All data updates to match selected period

2. **Switch Period on Charts Page**
   - Steps:
     1. Navigate to Charts page
     2. Select "Yearly" period
     3. Verify chart displays yearly data
     4. Change to "Daily"
     5. Verify chart updates to daily data
   - Expected: Chart data matches selected period

#### Test Suite 3: Chart Interactions

1. **Change Chart Type**

   - Steps:
     1. Navigate to Charts page
     2. Verify default Bar chart displays
     3. Click "Pie" chart type button
     4. Verify chart changes to Pie
     5. Click "Line" chart type button
     6. Verify chart changes to Line
   - Expected: Chart type switches correctly with same data

2. **Switch Data Type (Expenses/Incomes)**
   - Steps:
     1. On Charts page, verify "Expenses" is active
     2. Click "Incomes" button
     3. Verify chart updates to show income categories
     4. Verify chart title updates
   - Expected: Chart displays income data

#### Test Suite 4: Category Management

1. **Add Expense Category**

   - Steps:
     1. Navigate to Settings page
     2. In Expense Categories section, click "+ Add Category"
     3. Enter name: "Entertainment"
     4. Select icon: "🎬"
     5. Select color: Purple
     6. Click Save
   - Expected: New category appears in list and in category dropdowns

2. **Edit Category**

   - Steps:
     1. Click edit icon on "Food" category
     2. Change name to "Food & Drinks"
     3. Click Save
   - Expected: Category name updates in list and all transactions

3. **Delete Category**

   - Steps:
     1. Click delete icon on custom category
     2. Verify confirmation modal
     3. Click Delete
   - Expected: Category removed from list and dropdowns

4. **Prevent Deleting Category with Transactions**
   - Steps:
     1. Attempt to delete category that has transactions
     2. Verify error message
   - Expected: Deletion prevented, user informed

#### Test Suite 5: CSV Export

1. **Export Monthly CSV**

   - Steps:
     1. Navigate to Landing page
     2. Click "Export to CSV" button
     3. Verify modal opens
     4. Select "Monthly" period (default)
     5. Click Export button
     6. Verify file download starts
   - Expected: CSV file downloads with current month data

2. **Export Yearly CSV**
   - Steps:
     1. Open Export CSV modal
     2. Select "Yearly" period
     3. Click Export
     4. Open downloaded CSV
     5. Verify contains all transactions from current year
   - Expected: Yearly data exported correctly

#### Test Suite 6: Navigation

1. **Bottom Navigation Bar**

   - Steps:
     1. Start on Landing page
     2. Click Charts tab
     3. Verify navigation to Charts page
     4. Verify Charts tab is active
     5. Click Home tab
     6. Verify return to Landing page
   - Expected: Navigation works, active states correct

2. **Settings Access**
   - Steps:
     1. From any page, click Settings gear icon in header
     2. Verify navigation to Settings page
     3. Verify settings icon shows active state (green)
   - Expected: Settings page opens, icon state updates

#### Test Suite 7: Responsive Design

1. **Mobile View (375px)**

   - Steps:
     1. Set viewport to 375x812
     2. Navigate through all pages
     3. Verify all elements visible and functional
     4. Test all interactions
   - Expected: Full functionality on mobile

2. **Tablet View (768px)**

   - Steps:
     1. Set viewport to 768x1024
     2. Navigate through all pages
     3. Verify responsive layout adjustments
   - Expected: Optimized layout for tablet

3. **Desktop View (1440px)**
   - Steps:
     1. Set viewport to 1440x900
     2. Verify content scales appropriately
     3. Check max-width constraints
   - Expected: Content properly centered/scaled

#### Test Suite 8: PWA Features

1. **Install PWA**

   - Steps:
     1. Open app in Chrome
     2. Verify install prompt appears
     3. Click Install
     4. Verify app installs and opens
   - Expected: App installs as standalone PWA

2. **Offline Functionality**
   - Steps:
     1. Load app while online
     2. Disconnect network
     3. Navigate between pages
     4. Add transaction offline
     5. Reconnect network
     6. Verify transaction syncs
   - Expected: App works offline, syncs when online

### Edge Cases

- **Empty States:**
  - No transactions yet (show welcome message)
  - No transactions in selected period (show "No data" message)
  - All categories deleted (prevent, require at least one)
- **Large Data Sets:**
  - 1000+ transactions (test performance, virtualization)
  - Transaction list scrolling performance
  - Chart rendering with many categories
- **Data Validation:**
  - Negative amounts (prevent or handle appropriately)
  - Zero amounts (handle gracefully)
  - Very large amounts (test display formatting)
  - Special characters in descriptions (sanitize)
  - Duplicate category names (prevent)
- **Date Edge Cases:**
  - Transactions on month boundaries
  - Leap year dates
  - Different time zones (use UTC internally)
  - Today/Yesterday calculation at midnight
- **Browser Compatibility:**
  - IndexedDB not available (show error)
  - Service Worker not supported (graceful degradation)
  - Old browser versions (show compatibility message)
- **User Interactions:**
  - Rapid clicking (debounce/prevent double submissions)
  - Modal backdrop click (close modal or prevent)
  - Navigation during unsaved changes (warn user)
  - Back button behavior (handle correctly)

## Rollout Plan

1. **Phase 1: Development Environment**

   - Set up local development environment
   - Configure CI/CD pipeline
   - Deploy to development server

2. **Phase 2: Testing & QA**

   - Internal testing with team
   - Fix critical bugs
   - Run full Playwright test suite
   - Performance optimization

3. **Phase 3: Beta Release**

   - Deploy to staging server
   - Beta testing with small user group (5-10 users)
   - Collect feedback and usage metrics
   - Fix identified issues

4. **Phase 4: Production Release**

   - Deploy to production hosting (Vercel/Netlify/similar)
   - Monitor Core Web Vitals
   - Track error rates
   - Collect user feedback

5. **Phase 5: Post-Launch**
   - Monitor performance metrics
   - Address user feedback
   - Plan future enhancements
   - Regular maintenance updates

## Security Considerations

- **Data Privacy:**
  - All data stored locally in user's browser (IndexedDB)
  - No server-side data storage or transmission
  - No user authentication required (single-user app)
  - Clear data deletion option in settings
- **Input Validation:**
  - Sanitize all user inputs (descriptions, category names)
  - Validate amounts (positive numbers, 2 decimal max)
  - Prevent XSS attacks through proper encoding
  - Validate file exports (CSV generation)
- **Content Security Policy:**
  - Strict CSP headers in production
  - No inline scripts or styles (use Vite's CSP-compatible build)
  - Whitelist trusted sources only
- **Dependencies:**
  - Regular dependency audits (npm audit)
  - Update dependencies for security patches
  - Use exact versions in production
  - Review third-party code before integration
- **PWA Security:**
  - HTTPS required for service worker
  - Secure service worker scope
  - Validate cache contents
  - Prevent cache poisoning

## Monitoring & Observability

- **Metrics:**
  - Core Web Vitals (LCP, FID, CLS) via web-vitals library
  - Bundle size tracking (Vite bundle analyzer)
  - IndexedDB operation timing
  - Chart render performance
  - Service worker cache hit rates
  - PWA installation rate
- **Alerts:**
  - N/A for client-side app (no server monitoring)
  - Consider optional error tracking service (e.g., Sentry) for production
- **Logging:**
  - Console errors in development
  - Optional error reporting in production
  - User action logging for analytics (optional, privacy-conscious)
  - Performance markers for profiling

## Open Questions

- [ ] Should we support multiple currencies or start with EUR only?
- [ ] Do we need data export in formats other than CSV (PDF, Excel)?
- [ ] Should we add recurring transaction support in v1 or defer to v2?
- [ ] Do we want cloud sync/backup or keep it fully local?
- [ ] Should we support transaction attachments (receipt photos)?
- [ ] Do we need budget limits and alerts in v1?
- [ ] Should category icons be selectable from a predefined set or allow custom emojis?
- [ ] Do we want dark mode support in v1?
- [ ] Should we add transaction search/filtering functionality?
- [ ] Do we need transaction categories (beyond type: expense/income)?

## References

- Design mockups: `DesignSVG/` folder
  - ExpensesHub-Landing-Page.svg
  - ExpensesHub-Charts-Page.svg
  - ExpensesHub-Settings-Page.svg
  - ExpensesHub-Add-Transaction-Modal.svg
  - ExpensesHub-Delete-Confirmation-Modal.svg
  - ExpensesHub-Export-CSV-Modal.svg
  - ExpensesHub-Design-System.svg
- PrimeVue documentation: https://primevue.org/
- Vue 3 documentation: https://vuejs.org/
- Chart.js documentation: https://www.chartjs.org/
- PWA best practices: https://web.dev/progressive-web-apps/
- WCAG 2.1 guidelines: https://www.w3.org/WAI/WCAG21/quickref/

## Approval

- [ ] Technical review completed
- [ ] Constitutional compliance verified
- [ ] Design approved
- [ ] Ready for implementation
