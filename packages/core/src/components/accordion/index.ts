import type { VariantProps } from "class-variance-authority"
import type { ComputedRef, InjectionKey } from "vue"
import { cva } from "class-variance-authority"

// ============================================================================
// 组件导出
// ============================================================================

/**
 * Accordion - 原子化增强版根组件
 * 
 * 支持 bordered、ghost、expandIconPosition、destroyInactivePanel 等
 * 
 * @example
 * ```vue
 * <Accordion type="single" collapsible bordered expand-icon-position="right">
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>标题</AccordionTrigger>
 *     <AccordionContent>内容</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
export { default as Accordion } from "./Accordion.vue"

/**
 * AccordionContent - 原子化增强版内容组件
 * 
 * 支持 destroyOnHide 等
 */
export { default as AccordionContent } from "./AccordionContent.vue"

/**
 * AccordionItem - 手风琴项组件
 */
export { default as AccordionItem } from "./AccordionItem.vue"

/**
 * AccordionTrigger - 原子化增强版触发器组件
 * 
 * 支持 showIcon、iconPosition 等
 */
export { default as AccordionTrigger } from "./AccordionTrigger.vue"

/**
 * AccordionSimple - 简化组合组件
 * 
 * 通过 items 数组快速创建手风琴
 * 
 * @example
 * ```vue
 * <AccordionSimple
 *   :items="[
 *     { value: '1', title: '标题1', content: '内容1' },
 *     { value: '2', title: '标题2', content: '内容2' },
 *   ]"
 *   type="single"
 *   collapsible
 * />
 * ```
 */
export { default as AccordionSimple } from "./AccordionSimple.vue"

// ============================================================================
// 上下文
// ============================================================================

export { accordionContextKey, type AccordionContext } from "./context"

// ============================================================================
// 变体定义
// ============================================================================

/**
 * Accordion 样式变体
 */
export const accordionVariants = cva(
  "w-full",
  {
    variants: {
      /**
       * 是否显示边框
       * @default true
       */
      bordered: {
        true: "divide-y divide-border rounded-lg border",
        false: "",
      },
      /**
       * 幽灵模式
       * @default false
       */
      ghost: {
        true: "border-none bg-transparent",
        false: "",
      },
    },
    defaultVariants: {
      bordered: true,
      ghost: false,
    },
  }
)

/**
 * AccordionItem 样式变体
 */
export const accordionItemVariants = cva(
  "",
  {
    variants: {
      bordered: {
        true: "border-b last:border-b-0",
        false: "",
      },
    },
    defaultVariants: {
      bordered: true,
    },
  }
)

export type AccordionVariants = VariantProps<typeof accordionVariants>
export type AccordionItemVariants = VariantProps<typeof accordionItemVariants>

// ============================================================================
// 类型定义
// ============================================================================

/**
 * AccordionItem 数据类型
 */
export interface AccordionItemData {
  /**
   * 唯一标识
   */
  value: string
  /**
   * 标题
   */
  title: string
  /**
   * 内容
   */
  content?: string
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 额外内容
   */
  extra?: string
}
