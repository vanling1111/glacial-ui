import type { VariantProps } from "class-variance-authority"
import type { ComputedRef, InjectionKey } from "vue"
import { cva } from "class-variance-authority"

// ============================================================================
// 组件导出
// ============================================================================

/**
 * Combobox - 原子化增强版组合框根组件
 * 
 * 支持 size、status、allowCreate、loading 等
 */
export { default as Combobox } from "./Combobox.vue"

/**
 * ComboboxAnchor - 组合框锚点
 */
export { default as ComboboxAnchor } from "./ComboboxAnchor.vue"

/**
 * ComboboxEmpty - 空状态
 */
export { default as ComboboxEmpty } from "./ComboboxEmpty.vue"

/**
 * ComboboxGroup - 选项分组
 */
export { default as ComboboxGroup } from "./ComboboxGroup.vue"

/**
 * ComboboxInput - 搜索输入框
 */
export { default as ComboboxInput } from "./ComboboxInput.vue"

/**
 * ComboboxItem - 选项项
 */
export { default as ComboboxItem } from "./ComboboxItem.vue"

/**
 * ComboboxItemIndicator - 选中指示器
 */
export { default as ComboboxItemIndicator } from "./ComboboxItemIndicator.vue"

/**
 * ComboboxList - 选项列表
 */
export { default as ComboboxList } from "./ComboboxList.vue"

/**
 * ComboboxSeparator - 分隔线
 */
export { default as ComboboxSeparator } from "./ComboboxSeparator.vue"

/**
 * ComboboxViewport - 视口容器
 */
export { default as ComboboxViewport } from "./ComboboxViewport.vue"

// 从 reka-ui 导出
export { ComboboxCancel, ComboboxTrigger } from "reka-ui"

// ============================================================================
// 上下文
// ============================================================================

export { comboboxContextKey, type ComboboxContext } from "./context"

// ============================================================================
// 变体定义
// ============================================================================

/**
 * ComboboxInput 样式变体
 */
export const comboboxInputVariants = cva(
  "flex w-full bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
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
    },
    defaultVariants: {
      size: "default",
    },
  }
)

/**
 * ComboboxAnchor 样式变体
 */
export const comboboxAnchorVariants = cva(
  "flex items-center justify-between rounded-md border border-input bg-background px-3 shadow-xs transition-colors focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
  {
    variants: {
      /**
       * 尺寸
       * @default "default"
       */
      size: {
        sm: "h-8 px-2",
        default: "h-10 px-3",
        lg: "h-12 px-4",
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
 * ComboboxItem 样式变体
 */
export const comboboxItemVariants = cva(
  "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50",
  {
    variants: {
      /**
       * 尺寸
       * @default "default"
       */
      size: {
        sm: "px-1.5 py-1 text-xs",
        default: "px-2 py-1.5 text-sm",
        lg: "px-3 py-2 text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export type ComboboxInputVariants = VariantProps<typeof comboboxInputVariants>
export type ComboboxAnchorVariants = VariantProps<typeof comboboxAnchorVariants>
export type ComboboxItemVariants = VariantProps<typeof comboboxItemVariants>
