/**
 * DELETE /api/transactions/:id
 * Delete a transaction
 * Constitutional Compliance: Code Quality (error handling)
 */

import { Transaction } from '~/server/models/Transaction'

export default defineEventHandler(async event => {
  try {
    const id = getRouterParam(event, 'id')

    const transaction = await Transaction.findByIdAndDelete(id)

    if (!transaction) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Transaction not found'
      })
    }

    return null
  } catch (error) {
    console.error('Error deleting transaction:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete transaction'
    })
  }
})
