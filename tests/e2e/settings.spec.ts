/**
 * Settings Page E2E Tests
 * Constitutional Compliance: Testing Standards (Playwright, cross-browser)
 */

import { test, expect } from '@playwright/test'

test.describe('Settings Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/settings')
  })

  test('should display settings page with categories', async ({ page }) => {
    await expect(page).toHaveTitle(/ExpensesHub/)
    await expect(page.locator('h1:has-text("Settings")')).toBeVisible()

    // Check expense categories section
    await expect(page.locator('text=EXPENSE CATEGORIES')).toBeVisible()

    // Check income categories section
    await expect(page.locator('text=INCOME CATEGORIES')).toBeVisible()
  })

  test('should display default expense categories', async ({ page }) => {
    // Wait for categories to load
    await page.waitForLoadState('networkidle')

    // Check for default categories
    await expect(page.locator('text=Food')).toBeVisible()
    await expect(page.locator('text=Transport')).toBeVisible()
    await expect(page.locator('text=Bills')).toBeVisible()
  })

  test('should display default income categories', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    await expect(page.locator('text=Salary')).toBeVisible()
    await expect(page.locator('text=Freelance')).toBeVisible()
  })

  test('should have add category buttons', async ({ page }) => {
    const addButtons = page.locator('button:has-text("+ Add Category")')
    await expect(addButtons).toHaveCount(2)
  })
})
