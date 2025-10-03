<template>
  <UIModal v-model="isOpen" aria-label="Delete Confirmation">
    <div class="delete-modal">
      <div class="warning-icon">
        <i class="pi pi-exclamation-triangle" />
      </div>

      <h2 class="modal-title">{{ title }}</h2>
      <p class="modal-message">{{ message }}</p>

      <div class="modal-actions">
        <UIButton variant="secondary" @click="cancel"> Cancel </UIButton>
        <UIButton variant="danger" :loading="loading" @click="confirm"> Delete </UIButton>
      </div>
    </div>
  </UIModal>
</template>

<script setup lang="ts">
/**
 * Delete Confirmation Modal
 * Constitutional Compliance: UX Consistency (warning, clear messaging)
 */

interface Props {
  modelValue: boolean
  title?: string
  message?: string
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Delete Transaction?',
  message: 'This action cannot be undone.',
  loading: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: []
  cancel: []
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const confirm = () => {
  emit('confirm')
}

const cancel = () => {
  emit('cancel')
  isOpen.value = false
}
</script>

<style scoped>
.delete-modal {
  width: min(295px, 90vw);
  padding: var(--spacing-lg);
  text-align: center;
}

.warning-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto var(--spacing-md);
  background-color: #fee2e2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-error);
  font-size: 24px;
}

.modal-title {
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-sm);
}

.modal-message {
  font-size: var(--font-size-body);
  color: var(--color-gray-500);
  margin-bottom: var(--spacing-lg);
}

.modal-actions {
  display: flex;
  gap: var(--spacing-md);
}

.modal-actions button {
  flex: 1;
}
</style>
