import { ref, onUnmounted, type Ref } from "vue"

/**
 * useRipple - 波纹效果 composable
 * 
 * Material Design 风格的点击波纹效果
 * 超越竞品：Antd 用 Wave 组件，TDesign 用 hook，PrimeVue 用指令
 * 我们提供 composable，更灵活
 * 
 * @example
 * ```vue
 * <script setup>
 * import { useRipple } from '@glacial-ui/core'
 * 
 * const buttonRef = ref<HTMLElement>()
 * const { ripples, onMouseDown } = useRipple(buttonRef)
 * </script>
 * 
 * <template>
 *   <button ref="buttonRef" @mousedown="onMouseDown" class="relative overflow-hidden">
 *     <span
 *       v-for="ripple in ripples"
 *       :key="ripple.id"
 *       class="absolute rounded-full bg-current opacity-20 animate-ripple pointer-events-none"
 *       :style="ripple.style"
 *     />
 *     Click me
 *   </button>
 * </template>
 * 
 * <style>
 * @keyframes ripple {
 *   to { transform: scale(2); opacity: 0; }
 * }
 * .animate-ripple {
 *   animation: ripple 0.6s linear forwards;
 * }
 * </style>
 * ```
 */

export interface RippleItem {
  id: number
  style: {
    left: string
    top: string
    width: string
    height: string
  }
}

export interface UseRippleOptions {
  /** 是否禁用波纹效果 */
  disabled?: Ref<boolean> | boolean
  /** 波纹持续时间（毫秒） */
  duration?: number
  /** 波纹颜色类名 */
  colorClass?: string
}

export interface UseRippleReturn {
  /** 当前活跃的波纹列表 */
  ripples: Ref<RippleItem[]>
  /** 鼠标按下事件处理器 */
  onMouseDown: (event: MouseEvent) => void
  /** 手动触发波纹 */
  trigger: (x: number, y: number) => void
  /** 清除所有波纹 */
  clear: () => void
}

let rippleIdCounter = 0

export function useRipple(
  target: Ref<HTMLElement | undefined>,
  options: UseRippleOptions = {}
): UseRippleReturn {
  const { disabled = false, duration = 600 } = options
  
  const ripples = ref<RippleItem[]>([])
  const timers: ReturnType<typeof setTimeout>[] = []
  
  const isDisabled = (): boolean => {
    if (typeof disabled === "boolean") return disabled
    return disabled.value
  }
  
  const createRipple = (x: number, y: number) => {
    const el = target.value
    if (!el || isDisabled()) return
    
    const rect = el.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 2
    const left = x - rect.left - size / 2
    const top = y - rect.top - size / 2
    
    const id = rippleIdCounter++
    const ripple: RippleItem = {
      id,
      style: {
        left: `${left}px`,
        top: `${top}px`,
        width: `${size}px`,
        height: `${size}px`,
      },
    }
    
    ripples.value.push(ripple)
    
    const timer = setTimeout(() => {
      ripples.value = ripples.value.filter(r => r.id !== id)
    }, duration)
    
    timers.push(timer)
  }
  
  const onMouseDown = (event: MouseEvent) => {
    createRipple(event.clientX, event.clientY)
  }
  
  const trigger = (x: number, y: number) => {
    createRipple(x, y)
  }
  
  const clear = () => {
    ripples.value = []
    timers.forEach(timer => clearTimeout(timer))
    timers.length = 0
  }
  
  onUnmounted(() => {
    clear()
  })
  
  return {
    ripples,
    onMouseDown,
    trigger,
    clear,
  }
}
