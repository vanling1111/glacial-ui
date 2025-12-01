import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

// ============================================================================
// 组件导出
// ============================================================================

/**
 * Label - 原子化增强版标签组件
 * 
 * 支持 size、required、optional、tooltip 等
 * 
 * @example
 * ```vue
 * <Label for="email">邮箱</Label>
 * <Label for="name" required>姓名</Label>
 * <Label for="phone" optional>电话</Label>
 * <Label for="desc" tooltip="这是一个提示">描述</Label>
 * ```
 */
export { default as Label } from "./Label.vue"

// ============================================================================
// 变体定义
// ============================================================================

/**
 * Label 样式变体
 */
export const labelVariants = cva(
  "flex items-center gap-1 leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  {
    variants: {
      /**
       * 尺寸
       * @default "default"
       */
      size: {
        sm: "text-xs",
        default: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export type LabelVariants = VariantProps<typeof labelVariants>
