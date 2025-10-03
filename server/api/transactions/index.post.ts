/**
 * POST /api/transactions
 * Create a new transaction
 * Constitutional Compliance: Code Quality (validation, error handling)
 */

import { z } from 'zod'
import { Transaction } from '~/server/models/Transaction'

// Validation schema
const createTransactionSchema = z.object({
  type: z.enum(['expense', 'income']),
  amount: z.number().positive().max(1000000),
  categoryId: z.string().min(1),
  description: z.string().max(200).optional(),
  date: z.string().datetime().or(z.date()).optional()
})

export default defineEventHandler(async event => {
  try {
    const body = await readBody(event)

    // Validate input
    const validatedData = createTransactionSchema.parse(body)

    // Create transaction
    const transaction = await Transaction.create({
      ...validatedData,
      date: validatedData.date ? new Date(validatedData.date) : new Date()
    })

    return transaction
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid transaction data',
        data: error.errors
      })
    }

    console.error('Error creating transaction:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create transaction'
    })
  }
})
