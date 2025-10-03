/**
 * GET /api/transactions
 * Fetch transactions with optional filtering by date range and type
 * Constitutional Compliance: Performance (MongoDB indexes), Code Quality (validation)
 */

import { Transaction } from '~/server/models/Transaction'

export default defineEventHandler(async event => {
  try {
    const query = getQuery(event)

    // Build filter object
    const filter: Record<string, unknown> = {}

    // Date range filtering
    if (query.startDate || query.endDate) {
      const dateFilter: Record<string, Date> = {}
      if (query.startDate) {
        dateFilter.$gte = new Date(query.startDate as string)
      }
      if (query.endDate) {
        dateFilter.$lte = new Date(query.endDate as string)
      }
      filter.date = dateFilter
    }

    // Type filtering
    if (query.type && (query.type === 'expense' || query.type === 'income')) {
      filter.type = query.type
    }

    // Fetch transactions with category population
    const transactions = await Transaction.find(filter)
      .sort({ date: -1 }) // Most recent first
      .populate('categoryId')
      .lean()
      .exec()

    return transactions
  } catch (error) {
    console.error('Error fetching transactions:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch transactions'
    })
  }
})
