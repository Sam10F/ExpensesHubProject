<template>
  <div class="chart-container">
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
/**
 * Pie Chart Component
 * Constitutional Compliance: UX Consistency, Accessibility
 */

import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

interface Props {
  data: {
    labels: string[]
    datasets: Array<{ data: number[]; backgroundColor: string[]; borderWidth: number }>
  }
}

const props = defineProps<Props>()

const chartData = computed(() => props.data)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'right' as const },
    tooltip: { enabled: true }
  }
}
</script>

<style scoped>
.chart-container {
  height: 300px;
}
</style>
