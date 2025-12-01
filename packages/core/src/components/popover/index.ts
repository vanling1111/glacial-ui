import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

// ============================================================================
// 组件导出
// ============================================================================

// 注意：本库遵循 shadcn 原子化结构，不再提供 G* 封装组件。

/**
 * Popover - 原子化增强版根组件
 * 
 * 所有增强功能都在原子化组件上实现，支持 disabled、modal 等
 * 
 * @example
 * ```vue
 * <Popover v-model:open="isOpen" disabled>
 *   <PopoverTrigger>打开</PopoverTrigger>
 *   <PopoverContent theme="dark" size="lg" show-arrow>
 *     <div class="font-semibold mb-2">标题</div>
 *     <div>内容</div>
 *   </PopoverContent>
 * </Popover>
 * ```
 */
export { default as Popover } from "./Popover.vue"

/**
 * PopoverAnchor - 锚点组件
 */
export { default as PopoverAnchor } from "./PopoverAnchor.vue"

/**
 * PopoverContent - 原子化增强版内容组件
 * 
 * 支持 theme、size、maxWidth、maxHeight、showArrow、closeOnClickOutside、closeOnEscape 等
 */
export { default as PopoverContent } from "./PopoverContent.vue"

/**
 * PopoverTrigger - 触发器组件
 */
export { default as PopoverTrigger } from "./PopoverTrigger.vue"

// ============================================================================
// 变体定义
// ============================================================================

/**
 * Popover 内容样式变体
 */
export const popoverVariants = cva(
  "z-50 rounded-md border shadow-md outline-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      /**
       * 主题
       * @default "default"
       */
      theme: {
        default: "bg-popover text-popover-foreground",
        light: "bg-white text-foreground",
        dark: "bg-zinc-900 text-white border-zinc-800",
      },
      /**
       * 尺寸
       * @default "default"
       */
      size: {
        sm: "w-56 p-3",
        default: "w-72 p-4",
        lg: "w-96 p-5",
        auto: "w-auto p-4",
      },
    },
    defaultVariants: {
      theme: "default",
      size: "default",
    },
  }
)

export type PopoverVariants = VariantProps<typeof popoverVariants>

// ============================================================================
// 类型定义
// ============================================================================

/**
 * 触发方式类型
 */
export type PopoverTriggerType = "hover" | "click" | "focus" | "contextmenu"

/**
 * 位置类型
 */
export type PopoverPlacement = 
  | "top" | "top-start" | "top-end"
  | "bottom" | "bottom-start" | "bottom-end"
  | "left" | "left-start" | "left-end"
  | "right" | "right-start" | "right-end"

/**
 * GPopover Props 类型
 */
export interface GPopoverProps {
  // ========== 基础属性 ==========
  /**
   * 标题
   */
  title?: string
  /**
   * 内容
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
   * @default "bottom"
   */
  placement?: PopoverPlacement
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
   * @default "click"
   */
  trigger?: PopoverTriggerType | PopoverTriggerType[]

  // ========== 延迟 ==========
  /**
   * 显示延迟（毫秒），仅 hover 触发时有效
   * @default 0
   */
  showDelay?: number
  /**
   * 隐藏延迟（毫秒），仅 hover 触发时有效
   * @default 0
   */
  hideDelay?: number

  // ========== 样式 ==========
  /**
   * 主题
   * @default "default"
   */
  theme?: "default" | "light" | "dark"
  /**
   * 尺寸
   * @default "default"
   */
  size?: "sm" | "default" | "lg" | "auto"
  /**
   * 是否显示箭头
   * @default false
   */
  showArrow?: boolean
  /**
   * 最大宽度
   */
  maxWidth?: string | number
  /**
   * 最大高度
   */
  maxHeight?: string | number

  // ========== 交互 ==========
  /**
   * 点击外部是否关闭
   * @default true
   */
  closeOnClickOutside?: boolean
  /**
   * 按 Escape 键是否关闭
   * @default true
   */
  closeOnEscape?: boolean
  /**
   * 是否为模态模式（阻止背景交互）
   * @default false
   */
  modal?: boolean

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
   * 标题自定义类名
   */
  titleClass?: string
  /**
   * 箭头自定义类名
   */
  arrowClass?: string
}

/**
 * GPopover 事件类型
 */
export interface GPopoverEmits {
  /**
   * 显示状态变化时触发
   */
  (e: "update:open", value: boolean): void
  /**
   * 显示状态变化时触发
   */
  (e: "openChange", value: boolean): void
}
