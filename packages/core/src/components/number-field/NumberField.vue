<script setup lang="ts">
/**
 * ============================================================================
 * NumberField - 原子化增强版数字输入根组件
 * ============================================================================
 * 
 * ## 增强功能（超越 4 个库）
 * 
 * | 功能 | shadcn | Ant | Arco | TDesign | PrimeVue | glacial-ui |
 * |-----|--------|-----|------|---------|----------|------------|
 * | 基础数字输入 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * | 尺寸控制 | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * | 步进控制 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * | 精度控制 | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * | 前缀/后缀 | ❌ | ✅ | ✅ | ❌ | ✅ | ✅ |
 * | 格式化 | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * | 键盘控制 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * | 状态反馈 | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * 
 * @example
 * ```vue
 * <NumberField v-model="value" :min="0" :max="100" :step="1" size="default">
 *   <NumberFieldContent>
 *     <NumberFieldDecrement />
 *     <NumberFieldInput />
 *     <NumberFieldIncrement />
 *   </NumberFieldContent>
 * </NumberField>
 * ```
 */
import type { NumberFieldRootEmits, NumberFieldRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed, provide } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { NumberFieldRoot, useForwardPropsEmits } from "reka-ui"
import { cn } from "@/lib/utils"
import { numberFieldContextKey } from "./context"

// 扩展 props 类型
interface ExtendedProps extends NumberFieldRootProps {
  class?: HTMLAttributes["class"]
  /**
   * 尺寸
   * @default "default"
   */
  size?: "sm" | "default" | "lg"
  /**
   * 状态
   */
  status?: "default" | "success" | "warning" | "error"
  /**
   * 是否显示控制按钮
   * @default true
   */
  showControls?: boolean
  /**
   * 控制按钮位置
   * @default "right"
   */
  controlsPosition?: "right" | "both"
}

const props = withDefaults(defineProps<ExtendedProps>(), {
  size: "default",
  status: "default",
  showControls: true,
  controlsPosition: "right",
})

const emits = defineEmits<NumberFieldRootEmits>()

const delegatedProps = reactiveOmit(
  props,
  "class",
  "size",
  "status",
  "showControls",
  "controlsPosition",
)

const forwarded = useForwardPropsEmits(delegatedProps, emits)

// 提供上下文给子组件
provide(numberFieldContextKey, {
  size: computed(() => props.size),
  status: computed(() => props.status),
  showControls: computed(() => props.showControls),
  controlsPosition: computed(() => props.controlsPosition),
})
</script>

<template>
  <NumberFieldRoot
    v-slot="slotProps"
    v-bind="forwarded"
    :class="cn('grid gap-1.5', props.class)"
  >
    <slot v-bind="slotProps" />
  </NumberFieldRoot>
</template>
