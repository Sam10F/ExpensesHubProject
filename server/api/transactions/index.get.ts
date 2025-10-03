/**
 * GET /api/transactions
 * Fetch all transactions
 * Constitutional Compliance: Code Quality (error handling, performance)
 */

import { Transaction } from '~/server/models/Transaction'

export default defineEventHandler(async _event => {
  try {
    // Fetch all transactions, sorted by date (most recent first)
    const transactions = await Transaction.find()
      .sort({ date: -1 })
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
