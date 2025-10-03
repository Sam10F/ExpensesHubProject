/**
 * Database Initialization Utility
 * Initializes MongoDB with default categories and settings
 * Constitutional Compliance: Code Quality (error handling, idempotent)
 */

import { Category } from '../models/Category'
import { Settings } from '../models/Settings'

// Default Expense Categories (from design specifications)
const defaultExpenseCategories = [
  {
    name: 'Food',
    icon: '🍔',
    color: '#10B981',
    type: 'expense' as const,
    isDefault: true,
    order: 1
  },
  {
    name: 'Transport',
    icon: '🚗',
    color: '#3B82F6',
    type: 'expense' as const,
    isDefault: true,
    order: 2
  },
  {
    name: 'Bills',
    icon: '📄',
    color: '#F59E0B',
    type: 'expense' as const,
    isDefault: true,
    order: 3
  },
  {
    name: 'Shopping',
    icon: '🛍️',
    color: '#EF4444',
    type: 'expense' as const,
    isDefault: true,
    order: 4
  },
  {
    name: 'Other',
    icon: '🔷',
    color: '#8B5CF6',
    type: 'expense' as const,
    isDefault: true,
    order: 5
  }
]

// Default Income Categories (from design specifications)
const defaultIncomeCategories = [
  {
    name: 'Salary',
    icon: '💰',
    color: '#10B981',
    type: 'income' as const,
    isDefault: true,
    order: 1
  },
  {
    name: 'Freelance',
    icon: '💻',
    color: '#3B82F6',
    type: 'income' as const,
    isDefault: true,
    order: 2
  },
  {
    name: 'Gifts',
    icon: '🎁',
    color: '#EC4899',
    type: 'income' as const,
    isDefault: true,
    order: 3
  },
  {
    name: 'Other',
    icon: '🔷',
    color: '#8B5CF6',
    type: 'income' as const,
    isDefault: true,
    order: 4
  }
]

// Default Settings
const defaultSettings = {
  defaultPeriod: 'monthly' as const,
  defaultChartType: 'bar' as const,
  defaultDataView: 'expenses' as const,
  currency: 'EUR'
}

/**
 * Initialize database with default data
 * This function is idempotent - safe to run multiple times
 */
export async function initializeDatabase() {
  try {
    // Check if categories exist
    const categoryCount = await Category.countDocuments()

    if (categoryCount === 0) {
      // Insert default expense categories
      await Category.insertMany(defaultExpenseCategories)
      console.log('✅ Default expense categories initialized (5 categories)')

      // Insert default income categories
      await Category.insertMany(defaultIncomeCategories)
      console.log('✅ Default income categories initialized (4 categories)')
    } else {
      console.log(`ℹ️ Categories already exist (${categoryCount} categories)`)
    }

    // Check if settings exist
    const settingsCount = await Settings.countDocuments()

    if (settingsCount === 0) {
      // Create default settings
      await Settings.create(defaultSettings)
      console.log('✅ Default settings initialized')
    } else {
      console.log('ℹ️ Settings already exist')
    }

    // Create indexes (idempotent operation)
    await Category.createIndexes()
    console.log('✅ Category indexes created')

    console.log('✅ Database initialization complete')
  } catch (error) {
    console.error('❌ Database initialization failed:', error)
    throw error
  }
}
