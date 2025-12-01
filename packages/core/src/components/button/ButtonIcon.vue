<script setup lang="ts">
/**
 * ButtonIcon 按钮图标组件
 * 
 * 原子化子组件，用于在按钮中放置图标
 * 超越竞品：支持 4 方向位置（PrimeVue 支持，其他库只支持 left/right）
 */
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@/lib/utils"

interface Props {
  /** 自定义类名 */
  class?: HTMLAttributes["class"]
  /** 
   * 图标位置
   * - left: 左侧（默认）
   * - right: 右侧
   * - top: 顶部（需配合 flex-col）
   * - bottom: 底部（需配合 flex-col）
   */
  position?: "left" | "right" | "top" | "bottom"
  /** 是否旋转动画 */
  spin?: boolean
  /** 是否脉冲动画 */
  pulse?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  position: "left",
  spin: false,
  pulse: false,
})

const iconClass = computed(() => cn(
  "shrink-0 [&>svg]:size-4",
  props.spin && "animate-spin",
  props.pulse && "animate-pulse",
  props.class
))
</script>

<template>
  <span :class="iconClass" data-slot="button-icon">
    <slot />
  </span>
</template>
