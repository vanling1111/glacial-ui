import type { VariantProps } from "class-variance-authority"
import type { ComputedRef, InjectionKey } from "vue"
import { cva } from "class-variance-authority"

// ============================================================================
// 组件导出
// ============================================================================

/**
 * Breadcrumb - 原子化增强版面包屑根组件
 * 
 * 支持 size 等
 */
export { default as Breadcrumb } from "./Breadcrumb.vue"

/**
 * BreadcrumbEllipsis - 省略号组件
 */
export { default as BreadcrumbEllipsis } from "./BreadcrumbEllipsis.vue"

/**
 * BreadcrumbItem - 面包屑项
 */
export { default as BreadcrumbItem } from "./BreadcrumbItem.vue"

/**
 * BreadcrumbLink - 面包屑链接
 */
export { default as BreadcrumbLink } from "./BreadcrumbLink.vue"

/**
 * BreadcrumbList - 面包屑列表容器
 */
export { default as BreadcrumbList } from "./BreadcrumbList.vue"

/**
 * BreadcrumbPage - 当前页（最后一项）
 */
export { default as BreadcrumbPage } from "./BreadcrumbPage.vue"

/**
 * BreadcrumbSeparator - 分隔符
 */
export { default as BreadcrumbSeparator } from "./BreadcrumbSeparator.vue"

/**
 * BreadcrumbWithItems - 通过 items 数组快速创建面包屑
 * 
 * @example
 * ```vue
 * <BreadcrumbWithItems
 *   :items="[
 *     { label: '首页', href: '/' },
 *     { label: '产品', href: '/products' },
 *     { label: '详情' },
 *   ]"
 *   :max-items="4"
 * />
 * ```
 */
export { default as BreadcrumbWithItems } from "./BreadcrumbSimple.vue"

// ============================================================================
// 上下文
// ============================================================================

export { breadcrumbContextKey, type BreadcrumbContext } from "./context"

// ============================================================================
// 变体定义
// ============================================================================

/**
 * BreadcrumbList 样式变体
 */
export const breadcrumbListVariants = cva(
  "flex flex-wrap items-center gap-1.5 break-words text-muted-foreground",
  {
    variants: {
      /**
       * 尺寸
       * @default "default"
       */
      size: {
        sm: "text-xs gap-1",
        default: "text-sm gap-1.5",
        lg: "text-base gap-2",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export type BreadcrumbListVariants = VariantProps<typeof breadcrumbListVariants>

// ============================================================================
// 类型定义
// ============================================================================

/**
 * 面包屑项数据类型
 */
export interface BreadcrumbItemData {
  /**
   * 显示文本
   */
  label: string
  /**
   * 链接地址
   */
  href?: string
  /**
   * 是否禁用
   */
  disabled?: boolean
}
