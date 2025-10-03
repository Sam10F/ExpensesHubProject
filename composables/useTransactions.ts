/**
 * Transaction Management Composable
 * Handles CRUD operations for transactions
 * Constitutional Compliance: Code Quality (TypeScript, JSDoc, error handling)
 */

import type {
  Transaction,
  CreateTransactionInput,
  UpdateTransactionInput,
  PeriodFilter
} from '~/types/models'

/**
 * Composable for managing transactions
 * @returns Transaction state and CRUD methods
 */
export const useTransactions = () => {
  const transactions = useState<Transaction[]>('transactions', () => [])
  const loading = useState('transactions-loading', () => false)
  const error = useState<string | null>('transactions-error', () => null)

  /**
   * Fetch transactions with optional filtering
   */
  const fetchTransactions = async (
    filter?: Partial<PeriodFilter> & { type?: 'expense' | 'income' }
  ) => {
    loading.value = true
    error.value = null

    try {
      const query: Record<string, string> = {}

      if (filter?.startDate) {
        query.startDate = filter.startDate.toISOString()
      }
      if (filter?.endDate) {
        query.endDate = filter.endDate.toISOString()
      }
      if (filter?.type) {
        query.type = filter.type
      }

      const data = await $fetch<Transaction[]>('/api/transactions', { query })
      transactions.value = data
    } catch (err) {
      error.value = 'Failed to fetch transactions'
      console.error('Error fetching transactions:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Add a new transaction
   */
  const addTransaction = async (input: CreateTransactionInput) => {
    loading.value = true
    error.value = null

    try {
      const transaction = await $fetch<Transaction>('/api/transactions', {
        method: 'POST',
        body: input
      })

      // Optimistic update - add to local state
      transactions.value.unshift(transaction)

      return transaction
    } catch (err) {
      error.value = 'Failed to create transaction'
      console.error('Error creating transaction:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Update an existing transaction
   */
  const updateTransaction = async (id: string, updates: UpdateTransactionInput) => {
    loading.value = true
    error.value = null

    try {
      const transaction = await $fetch<Transaction>(`/api/transactions/${id}`, {
        method: 'PATCH',
        body: updates
      })

      // Update local state
      const index = transactions.value.findIndex(t => t._id === id)
      if (index !== -1) {
        transactions.value[index] = transaction
      }

      return transaction
    } catch (err) {
      error.value = 'Failed to update transaction'
      console.error('Error updating transaction:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Delete a transaction
   */
  const deleteTransaction = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      await $fetch(`/api/transactions/${id}`, {
        method: 'DELETE'
      })

      // Remove from local state
      transactions.value = transactions.value.filter(t => t._id !== id)
    } catch (err) {
      error.value = 'Failed to delete transaction'
      console.error('Error deleting transaction:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    transactions: readonly(transactions),
    loading: readonly(loading),
    error: readonly(error),
    fetchTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction
  }
}
