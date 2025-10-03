/**
 * Transaction Model - MongoDB schema for expense and income transactions
 * Constitutional Compliance: Code Quality (TypeScript strict, JSDoc documentation)
 */

import mongoose, { Schema, Document } from 'mongoose'

export interface ITransaction extends Document {
  _id: string
  type: 'expense' | 'income'
  amount: number
  categoryId: mongoose.Types.ObjectId
  description?: string
  date: Date
  createdAt: Date
  updatedAt: Date
}

const TransactionSchema = new Schema<ITransaction>(
  {
    type: {
      type: String,
      enum: ['expense', 'income'],
      required: [true, 'Transaction type is required'],
      index: true
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0.01, 'Amount must be positive'],
      max: [1000000, 'Amount too large'],
      set: (val: number) => Math.round(val * 100) / 100 // Round to 2 decimals
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
      index: true
    },
    description: {
      type: String,
      maxlength: [200, 'Description cannot exceed 200 characters'],
      trim: true,
      default: ''
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
      index: true,
      default: Date.now
    }
  },
  {
    timestamps: true,
    collection: 'transactions'
  }
)

// Compound indexes for common queries
TransactionSchema.index({ date: -1 }) // Most recent first
TransactionSchema.index({ categoryId: 1, date: -1 }) // Category + date filtering
TransactionSchema.index({ type: 1, date: -1 }) // Type + date filtering

// Virtual for formatted amount
TransactionSchema.virtual('formattedAmount').get(function () {
  return `€${this.amount.toFixed(2)}`
})

// Ensure virtuals are included in JSON
TransactionSchema.set('toJSON', { virtuals: true })
TransactionSchema.set('toObject', { virtuals: true })

export const Transaction = mongoose.model<ITransaction>('Transaction', TransactionSchema)
