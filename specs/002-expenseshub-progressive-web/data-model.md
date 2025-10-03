# Data Model: ExpensesHub PWA

**Date:** 2025-10-03  
**Database:** MongoDB  
**ORM:** Mongoose

## Overview

This document defines the complete data model for ExpensesHub using MongoDB collections and Mongoose schemas. The application uses three main collections: `transactions`, `categories`, and `settings`.

## Collections Summary

| Collection   | Purpose                      | Est. Doc Count | Index Strategy    |
| ------------ | ---------------------------- | -------------- | ----------------- |
| transactions | Store expense/income records | ~1000/user/yr  | date, categoryId  |
| categories   | Store user categories        | ~20/user       | type, order       |
| settings     | Store user preferences       | 1/user         | None (single doc) |

---

## 1. Transactions Collection

### Purpose

Store all financial transactions (expenses and incomes) with details about amount, category, date, and description.

### Schema Definition

```typescript
// server/models/Transaction.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  _id: string;
  type: "expense" | "income";
  amount: number;
  categoryId: string;
  description?: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    type: {
      type: String,
      enum: ["expense", "income"],
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [0.01, "Amount must be positive"],
      max: [1000000, "Amount too large"],
      set: (val: number) => Math.round(val * 100) / 100, // Round to 2 decimals
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },
    description: {
      type: String,
      maxlength: [200, "Description too long"],
      trim: true,
      default: "",
    },
    date: {
      type: Date,
      required: true,
      index: true,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    collection: "transactions",
  }
);

// Compound indexes for common queries
TransactionSchema.index({ date: -1 }); // Most recent first
TransactionSchema.index({ categoryId: 1, date: -1 }); // Category filtering
TransactionSchema.index({ type: 1, date: -1 }); // Type filtering

// Virtual for formatted amount
TransactionSchema.virtual("formattedAmount").get(function () {
  return `€${this.amount.toFixed(2)}`;
});

// Ensure virtuals are included in JSON
TransactionSchema.set("toJSON", { virtuals: true });
TransactionSchema.set("toObject", { virtuals: true });

export const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  TransactionSchema
);
```

### Indexes

```javascript
// Primary indexes (automatically created)
{ _id: 1 } // Default primary key

// Custom indexes (defined in schema)
{ date: -1 } // For date range queries (most common)
{ categoryId: 1, date: -1 } // For category + date filtering
{ type: 1, date: -1 } // For expense/income filtering
```

### Example Documents

```json
// Expense transaction
{
  "_id": "65f3a2b1c8d4e5f6a7b8c9d0",
  "type": "expense",
  "amount": 25.50,
  "categoryId": "65f3a2b1c8d4e5f6a7b8c9d1",
  "description": "Lunch at restaurant",
  "date": "2025-10-03T12:30:00.000Z",
  "createdAt": "2025-10-03T12:35:00.000Z",
  "updatedAt": "2025-10-03T12:35:00.000Z"
}

// Income transaction
{
  "_id": "65f3a2b1c8d4e5f6a7b8c9d2",
  "type": "income",
  "amount": 2000.00,
  "categoryId": "65f3a2b1c8d4e5f6a7b8c9d3",
  "description": "Monthly salary",
  "date": "2025-10-01T00:00:00.000Z",
  "createdAt": "2025-10-01T08:00:00.000Z",
  "updatedAt": "2025-10-01T08:00:00.000Z"
}
```

### Validation Rules

- **type:** Required, must be 'expense' or 'income'
- **amount:** Required, positive number, max 2 decimal places, max 1,000,000
- **categoryId:** Required, must reference existing category
- **description:** Optional, max 200 characters, trimmed
- **date:** Required, must be valid date (defaults to now)

### Query Patterns

