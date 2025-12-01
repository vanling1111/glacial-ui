import type { VariantProps } from "class-variance-authority"
import type { ComputedRef, InjectionKey } from "vue"
import { cva } from "class-variance-authority"

// ============================================================================
// 组件导出
// ============================================================================

/**
 * TagsInput - 原子化增强版标签输入根组件
 * 
 * 支持 size、status、tagColor、clearable、readonly 等
 */
export { default as TagsInput } from "./TagsInput.vue"

/**
 * TagsInputInput - 标签输入框
 */
export { default as TagsInputInput } from "./TagsInputInput.vue"

/**
 * TagsInputItem - 标签项
 */
export { default as TagsInputItem } from "./TagsInputItem.vue"

/**
 * TagsInputItemDelete - 标签删除按钮
 */
export { default as TagsInputItemDelete } from "./TagsInputItemDelete.vue"

/**
 * TagsInputItemText - 标签文本
 */
export { default as TagsInputItemText } from "./TagsInputItemText.vue"

/**
 * TagsInputWithClear - 带清空功能的完整标签输入组件
 * 
 * @example
 * ```vue
 * <TagsInputWithClear
 *   v-model="tags"
 *   :max="5"
 *   placeholder="添加标签..."
 *   clearable
 * />
 * ```
 */
export { default as TagsInputWithClear } from "./TagsInputWithClear.vue"

// ============================================================================
// 上下文
// ============================================================================

export { tagsInputContextKey, type TagsInputContext } from "./context"

// ============================================================================
// 变体定义
// ============================================================================

/**
 * TagsInput 样式变体
 */
export const tagsInputVariants = cva(
  "flex flex-wrap gap-2 items-center rounded-md border border-input bg-background px-2 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
  {
    variants: {
      /**
       * 尺寸
       * @default "default"
       */
      size: {
        sm: "min-h-8 px-1.5 py-0.5 gap-1",
        default: "min-h-10 px-2 py-1 gap-2",
        lg: "min-h-12 px-3 py-1.5 gap-2",
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
 * TagsInputItem 样式变体
 */
export const tagsInputItemVariants = cva(
  "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-sm font-medium transition-colors",
  {
    variants: {
      /**
       * 尺寸
       * @default "default"
       */
      size: {
        sm: "px-1.5 py-0 text-xs",
        default: "px-2 py-0.5 text-sm",
        lg: "px-2.5 py-1 text-sm",
      },
      /**
       * 颜色
       * @default "default"
       */
      color: {
        default: "bg-secondary text-secondary-foreground",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
        warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
        danger: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
      },
    },
    defaultVariants: {
      size: "default",
      color: "default",
    },
  }
)

export type TagsInputVariants = VariantProps<typeof tagsInputVariants>
export type TagsInputItemVariants = VariantProps<typeof tagsInputItemVariants>
