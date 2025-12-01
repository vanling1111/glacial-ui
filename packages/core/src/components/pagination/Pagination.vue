<script setup lang="ts">
/**
 * ============================================================================
 * Pagination - 原子化增强版分页根组件
 * ============================================================================
 * 
 * ## 增强功能（超越 4 个库）
 * 
 * | 功能 | shadcn | Ant | Arco | TDesign | PrimeVue | glacial-ui |
 * |-----|--------|-----|------|---------|----------|------------|
 * | 基础分页 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * | 尺寸控制 | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * | 简洁模式 | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * | 显示总数 | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * | 快速跳转 | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * | 每页条数选择 | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * | 禁用状态 | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * 
 * @example
 * ```vue
 * <Pagination
 *   v-model:page="currentPage"
 *   :total="100"
 *   :items-per-page="10"
 *   size="default"
 *   show-edges
 * >
 *   <PaginationContent>
 *     <PaginationPrevious />
 *     <PaginationItem v-for="page in pages" :key="page" :value="page" />
 *     <PaginationNext />
 *   </PaginationContent>
 * </Pagination>
 * ```
 */
import type { PaginationRootEmits, PaginationRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed, provide } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { PaginationRoot, useForwardPropsEmits } from "reka-ui"
import { cn } from "@/lib/utils"
import { paginationVariants } from "./index"
import { paginationContextKey } from "./context"

// 扩展 props 类型
interface ExtendedProps extends PaginationRootProps {
  class?: HTMLAttributes["class"]
  /**
   * 尺寸
   * @default "default"
   */
  size?: "sm" | "default" | "lg"
  /**
   * 简洁模式（只显示上一页/下一页）
   * @default false
   */
  simple?: boolean
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean
  /**
   * 对齐方式
   * @default "center"
   */
  align?: "start" | "center" | "end"
}

const props = withDefaults(defineProps<ExtendedProps>(), {
  size: "default",
  simple: false,
  disabled: false,
  align: "center",
})

const emits = defineEmits<PaginationRootEmits>()

const delegatedProps = reactiveOmit(
  props,
  "class",
  "size",
  "simple",
  "disabled",
  "align",
)

const forwarded = useForwardPropsEmits(delegatedProps, emits)

// 提供上下文给子组件
provide(paginationContextKey, {
  size: computed(() => props.size),
  simple: computed(() => props.simple),
  disabled: computed(() => props.disabled),
})
</script>

<template>
  <PaginationRoot
    v-slot="slotProps"
    data-slot="pagination"
    v-bind="forwarded"
    :class="cn(
      paginationVariants({ align }),
      props.class
    )"
  >
    <slot v-bind="slotProps" />
  </PaginationRoot>
</template>
