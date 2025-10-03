/**
 * Charts Composable
 * Handles chart data processing and formatting
 * Constitutional Compliance: Code Quality (TypeScript, JSDoc, < 50 lines per function)
 */

import type { Transaction, ChartDataPoint } from '~/types/models'

/**
 * Composable for chart data management
 * @returns Chart data processing methods
 */
export const useCharts = () => {
  /**
   * Process transactions into category breakdown
   */
  const processCategoryBreakdown = (
    transactions: readonly Transaction[],
    categories: readonly { _id: string; name: string; color: string }[]
  ): ChartDataPoint[] => {
    // Group by category
    const categoryTotals = new Map<string, number>()

    transactions.forEach(t => {
      const current = categoryTotals.get(t.categoryId) || 0
      categoryTotals.set(t.categoryId, current + t.amount)
    })

    // Calculate total for percentages
    const total = Array.from(categoryTotals.values()).reduce((sum, val) => sum + val, 0)

    // Create chart data points
    const dataPoints: ChartDataPoint[] = []
    categoryTotals.forEach((value, categoryId) => {
      const category = categories.find(c => c._id === categoryId)
      if (category) {
        dataPoints.push({
          label: category.name,
          value,
          color: category.color,
          percentage: total > 0 ? (value / total) * 100 : 0
        })
      }
    })

    return dataPoints.sort((a, b) => b.value - a.value)
  }

  /**
   * Format chart data for Chart.js
   */
  const formatForChartJS = (dataPoints: ChartDataPoint[]) => {
    return {
      labels: dataPoints.map(d => d.label),
      datasets: [
        {
          data: dataPoints.map(d => d.value),
          backgroundColor: dataPoints.map(d => d.color),
          borderWidth: 0
        }
      ]
    }
  }

  return {
    processCategoryBreakdown,
    formatForChartJS
  }
}
