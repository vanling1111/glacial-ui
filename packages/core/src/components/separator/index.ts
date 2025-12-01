import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

// ============================================================================
// 组件导出
// ============================================================================

/**
 * Separator - 原子化增强版分隔线组件
 * 
 * 支持 dashed、textPosition、color、margin 等
 * 
 * @example
 * ```vue
 * <Separator />
 * <Separator orientation="vertical" />
 * <Separator dashed />
 * <Separator>文字</Separator>
 * <Separator text-position="left">左侧文字</Separator>
 * ```
 */
export { default as Separator } from "./Separator.vue"

// ============================================================================
// 变体定义
// ============================================================================

/**
 * Separator 样式变体
 */
export const separatorVariants = cva(
  "shrink-0",
  {
    variants: {
      /**
       * 方向
       * @default "horizontal"
       */
      orientation: {
        horizontal: "h-px w-full",
        vertical: "h-full w-px",
      },
      /**
       * 是否为虚线
       * @default false
       */
      dashed: {
        true: "border-dashed",
        false: "bg-border",
      },
      /**
       * 边距
       * @default "default"
       */
      margin: {
        none: "",
        sm: "",
        default: "",
        lg: "",
      },
    },
    compoundVariants: [
      // 水平方向边距
      { orientation: "horizontal", margin: "sm", class: "my-2" },
      { orientation: "horizontal", margin: "default", class: "my-4" },
      { orientation: "horizontal", margin: "lg", class: "my-6" },
      // 垂直方向边距
      { orientation: "vertical", margin: "sm", class: "mx-2" },
      { orientation: "vertical", margin: "default", class: "mx-4" },
      { orientation: "vertical", margin: "lg", class: "mx-6" },
      // 虚线样式
      { orientation: "horizontal", dashed: true, class: "h-0 border-t border-border" },
      { orientation: "vertical", dashed: true, class: "w-0 border-l border-border" },
    ],
    defaultVariants: {
      orientation: "horizontal",
      dashed: false,
      margin: "default",
    },
  }
)

export type SeparatorVariants = VariantProps<typeof separatorVariants>
