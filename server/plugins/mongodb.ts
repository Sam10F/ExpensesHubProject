/**
 * MongoDB Connection Plugin
 * Establishes connection to MongoDB Atlas on server startup
 * Constitutional Compliance: Code Quality (error handling, connection pooling)
 */

import mongoose from 'mongoose'
import { initializeDatabase } from '../utils/initDatabase'

export default defineNitroPlugin(async nitroApp => {
  const config = useRuntimeConfig()

  try {
    // Check if MongoDB URI is configured
    if (!config.mongodbUri) {
      console.warn('⚠️ MongoDB URI not configured. Skipping database connection.')
      console.warn('Please set MONGODB_URI environment variable.')
      return
    }

    // Connect to MongoDB
    await mongoose.connect(config.mongodbUri, {
      dbName: config.mongodbDbName || 'expenseshub_dev',
      maxPoolSize: 10, // Connection pooling for performance
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    })

    console.log('✅ MongoDB connected successfully')
    console.log(`📊 Database: ${config.mongodbDbName || 'expenseshub_dev'}`)

    // Initialize database with default data
    await initializeDatabase()

    // Handle graceful shutdown
    nitroApp.hooks.hook('close', async () => {
      await mongoose.connection.close()
      console.log('🔌 MongoDB connection closed')
    })
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error)
    if (error instanceof Error) {
      console.error(`Error details: ${error.message}`)
    }
    throw error
  }
})
