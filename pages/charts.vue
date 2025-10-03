<template>
  <div class="charts-page">
    <!-- Period Selector -->
    <section class="selector-section">
      <h3 class="section-label">TIME PERIOD</h3>
      <div class="selector-group">
        <button
          v-for="p in periods"
          :key="p"
          :class="{ active: selectedPeriod === p }"
          class="selector-btn"
          @click="selectedPeriod = p"
        >
          {{ p }}
        </button>
      </div>
    </section>

    <!-- Data Type Selector -->
    <section class="selector-section">
      <h3 class="section-label">DATA TYPE</h3>
      <div class="selector-group two-col">
        <button
          :class="{ active: dataType === 'expenses' }"
          class="selector-btn"
          @click="dataType = 'expenses'"
        >
          Expenses
        </button>
        <button
          :class="{ active: dataType === 'incomes' }"
          class="selector-btn"
          @click="dataType = 'incomes'"
        >
          Incomes
        </button>
      </div>
    </section>

    <!-- Chart Type Selector -->
    <section class="selector-section">
      <h3 class="section-label">CHART TYPE</h3>
      <div class="selector-group">
        <button
          v-for="type in chartTypes"
          :key="type"
          :class="{ active: chartType === type }"
          class="selector-btn"
          @click="chartType = type"
        >
          {{ type }}
        </button>
      </div>
    </section>

    <!-- Chart Display -->
    <UICard>
      <h3 class="chart-title">{{ chartTitle }}</h3>

      <div v-if="transactionsLoading" class="chart-loading">Loading chart data...</div>

      <div v-else-if="chartDataPoints.length === 0" class="chart-empty">
        No data available for this period
      </div>

      <div v-else class="chart-wrapper">
        <ChartBarChart v-if="chartType === 'Bar'" :data="chartJSData" />
        <ChartPieChart v-else-if="chartType === 'Pie'" :data="chartJSData" />
        <ChartDoughnutChart v-else-if="chartType === 'Doughnut'" :data="chartJSData" />
        <ChartLineChart v-else-if="chartType === 'Line'" :data="chartJSData" />
      </div>
    </UICard>
  </div>
</template>

<script setup lang="ts">
/**
 * Charts Page
 * Constitutional Compliance: UX Consistency, Performance (memoization)
 */

definePageMeta({
  layout: 'default'
})

const { transactions, loading: transactionsLoading, fetchTransactions } = useTransactions()
const { categories, fetchCategories } = useCategories()
const { processCategoryBreakdown, formatForChartJS } = useCharts()

const periods = ['Daily', 'Weekly', 'Monthly', 'Yearly']
const chartTypes = ['Bar', 'Pie', 'Doughnut', 'Line']

const selectedPeriod = ref('Monthly')
const dataType = ref<'expenses' | 'incomes'>('expenses')
const chartType = ref('Bar')

// Filter transactions by data type
const filteredTransactions = computed(() =>
  transactions.value.filter(t => t.type === (dataType.value.slice(0, -1) as 'expense' | 'income'))
)

// Process chart data
const chartDataPoints = computed(() =>
  processCategoryBreakdown(filteredTransactions.value, categories.value)
)

// Format for Chart.js
const chartJSData = computed(() => formatForChartJS(chartDataPoints.value))

// Chart title
const chartTitle = computed(
  () =>
    `${selectedPeriod.value} ${dataType.value.charAt(0).toUpperCase() + dataType.value.slice(1)}`
)

// Fetch data on mount
onMounted(async () => {
  await fetchCategories()
  await fetchTransactions()
})
</script>

<style scoped>
.charts-page {
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.selector-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.section-label {
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-500);
  letter-spacing: 0.5px;
}

.selector-group {
  background-color: var(--color-white);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-sm);
}

.selector-group.two-col {
  grid-template-columns: repeat(2, 1fr);
}

.selector-btn {
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

.selector-btn.active {
  background-color: var(--color-primary);
  color: var(--color-white);
  font-weight: var(--font-weight-semibold);
}

.chart-title {
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-md);
}

.chart-wrapper {
  min-height: 300px;
}

.chart-loading,
.chart-empty {
  padding: var(--spacing-xl);
  text-align: center;
  color: var(--color-gray-400);
}
</style>
