# ExpensesHub - Updated Requirements & Specifications

## 📱 Application Overview

**Name**: ExpensesHub  
**Type**: Progressive Web Application (PWA)  
**Purpose**: Personal expense and income tracking application  
**Main Goal**: Maintain a comprehensive history of user's expenses and incomes

---

## 🎨 Design & Styling

### Design Approach

- **Mobile-First Design**: Primary focus on phone experience (320-767px)
- Adapt gracefully to larger screens (tablet and desktop)
- Responsive design that scales from mobile to desktop

### UI Framework & Styling

- **Component Library**: PrimeVue with Aura preset
- **Chart Library**: vue-chartjs for data visualization
- **Design System**: Based on 8px grid system
- **Font Family**: Inter (primary), sans-serif (fallback)

### Navigation Pattern

- **Bottom Navigation Bar**: Fixed tab bar at bottom with 2 main sections + center add button
  - Left: Home (Landing Page)
  - Center: Add Transaction button (prominent FAB style)
  - Right: Charts
- **Settings Access**: Gear icon in top-right corner of header (all pages)
  - Tapping opens Settings page
  - Active state shown when on Settings page

---

## 🏗️ Application Structure

### Page 1: Landing Page (Home)

#### 1.1 Available Money Display

- Prominent number display showing available money for the rest of the month
- Calculation: Total Incomes - Total Expenses
- Visual emphasis as primary metric
- Example: "€1,245.50" in large, bold typography

#### 1.2 Period Selector

- Options: **Weekly**, **Monthly** (default), **Yearly**
- Toggle button group design
- Default view: Current month
- Affects all data displayed on the page

#### 1.3 Doughnut Chart - Expenses by Category

- Visual breakdown of expenses per category for selected period
- Categories displayed with distinct colors
- **Toggle Option**: Switch between Expenses view and Incomes view
- Interactive legend showing category names and percentages

#### 1.4 Transaction List

- Chronological list of expenses/incomes for selected period
- **Sorting**: Most recent to oldest
- **Grouping**: Items grouped by date headers (Today, Yesterday, Oct 1, etc.)
- **List Item Display** (Detailed view):
  - Category icon (emoji or vector icon)
  - Category name
  - Description text
  - Amount (with € symbol)
  - Edit icon button
  - Delete icon button

##### 1.4.1 Transaction Actions

- **Edit**: Icon button to modify transaction
- **Delete**: Icon button that triggers confirmation popup before deletion

#### 1.5 Add Transaction Button

- **Location**: Center position in bottom navigation bar
- **Style**: Floating Action Button (FAB) style, prominent and always visible
- **Action**: Opens modal popup to add new Expense or Income

##### 1.5.1 Add Transaction Modal Fields

- **Type Toggle**: Switch between Expense and Income
- **Amount Input**:
  - Number input field
  - Currency: Euro (€)
  - Precision: Two decimal places (e.g., 25.50)
- **Category Dropdown**:
  - Select from predefined categories
  - Different options for Expense vs Income
- **Description Input**:
  - Text input field
  - Optional field for additional details
- **Action Buttons**:
  - Cancel: Close modal without saving
  - Save: Validate and save transaction

#### 1.6 Export to CSV Button

- **Location**: Secondary button on Landing Page
- **Action**: Opens export configuration popup

##### 1.6.1 Export CSV Modal

- **Time Period Options**:
  - Monthly (default)
  - Yearly
- **Action Buttons**:
  - Cancel: Close without exporting
  - Export: Download CSV file with selected data

---

### Page 2: Charts Page

#### 2.1 Period Selector

- Options: **Daily**, **Weekly**, **Monthly** (default), **Yearly**
- Default view: Current month
- Controls data range for chart display

#### 2.2 Data Type Selector

- Options: **Expenses** (default) or **Incomes**
- Toggle between the two data types
- Affects chart data and styling

#### 2.3 Chart Type Selector

- Options: **Bar** (default), **Pie**, **Doughnut**, **Line**
- Visual selector with icons/labels
- Changes chart visualization type

#### 2.4 Chart Display Area

- Dynamic chart rendering based on selections
- Category-based data visualization
- Responsive sizing
- Legend and axis labels included

---

### Page 3: Settings Page

#### 3.1 Expense Categories Management

