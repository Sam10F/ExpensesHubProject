<template>
  <div class="settings-page">
    <section class="settings-section">
      <h3 class="section-label">EXPENSE CATEGORIES</h3>
      <UICard>
        <div v-if="categoriesLoading">Loading categories...</div>
        <div v-else class="category-list">
          <div v-for="category in expenseCategories" :key="category._id" class="category-item">
            <span>{{ category.icon }}</span>
            <span>{{ category.name }}</span>
          </div>
        </div>
      </UICard>
    </section>

    <section class="settings-section">
      <h3 class="section-label">INCOME CATEGORIES</h3>
      <UICard>
        <div v-if="categoriesLoading">Loading categories...</div>
        <div v-else class="category-list">
          <div v-for="category in incomeCategories" :key="category._id" class="category-item">
            <span>{{ category.icon }}</span>
            <span>{{ category.name }}</span>
          </div>
        </div>
      </UICard>
    </section>

    <p class="settings-note">Full settings implementation in Milestone 5</p>
  </div>
</template>

<script setup lang="ts">
/**
 * Settings Page
 * Full implementation in Milestone 5
 */

definePageMeta({
  layout: 'default'
})

const { categories, loading: categoriesLoading, fetchCategories } = useCategories()

const expenseCategories = computed(() => categories.value.filter(c => c.type === 'expense'))
const incomeCategories = computed(() => categories.value.filter(c => c.type === 'income'))

onMounted(() => {
  fetchCategories()
})
</script>

<style scoped>
.settings-page {
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.settings-section {
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

.category-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.category-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  font-size: var(--font-size-body);
}

.settings-note {
  font-size: var(--font-size-caption);
  color: var(--color-gray-400);
  text-align: center;
  margin-top: var(--spacing-xl);
}
</style>
