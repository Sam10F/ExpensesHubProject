<template>
  <UIModal v-model="isOpen" aria-label="Export to CSV">
    <div class="export-modal">
      <div class="export-icon">
        <i class="pi pi-download" />
      </div>

      <h2 class="modal-title">Export to CSV</h2>

      <!-- Time Period Selector -->
      <div class="form-group">
        <label class="input-label">TIME PERIOD</label>
        <div class="period-toggle">
          <button
            :class="{ active: period === 'monthly' }"
            class="period-btn"
            @click="period = 'monthly'"
          >
            Monthly
          </button>
          <button
            :class="{ active: period === 'yearly' }"
            class="period-btn"
            @click="period = 'yearly'"
          >
            Yearly
          </button>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="modal-actions">
        <UIButton variant="secondary" @click="cancel"> Cancel </UIButton>
        <UIButton @click="exportData"> Export </UIButton>
      </div>
    </div>
  </UIModal>
</template>

<script setup lang="ts">
/**
 * Export CSV Modal
 * Constitutional Compliance: UX Consistency (matches SVG design)
 */

interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const { transactions } = useTransactions()
const { exportTransactions } = useCSVExport()

const isOpen = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const period = ref<'monthly' | 'yearly'>('monthly')

const exportData = () => {
  exportTransactions(transactions.value, period.value)
  isOpen.value = false
}

const cancel = () => {
  isOpen.value = false
}
</script>

<style scoped>
.export-modal {
  width: min(311px, 90vw);
  padding: var(--spacing-lg);
}

.export-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto var(--spacing-md);
  background-color: var(--color-success-light);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  font-size: 28px;
}

.modal-title {
  font-size: var(--font-size-h2);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  text-align: center;
  margin-bottom: var(--spacing-lg);
}

.form-group {
  margin-bottom: var(--spacing-lg);
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

.period-toggle {
  background-color: var(--color-gray-50);
  border-radius: var(--radius-md);
  padding: 4px;
  display: flex;
  gap: 4px;
}

.period-btn {
  flex: 1;
  height: 32px;
  border: none;
  background-color: transparent;
  color: var(--color-gray-500);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all 0.2s ease;
}

.period-btn.active {
  background-color: var(--color-primary);
  color: var(--color-white);
  font-weight: var(--font-weight-semibold);
}

.modal-actions {
  display: flex;
  gap: var(--spacing-md);
}

.modal-actions button {
  flex: 1;
}
</style>
