/**
 * POST /api/categories
 * Create a new category
 * Constitutional Compliance: Code Quality (validation, error handling)
 */

import { z } from 'zod'
import { Category } from '~/server/models/Category'

// Validation schema
const createCategorySchema = z.object({
  name: z.string().min(1).max(30),
  icon: z.string().min(1),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  type: z.enum(['expense', 'income']),
  order: z.number().int().min(0).optional()
})

export default defineEventHandler(async event => {
  try {
    const body = await readBody(event)

    // Validate input
    const validatedData = createCategorySchema.parse(body)

    // Set default order if not provided
    if (validatedData.order === undefined) {
      const maxOrder = await Category.findOne({ type: validatedData.type })
        .sort({ order: -1 })
        .select('order')
        .lean()
      validatedData.order = maxOrder ? maxOrder.order + 1 : 1
    }

    // Create category
    const category = await Category.create({
      ...validatedData,
      isDefault: false
    })

    return category
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid category data',
        data: error.errors
      })
    }

    // Handle duplicate name error
    if (error instanceof Error && error.message.includes('duplicate key')) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Category name already exists'
      })
    }

    console.error('Error creating category:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create category'
    })
  }
})