```typescript
// 1. Get transactions for current month (most common)
const startOfMonth = new Date(2025, 9, 1); // October 1, 2025
const endOfMonth = new Date(2025, 9, 31, 23, 59, 59, 999);

const transactions = await Transaction.find({
  date: { $gte: startOfMonth, $lte: endOfMonth },
})
  .sort({ date: -1 })
  .populate("categoryId")
  .lean();

// 2. Get transactions by category
const foodTransactions = await Transaction.find({
  categoryId: foodCategoryId,
  date: { $gte: startDate, $lte: endDate },
});

// 3. Calculate total for period (aggregation)
const totals = await Transaction.aggregate([
  {
    $match: {
      date: { $gte: startDate, $lte: endDate },
      type: "expense",
    },
  },
  {
    $group: {
      _id: null,
      total: { $sum: "$amount" },
      count: { $sum: 1 },
    },
  },
]);

// 4. Get category breakdown for chart
const categoryBreakdown = await Transaction.aggregate([
  {
    $match: {
      date: { $gte: startDate, $lte: endDate },
      type: "expense",
    },
  },
  {
    $group: {
      _id: "$categoryId",
      total: { $sum: "$amount" },
      count: { $sum: 1 },
    },
  },
  {
    $lookup: {
      from: "categories",
      localField: "_id",
      foreignField: "_id",
      as: "category",
    },
  },
  {
    $unwind: "$category",
  },
  {
    $project: {
      categoryId: "$_id",
      categoryName: "$category.name",
      categoryColor: "$category.color",
      total: 1,
      count: 1,
      percentage: { $multiply: [{ $divide: ["$total", totalAmount] }, 100] },
    },
  },
  {
    $sort: { total: -1 },
  },
]);
```

---

## 2. Categories Collection

### Purpose

Store expense and income categories with customizable names, icons, colors, and display order.

### Schema Definition

```typescript
// server/models/Category.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  _id: string;
  name: string;
  icon: string;
  color: string;
  type: "expense" | "income";
  isDefault: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: [30, "Category name too long"],
      minlength: [1, "Category name required"],
    },
    icon: {
      type: String,
      required: true,
      default: "🔷",
    },
    color: {
      type: String,
      required: true,
      match: [/^#[0-9A-Fa-f]{6}$/, "Invalid hex color format"],
      default: "#8B5CF6",
    },
    type: {
      type: String,
      enum: ["expense", "income"],
      required: true,
      index: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
      index: true,
    },
    order: {
      type: Number,
      default: 0,
      index: true,
    },
  },
  {
    timestamps: true,
    collection: "categories",
  }
);

// Compound index for sorting
CategorySchema.index({ type: 1, order: 1 });

// Prevent duplicate names per type
CategorySchema.index({ name: 1, type: 1 }, { unique: true });

export const Category = mongoose.model<ICategory>("Category", CategorySchema);
```

### Default Categories

**Expense Categories:**

```typescript
const defaultExpenseCategories = [
  {
    name: "Food",
    icon: "🍔",
    color: "#10B981",
    type: "expense",
    isDefault: true,
    order: 1,
  },
  {
    name: "Transport",
    icon: "🚗",
    color: "#3B82F6",
    type: "expense",
    isDefault: true,
    order: 2,
  },
  {
    name: "Bills",
    icon: "📄",
    color: "#F59E0B",
    type: "expense",
    isDefault: true,
    order: 3,
  },
  {
    name: "Shopping",
    icon: "🛍️",
    color: "#EF4444",
    type: "expense",
    isDefault: true,
    order: 4,
  },
  {
    name: "Other",
    icon: "🔷",
    color: "#8B5CF6",
    type: "expense",
    isDefault: true,
    order: 5,
  },
];
```

**Income Categories:**

```typescript
const defaultIncomeCategories = [
  {
    name: "Salary",
    icon: "💰",
    color: "#10B981",
    type: "income",
    isDefault: true,
    order: 1,
  },
  {
    name: "Freelance",
    icon: "💻",
    color: "#3B82F6",
    type: "income",
    isDefault: true,
    order: 2,
  },
  {
    name: "Gifts",
    icon: "🎁",
    color: "#EC4899",
    type: "income",
    isDefault: true,
    order: 3,
  },
  {
    name: "Other",
    icon: "🔷",
    color: "#8B5CF6",
    type: "income",
    isDefault: true,
    order: 4,
  },
];
```

### Example Documents

```json
// Expense category
{
  "_id": "65f3a2b1c8d4e5f6a7b8c9d1",
  "name": "Food",
  "icon": "🍔",
  "color": "#10B981",
  "type": "expense",
  "isDefault": true,
  "order": 1,
  "createdAt": "2025-10-01T00:00:00.000Z",
  "updatedAt": "2025-10-01T00:00:00.000Z"
}

// Custom income category
{
  "_id": "65f3a2b1c8d4e5f6a7b8c9d4",
  "name": "Investments",
  "icon": "📈",
  "color": "#10B981",
  "type": "income",
  "isDefault": false,
  "order": 5,
  "createdAt": "2025-10-02T10:00:00.000Z",
  "updatedAt": "2025-10-02T10:00:00.000Z"
}
```

