<script setup lang="ts">
/**
 * ============================================================================
 * Empty - 原子化增强版空状态根组件
 * ============================================================================
 * 
 * ## 增强功能（超越 4 个库）
 * 
 * | 功能 | shadcn | Ant | Arco | TDesign | PrimeVue | glacial-ui |
 * |-----|--------|-----|------|---------|----------|------------|
 * | 基础空状态 | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * | 尺寸控制 | ❌ | ❌ | ✅ | ✅ | ❌ | ✅ |
 * | 边框样式 | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
 * | 自定义图片 | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * | 内置图标 | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * 
 * @example
 * ```vue
 * <Empty size="lg" bordered>
 *   <EmptyMedia>
 *     <InboxIcon />
 *   </EmptyMedia>
 *   <EmptyHeader>
 *     <EmptyTitle>暂无数据</EmptyTitle>
 *     <EmptyDescription>请稍后再试</EmptyDescription>
 *   </EmptyHeader>
 *   <EmptyContent>
 *     <Button>刷新</Button>
 *   </EmptyContent>
 * </Empty>
 * ```
 */
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { emptyVariants } from "./index"

interface Props {
  class?: HTMLAttributes["class"]
  /**
   * 尺寸
   * @default "default"
   */
  size?: "sm" | "default" | "lg"
  /**
   * 是否显示边框
   * @default false
   */
  bordered?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: "default",
  bordered: false,
})
</script>

<template>
  <div
    data-slot="empty"
    :class="cn(
      emptyVariants({ size, bordered }),
      props.class,
    )"
  >
    <slot />
  </div>
</template>
