/**
 * MongoDB Connection Plugin
 * Establishes connection to MongoDB Atlas on server startup
 * Constitutional Compliance: Code Quality (error handling, connection pooling)
 */

import mongoose from 'mongoose'
import { initializeDatabase } from '../utils/initDatabase'

export default defineNitroPlugin(async nitroApp => {
  const config = useRuntimeConfig()

  // Check if MongoDB URI is configured
  if (!config.mongodbUri) {
    console.warn('⚠️ MongoDB URI not configured. Running without database.')
    console.warn('ℹ️  To enable database features:')
    console.warn(
      '   1. Create a free MongoDB Atlas account: https://www.mongodb.com/cloud/atlas/register'
    )
    console.warn('   2. Add MONGODB_URI to your .env file')
    console.warn('   3. Restart the server')
    return
  }

  try {
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
    console.error('ℹ️  The server will continue running, but database features will not work.')
    // Don't throw error - let the server continue running
  }
})
