import type { VariantProps } from "class-variance-authority"
import type { ComputedRef, InjectionKey } from "vue"
import { cva } from "class-variance-authority"

// ============================================================================
// 组件导出
// ============================================================================

/**
 * NumberField - 原子化增强版数字输入根组件
 * 
 * 支持 size、status、showControls、controlsPosition 等
 */
export { default as NumberField } from "./NumberField.vue"

/**
 * NumberFieldContent - 数字输入内容容器
 */
export { default as NumberFieldContent } from "./NumberFieldContent.vue"

/**
 * NumberFieldDecrement - 减少按钮
 */
export { default as NumberFieldDecrement } from "./NumberFieldDecrement.vue"

/**
 * NumberFieldIncrement - 增加按钮
 */
export { default as NumberFieldIncrement } from "./NumberFieldIncrement.vue"

/**
 * NumberFieldInput - 数字输入框
 */
export { default as NumberFieldInput } from "./NumberFieldInput.vue"

/**
 * NumberFieldWithControls - 带控制按钮的完整数字输入组件
 * 
 * @example
 * ```vue
 * <NumberFieldWithControls
 *   v-model="value"
 *   :min="0"
 *   :max="100"
 *   :step="1"
 *   controls-position="both"
 *   prefix="$"
 * />
 * ```
 */
export { default as NumberFieldWithControls } from "./NumberFieldWithControls.vue"

// ============================================================================
// 上下文
// ============================================================================

export { numberFieldContextKey, type NumberFieldContext } from "./context"

// ============================================================================
// 变体定义
// ============================================================================

/**
 * NumberFieldInput 样式变体
 */
export const numberFieldInputVariants = cva(
  "flex-1 bg-transparent text-center tabular-nums focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
  {
    variants: {
      /**
       * 尺寸
       * @default "default"
       */
      size: {
        sm: "h-7 text-xs",
        default: "h-9 text-sm",
        lg: "h-11 text-base",
      },
      /**
       * 状态
       */
      status: {
        default: "",
        success: "text-green-600",
        warning: "text-yellow-600",
        error: "text-destructive",
      },
    },
    defaultVariants: {
      size: "default",
      status: "default",
    },
  }
)

/**
 * NumberFieldContent 样式变体
 */
export const numberFieldContentVariants = cva(
  "flex items-center rounded-md border border-input bg-background transition-colors focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
  {
    variants: {
      /**
       * 尺寸
       * @default "default"
       */
      size: {
        sm: "h-8",
        default: "h-10",
        lg: "h-12",
      },
      /**
       * 状态
       */
      status: {
        default: "",
        success: "border-green-500 focus-within:ring-green-500/20",
        warning: "border-yellow-500 focus-within:ring-yellow-500/20",
        error: "border-destructive focus-within:ring-destructive/20",
      },
    },
    defaultVariants: {
      size: "default",
      status: "default",
    },
  }
)

/**
 * NumberFieldButton 样式变体
 */
export const numberFieldButtonVariants = cva(
  "inline-flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent disabled:pointer-events-none disabled:opacity-50 transition-colors",
  {
    variants: {
      /**
       * 尺寸
       * @default "default"
       */
      size: {
        sm: "h-7 w-7 [&_svg]:size-3",
        default: "h-9 w-9 [&_svg]:size-4",
        lg: "h-11 w-11 [&_svg]:size-5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export type NumberFieldInputVariants = VariantProps<typeof numberFieldInputVariants>
export type NumberFieldContentVariants = VariantProps<typeof numberFieldContentVariants>
export type NumberFieldButtonVariants = VariantProps<typeof numberFieldButtonVariants>