- **View**: List of all expense categories
- **Actions**:
  - Edit: Modify category name and icon
  - Add: Create new expense category
  - Remove: Delete category (with confirmation)
- **Default Categories**:
  - 🍔 Food
  - 🚗 Transport
  - 📄 Bills
  - 🛍️ Shopping
  - 🔷 Other

#### 3.2 Income Categories Management

- **View**: List of all income categories
- **Actions**:
  - Edit: Modify category name and icon
  - Add: Create new income category
  - Remove: Delete category (with confirmation)
- **Default Categories**:
  - 💰 Salary
  - 💻 Freelance
  - 🎁 Gifts
  - 🔷 Other

#### 3.3 Default Options Configuration

- **Default Period**: Set preferred time period view (Monthly, Weekly, Yearly)
- **Default Chart Type**: Set preferred chart visualization (Bar, Pie, Doughnut, Line)
- **Default Data View**: Expenses or Incomes
- Other user preferences as needed

---

## 🎨 Category System

### Expense Categories (Basic Set - 5 categories)

1. **Food** - Color: Green (#10B981), Icon: 🍔
2. **Transport** - Color: Blue (#3B82F6), Icon: 🚗
3. **Bills** - Color: Orange (#F59E0B), Icon: 📄
4. **Shopping** - Color: Red (#EF4444), Icon: 🛍️
5. **Other** - Color: Purple (#8B5CF6), Icon: 🔷

### Income Categories (Basic Set - 4 categories)

1. **Salary** - Color: Green (#10B981), Icon: 💰
2. **Freelance** - Color: Blue (#3B82F6), Icon: 💻
3. **Gifts** - Color: Pink/Purple, Icon: 🎁
4. **Other** - Color: Purple (#8B5CF6), Icon: 🔷

**Note**: Users can add, edit, or remove categories via Settings page.

---

## 🎨 Design System Specifications

### Color Palette (PrimeVue Aura Inspired)

#### Primary Colors

- **Primary**: `#10B981` (Green) - Brand color, buttons, positive amounts
- **Success**: `#DCFCE7` (Light Green) - Success states, backgrounds
- **Error/Danger**: `#EF4444` (Red) - Errors, delete actions, expense amounts

#### Accent Colors

- **Blue**: `#3B82F6` - Info, secondary actions
- **Orange**: `#F59E0B` - Warnings, bills category
- **Purple**: `#8B5CF6` - Neutral category

#### Neutral Palette

- **Gray 900**: `#0F172A` - Primary text
- **Gray 600**: `#475569` - Secondary text
- **Gray 500**: `#64748B` - Tertiary text, labels
- **Gray 400**: `#94A3B8` - Placeholder text
- **Gray 300**: `#CBD5E1` - Inactive borders
- **Gray 200**: `#E2E8F0` - Active borders
- **Gray 100**: `#F1F5F9` - Secondary backgrounds
- **Gray 50**: `#F8FAFC` - Input field backgrounds
- **Background**: `#FAFAFA` - Page background

### Typography

**Font Family**: Inter, sans-serif

**Type Scale**:

- **H1**: 24px / Bold (700) - Page titles
- **H2**: 20px / Bold (700) - Modal titles
- **H3**: 16px / Semibold (600) - Section headers
- **Body**: 14px / Regular (400) - Default text
- **Caption**: 12px / Regular (400) - Small text, metadata
- **Label**: 13px / Semibold (600) - Form labels (UPPERCASE)

**Line Heights**:

- Headings: 120%
- Body: 140%

### Spacing System (8px Base Grid)

- **4px** - Tight spacing
- **8px** - XS spacing
- **16px** - SM spacing, gutter (page margins)
- **24px** - MD spacing, between sections
- **32px** - LG spacing, major separations
- **48px** - XL spacing

### Component Specifications

#### Buttons

- Height: 44px (meets mobile touch target minimum)
- Border Radius: 8px
- Horizontal Padding: 16px
- Font: 14px / Semibold (600)

**States**:

- Default
- Hover (slight brightness change)
- Active/Pressed
- Disabled (40% opacity)

#### Input Fields

- Height: 48px
- Border Radius: 8px
- Border: 1px solid #E2E8F0
- Background: #F8FAFC
- Padding: 16px
- Font: 14px / Regular

#### Cards

- Border Radius: 12px
- Background: #FFFFFF
- Padding: 16px
- No shadow (flat design)

#### Bottom Navigation

- Height: 68px
- Background: #FFFFFF
- Border Top: 1px solid #E2E8F0
- Icon Size: 24px
- Active State: Primary green (#10B981)
- Text: 11px
- Layout: 2 tabs (Home left, Charts right) + center FAB add button

#### Header

- Height: 64px
- Background: #FFFFFF
- Title: 24px / Bold (left-aligned, 24px margin)
- Settings Icon: Top-right corner (gear icon, 335px from left, 32px from top)
- Active Settings: Green (#10B981) when on Settings page

---

## 📱 Responsive Design

### Breakpoints

- **Mobile** (Primary): 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1439px
- **Large Desktop**: 1440px+

### Mobile Specifications (Primary Focus)

- Design Width: 375px (iPhone X/11/12/13 standard)
- Design Height: 812px
- Grid: 4 columns
- Gutter: 16px
- Margin: 16px

### Touch Targets

- Minimum size: 44x44px for all interactive elements
- Adequate spacing between clickable items (8px minimum)

---

## 🔄 User Interactions & States

### Transaction List Item States

- **Default**: Normal display
- **Hover**: Subtle background change (desktop)
- **Pressed**: Feedback on tap (mobile)
- **Edit Mode**: Highlight when editing
- **Delete Confirmation**: Modal overlay with warning

### Modal Behaviors

- **Background Overlay**: Semi-transparent black (50% opacity)
- **Entry Animation**: Slide up or fade in
- **Close Methods**:
  - Close button (X icon)
  - Cancel button
  - Click outside modal (optional)

### Data Loading States

- Loading spinner or skeleton screens
- Empty states with helpful messages
- Error states with retry options

---

## ✅ Confirmed Design Decisions

1. ✅ **Mobile-first design** approach (320-767px base, adapts up)
2. ✅ **Bottom navigation bar** with 2 tabs + center add button (Home left, Charts right)
3. ✅ **Settings in header** - Gear icon positioned top-right corner (better space utilization)
4. ✅ **Center FAB-style** add button in bottom navigation (prominent primary action)
5. ✅ **Basic categories** (4-5 per type) as default set
6. ✅ **Detailed transaction list** with date grouping headers
7. ✅ **PrimeVue Aura** inspired color scheme
8. ✅ **Inter font** for typography
9. ✅ **8px grid system** for consistent spacing
10. ✅ **Date-grouped list**: No date shown on individual items, grouped under date headers instead

---

## 🎯 Technical Requirements

### Progressive Web App (PWA)

- Installable on mobile devices
- Works offline (service worker)
- Fast loading times
- App-like experience

### Frameworks & Libraries

- **Frontend Framework**: Vue.js (implied by PrimeVue)
- **UI Components**: PrimeVue with Aura preset
- **Charts**: vue-chartjs (Chart.js wrapper for Vue)
- **State Management**: Vuex or Pinia (recommended)
- **Data Persistence**: IndexedDB or LocalStorage

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- PWA support required

---

## 📊 Data Structure Considerations

### Transaction Entity

```javascript
{
  id: UUID,
  type: 'expense' | 'income',
  amount: Number (decimal, 2 places),
  category: String (category ID),
  description: String (optional),
  date: Date/Timestamp,
  createdAt: Date/Timestamp,
  updatedAt: Date/Timestamp
}
```

### Category Entity

```javascript
{
  id: UUID,
  name: String,
  icon: String (emoji or icon identifier),
  color: String (hex color),
  type: 'expense' | 'income',
  isDefault: Boolean,
  order: Number (for display sorting)
}
```

---

## 🚀 Future Enhancements (Out of Scope for Initial Version)

- Multi-currency support
- Recurring transactions
- Budget limits and alerts
- Data synchronization across devices
- Export to other formats (PDF, Excel)
- Advanced filtering and search
- Shared expenses (multi-user)
- Bank account integration
- Receipt photo attachments
- Spending insights and recommendations

---

## 📝 Notes

- All amounts are in Euros (€)
- Two decimal precision for all monetary values
- Dates displayed in user's locale format
- Responsive design ensures usability across all screen sizes
- Accessibility considerations (WCAG AA compliance)
- Clean, minimal design aesthetic
- Focus on usability and quick data entry

---

**Last Updated**: October 3, 2025  
**Version**: 1.0 (Initial Requirements with Clarifications)
