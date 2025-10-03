<template>
  <div class="chart-container">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
/**
 * Line Chart Component
 * Constitutional Compliance: UX Consistency, Accessibility
 */

import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend)

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
