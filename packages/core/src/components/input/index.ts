import type { VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "vue"
import { cva } from "class-variance-authority"

export { default as Input } from "./Input.vue"

/**
 * Input Props 接口
 */
export interface InputProps {
  /** 绑定值 */
  modelValue?: string | number
  /** 默认值 */
  defaultValue?: string | number
  /** 输入框类型 */
  type?: "text" | "password" | "email" | "number" | "tel" | "url" | "search"
  /** 输入框尺寸 */
  size?: InputVariants["size"]
  /** 占位符 */
  placeholder?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否只读 */
  readonly?: boolean
  /** 是否显示清除按钮 */
  allowClear?: boolean
  /** 最大长度 */
  maxLength?: number
  /** 是否显示字数统计 */
  showWordLimit?: boolean
  /** 自定义字符长度计算方法 */
  wordLength?: (value: string) => number
  /** 是否错误状态 */
  error?: boolean
  /** 前缀文本 */
  prefix?: string
  /** 后缀文本 */
  suffix?: string
  /** 自动聚焦 */
  autofocus?: boolean
  /** 自动完成 */
  autocomplete?: string
  /** 表单名称 */
  name?: string
  /** 自定义类名 */
  class?: HTMLAttributes["class"]
}

/**
 * 输入框变体样式定义
 */
export const inputVariants = cva(
  [
    "w-full min-w-0 rounded-md border bg-transparent",
    "text-base md:text-sm",
    "shadow-xs transition-[color,box-shadow,border-color] duration-200",
    "outline-none",
    // 文件输入样式
    "file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
    // 选中文本样式
    "selection:bg-primary selection:text-primary-foreground",
    // 禁用状态
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    // 焦点样式
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
    // 无效状态
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    // 暗色模式
    "dark:bg-input/30 border-input",
  ],
  {
    variants: {
      size: {
        xs: "h-7 px-2 text-xs",
        sm: "h-8 px-2.5 text-sm",
        default: "h-9 px-3",
        lg: "h-10 px-4 text-base",
        xl: "h-12 px-5 text-lg",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export type InputVariants = VariantProps<typeof inputVariants>
