<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    :aria-label="ariaLabel"
    :aria-busy="loading"
    @click="handleClick"
  >
    <span v-if="loading" class="spinner" aria-hidden="true"></span>
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
/**
 * Button Component
 * Constitutional Compliance: UX Consistency, Accessibility (44px height, ARIA labels)
 */

interface Props {
  variant?: 'primary' | 'secondary' | 'danger'
  loading?: boolean
  disabled?: boolean
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  loading: false,
  disabled: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => ({
  btn: true,
  [`btn-${props.variant}`]: true,
  'btn-loading': props.loading,
  'btn-disabled': props.disabled
}))

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
.btn {
  height: var(--button-height);
  padding: 0 var(--spacing-md);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
}

.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.btn-primary:hover:not(:disabled) {
  background-color: #0d9668;
}

.btn-secondary {
  background-color: var(--color-gray-100);
  color: var(--color-gray-500);
}

.btn-secondary:hover:not(:disabled) {
  background-color: var(--color-gray-200);
}

.btn-danger {
  background-color: var(--color-error);
  color: var(--color-white);
}

.btn-danger:hover:not(:disabled) {
  background-color: #dc2626;
}

.btn:disabled,
.btn-disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
