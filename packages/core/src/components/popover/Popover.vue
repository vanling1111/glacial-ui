<script setup lang="ts">
/**
 * ============================================================================
 * Popover - 原子化增强版气泡卡片根组件
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
 * | modal 模态模式 | ✅ |
 * 
 * @example
 * ```vue
 * <Popover v-model:open="isOpen" disabled>
 *   <PopoverTrigger>打开</PopoverTrigger>
 *   <PopoverContent>内容</PopoverContent>
 * </Popover>
 * ```
 */
import type { PopoverRootEmits, PopoverRootProps } from "reka-ui"
import { computed, ref, watch } from "vue"
import { PopoverRoot, useForwardPropsEmits } from "reka-ui"

// 扩展 props 类型
interface ExtendedProps extends PopoverRootProps {
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean
}

const props = withDefaults(defineProps<ExtendedProps>(), {
  disabled: false,
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

// 计算是否显示
const isOpen = computed(() => {
  if (props.disabled) return false
  return props.open ?? internalOpen.value
})

// 处理显示状态变化
function handleOpenChange(open: boolean) {
  if (props.disabled) return

  internalOpen.value = open
  emits("update:open", open)
  emits("openChange", open)
}

// 监听 open prop 变化
watch(() => props.open, (newValue) => {
  if (newValue !== undefined) {
    internalOpen.value = newValue
  }
})

// 暴露方法
defineExpose({
  /**
   * 显示 popover
   */
  show: () => {
    if (!props.disabled) {
      handleOpenChange(true)
    }
  },
  /**
   * 隐藏 popover
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
  <PopoverRoot
    v-slot="slotProps"
    data-slot="popover"
    :open="isOpen"
    :default-open="defaultOpen"
    :modal="modal"
    @update:open="handleOpenChange"
  >
    <slot v-bind="slotProps" />
  </PopoverRoot>
</template>
