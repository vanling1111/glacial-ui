import type { VariantProps } from "class-variance-authority"
import type { ComputedRef, InjectionKey } from "vue"
import { cva } from "class-variance-authority"

// ============================================================================
// 组件导出
// ============================================================================

/**
 * Pagination - 原子化增强版根组件
 * 
 * 支持 size、simple、disabled、align 等
 * 
 * @example
 * ```vue
 * <Pagination v-model:page="currentPage" :total="100" :items-per-page="10">
 *   <PaginationContent>
 *     <PaginationPrevious />
 *     <PaginationItem v-for="page in pages" :key="page" :value="page" />
 *     <PaginationNext />
 *   </PaginationContent>
 * </Pagination>
 * ```
 */
export { default as Pagination } from "./Pagination.vue"

/**
 * PaginationContent - 分页内容容器
 */
export { default as PaginationContent } from "./PaginationContent.vue"

/**
 * PaginationEllipsis - 省略号组件
 */
export { default as PaginationEllipsis } from "./PaginationEllipsis.vue"

/**
 * PaginationFirst - 首页按钮
 */
export { default as PaginationFirst } from "./PaginationFirst.vue"

/**
 * PaginationItem - 页码项
 */
export { default as PaginationItem } from "./PaginationItem.vue"

/**
 * PaginationLast - 末页按钮
 */
export { default as PaginationLast } from "./PaginationLast.vue"

/**
 * PaginationNext - 下一页按钮
 */
export { default as PaginationNext } from "./PaginationNext.vue"

/**
 * PaginationPrevious - 上一页按钮
 */
export { default as PaginationPrevious } from "./PaginationPrevious.vue"

/**
 * PaginationSimple - 简化组合组件
 * 
 * 快速创建分页，支持 showTotal、showQuickJumper、simple 等
 * 
 * @example
 * ```vue
 * <PaginationSimple
 *   v-model:page="currentPage"
 *   :total="100"
 *   :items-per-page="10"
 *   show-total
 *   show-quick-jumper
 * />
 * ```
 */
export { default as PaginationSimple } from "./PaginationSimple.vue"

// ============================================================================
// 上下文
// ============================================================================

export { paginationContextKey, type PaginationContext } from "./context"

// ============================================================================
// 变体定义
// ============================================================================

/**
 * Pagination 样式变体
 */
export const paginationVariants = cva(
  "mx-auto flex w-full",
  {
    variants: {
      /**
       * 对齐方式
       * @default "center"
       */
      align: {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
      },
    },
    defaultVariants: {
      align: "center",
    },
  }
)

/**
 * PaginationItem 样式变体
 */
export const paginationItemVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      /**
       * 尺寸
       * @default "default"
       */
      size: {
        sm: "h-7 min-w-7 px-2",
        default: "h-9 min-w-9 px-3",
        lg: "h-10 min-w-10 px-4",
      },
      /**
       * 是否选中
       */
      active: {
        true: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        false: "hover:bg-accent hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      size: "default",
      active: false,
    },
  }
)

export type PaginationVariants = VariantProps<typeof paginationVariants>
export type PaginationItemVariants = VariantProps<typeof paginationItemVariants>
