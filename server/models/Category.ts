/**
 * Category Model - MongoDB schema for expense and income categories
 * Constitutional Compliance: Code Quality (TypeScript strict, JSDoc documentation)
 */

import mongoose, { Schema, Document } from 'mongoose'

export interface ICategory extends Document {
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

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
      maxlength: [30, 'Category name cannot exceed 30 characters'],
      minlength: [1, 'Category name cannot be empty']
    },
    icon: {
      type: String,
      required: [true, 'Category icon is required'],
      default: '🔷'
    },
    color: {
      type: String,
      required: [true, 'Category color is required'],
      match: [/^#[0-9A-Fa-f]{6}$/, 'Invalid hex color format'],
      default: '#8B5CF6'
    },
    type: {
      type: String,
      enum: ['expense', 'income'],
      required: [true, 'Category type is required'],
      index: true
    },
    isDefault: {
      type: Boolean,
      default: false,
      index: true
    },
    order: {
      type: Number,
      default: 0,
      index: true
    }
  },
  {
    timestamps: true,
    collection: 'categories'
  }
)

// Compound index for sorting
CategorySchema.index({ type: 1, order: 1 })

// Prevent duplicate names per type
CategorySchema.index({ name: 1, type: 1 }, { unique: true })

export const Category = mongoose.model<ICategory>('Category', CategorySchema)
