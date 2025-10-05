# ExpensesHub - Figma Design Import Guide

## 📦 Generated Files

I've created 7 SVG files for your **ExpensesHub PWA** design:

### Main Pages (Mobile-First, 375x812px)

1. **ExpensesHub-Landing-Page.svg** - Home screen with available money, chart, and transaction list
2. **ExpensesHub-Charts-Page.svg** - Charts view with filters and bar chart display
3. **ExpensesHub-Settings-Page.svg** - Settings with category management

### Modal Overlays

4. **ExpensesHub-Add-Transaction-Modal.svg** - Add expense/income popup
5. **ExpensesHub-Delete-Confirmation-Modal.svg** - Delete confirmation dialog
6. **ExpensesHub-Export-CSV-Modal.svg** - Export options dialog

### Design System

7. **ExpensesHub-Design-System.svg** - Color palette, typography, spacing, and components

---

## 🎨 How to Import into Figma

### Method 1: Drag & Drop (Fastest)

1. Open your Figma file: https://www.figma.com/design/AxPXvpGWSVd2Q8UTbH3exb/Untitled
2. Locate the SVG files on your computer
3. Drag and drop them directly onto your Figma canvas
4. Each SVG will be placed as a frame with editable vector layers

### Method 2: Place Image

1. In Figma, click **File** → **Place Image** (or press `Shift + Ctrl/Cmd + K`)
2. Select one or multiple SVG files
3. Click on the canvas to place them
4. The SVGs will maintain their structure and be fully editable

### Method 3: Copy/Paste (For Individual Elements)

1. Open the SVG file in a browser or SVG editor
2. Select the element you want
3. Copy and paste directly into Figma

---

## 🔧 After Import: Optimization Steps

### 1. Flatten Images (Optional)

- SVG imports can sometimes create nested groups
- Right-click → **Flatten** to simplify complex shapes
- Or use **Cmd/Ctrl + E** to flatten selections

### 2. Convert to Components

- Select reusable elements (buttons, cards, nav bars)
- Right-click → **Create Component** (or `Cmd/Ctrl + Alt + K`)
- Move components to a dedicated "Design System" page

### 3. Create Variants

- For buttons with states (default, hover, active, disabled)
- For navigation tabs (active/inactive)
- Use **Combine as Variants** to group related components

### 4. Apply Auto Layout

- Select container elements (cards, lists, modals)
- Click the **Auto Layout** button in the right panel (`Shift + A`)
- Configure padding, spacing, and resizing behavior

### 5. Set Up Constraints

- For responsive behavior across different screen sizes
- Select elements → Right panel → **Constraints**
- Use "Left & Right" for full-width elements

---

## 🎨 Design System Reference

### Color Tokens (PrimeVue Aura Inspired)

#### Primary Colors

- **Primary Green**: `#10B981` - Main brand color, buttons, active states
- **Success Light**: `#DCFCE7` - Success messages, positive feedback
- **Error Red**: `#EF4444` - Errors, delete actions, expense amounts

#### Accent Colors

- **Blue**: `#3B82F6` - Transport category, info states
- **Orange**: `#F59E0B` - Bills category, warnings
- **Purple**: `#8B5CF6` - Other category

#### Neutral Palette

- **Gray 900**: `#0F172A` - Primary text
- **Gray 600**: `#475569` - Secondary text
- **Gray 500**: `#64748B` - Tertiary text, labels
- **Gray 400**: `#94A3B8` - Placeholder text
- **Gray 300**: `#CBD5E1` - Borders (inactive)
- **Gray 200**: `#E2E8F0` - Borders (active)
- **Gray 100**: `#F1F5F9` - Backgrounds (secondary)
- **Gray 50**: `#F8FAFC` - Backgrounds (input fields)
- **Background**: `#FAFAFA` - Page background

### Typography

**Font Family**: Inter (with sans-serif fallback)

**Scale**:

- **H1**: 24px / Bold (700) - Page titles
- **H2**: 20px / Bold (700) - Modal titles
- **H3**: 16px / Semibold (600) - Section headers
- **Body**: 14px / Regular (400) - Default text
- **Caption**: 12px / Regular (400) - Small text
- **Label**: 13px / Semibold (600) - Input labels (uppercase)

**Line Heights**:

- Headings: 120% (tight)
- Body: 140% (comfortable reading)

### Spacing System (8px Grid)

- **4px** - Tight spacing (icon-text gaps)
- **8px** - XS - Component internal padding
- **16px** - SM - Gutter (page margins)
- **24px** - MD - Between sections
- **32px** - LG - Major section separation
- **48px** - XL - Large gaps

### Component Specifications

#### Buttons

- **Height**: 44px (mobile touch target)
- **Border Radius**: 8px
- **Padding**: 16px horizontal
- **Font**: 14px / Semibold (600)

