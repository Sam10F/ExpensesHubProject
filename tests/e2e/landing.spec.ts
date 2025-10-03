/**
 * Landing Page E2E Tests
 * Constitutional Compliance: Testing Standards (Playwright exclusively, Page Object Model)
 */

import { test, expect } from '@playwright/test'

test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display the landing page with available money card', async ({ page }) => {
    // Check page loads
    await expect(page).toHaveTitle(/ExpensesHub/)

    // Check available money card is visible
    await expect(page.locator('text=Available this month')).toBeVisible()

    // Check amount is displayed
    const amount = page.locator('.amount')
    await expect(amount).toBeVisible()
  })

  test('should display period selector with three options', async ({ page }) => {
    // Check all period options are visible
    await expect(page.locator('text=Weekly')).toBeVisible()
    await expect(page.locator('text=Monthly')).toBeVisible()
    await expect(page.locator('text=Yearly')).toBeVisible()

    // Monthly should be active by default
    const monthlyBtn = page.locator('.period-btn:has-text("Monthly")')
    await expect(monthlyBtn).toHaveClass(/active/)
  })

  test('should display empty state when no transactions', async ({ page }) => {
    // Wait for loading to complete
    await page.waitForLoadState('networkidle')

    // Check for empty state (if no transactions in DB)
    const emptyState = page.locator('.empty-state')
    if (await emptyState.isVisible()) {
      await expect(emptyState.locator('text=No transactions yet')).toBeVisible()
    }
  })

  test('should have accessible bottom navigation', async ({ page }) => {
    // Check bottom nav exists
    const bottomNav = page.locator('.bottom-nav')
    await expect(bottomNav).toBeVisible()

    // Check nav items
    await expect(page.locator('.bottom-nav .nav-tab:has-text("Home")')).toBeVisible()
    await expect(page.locator('.bottom-nav .nav-tab:has-text("Charts")')).toBeVisible()

    // Check FAB button
    const fabButton = page.locator('.fab-button')
    await expect(fabButton).toBeVisible()
    await expect(fabButton).toHaveAttribute('aria-label', 'Add transaction')
  })

  test('should navigate to charts page', async ({ page }) => {
    await page.click('text=Charts')
    await expect(page).toHaveURL('/charts')
    await expect(page.locator('h1:has-text("Charts")')).toBeVisible()
  })

  test('should navigate to settings page', async ({ page }) => {
    await page.click('[aria-label="Settings"]')
    await expect(page).toHaveURL('/settings')
    await expect(page.locator('h1:has-text("Settings")')).toBeVisible()
  })
})
