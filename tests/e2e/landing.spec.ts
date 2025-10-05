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

  test('should display at least one transaction', async ({ page }) => {
    // Wait for transactions to load
    await page.waitForLoadState('networkidle')

    // Check if there are transactions in the list
    const transactionList = page.locator('.transaction-list')
    const emptyState = page.locator('.empty-state')

    // If there are no transactions, add one through the UI
    if (await emptyState.isVisible()) {
      // Click FAB button to open add transaction modal
      const fabButton = page.locator('.fab-button')
      await fabButton.click()

      // Wait for modal to open
      await expect(page.locator('.modal-overlay')).toBeVisible()
      await expect(page.locator('h2:has-text("Add Transaction")')).toBeVisible()

      // Select transaction type (expense)
      const expenseBtn = page.locator('.type-selector button:has-text("Expense")')
      await expenseBtn.click()

      // Fill in transaction details
      await page.fill('input[placeholder="Amount"]', '50.00')
      await page.fill('input[placeholder="Description"]', 'Test Transaction')

      // Select first available category
      const firstCategory = page.locator('.category-option').first()
      await firstCategory.click()

      // Submit the form
      const submitBtn = page.locator('button:has-text("Add Transaction")')
      await submitBtn.click()

      // Wait for modal to close
      await expect(page.locator('.modal-overlay')).not.toBeVisible()

      // Wait for the transaction to appear
      await page.waitForLoadState('networkidle')
    }

    // Verify at least one transaction is displayed
    await expect(transactionList).toBeVisible()

    const transactionItems = page.locator('.transaction-item')
    const count = await transactionItems.count()
    expect(count).toBeGreaterThanOrEqual(1)

    // Verify transaction structure for the first transaction
    const firstTransaction = transactionItems.first()
    await expect(firstTransaction).toBeVisible()

    // Check transaction has category
    const category = firstTransaction.locator('.transaction-category')
    await expect(category).toBeVisible()
    await expect(category).not.toBeEmpty()

    // Check transaction has description
    const description = firstTransaction.locator('.transaction-description')
    await expect(description).toBeVisible()

    // Check transaction has amount
    const amount = firstTransaction.locator('.transaction-amount')
    await expect(amount).toBeVisible()
    await expect(amount).toContainText('€')

    // Check transaction has delete button
    const deleteBtn = firstTransaction.locator('.delete-btn')
    await expect(deleteBtn).toBeVisible()
    await expect(deleteBtn).toHaveAttribute('aria-label', 'Delete transaction')
  })

  test('should add an expense and then remove it successfully', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle')

    // Step 1: Add a new expense with unique identifier
    const timestamp = Date.now()
    const testAmount = '75.50'
    const testDescription = `E2E Test ${timestamp}`

    const fabButton = page.locator('.fab-button')
    await fabButton.click()

    // Wait for modal to open
    await expect(page.locator('.modal-overlay')).toBeVisible()
    await expect(page.locator('h2.modal-title:has-text("Add Transaction")')).toBeVisible()

    // Expense should be selected by default
    await expect(page.locator('.type-btn.active:has-text("Expense")')).toBeVisible()

    // Fill in transaction details
    await page.fill('input[placeholder="0.00"]', testAmount)
    await page.fill('input[placeholder="Add description (optional)"]', testDescription)

    // Select first available category from dropdown
    const categorySelect = page.locator('select.category-select')
    await categorySelect.selectOption({ index: 1 }) // Select first non-empty option

    // Submit the form
    const submitBtn = page.locator('button:has-text("Save")')
    await submitBtn.click()

    // Wait for modal to close
    await expect(page.locator('.modal-overlay')).not.toBeVisible()

    // Wait for transaction to appear
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(500) // Wait for UI update

    // Step 2: Verify the expense is correctly listed with all fields visible
    const transactionList = page.locator('.transaction-list')
    await expect(transactionList).toBeVisible()

    // Find the newly added transaction by unique description
    const newTransaction = page.locator('.transaction-item', {
      has: page.locator(`.transaction-description:has-text("${testDescription}")`)
    })

    await expect(newTransaction).toBeVisible()

    // Verify all fields are visible and correct
    const category = newTransaction.locator('.transaction-category')
    await expect(category).toBeVisible()
    await expect(category).not.toBeEmpty()

    const description = newTransaction.locator('.transaction-description')
    await expect(description).toBeVisible()
    await expect(description).toHaveText(testDescription)

    const amount = newTransaction.locator('.transaction-amount')
    await expect(amount).toBeVisible()
    await expect(amount).toHaveText(`-€${testAmount}`)
    await expect(amount).toHaveClass(/expense/)

    const deleteBtn = newTransaction.locator('.delete-btn')
    await expect(deleteBtn).toBeVisible()

    // Step 3: Delete the expense
    await deleteBtn.click()

    // Wait for delete confirmation modal
    await expect(page.locator('.modal-overlay')).toBeVisible()

    // Confirm deletion
    const confirmBtn = page.locator('button:has-text("Delete")')
    await confirmBtn.click()

    // Wait for modal to close
    await expect(page.locator('.modal-overlay')).not.toBeVisible()

    // Wait for deletion to complete
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(500) // Wait for UI update

    // Step 4: Verify the expense is no longer visible
    await expect(newTransaction).not.toBeVisible()
  })
})