### Validation Rules

- **name:** Required, 1-30 characters, unique per type
- **icon:** Required, emoji or icon identifier
- **color:** Required, valid hex color (#RRGGBB)
- **type:** Required, must be 'expense' or 'income'
- **isDefault:** Boolean, indicates system default category
- **order:** Number for display ordering (lower = first)

### Query Patterns

```typescript
// 1. Get all expense categories (sorted by order)
const expenseCategories = await Category.find({ type: "expense" })
  .sort({ order: 1 })
  .lean();

// 2. Get all income categories
const incomeCategories = await Category.find({ type: "income" })
  .sort({ order: 1 })
  .lean();

// 3. Check if category has transactions (before delete)
const hasTransactions = await Transaction.exists({ categoryId });

// 4. Update category order (drag and drop)
await Category.updateOne({ _id: categoryId }, { $set: { order: newOrder } });
```

### Business Rules

- Cannot delete category if it has associated transactions
- Default categories can be edited but not deleted
- Category names must be unique within type (expense or income)
- At least one category must exist per type

---

## 3. Settings Collection

### Purpose

Store user preferences and default options for the application.

### Schema Definition

```typescript
// server/models/Settings.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ISettings extends Document {
  _id: string;
  defaultPeriod: "daily" | "weekly" | "monthly" | "yearly";
  defaultChartType: "bar" | "pie" | "doughnut" | "line";
  defaultDataView: "expenses" | "incomes";
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    defaultPeriod: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      default: "monthly",
    },
    defaultChartType: {
      type: String,
      enum: ["bar", "pie", "doughnut", "line"],
      default: "bar",
    },
    defaultDataView: {
      type: String,
      enum: ["expenses", "incomes"],
      default: "expenses",
    },
    currency: {
      type: String,
      default: "EUR",
      maxlength: 3,
    },
  },
  {
    timestamps: true,
    collection: "settings",
  }
);

export const Settings = mongoose.model<ISettings>("Settings", SettingsSchema);
```

### Default Settings

```typescript
const defaultSettings = {
  defaultPeriod: "monthly",
  defaultChartType: "bar",
  defaultDataView: "expenses",
  currency: "EUR",
};
```

### Example Document

```json
{
  "_id": "65f3a2b1c8d4e5f6a7b8c9d5",
  "defaultPeriod": "monthly",
  "defaultChartType": "doughnut",
  "defaultDataView": "expenses",
  "currency": "EUR",
  "createdAt": "2025-10-01T00:00:00.000Z",
  "updatedAt": "2025-10-03T15:00:00.000Z"
}
```

### Query Patterns

```typescript
// 1. Get settings (or create if not exists)
let settings = await Settings.findOne().lean();
if (!settings) {
  settings = await Settings.create(defaultSettings);
}

// 2. Update settings
await Settings.updateOne(
  {},
  { $set: { defaultPeriod: "yearly", defaultChartType: "pie" } },
  { upsert: true }
);
```

### Business Rules

- Only one settings document exists per user
- All settings have sensible defaults
- Settings are created automatically on first use

---

## Database Initialization

### Initial Setup Script

```typescript
// server/utils/initDatabase.ts
import { Transaction, Category, Settings } from "~/server/models";

export async function initializeDatabase() {
  // Check if categories exist
  const categoryCount = await Category.countDocuments();

  if (categoryCount === 0) {
    // Insert default expense categories
    await Category.insertMany(defaultExpenseCategories);

    // Insert default income categories
    await Category.insertMany(defaultIncomeCategories);

    console.log("✅ Default categories initialized");
  }

  // Check if settings exist
  const settingsCount = await Settings.countDocuments();

  if (settingsCount === 0) {
    // Create default settings
    await Settings.create(defaultSettings);
    console.log("✅ Default settings initialized");
  }

  // Create indexes (idempotent)
  await Transaction.createIndexes();
  await Category.createIndexes();

  console.log("✅ Database initialization complete");
}
```

---

## MongoDB Connection

### Connection Configuration

```typescript
// server/plugins/mongodb.ts
import mongoose from "mongoose";

export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig();

  try {
    await mongoose.connect(config.mongodbUri, {
      dbName: config.mongodbDbName || "expenseshub",
      maxPoolSize: 10, // Connection pooling
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log("✅ MongoDB connected");

    // Initialize database with defaults
    await initializeDatabase();
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
});
```

### Environment Variables

```bash
# .env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
MONGODB_DB_NAME=expenseshub
```

---

## Data Migration Strategy

### Version 1.0 Schema

Current schema (no migrations needed for initial release).

### Future Migrations

When schema changes are needed:

```typescript
// migrations/001_add_user_field.ts
export async function up() {
  // Add userId field to all collections
  await Transaction.updateMany({}, { $set: { userId: "default" } });
  await Category.updateMany({}, { $set: { userId: "default" } });
  await Settings.updateMany({}, { $set: { userId: "default" } });
}

export async function down() {
  // Remove userId field
  await Transaction.updateMany({}, { $unset: { userId: "" } });
  await Category.updateMany({}, { $unset: { userId: "" } });
  await Settings.updateMany({}, { $unset: { userId: "" } });
}
```

---

## Performance Considerations

### Index Strategy

- **transactions:** Indexed on date, categoryId, type for common queries
- **categories:** Indexed on type and order for sorting
- **settings:** No index needed (single document)

### Query Optimization

- Use `.lean()` for read-only queries (faster, returns plain objects)
- Use projections to limit returned fields
- Use aggregation pipelines for complex queries
- Limit results appropriately (pagination for large datasets)

### Connection Pooling

- Max pool size: 10 connections
- Sufficient for MVP traffic
- Increase if needed based on monitoring

### Data Size Estimates

- **Transaction:** ~200 bytes/document
- **Category:** ~100 bytes/document
- **Settings:** ~100 bytes/document

**Total for 1 user, 1 year:**

- Transactions: 1000 docs × 200 bytes = ~200KB
- Categories: 20 docs × 100 bytes = ~2KB
- Settings: 1 doc × 100 bytes = ~0.1KB
- **Total:** ~202KB per user per year

**MongoDB Atlas Free Tier:** 512MB = sufficient for ~2500 users

---

## Backup Strategy

### Automated Backups

- Use MongoDB Atlas automated backups (enabled by default)
- Retention: 7 days for free tier
- Manual snapshots before major changes

### Export Scripts

```typescript
// scripts/export-data.ts
import fs from "fs";
import { Transaction, Category, Settings } from "~/server/models";

async function exportAllData() {
  const transactions = await Transaction.find().lean();
  const categories = await Category.find().lean();
  const settings = await Settings.findOne().lean();

  const backup = {
    exportDate: new Date().toISOString(),
    data: { transactions, categories, settings },
  };

  fs.writeFileSync(
    `backup-${Date.now()}.json`,
    JSON.stringify(backup, null, 2)
  );

  console.log("✅ Data exported successfully");
}
```

---

## TypeScript Types

### Shared Types

```typescript
// types/models.ts

export interface Transaction {
  _id: string;
  type: "expense" | "income";
  amount: number;
  categoryId: string;
  description?: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  _id: string;
  name: string;
  icon: string;
  color: string;
  type: "expense" | "income";
  isDefault: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Settings {
  _id: string;
  defaultPeriod: "daily" | "weekly" | "monthly" | "yearly";
  defaultChartType: "bar" | "pie" | "doughnut" | "line";
  defaultDataView: "expenses" | "incomes";
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

// Input types (for creation)
export type CreateTransactionInput = Omit<
  Transaction,
  "_id" | "createdAt" | "updatedAt"
>;
export type UpdateTransactionInput = Partial<CreateTransactionInput>;

export type CreateCategoryInput = Omit<
  Category,
  "_id" | "createdAt" | "updatedAt"
>;
export type UpdateCategoryInput = Partial<CreateCategoryInput>;

export type UpdateSettingsInput = Partial<
  Omit<Settings, "_id" | "createdAt" | "updatedAt">
>;
```

---

**Document Status:** Complete  
**Last Updated:** 2025-10-03  
**Next Review:** After schema changes or new features
