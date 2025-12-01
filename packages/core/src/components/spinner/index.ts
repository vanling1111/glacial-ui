import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

// ============================================================================
// 组件导出
// ============================================================================

/**
 * Spinner - 原子化增强版加载指示器组件
 * 
 * 支持 size、color、spinning、tip、delay、fullscreen 等
 * 
 * @example
 * ```vue
 * <Spinner size="lg" />
 * <Spinner :spinning="loading" tip="加载中...">
 *   <div>内容</div>
 * </Spinner>
 * <Spinner fullscreen :spinning="loading" tip="全屏加载中..." />
 * ```
 */
export { default as Spinner } from "./Spinner.vue"

// ============================================================================
// 变体定义
// ============================================================================

/**
 * Spinner 样式变体
 */
export const spinnerVariants = cva(
  "animate-spin",
  {
    variants: {
      /**
       * 尺寸
       * @default "default"
       */
      size: {
        xs: "size-3",
        sm: "size-4",
        default: "size-5",
        lg: "size-6",
        xl: "size-8",
      },
      /**
       * 颜色
       * @default "default"
       */
      color: {
        default: "text-muted-foreground",
        primary: "text-primary",
        secondary: "text-secondary-foreground",
        success: "text-green-600",
        warning: "text-yellow-500",
        danger: "text-destructive",
      },
    },
    defaultVariants: {
      size: "default",
      color: "default",
    },
  }
)

export type SpinnerVariants = VariantProps<typeof spinnerVariants>
