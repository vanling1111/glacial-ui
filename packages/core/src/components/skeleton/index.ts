import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

// ============================================================================
// 组件导出
// ============================================================================

/**
 * Skeleton - 原子化增强版骨架屏组件
 * 
 * 支持 variant、size、width、height、animated、loading 等
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
export { default as Skeleton } from "./Skeleton.vue"

/**
 * SkeletonText - 文本骨架屏组件
 * 
 * 快速创建多行文本骨架屏
 * 
 * @example
 * ```vue
 * <SkeletonText :lines="3" />
 * ```
 */
export { default as SkeletonText } from "./SkeletonText.vue"

/**
 * SkeletonCard - 卡片骨架屏组件
 * 
 * 快速创建卡片骨架屏
 * 
 * @example
 * ```vue
 * <SkeletonCard show-avatar show-image />
 * ```
 */
export { default as SkeletonCard } from "./SkeletonCard.vue"

// ============================================================================
// 变体定义
// ============================================================================

/**
 * Skeleton 样式变体
 */
export const skeletonVariants = cva(
  "bg-primary/10",
  {
    variants: {
      /**
       * 变体
       * @default "default"
       */
      variant: {
        default: "rounded-md",
        circle: "rounded-full",
        rounded: "rounded-lg",
      },
      /**
       * 尺寸预设
       * @default "default"
       */
      size: {
        sm: "h-4 w-16",
        default: "h-5 w-24",
        lg: "h-10 w-10",
        xl: "h-16 w-16",
      },
      /**
       * 是否显示动画
       * @default true
       */
      animated: {
        true: "animate-pulse",
        false: "",
      },
    },
    compoundVariants: [
      // 圆形变体的尺寸
      { variant: "circle", size: "sm", class: "h-6 w-6" },
      { variant: "circle", size: "default", class: "h-8 w-8" },
      { variant: "circle", size: "lg", class: "h-10 w-10" },
      { variant: "circle", size: "xl", class: "h-16 w-16" },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      animated: true,
    },
  }
)

export type SkeletonVariants = VariantProps<typeof skeletonVariants>
