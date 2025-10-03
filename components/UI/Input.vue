<template>
  <div class="input-wrapper">
    <label v-if="label" :for="inputId" class="input-label">
      {{ label }}
    </label>
    <input
      :id="inputId"
      v-model="inputValue"
      :type="type"
      :placeholder="placeholder"
      :aria-label="ariaLabel || label"
      :aria-describedby="error ? `${inputId}-error` : undefined"
      :aria-invalid="!!error"
      :class="inputClasses"
      @input="handleInput"
    />
    <p v-if="error" :id="`${inputId}-error`" class="input-error" role="alert">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
/**
 * Input Component
 * Constitutional Compliance: UX Consistency, Accessibility (48px height, ARIA)
 */

interface Props {
  modelValue: string | number
  type?: 'text' | 'number' | 'email' | 'tel'
  label?: string
  placeholder?: string
  error?: string
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const inputId = `input-${Math.random().toString(36).substring(7)}`

const inputValue = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const inputClasses = computed(() => ({
  'input-field': true,
  'input-error-state': !!props.error
}))

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = props.type === 'number' ? parseFloat(target.value) : target.value
  emit('update:modelValue', value)
}
</script>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.input-label {
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-500);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.input-field {
  height: var(--input-height);
  padding: 0 var(--spacing-md);
  background-color: var(--color-gray-50);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-md);
  font-size: var(--font-size-body);
  color: var(--color-gray-900);
  transition: border-color 0.2s ease;
}

.input-field::placeholder {
  color: var(--color-gray-400);
}

.input-field:focus {
  outline: none;
  border-color: var(--color-primary);
}

.input-error-state {
  border-color: var(--color-error);
}

.input-error {
  font-size: var(--font-size-caption);
  color: var(--color-error);
  margin-top: -4px;
}
</style>
