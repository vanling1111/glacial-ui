<script setup lang="ts">
/**
 * ============================================================================
 * SkeletonText - 文本骨架屏组件
 * ============================================================================
 * 
 * 快速创建多行文本骨架屏
 * 
 * @example
 * ```vue
 * <SkeletonText :lines="3" />
 * ```
 */
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import Skeleton from "./Skeleton.vue"
import { cn } from "@/lib/utils"

interface Props {
  class?: HTMLAttributes["class"]
  /**
   * 行数
   * @default 3
   */
  lines?: number
  /**
   * 行间距
   * @default "default"
   */
  spacing?: "sm" | "default" | "lg"
  /**
   * 最后一行宽度百分比
   * @default 60
   */
  lastLineWidth?: number
  /**
   * 是否显示动画
   * @default true
   */
  animated?: boolean
  /**
   * 是否处于加载状态
   * @default true
   */
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  lines: 3,
  spacing: "default",
  lastLineWidth: 60,
  animated: true,
  loading: true,
})

// 计算间距类名
const spacingClass = computed(() => {
  switch (props.spacing) {
    case "sm": return "space-y-1"
    case "lg": return "space-y-4"
    default: return "space-y-2"
  }
})
</script>

<template>
  <template v-if="loading">
    <div :class="cn(spacingClass, props.class)">
      <Skeleton
        v-for="i in lines"
        :key="i"
        :animated="animated"
        class="h-4"
        :style="{
          width: i === lines ? `${lastLineWidth}%` : '100%'
        }"
      />
    </div>
  </template>
  <slot v-else />
</template>
