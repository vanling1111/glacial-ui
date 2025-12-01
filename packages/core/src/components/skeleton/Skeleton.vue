<script setup lang="ts">
/**
 * ============================================================================
 * Skeleton - 原子化增强版骨架屏组件
 * ============================================================================
 * 
 * ## 增强功能（超越 4 个库）
 * 
 * | 功能 | shadcn | Ant | Arco | TDesign | PrimeVue | glacial-ui |
 * |-----|--------|-----|------|---------|----------|------------|
 * | 基础骨架 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * | 圆形/圆角 | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * | 动画控制 | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * | 尺寸预设 | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * | 宽高控制 | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * | 加载状态 | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * 
 * @example
 * ```vue
 * <Skeleton variant="circle" size="lg" />
 * <Skeleton width="200px" height="20px" />
 * <Skeleton :loading="isLoading">
 *   <div>实际内容</div>
 * </Skeleton>
 * ```
 */
import type { HTMLAttributes, CSSProperties } from "vue"
import { computed } from "vue"
import { cn } from "@/lib/utils"
import { skeletonVariants } from "./index"

interface Props {
  class?: HTMLAttributes["class"]
  /**
   * 变体
   * @default "default"
   */
  variant?: "default" | "circle" | "rounded"
  /**
   * 尺寸预设
   * @default "default"
   */
  size?: "sm" | "default" | "lg" | "xl"
  /**
   * 自定义宽度
   */
  width?: string | number
  /**
   * 自定义高度
   */
  height?: string | number
  /**
   * 是否显示动画
   * @default true
   */
  animated?: boolean
  /**
   * 是否处于加载状态（为 false 时显示 slot 内容）
   * @default true
   */
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "default",
  animated: true,
  loading: true,
})

// 计算样式
const style = computed<CSSProperties>(() => {
  const s: CSSProperties = {}
  if (props.width) {
    s.width = typeof props.width === "number" ? `${props.width}px` : props.width
  }
  if (props.height) {
    s.height = typeof props.height === "number" ? `${props.height}px` : props.height
  }
  return s
})
</script>

<template>
  <template v-if="loading">
    <div
      data-slot="skeleton"
      :class="cn(
        skeletonVariants({ variant, size, animated }),
        props.class
      )"
      :style="style"
    />
  </template>
  <slot v-else />
</template>
