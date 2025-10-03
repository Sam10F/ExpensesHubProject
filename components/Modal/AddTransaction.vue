<template>
  <UIModal v-model="isOpen" aria-label="Add Transaction" :close-on-overlay="false">
    <div class="add-transaction-modal">
      <h2 class="modal-title">Add Transaction</h2>

      <!-- Type Toggle -->
      <div class="type-toggle">
        <button
          :class="{ active: form.type === 'expense' }"
          class="type-btn"
          @click="form.type = 'expense'"
        >
          Expense
        </button>
        <button
          :class="{ active: form.type === 'income' }"
          class="type-btn"
          @click="form.type = 'income'"
        >
          Income
        </button>
      </div>

      <!-- Amount Input -->
      <UIInput
        v-model="form.amount"
        type="number"
        label="AMOUNT"
        placeholder="0.00"
        :error="errors.amount"
      />

      <!-- Category Dropdown -->
      <div class="form-group">
        <label class="input-label">CATEGORY</label>
        <select
          v-model="form.categoryId"
          class="category-select"
          :aria-invalid="!!errors.categoryId"
        >
          <option value="">Select category...</option>
          <option v-for="category in filteredCategories" :key="category._id" :value="category._id">
            {{ category.icon }} {{ category.name }}
          </option>
        </select>
        <p v-if="errors.categoryId" class="error-message">{{ errors.categoryId }}</p>
      </div>

      <!-- Description Input -->
      <UIInput
        v-model="form.description"
        label="DESCRIPTION"
        placeholder="Add description (optional)"
        :error="errors.description"
      />

      <!-- Action Buttons -->
      <div class="modal-actions">
        <UIButton variant="secondary" @click="cancel"> Cancel </UIButton>
        <UIButton :loading="loading" @click="save"> Save </UIButton>
      </div>
    </div>
  </UIModal>
</template>

<script setup lang="ts">
/**
 * Add Transaction Modal
 * Constitutional Compliance: UX Consistency, Code Quality (validation)
 */

interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  saved: []
}>()

const { categories, fetchCategories } = useCategories()
const { addTransaction, loading } = useTransactions()

const isOpen = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const form = reactive({
  type: 'expense' as 'expense' | 'income',
  amount: '',
  categoryId: '',
  description: ''
})

const errors = reactive({
  amount: '',
  categoryId: '',
  description: ''
})

const filteredCategories = computed(() => categories.value.filter(c => c.type === form.type))

const validate = () => {
  let isValid = true

  // Reset errors
  errors.amount = ''
  errors.categoryId = ''
  errors.description = ''

  // Validate amount
  const amount = parseFloat(form.amount)
  if (!form.amount || isNaN(amount) || amount <= 0) {
    errors.amount = 'Amount is required and must be positive'
    isValid = false
  } else if (amount > 1000000) {
    errors.amount = 'Amount is too large'
    isValid = false
  }

  // Validate category
  if (!form.categoryId) {
    errors.categoryId = 'Category is required'
    isValid = false
  }

  // Validate description
  if (form.description && form.description.length > 200) {
    errors.description = 'Description cannot exceed 200 characters'
    isValid = false
  }

  return isValid
}

const save = async () => {
  if (!validate()) {
    return
  }

  try {
    await addTransaction({
      type: form.type,
      amount: parseFloat(form.amount),
      categoryId: form.categoryId,
      description: form.description || undefined,
      date: new Date()
    })

    // Reset form
    form.amount = ''
    form.categoryId = ''
    form.description = ''

    // Close modal
    emit('saved')
    isOpen.value = false
  } catch (error) {
    console.error('Failed to save transaction:', error)
  }
}

const cancel = () => {
  // Reset form
  form.amount = ''
  form.categoryId = ''
  form.description = ''

  // Reset errors
  errors.amount = ''
  errors.categoryId = ''
  errors.description = ''

  isOpen.value = false
}

// Fetch categories when modal opens
watch(isOpen, newValue => {
  if (newValue && categories.value.length === 0) {
    fetchCategories()
  }
})
</script>

<style scoped>
.add-transaction-modal {
  width: min(327px, 90vw);
  padding: var(--spacing-lg);
}

.modal-title {
  font-size: var(--font-size-h2);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-lg);
}

.type-toggle {
  background-color: var(--color-gray-50);
  border-radius: var(--radius-md);
  padding: 4px;
  display: flex;
  gap: 4px;
  margin-bottom: var(--spacing-lg);
}

.type-btn {
  flex: 1;
  height: 36px;
  border: none;
  background-color: transparent;
  color: var(--color-gray-500);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all 0.2s ease;
}

.type-btn.active {
  background-color: var(--color-error);
  color: var(--color-white);
  font-weight: var(--font-weight-semibold);
}

.type-btn.active[data-type='income'] {
  background-color: var(--color-primary);
}

.form-group {
  margin-bottom: var(--spacing-md);
}

.input-label {
  display: block;
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-500);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: var(--spacing-sm);
}

.category-select {
  width: 100%;
  height: var(--input-height);
  padding: 0 var(--spacing-md);
  background-color: var(--color-gray-50);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-md);
  font-size: var(--font-size-body);
  color: var(--color-gray-900);
  cursor: pointer;
}

.category-select:focus {
  outline: none;
  border-color: var(--color-primary);
}

.error-message {
  font-size: var(--font-size-caption);
  color: var(--color-error);
  margin-top: 4px;
}

.modal-actions {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
}

.modal-actions button {
  flex: 1;
}
</style>
