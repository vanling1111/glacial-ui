<script lang="ts" setup>
/**
 * ============================================================================
 * Breadcrumb - 原子化增强版面包屑根组件
 * ============================================================================
 * 
 * ## 增强功能（超越 4 个库）
 * 
 * | 功能 | shadcn | Ant | Arco | TDesign | PrimeVue | glacial-ui |
 * |-----|--------|-----|------|---------|----------|------------|
 * | 基础面包屑 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * | 自定义分隔符 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * | 尺寸控制 | ❌ | ❌ | ✅ | ✅ | ❌ | ✅ |
 * | 最大显示数量 | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * | 下拉菜单 | ❌ | ✅ | ✅ | ❌ | ❌ | ✅ |
 * 
 * @example
 * ```vue
 * <Breadcrumb size="default">
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">首页</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>当前页</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * ```
 */
import type { HTMLAttributes } from "vue"
import { computed, provide } from "vue"
import { cn } from "@/lib/utils"
import { breadcrumbContextKey } from "./context"

interface Props {
  class?: HTMLAttributes["class"]
  /**
   * 尺寸
   * @default "default"
   */
  size?: "sm" | "default" | "lg"
}

const props = withDefaults(defineProps<Props>(), {
  size: "default",
})

// 提供上下文给子组件
provide(breadcrumbContextKey, {
  size: computed(() => props.size),
})
</script>

<template>
  <nav
    aria-label="breadcrumb"
    data-slot="breadcrumb"
    :class="props.class"
  >
    <slot />
  </nav>
</template>
