<template>
  <div class="chart-container">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
/**
 * Bar Chart Component
 * Constitutional Compliance: UX Consistency, Accessibility
 */

import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

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
    legend: { display: false },
    tooltip: { enabled: true }
  },
  scales: {
    y: { beginAtZero: true, ticks: { callback: (value: number | string) => `€${value}` } }
  }
}
</script>

<style scoped>
.chart-container {
  height: 300px;
}
</style>
