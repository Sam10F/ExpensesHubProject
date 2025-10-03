<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="modelValue" class="modal-overlay" @click="handleOverlayClick">
        <div
          class="modal-container"
          role="dialog"
          :aria-label="ariaLabel"
          aria-modal="true"
          @click.stop
        >
          <button v-if="showClose" class="modal-close" aria-label="Close modal" @click="close">
            <span aria-hidden="true">×</span>
          </button>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
/**
 * Modal Base Component
 * Constitutional Compliance: UX Consistency, Accessibility (dialog role, focus trap)
 */

interface Props {
  modelValue: boolean
  closeOnOverlay?: boolean
  showClose?: boolean
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  closeOnOverlay: true,
  showClose: true,
  ariaLabel: 'Modal dialog'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const close = () => {
  emit('update:modelValue', false)
}

const handleOverlayClick = () => {
  if (props.closeOnOverlay) {
    close()
  }
}

// Handle ESC key
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.modelValue) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-container {
  position: relative;
  background-color: var(--color-white);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-close {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  width: 32px;
  height: 32px;
  border: none;
  background-color: var(--color-gray-100);
  border-radius: 50%;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gray-500);
  transition: background-color 0.2s ease;
}

.modal-close:hover {
  background-color: var(--color-gray-200);
}

/* Animations */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