**States**:

- Default: Solid color
- Hover: -10% brightness
- Active: -20% brightness
- Disabled: 40% opacity

#### Input Fields

- **Height**: 48px
- **Border Radius**: 8px
- **Border**: 1px solid `#E2E8F0`
- **Background**: `#F8FAFC`
- **Padding**: 16px
- **Font**: 14px / Regular

#### Cards

- **Border Radius**: 12px
- **Background**: `#FFFFFF`
- **Shadow**: None (flat design)
- **Padding**: 16px

#### Bottom Navigation

- **Height**: 68px
- **Background**: `#FFFFFF`
- **Border Top**: 1px solid `#E2E8F0`
- **Icons**: 24px size
- **Active State**: Primary green color
- **Layout**: 2 tabs (Home left, Charts right) + center FAB button

#### Header

- **Height**: 64px
- **Background**: `#FFFFFF`
- **Settings Icon**: Top-right corner (gear icon)
- **Active State**: Green when on Settings page

---

## 📱 Design Specifications

### Mobile Breakpoint (Primary)

- **Width**: 375px (iPhone X/11/12/13 standard)
- **Height**: 812px
- **Safe Areas**: Consider for notch devices

### Responsive Scaling

When adapting to larger screens:

- **Tablet (768px)**: Scale layout, increase padding to 24px
- **Desktop (1024px+)**: Max width 1200px, centered layout

### Grid System

- **Columns**: 4 columns on mobile
- **Gutter**: 16px
- **Margin**: 16px (page edges)

---

## ✅ Design Quality Checklist

Before development handoff:

- [ ] All text uses defined text styles (no custom font sizes)
- [ ] All colors use design tokens (no random hex values)
- [ ] Touch targets minimum 44x44px
- [ ] Proper naming conventions for layers and frames
- [ ] Components created for reusable elements
- [ ] Auto Layout applied to flexible containers
- [ ] States defined (hover, active, disabled)
- [ ] Responsive constraints set
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Export settings configured (2x for retina)

---

## 🎯 Next Steps

1. **Import all 7 SVG files** into your Figma project
2. **Organize into pages**:
   - Page 1: Design System
   - Page 2: Mobile Screens (Landing, Charts, Settings)
   - Page 3: Modals & Overlays
3. **Create a component library** from repeated elements
4. **Set up variables** (if using Figma Variables feature) for colors
5. **Build interactive prototype** linking screens together
6. **Test on mobile frame** (iPhone 13/14 Pro - 393x852px is also good)

---

## 🔗 Useful Figma Plugins

- **Stark** - Check color contrast for accessibility
- **Iconify** - Access icon libraries (if you want to replace emoji icons)
- **Content Reel** - Generate realistic transaction data
- **Autoflow** - Create flow diagrams for user journeys
- **Chart** - Generate more sophisticated chart mockups

---

## 📊 Default Categories Reference

### Expense Categories

- 🍔 **Food** (Color: Green `#10B981`)
- 🚗 **Transport** (Color: Blue `#3B82F6`)
- 📄 **Bills** (Color: Orange `#F59E0B`)
- 🛍️ **Shopping** (Color: Red `#EF4444`)
- 🔷 **Other** (Color: Purple `#8B5CF6`)

### Income Categories

- 💰 **Salary** (Color: Green `#10B981`)
- 💻 **Freelance** (Color: Blue `#3B82F6`)
- 🎁 **Gifts** (Color: Pink accent)
- 🔷 **Other** (Color: Purple `#8B5CF6`)

---

## 🎨 Confirmed Design Decisions Summary

Based on our clarification session:

1. ✅ **Mobile-first** design approach (375px base)
2. ✅ **Bottom navigation** with 2 tabs (Home, Charts) + center add button
3. ✅ **Settings in header** - gear icon top-right for better space utilization
4. ✅ **Basic categories** (4-5 per type) as defaults
5. ✅ **Detailed transaction list** with date grouping
6. ✅ **Center FAB-style** add button in bottom nav
7. ✅ **PrimeVue Aura** inspired color scheme
8. ✅ **Inter font** for clean, modern typography
9. ✅ **8px grid system** for consistent spacing

---

## 💡 Tips for Development Handoff

When ready to hand off to developers:

1. **Share Figma link** with "can view" permissions
2. **Enable Dev Mode** for accurate CSS extraction
3. **Document interactions** in Figma comments
4. **Create a style guide** page with all tokens
5. **Export assets** (icons, images) at 2x resolution
6. **Provide this README** for context

---

## 📞 Need Help?

If you encounter issues importing or have questions about the design:

- SVG files should be fully editable vectors in Figma
- All colors are using standard hex values
- Typography uses widely available Inter font family
- Spacing follows consistent 8px grid system

Good luck with your ExpensesHub PWA design! 🚀
