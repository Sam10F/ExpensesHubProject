/**
 * Settings Model - MongoDB schema for user preferences
 * Constitutional Compliance: Code Quality (TypeScript strict, JSDoc documentation)
 */

import mongoose, { Schema, Document } from 'mongoose'

export interface ISettings extends Document {
  _id: string
  defaultPeriod: 'daily' | 'weekly' | 'monthly' | 'yearly'
  defaultChartType: 'bar' | 'pie' | 'doughnut' | 'line'
  defaultDataView: 'expenses' | 'incomes'
  currency: string
  createdAt: Date
  updatedAt: Date
}

const SettingsSchema = new Schema<ISettings>(
  {
    defaultPeriod: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'yearly'],
      default: 'monthly'
    },
    defaultChartType: {
      type: String,
      enum: ['bar', 'pie', 'doughnut', 'line'],
      default: 'bar'
    },
    defaultDataView: {
      type: String,
      enum: ['expenses', 'incomes'],
      default: 'expenses'
    },
    currency: {
      type: String,
      default: 'EUR',
      maxlength: 3
    }
  },
  {
    timestamps: true,
    collection: 'settings'
  }
)

export const Settings = mongoose.model<ISettings>('Settings', SettingsSchema)
