import type { VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "vue"
import { cva } from "class-variance-authority"

export { default as Button } from "./Button.vue"

/**
 * 按钮 Props 接口
 */
export interface ButtonProps {
  /** 按钮变体样式 */
  variant?: ButtonVariants["variant"]
  /** 按钮尺寸 */
  size?: ButtonVariants["size"]
  /** 按钮形状 */
  shape?: "default" | "circle" | "round"
  /** 是否加载中 */
  loading?: boolean
  /** 加载延迟（毫秒），防止闪烁 */
  loadingDelay?: number
  /** 是否禁用 */
  disabled?: boolean
  /** 是否为块级按钮（宽度100%） */
  block?: boolean
  /** 是否为幽灵按钮（背景透明） */
  ghost?: boolean
  /** 危险按钮 */
  danger?: boolean
  /** 链接地址，设置后渲染为 a 标签 */
  href?: string
  /** 链接打开方式 */
  target?: "_blank" | "_self" | "_parent" | "_top"
  /** 原生 button type */
  htmlType?: "button" | "submit" | "reset"
  /** 图标位置 */
  iconPosition?: "left" | "right"
  /** 自定义类名 */
  class?: HTMLAttributes["class"]
  /** 渲染的元素类型 */
  as?: string
  /** 是否作为子元素渲染 */
  asChild?: boolean
}

/**
 * 按钮变体样式定义
 * 使用 class-variance-authority 管理变体
 */
export const buttonVariants = cva(
  // 基础样式
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-md text-sm font-medium",
    "transition-all duration-200",
    "outline-none",
    // 禁用状态
    "disabled:pointer-events-none disabled:opacity-50",
    // SVG 图标样式
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
    // Focus 样式
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    // 无效状态
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  ],
  {
    variants: {
      /**
       * 按钮变体
       * - default: 主要按钮，深色背景
       * - destructive: 危险按钮，红色
       * - outline: 边框按钮
       * - secondary: 次要按钮，浅色背景
       * - ghost: 幽灵按钮，无背景
       * - link: 链接按钮，下划线
       * - success: 成功按钮，绿色
       * - warning: 警告按钮，橙色
       */
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:bg-primary/80",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 active:bg-destructive/80 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground active:bg-accent/80 dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 active:bg-secondary/70",
        ghost:
          "hover:bg-accent hover:text-accent-foreground active:bg-accent/80 dark:hover:bg-accent/50",
        link: 
          "text-primary underline-offset-4 hover:underline",
        success:
          "bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 active:bg-emerald-800 focus-visible:ring-emerald-500/20",
        warning:
          "bg-amber-500 text-white shadow-sm hover:bg-amber-600 active:bg-amber-700 focus-visible:ring-amber-500/20",
      },
      /**
       * 按钮尺寸
       * - xs: 超小尺寸
       * - sm: 小尺寸
       * - default: 默认尺寸
       * - lg: 大尺寸
       * - xl: 超大尺寸
       * - icon: 图标按钮（正方形）
       * - icon-sm: 小图标按钮
       * - icon-lg: 大图标按钮
       */
      size: {
        xs: "h-7 px-2.5 text-xs gap-1 rounded",
        sm: "h-8 px-3 text-xs gap-1.5 rounded-md",
        default: "h-9 px-4 py-2",
        lg: "h-10 px-6 text-base",
        xl: "h-12 px-8 text-lg",
        icon: "size-9 p-0",
        "icon-xs": "size-7 p-0 rounded",
        "icon-sm": "size-8 p-0",
        "icon-lg": "size-10 p-0",
        "icon-xl": "size-12 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
