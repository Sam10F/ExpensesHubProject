<template>
  <div class="settings-page">
    <!-- Expense Categories -->
    <section class="settings-section">
      <h3 class="section-label">EXPENSE CATEGORIES</h3>
      <UICard>
        <div v-if="categoriesLoading">Loading categories...</div>
        <div v-else class="category-list">
          <div v-for="category in expenseCategories" :key="category._id" class="category-item">
            <div class="category-icon" :style="{ backgroundColor: category.color + '33' }">
              {{ category.icon }}
            </div>
            <span class="category-name">{{ category.name }}</span>
            <button
              v-if="!category.isDefault"
              class="category-action delete"
              aria-label="Delete category"
              @click="confirmDeleteCategory(category)"
            >
              <i class="pi pi-trash" />
            </button>
          </div>
          <button class="add-category-btn" @click="openAddCategory('expense')">
            + Add Category
          </button>
        </div>
      </UICard>
    </section>

    <!-- Income Categories -->
    <section class="settings-section">
      <h3 class="section-label">INCOME CATEGORIES</h3>
      <UICard>
        <div v-if="categoriesLoading">Loading categories...</div>
        <div v-else class="category-list">
          <div v-for="category in incomeCategories" :key="category._id" class="category-item">
            <div class="category-icon" :style="{ backgroundColor: category.color + '33' }">
              {{ category.icon }}
            </div>
            <span class="category-name">{{ category.name }}</span>
            <button
              v-if="!category.isDefault"
              class="category-action delete"
              aria-label="Delete category"
              @click="confirmDeleteCategory(category)"
            >
              <i class="pi pi-trash" />
            </button>
          </div>
          <button class="add-category-btn" @click="openAddCategory('income')">
            + Add Category
          </button>
        </div>
      </UICard>
    </section>

    <!-- Modals -->
    <ModalEditCategory
      v-model="showEditModal"
      :category="categoryToEdit"
      :type="categoryType"
      @saved="handleCategorySaved"
    />
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

const expenseCategories = computed(() =>
  categories.value.filter(c => c.type === 'expense').sort((a, b) => a.order - b.order)
)
const incomeCategories = computed(() =>
  categories.value.filter(c => c.type === 'income').sort((a, b) => a.order - b.order)
)

const showEditModal = ref(false)
const categoryToEdit = ref(null)
const categoryType = ref<'expense' | 'income'>('expense')

const openAddCategory = (type: 'expense' | 'income') => {
  categoryType.value = type
  categoryToEdit.value = null
  showEditModal.value = true
}

const confirmDeleteCategory = (category: (typeof categories.value)[0]) => {
  // TODO: Implement delete with confirmation
  console.log('Delete category:', category)
}

const handleCategorySaved = async () => {
  await fetchCategories()
}

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
  padding: var(--spacing-sm) 0;
}

.category-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.category-name {
  flex: 1;
  font-weight: var(--font-weight-medium);
}

.category-action {
  width: 24px;
  height: 24px;
  border: none;
  background-color: transparent;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.category-action.delete {
  color: var(--color-error);
}

.category-action.delete:hover {
  background-color: #fee2e2;
}

.add-category-btn {
  width: 100%;
  height: 24px;
  border: none;
  background-color: var(--color-gray-100);
  border-radius: var(--radius-sm);
  color: var(--color-primary);
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  margin-top: var(--spacing-sm);
  transition: background-color 0.2s ease;
}

.add-category-btn:hover {
  background-color: var(--color-gray-200);
}
</style>
