<template>
  <UIModal v-model="isOpen" aria-label="Edit Category">
    <div class="edit-category-modal">
      <h2 class="modal-title">{{ isEditing ? 'Edit' : 'Add' }} Category</h2>

      <!-- Name Input -->
      <UIInput v-model="form.name" label="NAME" placeholder="Category name" :error="errors.name" />

      <!-- Icon Input -->
      <UIInput v-model="form.icon" label="ICON" placeholder="🔷 (emoji)" :error="errors.icon" />

      <!-- Color Input -->
      <UIInput v-model="form.color" label="COLOR" placeholder="#8B5CF6" :error="errors.color" />

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
 * Edit Category Modal
 * Constitutional Compliance: UX Consistency, Code Quality (validation)
 */

import type { Category } from '~/types/models'

interface Props {
  modelValue: boolean
  category?: Category | null
  type: 'expense' | 'income'
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  saved: []
}>()

const { addCategory } = useCategories()

const isOpen = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const isEditing = computed(() => !!props.category)
const loading = ref(false)

const form = reactive({
  name: '',
  icon: '',
  color: ''
})

const errors = reactive({
  name: '',
  icon: '',
  color: ''
})

// Initialize form when category changes
watch(
  () => props.category,
  cat => {
    if (cat) {
      form.name = cat.name
      form.icon = cat.icon
      form.color = cat.color
    } else {
      form.name = ''
      form.icon = '🔷'
      form.color = '#8B5CF6'
    }
  },
  { immediate: true }
)

const validate = () => {
  let isValid = true

  errors.name = ''
  errors.icon = ''
  errors.color = ''

  if (!form.name || form.name.length < 1 || form.name.length > 30) {
    errors.name = 'Name must be 1-30 characters'
    isValid = false
  }

  if (!form.icon) {
    errors.icon = 'Icon is required'
    isValid = false
  }

  if (!/^#[0-9A-Fa-f]{6}$/.test(form.color)) {
    errors.color = 'Invalid hex color (e.g., #10B981)'
    isValid = false
  }

  return isValid
}

const save = async () => {
  if (!validate()) return

  loading.value = true
  try {
    await addCategory({
      name: form.name,
      icon: form.icon,
      color: form.color,
      type: props.type,
      isDefault: false,
      order: 0
    })

    emit('saved')
    isOpen.value = false
  } catch (error) {
    console.error('Failed to save category:', error)
  } finally {
    loading.value = false
  }
}

const cancel = () => {
  isOpen.value = false
}
</script>

<style scoped>
.edit-category-modal {
  width: min(327px, 90vw);
  padding: var(--spacing-lg);
}

.modal-title {
  font-size: var(--font-size-h2);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-lg);
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
