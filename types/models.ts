/**
 * Shared TypeScript types for ExpensesHub PWA
 * Used across client and server
 */

export interface Transaction {
  _id: string
  type: 'expense' | 'income'
  amount: number
  categoryId: string
  description?: string
  date: Date
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  _id: string
  name: string
  icon: string
  color: string
  type: 'expense' | 'income'
  isDefault: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface Settings {
  _id: string
  defaultPeriod: 'daily' | 'weekly' | 'monthly' | 'yearly'
  defaultChartType: 'bar' | 'pie' | 'doughnut' | 'line'
  defaultDataView: 'expenses' | 'incomes'
  currency: string
  createdAt: Date
  updatedAt: Date
}

// Input types (for creation, omit auto-generated fields)
export type CreateTransactionInput = Omit<Transaction, '_id' | 'createdAt' | 'updatedAt'>
export type UpdateTransactionInput = Partial<CreateTransactionInput>

export type CreateCategoryInput = Omit<Category, '_id' | 'createdAt' | 'updatedAt'>
export type UpdateCategoryInput = Partial<CreateCategoryInput>

export type UpdateSettingsInput = Partial<Omit<Settings, '_id' | 'createdAt' | 'updatedAt'>>

// Period filter type
export interface PeriodFilter {
  type: 'daily' | 'weekly' | 'monthly' | 'yearly'
  startDate: Date
  endDate: Date
}

// Chart data types
export interface ChartDataPoint {
  label: string
  value: number
  color: string
  percentage: number
}

export interface CategoryBreakdown {
  categoryId: string
  categoryName: string
  categoryColor: string
  total: number
  count: number
  percentage: number
}
