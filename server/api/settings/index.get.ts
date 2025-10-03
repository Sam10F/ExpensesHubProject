/**
 * GET /api/settings
 * Fetch user settings (creates default if not exists)
 * Constitutional Compliance: Code Quality (error handling)
 */

import { Settings } from '~/server/models/Settings'

export default defineEventHandler(async _event => {
  try {
    let settings = await Settings.findOne().lean().exec()

    // Create default settings if not exists
    if (!settings) {
      await Settings.create({
        defaultPeriod: 'monthly',
        defaultChartType: 'bar',
        defaultDataView: 'expenses',
        currency: 'EUR'
      })
      // Fetch the newly created settings as lean object
      settings = await Settings.findOne().lean().exec()
    }

    return settings
  } catch (error) {
    console.error('Error fetching settings:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch settings'
    })
  }
})
