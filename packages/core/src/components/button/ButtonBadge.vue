<script setup lang="ts">
/**
 * ButtonBadge 按钮角标组件
 * 
 * 原子化子组件，用于在按钮上显示角标
 * 超越竞品：只有 PrimeVue 支持角标，其他库都不支持
 * 
 * 增强功能：
 * - 支持数字、文字、小红点
 * - 支持最大值限制
 * - 支持 6 种颜色变体
 * - 支持偏移量自定义
 * - 支持脉冲动画
 */
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@/lib/utils"

interface Props {
  /** 自定义类名 */
  class?: HTMLAttributes["class"]
  /** 角标数值 */
  count?: number
  /** 角标文本（优先级低于 count） */
  text?: string
  /** 
   * 是否显示为小红点
   * @default false
   */
  dot?: boolean
  /** 最大数值，超过显示 max+ */
  max?: number
  /** 偏移量 [x, y]，单位 px */
  offset?: [number, number]
  /** 
   * 颜色变体
   * @default "destructive"
   */
  variant?: "destructive" | "success" | "warning" | "info" | "primary" | "secondary"
  /** 是否显示边框 */
  bordered?: boolean
  /** 是否脉冲动画（用于提示新消息） */
  pulse?: boolean
  /** 是否显示（用于控制显隐） */
  show?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  dot: false,
  max: 99,
  variant: "destructive",
  bordered: false,
  pulse: false,
  show: true,
})

// 计算显示内容
const displayContent = computed(() => {
  if (props.dot) return ""
  if (props.count !== undefined) {
    if (props.max && props.count > props.max) {
      return `${props.max}+`
    }
    return props.count
  }
  return props.text ?? ""
})

// 是否应该显示
const shouldShow = computed(() => {
  if (!props.show) return false
  if (props.dot) return true
  if (props.count !== undefined) return props.count > 0
  if (props.text) return true
  return false
})

// 变体颜色映射
const variantClass = computed(() => {
  const map = {
    destructive: "bg-destructive text-destructive-foreground",
    success: "bg-emerald-500 text-white",
    warning: "bg-amber-500 text-white",
    info: "bg-sky-500 text-white",
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
  }
  return map[props.variant]
})

const badgeClass = computed(() => cn(
  "absolute z-10 flex items-center justify-center",
  "text-[10px] font-medium leading-none",
  "transform translate-x-1/2 -translate-y-1/2",
  "top-0 right-0",
  variantClass.value,
  props.dot 
    ? "size-2 rounded-full" 
    : "min-w-[18px] h-[18px] px-1 rounded-full",
  props.bordered && "ring-2 ring-background",
  props.pulse && "animate-pulse",
  props.class
))

const badgeStyle = computed(() => {
  if (!props.offset) return {}
  return {
    top: `${props.offset[1]}px`,
    right: `${props.offset[0]}px`,
  }
})
</script>

<template>
  <span 
    v-if="shouldShow"
    :class="badgeClass" 
    :style="badgeStyle"
    data-slot="button-badge"
  >
    {{ displayContent }}
  </span>
</template>
