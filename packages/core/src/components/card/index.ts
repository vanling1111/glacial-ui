import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

// ============================================================================
// 组件导出
// ============================================================================

/**
 * Card - 原子化增强版卡片组件
 * 
 * 支持 size、hoverable、clickable、bordered、shadow 等
 */
export { default as Card } from "./Card.vue"

/**
 * CardAction - 卡片操作区域
 */
export { default as CardAction } from "./CardAction.vue"

/**
 * CardContent - 卡片内容
 */
export { default as CardContent } from "./CardContent.vue"

/**
 * CardDescription - 卡片描述
 */
export { default as CardDescription } from "./CardDescription.vue"

/**
 * CardFooter - 卡片底部
 */
export { default as CardFooter } from "./CardFooter.vue"

/**
 * CardHeader - 卡片头部
 */
export { default as CardHeader } from "./CardHeader.vue"

/**
 * CardTitle - 卡片标题
 */
export { default as CardTitle } from "./CardTitle.vue"

// ============================================================================
// 变体定义
// ============================================================================

/**
 * Card 样式变体
 */
export const cardVariants = cva(
  "bg-card text-card-foreground flex flex-col rounded-xl transition-all",
  {
    variants: {
      /**
       * 尺寸
       * @default "default"
       */
      size: {
        sm: "gap-4 py-4",
        default: "gap-6 py-6",
        lg: "gap-8 py-8",
      },
      /**
       * 是否显示悬停效果
       * @default false
       */
      hoverable: {
        true: "hover:shadow-md hover:-translate-y-0.5",
        false: "",
      },
      /**
       * 是否可点击
       * @default false
       */
      clickable: {
        true: "cursor-pointer",
        false: "",
      },
      /**
       * 是否显示边框
       * @default true
       */
      bordered: {
        true: "border",
        false: "",
      },
      /**
       * 阴影大小
       * @default "sm"
       */
      shadow: {
        none: "",
        sm: "shadow-sm",
        default: "shadow",
        lg: "shadow-lg",
      },
    },
    defaultVariants: {
      size: "default",
      hoverable: false,
      clickable: false,
      bordered: true,
      shadow: "sm",
    },
  }
)

export type CardVariants = VariantProps<typeof cardVariants>
