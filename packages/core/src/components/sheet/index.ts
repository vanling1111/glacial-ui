import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

// ============================================================================
// 组件导出
// ============================================================================

/**
 * Sheet - 原子化增强版侧边抽屉根组件
 * 
 * 支持 showOverlay、closeOnOverlayClick、closeOnEscape 等
 */
export { default as Sheet } from "./Sheet.vue"

/**
 * SheetClose - 关闭按钮
 */
export { default as SheetClose } from "./SheetClose.vue"

/**
 * SheetContent - 原子化增强版内容组件
 * 
 * 支持 side、size、showCloseButton 等
 */
export { default as SheetContent } from "./SheetContent.vue"

/**
 * SheetDescription - 描述
 */
export { default as SheetDescription } from "./SheetDescription.vue"

/**
 * SheetFooter - 底部
 */
export { default as SheetFooter } from "./SheetFooter.vue"

/**
 * SheetHeader - 头部
 */
export { default as SheetHeader } from "./SheetHeader.vue"

/**
 * SheetTitle - 标题
 */
export { default as SheetTitle } from "./SheetTitle.vue"

/**
 * SheetTrigger - 触发器
 */
export { default as SheetTrigger } from "./SheetTrigger.vue"

// ============================================================================
// 上下文
// ============================================================================

export { sheetContextKey, type SheetContext } from "./context"

// ============================================================================
// 变体定义
// ============================================================================

/**
 * SheetContent 样式变体
 */
export const sheetContentVariants = cva(
  "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      /**
       * 方向
       * @default "right"
       */
      side: {
        top: "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 border-b",
        right: "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full border-l",
        bottom: "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 border-t",
        left: "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full border-r",
      },
      /**
       * 尺寸
       * @default "default"
       */
      size: {
        sm: "",
        default: "",
        lg: "",
        xl: "",
        full: "",
      },
    },
    compoundVariants: [
      // 左右方向的尺寸
      { side: "right", size: "sm", class: "w-64" },
      { side: "right", size: "default", class: "w-3/4 sm:max-w-sm" },
      { side: "right", size: "lg", class: "w-3/4 sm:max-w-lg" },
      { side: "right", size: "xl", class: "w-3/4 sm:max-w-xl" },
      { side: "right", size: "full", class: "w-full" },
      { side: "left", size: "sm", class: "w-64" },
      { side: "left", size: "default", class: "w-3/4 sm:max-w-sm" },
      { side: "left", size: "lg", class: "w-3/4 sm:max-w-lg" },
      { side: "left", size: "xl", class: "w-3/4 sm:max-w-xl" },
      { side: "left", size: "full", class: "w-full" },
      // 上下方向的尺寸
      { side: "top", size: "sm", class: "h-32" },
      { side: "top", size: "default", class: "h-auto" },
      { side: "top", size: "lg", class: "h-1/2" },
      { side: "top", size: "xl", class: "h-3/4" },
      { side: "top", size: "full", class: "h-full" },
      { side: "bottom", size: "sm", class: "h-32" },
      { side: "bottom", size: "default", class: "h-auto" },
      { side: "bottom", size: "lg", class: "h-1/2" },
      { side: "bottom", size: "xl", class: "h-3/4" },
      { side: "bottom", size: "full", class: "h-full" },
    ],
    defaultVariants: {
      side: "right",
      size: "default",
    },
  }
)

export type SheetContentVariants = VariantProps<typeof sheetContentVariants>
