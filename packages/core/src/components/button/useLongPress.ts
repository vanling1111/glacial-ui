import { ref, onUnmounted, type Ref } from "vue"

/**
 * useLongPress - 长按检测 composable
 * 
 * 独有功能，四个竞品库都不支持
 * 
 * @example
 * ```vue
 * <script setup>
 * import { useLongPress } from '@glacial-ui/core'
 * 
 * const { onMouseDown, onMouseUp, onMouseLeave, isLongPressed } = useLongPress({
 *   delay: 500,
 *   onLongPress: () => console.log('长按触发'),
 * })
 * </script>
 * 
 * <template>
 *   <button
 *     @mousedown="onMouseDown"
 *     @mouseup="onMouseUp"
 *     @mouseleave="onMouseLeave"
 *   >
 *     长按我
 *   </button>
 * </template>
 * ```
 */

export interface UseLongPressOptions {
  /** 长按延迟时间（毫秒） */
  delay?: number
  /** 长按触发回调 */
  onLongPress?: (event: MouseEvent) => void
  /** 是否禁用 */
  disabled?: Ref<boolean> | boolean
}

export interface UseLongPressReturn {
  /** 是否已触发长按 */
  isLongPressed: Ref<boolean>
  /** 鼠标按下事件处理器 */
  onMouseDown: (event: MouseEvent) => void
  /** 鼠标抬起事件处理器 */
  onMouseUp: () => void
  /** 鼠标离开事件处理器 */
  onMouseLeave: () => void
  /** 触摸开始事件处理器 */
  onTouchStart: (event: TouchEvent) => void
  /** 触摸结束事件处理器 */
  onTouchEnd: () => void
}

export function useLongPress(options: UseLongPressOptions = {}): UseLongPressReturn {
  const { delay = 500, onLongPress, disabled = false } = options
  
  const isLongPressed = ref(false)
  let timer: ReturnType<typeof setTimeout> | null = null
  let startEvent: MouseEvent | null = null
  
  const isDisabled = (): boolean => {
    if (typeof disabled === "boolean") return disabled
    return disabled.value
  }
  
  const clear = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }
  
  const onMouseDown = (event: MouseEvent) => {
    if (isDisabled()) return
    
    isLongPressed.value = false
    startEvent = event
    
    timer = setTimeout(() => {
      isLongPressed.value = true
      if (onLongPress && startEvent) {
        onLongPress(startEvent)
      }
    }, delay)
  }
  
  const onMouseUp = () => {
    clear()
  }
  
  const onMouseLeave = () => {
    clear()
  }
  
  const onTouchStart = (event: TouchEvent) => {
    if (isDisabled()) return
    
    isLongPressed.value = false
    const touch = event.touches[0]
    
    // 创建模拟的 MouseEvent
    const mouseEvent = {
      clientX: touch.clientX,
      clientY: touch.clientY,
      target: event.target,
    } as MouseEvent
    
    startEvent = mouseEvent
    
    timer = setTimeout(() => {
      isLongPressed.value = true
      if (onLongPress && startEvent) {
        onLongPress(startEvent)
      }
    }, delay)
  }
  
  const onTouchEnd = () => {
    clear()
  }
  
  onUnmounted(() => {
    clear()
  })
  
  return {
    isLongPressed,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    onTouchStart,
    onTouchEnd,
  }
}
