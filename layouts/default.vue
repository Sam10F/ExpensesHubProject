<template>
  <div class="app-layout">
    <header class="app-header">
      <h1 class="app-title">{{ pageTitle }}</h1>
      <NuxtLink
        to="/settings"
        class="settings-icon"
        :class="{ active: isSettingsPage }"
        aria-label="Settings"
      >
        <i class="pi pi-cog" />
      </NuxtLink>
    </header>

    <main class="app-main">
      <slot />
    </main>

    <nav class="bottom-nav">
      <NuxtLink to="/" class="nav-tab" :class="{ active: route.path === '/' }">
        <i class="pi pi-home" />
        <span>Home</span>
      </NuxtLink>

      <button class="fab-button" @click="showAddModal = true" aria-label="Add transaction">
        <i class="pi pi-plus" />
      </button>

      <NuxtLink to="/charts" class="nav-tab" :class="{ active: route.path === '/charts' }">
        <i class="pi pi-chart-bar" />
        <span>Charts</span>
      </NuxtLink>
    </nav>

    <!-- Add Transaction Modal (placeholder for now) -->
    <UIModal v-model="showAddModal" aria-label="Add Transaction">
      <h2>Add Transaction</h2>
      <p>Modal implementation coming in Milestone 3</p>
    </UIModal>
  </div>
</template>

<script setup lang="ts">
/**
 * Default Layout
 * Constitutional Compliance: UX Consistency (bottom nav, header design from SVG specs)
 */

const route = useRoute()
const showAddModal = ref(false)

const pageTitle = computed(() => {
  switch (route.path) {
    case '/':
      return 'ExpensesHub'
    case '/charts':
      return 'Charts'
    case '/settings':
      return 'Settings'
    default:
      return 'ExpensesHub'
  }
})

const isSettingsPage = computed(() => route.path === '/settings')
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  height: var(--header-height);
  background-color: var(--color-white);
  padding: 0 var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-gray-200);
}

.app-title {
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
}

.settings-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--color-gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gray-500);
  text-decoration: none;
  transition: all 0.2s ease;
}

.settings-icon.active {
  background-color: var(--color-success-light);
  color: var(--color-primary);
}

.app-main {
  flex: 1;
  padding-bottom: var(--nav-height);
  overflow-y: auto;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: var(--nav-height);
  background-color: var(--color-white);
  border-top: 1px solid var(--color-gray-200);
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 100;
}

.nav-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: var(--color-gray-500);
  text-decoration: none;
  font-size: 11px;
  transition: color 0.2s ease;
  padding: var(--spacing-sm);
}

.nav-tab i {
  font-size: 20px;
}

.nav-tab.active {
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
}

.fab-button {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: var(--color-primary);
  border: none;
  color: var(--color-white);
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  margin-top: -28px;
}

.fab-button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(16, 185, 129, 0.4);
}

.fab-button:active {
  transform: scale(0.95);
}
</style>
