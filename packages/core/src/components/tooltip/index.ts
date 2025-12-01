import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

// ============================================================================
// 组件导出
// ============================================================================

/**
 * 增强版 Tooltip 组件（推荐使用）
 * 
 * 功能完整，开箱即用
 * 
 * @example
 * ```vue
 * <GTooltip content="提示文本">
 *   <Button>悬停显示</Button>
 * </GTooltip>
 * ```
 */
export { default as GTooltip } from "./GTooltip.vue"

/**
 * 原子化 Tooltip 组件（shadcn 风格）
 * 
 * 高度可定制，需要手动组合子组件
 * 
 * @example
 * ```vue
 * <TooltipProvider>
 *   <Tooltip>
 *     <TooltipTrigger>悬停</TooltipTrigger>
 *     <TooltipContent>提示内容</TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 * ```
 */
export { default as Tooltip } from "./Tooltip.vue"
export { default as TooltipContent } from "./TooltipContent.vue"
export { default as TooltipProvider } from "./TooltipProvider.vue"
export { default as TooltipTrigger } from "./TooltipTrigger.vue"

// ============================================================================
// 变体定义
// ============================================================================

/**
 * Tooltip 内容样式变体
 * 
 * 主题：default, light, primary, success, warning, danger
 */
export const tooltipVariants = cva(
  "z-50 w-fit rounded-md px-3 py-1.5 text-xs text-balance animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      /**
       * 主题
       * @default "default"
       */
      theme: {
        default: "bg-foreground text-background",
        light: "bg-background text-foreground border border-border shadow-md",
        primary: "bg-primary text-primary-foreground",
        success: "bg-green-600 text-white",
        warning: "bg-yellow-500 text-white",
        danger: "bg-destructive text-destructive-foreground",
      },
      /**
       * 尺寸
       * @default "default"
       */
      size: {
        sm: "px-2 py-1 text-xs",
        default: "px-3 py-1.5 text-xs",
        lg: "px-4 py-2 text-sm",
      },
    },
    defaultVariants: {
      theme: "default",
      size: "default",
    },
  }
)

/**
 * Tooltip 箭头样式变体
 */
export const tooltipArrowVariants = cva(
  "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]",
  {
    variants: {
      theme: {
        default: "bg-foreground fill-foreground",
        light: "bg-background fill-background border-l border-t border-border",
        primary: "bg-primary fill-primary",
        success: "bg-green-600 fill-green-600",
        warning: "bg-yellow-500 fill-yellow-500",
        danger: "bg-destructive fill-destructive",
      },
    },
    defaultVariants: {
      theme: "default",
    },
  }
)

export type TooltipVariants = VariantProps<typeof tooltipVariants>
export type TooltipArrowVariants = VariantProps<typeof tooltipArrowVariants>

// ============================================================================
// 类型定义
// ============================================================================

/**
 * 触发方式类型
 */
export type TooltipTriggerType = "hover" | "click" | "focus" | "contextmenu"

/**
 * 位置类型
 */
export type TooltipPlacement = 
  | "top" | "top-start" | "top-end"
  | "bottom" | "bottom-start" | "bottom-end"
  | "left" | "left-start" | "left-end"
  | "right" | "right-start" | "right-end"

/**
 * GTooltip Props 类型
 */
export interface GTooltipProps {
  // ========== 基础属性 ==========
  /**
   * 提示内容
   */
  content?: string
  /**
   * 是否显示（v-model）
   */
  open?: boolean
  /**
   * 默认是否显示（非受控）
   * @default false
   */
  defaultOpen?: boolean
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean

  // ========== 位置 ==========
  /**
   * 弹出位置
   * @default "top"
   */
  placement?: TooltipPlacement
  /**
   * 偏移距离
   * @default 4
   */
  sideOffset?: number
  /**
   * 对齐偏移
   * @default 0
   */
  alignOffset?: number

  // ========== 触发方式 ==========
  /**
   * 触发方式
   * @default "hover"
   */
  trigger?: TooltipTriggerType | TooltipTriggerType[]

  // ========== 延迟 ==========
  /**
   * 显示延迟（毫秒）
   * @default 0
   */
  showDelay?: number
  /**
   * 隐藏延迟（毫秒）
   * @default 0
   */
  hideDelay?: number
  /**
   * 自动隐藏时间（毫秒），0 表示不自动隐藏
   * @default 0
   */
  duration?: number

  // ========== 样式 ==========
  /**
   * 主题
   * @default "default"
   */
  theme?: "default" | "light" | "primary" | "success" | "warning" | "danger"
  /**
   * 尺寸
   * @default "default"
   */
  size?: "sm" | "default" | "lg"
  /**
   * 自定义背景颜色
   */
  backgroundColor?: string
  /**
   * 自定义文字颜色
   */
  textColor?: string
  /**
   * 是否显示箭头
   * @default true
   */
  showArrow?: boolean
  /**
   * 最大宽度
   */
  maxWidth?: string | number

  // ========== 其他 ==========
  /**
   * 关闭时是否销毁内容
   * @default false
   */
  destroyOnClose?: boolean
  /**
   * 自定义类名
   */
  class?: string
  /**
   * 内容自定义类名
   */
  contentClass?: string
  /**
   * 箭头自定义类名
   */
  arrowClass?: string
  /**
   * 无障碍标签
   */
  ariaLabel?: string
}

/**
 * GTooltip 事件类型
 */
export interface GTooltipEmits {
  /**
   * 显示状态变化时触发
   */
  (e: "update:open", value: boolean): void
  /**
   * 显示状态变化时触发
   */
  (e: "openChange", value: boolean): void
}
