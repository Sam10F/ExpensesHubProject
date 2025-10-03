/**
 * Charts Page E2E Tests
 * Constitutional Compliance: Testing Standards (Playwright, cross-browser)
 */

import { test, expect } from '@playwright/test'

test.describe('Charts Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/charts')
  })

  test('should display charts page with all selectors', async ({ page }) => {
    await expect(page).toHaveTitle(/ExpensesHub/)
    await expect(page.locator('h1:has-text("Charts")')).toBeVisible()

    // Check period selector
    await expect(page.locator('text=TIME PERIOD')).toBeVisible()
    await expect(page.locator('.selector-btn:has-text("Daily")')).toBeVisible()
    await expect(page.locator('.selector-btn:has-text("Monthly")')).toBeVisible()

    // Check data type selector
    await expect(page.locator('text=DATA TYPE')).toBeVisible()
    await expect(page.locator('.selector-btn:has-text("Expenses")')).toBeVisible()
    await expect(page.locator('.selector-btn:has-text("Incomes")')).toBeVisible()

    // Check chart type selector
    await expect(page.locator('text=CHART TYPE')).toBeVisible()
    await expect(page.locator('.selector-btn:has-text("Bar")')).toBeVisible()
    await expect(page.locator('.selector-btn:has-text("Pie")')).toBeVisible()
  })

  test('should switch between chart types', async ({ page }) => {
    // Bar should be active by default
    const barBtn = page.locator('.selector-btn:has-text("Bar")').last()
    await expect(barBtn).toHaveClass(/active/)

    // Switch to Pie
    await page.click('.selector-btn:has-text("Pie")')
    const pieBtn = page.locator('.selector-btn:has-text("Pie")').last()
    await expect(pieBtn).toHaveClass(/active/)

    // Switch to Doughnut
    await page.click('.selector-btn:has-text("Doughnut")')
    const doughnutBtn = page.locator('.selector-btn:has-text("Doughnut")')
    await expect(doughnutBtn).toHaveClass(/active/)
  })

  test('should switch between expenses and incomes', async ({ page }) => {
    // Expenses should be active by default
    const expensesBtn = page.locator('.selector-btn:has-text("Expenses")').last()
    await expect(expensesBtn).toHaveClass(/active/)

    // Switch to Incomes
    await page.click('.selector-btn:has-text("Incomes")')
    const incomesBtn = page.locator('.selector-btn:has-text("Incomes")')
    await expect(incomesBtn).toHaveClass(/active/)

    // Chart title should update
    await expect(page.locator('.chart-title')).toContainText('Incomes')
  })
})
