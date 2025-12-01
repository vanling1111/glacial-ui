<script setup lang="ts">
/**
 * ============================================================================
 * Separator - 原子化增强版分隔线组件
 * ============================================================================
 * 
 * ## 增强功能（超越 4 个库）
 * 
 * | 功能 | shadcn | Ant | Arco | TDesign | PrimeVue | glacial-ui |
 * |-----|--------|-----|------|---------|----------|------------|
 * | 基础分隔线 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * | 水平/垂直 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * | 带文字 | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * | 文字位置 | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * | 虚线样式 | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * | 颜色控制 | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
 * 
 * @example
 * ```vue
 * <Separator />
 * <Separator orientation="vertical" />
 * <Separator dashed />
 * <Separator>文字</Separator>
 * <Separator text-position="left">左侧文字</Separator>
 * ```
 */
import type { SeparatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed, useSlots } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { Separator } from "reka-ui"
import { cn } from "@/lib/utils"
import { separatorVariants } from "./index"

interface ExtendedProps extends SeparatorProps {
  class?: HTMLAttributes["class"]
  /**
   * 是否为虚线
   * @default false
   */
  dashed?: boolean
  /**
   * 文字位置（仅水平方向有效）
   * @default "center"
   */
  textPosition?: "left" | "center" | "right"
  /**
   * 自定义颜色
   */
  color?: string
  /**
   * 边距
   * @default "default"
   */
  margin?: "none" | "sm" | "default" | "lg"
}

const props = withDefaults(defineProps<ExtendedProps>(), {
  orientation: "horizontal",
  decorative: true,
  dashed: false,
  textPosition: "center",
  margin: "default",
})

const delegatedProps = reactiveOmit(props, "class", "dashed", "textPosition", "color", "margin")

const slots = useSlots()
const hasContent = computed(() => !!slots.default)

// 计算样式
const customStyle = computed(() => {
  if (props.color) {
    return { backgroundColor: props.color, borderColor: props.color }
  }
  return {}
})
</script>

<template>
  <!-- 带文字的分隔线 -->
  <div
    v-if="hasContent && orientation === 'horizontal'"
    data-slot="separator"
    :class="cn(
      'flex items-center',
      margin === 'none' && '',
      margin === 'sm' && 'my-2',
      margin === 'default' && 'my-4',
      margin === 'lg' && 'my-6',
      props.class
    )"
    role="separator"
    :aria-orientation="orientation"
  >
    <div
      :class="cn(
        'flex-1 h-px',
        dashed ? 'border-t border-dashed border-border' : 'bg-border',
        textPosition === 'left' && 'flex-none w-6',
        textPosition === 'right' && 'flex-1',
      )"
      :style="customStyle"
    />
    <span class="px-3 text-sm text-muted-foreground">
      <slot />
    </span>
    <div
      :class="cn(
        'flex-1 h-px',
        dashed ? 'border-t border-dashed border-border' : 'bg-border',
        textPosition === 'left' && 'flex-1',
        textPosition === 'right' && 'flex-none w-6',
      )"
      :style="customStyle"
    />
  </div>

  <!-- 普通分隔线 -->
  <Separator
    v-else
    data-slot="separator"
    v-bind="delegatedProps"
    :class="cn(
      separatorVariants({ orientation, dashed, margin }),
      props.class,
    )"
    :style="customStyle"
  />
</template>
