import { ref, type Ref } from "vue"

/**
 * useDebounceClick - 点击防抖 composable
 * 
 * 独有功能，四个竞品库都不支持
 * 防止用户快速重复点击导致多次提交
 * 
 * @example
 * ```vue
 * <script setup>
 * import { useDebounceClick } from '@glacial-ui/core'
 * 
 * const { onClick, isDebouncing } = useDebounceClick({
 *   delay: 300,
 *   handler: async () => {
 *     await submitForm()
 *   },
 * })
 * </script>
 * 
 * <template>
 *   <button @click="onClick" :disabled="isDebouncing">
 *     {{ isDebouncing ? '处理中...' : '提交' }}
 *   </button>
 * </template>
 * ```
 */

export interface UseDebounceClickOptions {
  /** 防抖延迟时间（毫秒） */
  delay?: number
  /** 点击处理函数 */
  handler?: (event: MouseEvent) => void | Promise<void>
  /** 是否禁用 */
  disabled?: Ref<boolean> | boolean
}

export interface UseDebounceClickReturn {
  /** 是否在防抖期间 */
  isDebouncing: Ref<boolean>
  /** 点击事件处理器 */
  onClick: (event: MouseEvent) => void
}

export function useDebounceClick(options: UseDebounceClickOptions = {}): UseDebounceClickReturn {
  const { delay = 300, handler, disabled = false } = options
  
  const isDebouncing = ref(false)
  let lastClickTime = 0
  
  const isDisabled = (): boolean => {
    if (typeof disabled === "boolean") return disabled
    return disabled.value
  }
  
  const onClick = (event: MouseEvent) => {
    if (isDisabled() || isDebouncing.value) {
      event.preventDefault()
      return
    }
    
    const now = Date.now()
    if (now - lastClickTime < delay) {
      event.preventDefault()
      return
    }
    
    lastClickTime = now
    isDebouncing.value = true
    
    // 延迟后重置状态
    setTimeout(() => {
      isDebouncing.value = false
    }, delay)
    
    if (handler) {
      handler(event)
    }
  }
  
  return {
    isDebouncing,
    onClick,
  }
}
