<script setup lang="ts">
/**
 * ============================================================================
 * Tooltip - 原子化增强版提示根组件
 * ============================================================================
 * 
 * 所有增强功能都在原子化组件上实现
 * 
 * ## 增强功能
 * 
 * | 功能 | 支持 |
 * |-----|------|
 * | open/defaultOpen 控制 | ✅ |
 * | disabled 禁用 | ✅ |
 * | 自动隐藏时间 (duration) | ✅ |
 * 
 * @example
 * ```vue
 * <TooltipProvider>
 *   <Tooltip :duration="3000" disabled>
 *     <TooltipTrigger>悬停</TooltipTrigger>
 *     <TooltipContent>3秒后自动隐藏</TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 * ```
 */
import type { TooltipRootEmits, TooltipRootProps } from "reka-ui"
import { computed, ref, watch, onUnmounted } from "vue"
import { TooltipRoot, useForwardPropsEmits } from "reka-ui"

// 扩展 props 类型
interface ExtendedProps extends TooltipRootProps {
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean
  /**
   * 自动隐藏时间（毫秒），0 表示不自动隐藏
   * @default 0
   */
  duration?: number
}

const props = withDefaults(defineProps<ExtendedProps>(), {
  disabled: false,
  duration: 0,
})

const emits = defineEmits<{
  /**
   * 显示状态变化时触发
   */
  (e: "update:open", value: boolean): void
  /**
   * 显示状态变化时触发
   */
  (e: "openChange", value: boolean): void
}>()

// 内部状态
const internalOpen = ref(props.defaultOpen ?? false)
let durationTimer: ReturnType<typeof setTimeout> | null = null

// 计算是否显示
const isOpen = computed(() => {
  if (props.disabled) return false
  return props.open ?? internalOpen.value
})

// 处理显示状态变化
function handleOpenChange(open: boolean) {
  if (props.disabled) return

  // 清除之前的定时器
  if (durationTimer) {
    clearTimeout(durationTimer)
    durationTimer = null
  }

  internalOpen.value = open
  emits("update:open", open)
  emits("openChange", open)

  // 如果打开且设置了 duration，自动关闭
  if (open && props.duration > 0) {
    durationTimer = setTimeout(() => {
      internalOpen.value = false
      emits("update:open", false)
      emits("openChange", false)
    }, props.duration)
  }
}

// 监听 open prop 变化
watch(() => props.open, (newValue) => {
  if (newValue !== undefined) {
    internalOpen.value = newValue
  }
})

// 清理定时器
onUnmounted(() => {
  if (durationTimer) {
    clearTimeout(durationTimer)
  }
})

// 暴露方法
defineExpose({
  /**
   * 显示 tooltip
   */
  show: () => {
    if (!props.disabled) {
      handleOpenChange(true)
    }
  },
  /**
   * 隐藏 tooltip
   */
  hide: () => {
    handleOpenChange(false)
  },
  /**
   * 切换显示状态
   */
  toggle: () => {
    handleOpenChange(!isOpen.value)
  },
})
</script>

<template>
  <TooltipRoot
    v-slot="slotProps"
    data-slot="tooltip"
    :open="isOpen"
    :default-open="defaultOpen"
    @update:open="handleOpenChange"
  >
    <slot v-bind="slotProps" />
  </TooltipRoot>
</template>
