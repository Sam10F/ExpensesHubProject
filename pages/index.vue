<template>
  <div class="landing-page">
    <!-- Available Money Card -->
    <UICard class="available-money-card">
      <p class="label">Available this month</p>
      <h2 class="amount" :class="{ positive: availableMoney >= 0, negative: availableMoney < 0 }">
        €{{ Math.abs(availableMoney).toFixed(2) }}
      </h2>
    </UICard>

    <!-- Period Selector -->
    <div class="period-selector">
      <button
        v-for="period in periods"
        :key="period"
        :class="{ active: selectedPeriod === period }"
        class="period-btn"
        @click="selectedPeriod = period"
      >
        {{ period }}
      </button>
    </div>

    <!-- Export Button -->
    <button v-if="transactions.length > 0" class="export-btn" @click="showExportModal = true">
      <i class="pi pi-download" />
      <span>Export to CSV</span>
    </button>

    <!-- Transaction List -->
    <div class="transactions-section">
      <h3>Recent Transactions</h3>

      <div v-if="transactionsLoading" class="loading">Loading transactions...</div>

      <div v-else-if="transactionsError" class="error">
        {{ transactionsError }}
      </div>

      <div v-else-if="transactions.length === 0" class="empty-state">
        <p>No transactions yet</p>
        <p class="empty-hint">Click the + button to add your first transaction</p>
      </div>

      <div v-else class="transaction-list">
        <div v-for="transaction in transactions" :key="transaction._id" class="transaction-item">
          <div class="transaction-info">
            <p class="transaction-category">{{ getCategoryName(transaction.categoryId) }}</p>
            <p class="transaction-description">{{ transaction.description }}</p>
          </div>
          <div class="transaction-right">
            <p class="transaction-amount" :class="transaction.type">
              {{ transaction.type === 'expense' ? '-' : '+' }}€{{ transaction.amount.toFixed(2) }}
            </p>
            <button
              class="delete-btn"
              aria-label="Delete transaction"
              @click="confirmDelete(transaction)"
            >
              <i class="pi pi-trash" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <ModalDeleteConfirmation
      v-model="showDeleteModal"
      :loading="deleting"
      @confirm="handleDelete"
      @cancel="showDeleteModal = false"
    />
    <ModalExportCSV v-model="showExportModal" />
  </div>
</template>

<script setup lang="ts">
/**
 * Landing Page
 * Constitutional Compliance: UX Consistency, Performance (optimistic updates)
 */

definePageMeta({
  layout: 'default'
})

const {
  transactions,
  loading: transactionsLoading,
  error: transactionsError,
  fetchTransactions,
  deleteTransaction
} = useTransactions()
const { categories, fetchCategories } = useCategories()

const periods = ['Weekly', 'Monthly', 'Yearly']
const selectedPeriod = ref('Monthly')
const showDeleteModal = ref(false)
const showExportModal = ref(false)
const transactionToDelete = ref<string | null>(null)
const deleting = ref(false)

// Calculate available money (incomes - expenses)
const availableMoney = computed(() => {
  const incomes = transactions.value
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
  const expenses = transactions.value
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)
  return incomes - expenses
})

// Helper to get category name
const getCategoryName = (categoryId: string) => {
  const category = categories.value.find(c => String(c._id) === String(categoryId))
  return category?.name || 'Unknown'
}

// Confirm delete
const confirmDelete = (transaction: (typeof transactions.value)[0]) => {
  transactionToDelete.value = transaction._id
  showDeleteModal.value = true
}

// Handle delete
const handleDelete = async () => {
  if (!transactionToDelete.value) return

  deleting.value = true
  try {
    await deleteTransaction(transactionToDelete.value)
    showDeleteModal.value = false
    transactionToDelete.value = null
  } catch (error) {
    console.error('Failed to delete transaction:', error)
  } finally {
    deleting.value = false
  }
}

// Fetch data on mount
onMounted(async () => {
  await fetchCategories()
  await fetchTransactions()
})
</script>

<style scoped>
.landing-page {
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.available-money-card {
  text-align: center;
  padding: var(--spacing-lg) !important;
}

.label {
  font-size: var(--font-size-body);
  color: var(--color-gray-500);
  margin-bottom: var(--spacing-sm);
}

.amount {
  font-size: 40px;
  font-weight: var(--font-weight-bold);
}

.amount.positive {
  color: var(--color-primary);
}

.amount.negative {
  color: var(--color-error);
}

.period-selector {
  background-color: var(--color-white);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm);
  display: flex;
  gap: var(--spacing-sm);
}

.period-btn {
  flex: 1;
  height: 32px;
  border: none;
  background-color: var(--color-gray-100);
  color: var(--color-gray-500);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all 0.2s ease;
}

.period-btn.active {
  background-color: var(--color-primary);
  color: var(--color-white);
  font-weight: var(--font-weight-semibold);
}

.transactions-section h3 {
  margin-bottom: var(--spacing-md);
}

.transaction-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.transaction-item {
  background-color: var(--color-white);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.transaction-info {
  flex: 1;
}

.transaction-category {
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
  margin-bottom: 4px;
}

.transaction-description {
  font-size: var(--font-size-caption);
  color: var(--color-gray-500);
}

.transaction-amount {
  font-size: 15px;
  font-weight: var(--font-weight-semibold);
}

.transaction-amount.expense {
  color: var(--color-error);
}

.transaction-amount.income {
  color: var(--color-primary);
}

.loading,
.error,
.empty-state {
  text-align: center;
  padding: var(--spacing-xl);
  color: var(--color-gray-500);
}

.empty-hint {
  font-size: var(--font-size-caption);
  margin-top: var(--spacing-sm);
}

.error {
  color: var(--color-error);
}

.export-btn {
  width: 100%;
  height: 40px;
  background-color: var(--color-white);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  color: var(--color-gray-600);
  font-size: var(--font-size-body);
  cursor: pointer;
  transition: all 0.2s ease;
}

.export-btn:hover {
  background-color: var(--color-gray-50);
  border-color: var(--color-gray-300);
}

.transaction-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.delete-btn {
  width: 26px;
  height: 26px;
  border: none;
  background-color: #fee2e2;
  border-radius: 50%;
  color: var(--color-error);
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.delete-btn:hover {
  background-color: #fee;
}
</style>
