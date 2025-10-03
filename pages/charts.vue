<template>
  <div class="charts-page">
    <p class="page-subtitle">Charts visualization - Full implementation in Milestone 4</p>

    <UICard>
      <h3>Category Breakdown</h3>
      <p class="placeholder-text">
        Chart components (Bar, Pie, Doughnut, Line) will be implemented in Milestone 4
      </p>
    </UICard>
  </div>
</template>

<script setup lang="ts">
/**
 * Charts Page
 * Full implementation in Milestone 4
 */

definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
.charts-page {
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.page-subtitle {
  font-size: var(--font-size-caption);
  color: var(--color-gray-500);
}

.placeholder-text {
  margin-top: var(--spacing-md);
  color: var(--color-gray-400);
  text-align: center;
}
</style>
