/**
 * PATCH /api/transactions/:id
 * Update an existing transaction
 * Constitutional Compliance: Code Quality (validation, error handling)
 */

import { z } from 'zod'
import { Transaction } from '~/server/models/Transaction'

// Validation schema for updates (all fields optional)
const updateTransactionSchema = z
  .object({
    type: z.enum(['expense', 'income']).optional(),
    amount: z.number().positive().max(1000000).optional(),
    categoryId: z.string().min(1).optional(),
    description: z.string().max(200).optional(),
    date: z.string().datetime().or(z.date()).optional()
  })
  .strict()

export default defineEventHandler(async event => {
  try {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    // Validate input
    const validatedData = updateTransactionSchema.parse(body)

    // Update transaction
    const transaction = await Transaction.findByIdAndUpdate(
      id,
      { ...validatedData },
      { new: true, runValidators: true }
    )

    if (!transaction) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Transaction not found'
      })
    }

    return transaction
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid update data',
        data: error.errors
      })
    }

    console.error('Error updating transaction:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update transaction'
    })
  }
})
