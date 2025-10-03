/**
 * Online Status Composable
 * Detects online/offline status
 * Constitutional Compliance: UX Consistency (user feedback)
 */

export const useOnline = () => {
  const isOnline = ref(true)

  const updateOnlineStatus = () => {
    isOnline.value = navigator.onLine
  }

  onMounted(() => {
    isOnline.value = navigator.onLine
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
  })

  onUnmounted(() => {
    window.removeEventListener('online', updateOnlineStatus)
    window.removeEventListener('offline', updateOnlineStatus)
  })

  return {
    isOnline: readonly(isOnline)
  }
}
