/**
 * CSV Export Composable
 * Handles CSV generation and download
 * Constitutional Compliance: Code Quality (TypeScript, JSDoc)
 */

import type { Transaction } from '~/types/models'

/**
 * Composable for CSV export functionality
 * @returns Export methods
 */
export const useCSVExport = () => {
  /**
   * Generate CSV content from transactions
   */
  const generateCSV = (transactions: readonly Transaction[]): string => {
    // CSV Header
    const headers = ['Date', 'Type', 'Category', 'Description', 'Amount']
    const rows = [headers]

    // Add transaction rows
    transactions.forEach(transaction => {
      const row = [
        new Date(transaction.date).toLocaleDateString(),
        transaction.type,
        '', // Category name (will need to be populated)
        transaction.description || '',
        transaction.amount.toFixed(2)
      ]
      rows.push(row)
    })

    // Convert to CSV string
    return rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')
  }

  /**
   * Download CSV file
   */
  const downloadCSV = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)

    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    URL.revokeObjectURL(url)
  }

  /**
   * Export transactions to CSV
   */
  const exportTransactions = (transactions: readonly Transaction[], period: string = 'monthly') => {
    const csv = generateCSV(transactions)
    const date = new Date().toISOString().split('T')[0]
    const filename = `expenseshub-transactions-${period}-${date}.csv`

    downloadCSV(csv, filename)
  }

  return {
    generateCSV,
    downloadCSV,
    exportTransactions
  }
}
