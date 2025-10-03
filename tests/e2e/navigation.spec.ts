/**
 * Navigation E2E Tests
 * Constitutional Compliance: Testing Standards (Playwright, cross-browser)
 */

import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('should navigate between all pages using bottom nav', async ({ page }) => {
    // Start at home
    await page.goto('/')
    await expect(page).toHaveURL('/')

    // Navigate to Charts
    await page.click('.bottom-nav .nav-tab:has-text("Charts")')
    await expect(page).toHaveURL('/charts')
    const chartsTab = page.locator('.bottom-nav .nav-tab:has-text("Charts")')
    await expect(chartsTab).toHaveClass(/active/)

    // Navigate back to Home
    await page.click('.bottom-nav .nav-tab:has-text("Home")')
    await expect(page).toHaveURL('/')
    const homeTab = page.locator('.bottom-nav .nav-tab:has-text("Home")')
    await expect(homeTab).toHaveClass(/active/)
  })

  test('should navigate to settings via header icon', async ({ page }) => {
    await page.goto('/')

    // Click settings icon
    await page.click('[aria-label="Settings"]')
    await expect(page).toHaveURL('/settings')

    // Settings icon should be active
    const settingsIcon = page.locator('.settings-icon')
    await expect(settingsIcon).toHaveClass(/active/)
  })

  test('should maintain active state on current page', async ({ page }) => {
    await page.goto('/charts')

    // Charts tab should be active
    const chartsTab = page.locator('.bottom-nav .nav-tab:has-text("Charts")')
    await expect(chartsTab).toHaveClass(/active/)

    // Home tab should not be active
    const homeTab = page.locator('.bottom-nav .nav-tab:has-text("Home")')
    await expect(homeTab).not.toHaveClass(/active/)
  })
})
