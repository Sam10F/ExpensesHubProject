/**
 * GET /api/categories
 * Fetch all categories, optionally filtered by type
 * Constitutional Compliance: Performance (indexes), Code Quality
 */

import { Category } from '~/server/models/Category'

export default defineEventHandler(async event => {
  try {
    const query = getQuery(event)

    // Build filter
    const filter: Record<string, unknown> = {}
    if (query.type && (query.type === 'expense' || query.type === 'income')) {
      filter.type = query.type
    }

    // Fetch categories sorted by order
    const categories = await Category.find(filter).sort({ order: 1 }).lean().exec()

    return categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch categories'
    })
  }
})
