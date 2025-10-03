<template>
  <div :class="cardClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * Card Component
 * Constitutional Compliance: UX Consistency (12px radius, consistent padding)
 */

interface Props {
  shadow?: boolean
  padding?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  shadow: false,
  padding: 'md'
})

const cardClasses = computed(() => ({
  card: true,
  'card-shadow': props.shadow,
  [`card-padding-${props.padding}`]: true
}))
</script>

<style scoped>
.card {
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
}

.card-padding-sm {
  padding: var(--spacing-sm);
}

.card-padding-md {
  padding: var(--spacing-md);
}

.card-padding-lg {
  padding: var(--spacing-lg);
}

.card-shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
