/**
 * Category Management Composable
 * Handles CRUD operations for categories
 * Constitutional Compliance: Code Quality (TypeScript, JSDoc, error handling)
 */

import type { Category, CreateCategoryInput } from '~/types/models'

/**
 * Composable for managing categories
 * @returns Category state and CRUD methods
 */
export const useCategories = () => {
  const categories = useState<Category[]>('categories', () => [])
  const loading = useState('categories-loading', () => false)
  const error = useState<string | null>('categories-error', () => null)

  /**
   * Fetch categories, optionally filtered by type
   */
  const fetchCategories = async (type?: 'expense' | 'income') => {
    loading.value = true
    error.value = null

    try {
      const query = type ? { type } : {}
      const data = await $fetch<Category[]>('/api/categories', { query })
      categories.value = data
    } catch (err) {
      error.value = 'Failed to fetch categories'
      console.error('Error fetching categories:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Get categories by type (from local state)
   */
  const getCategoriesByType = (type: 'expense' | 'income') => {
    return computed(() => categories.value.filter(c => c.type === type))
  }

  /**
   * Add a new category
   */
  const addCategory = async (input: CreateCategoryInput) => {
    loading.value = true
    error.value = null

    try {
      const category = await $fetch<Category>('/api/categories', {
        method: 'POST',
        body: input
      })

      categories.value.push(category)
      return category
    } catch (err) {
      error.value = 'Failed to create category'
      console.error('Error creating category:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    categories: readonly(categories),
    loading: readonly(loading),
    error: readonly(error),
    fetchCategories,
    getCategoriesByType,
    addCategory
  }
}
