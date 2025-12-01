import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

// ============================================================================
// 组件导出
// ============================================================================

/**
 * 增强版 Switch 组件
 * 
 * 功能完整，支持 loading、label、size、type 等
 * 
 * @example
 * ```vue
 * <Switch v-model="checked" />
 * <Switch v-model="checked" loading />
 * <Switch v-model="checked" checked-text="开" unchecked-text="关" />
 * ```
 */
export { default as Switch } from "./Switch.vue"

// ============================================================================
// 变体定义
// ============================================================================

/**
 * Switch 尺寸和样式变体
 * 
 * 尺寸：xs, sm, default, lg, xl
 * 类型：default, line
 */
export const switchVariants = cva(
  "peer inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      /**
       * 尺寸
       * @default "default"
       */
      size: {
        xs: "h-3 w-5",
        sm: "h-3.5 w-6",
        default: "h-[1.15rem] w-8",
        lg: "h-5 w-10",
        xl: "h-6 w-12",
      },
      /**
       * 类型
       * @default "default"
       */
      type: {
        default: "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80",
        line: "bg-transparent border-2 data-[state=checked]:border-primary data-[state=unchecked]:border-input",
      },
      /**
       * 错误状态
       */
      error: {
        true: "data-[state=unchecked]:bg-destructive/20 data-[state=unchecked]:border-destructive",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      type: "default",
      error: false,
    },
  }
)

/**
 * Switch Thumb 变体
 */
export const switchThumbVariants = cva(
  "pointer-events-none block rounded-full ring-0 transition-transform",
  {
    variants: {
      size: {
        xs: "size-2",
        sm: "size-2.5",
        default: "size-4",
        lg: "size-4",
        xl: "size-5",
      },
      type: {
        default: "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground",
        line: "bg-input data-[state=checked]:bg-primary",
      },
    },
    compoundVariants: [
      // 不同尺寸的位移
      { size: "xs", class: "data-[state=checked]:translate-x-2 data-[state=unchecked]:translate-x-0" },
      { size: "sm", class: "data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0.5" },
      { size: "default", class: "data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0" },
      { size: "lg", class: "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5" },
      { size: "xl", class: "data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0.5" },
    ],
    defaultVariants: {
      size: "default",
      type: "default",
    },
  }
)

export type SwitchVariants = VariantProps<typeof switchVariants>
export type SwitchThumbVariants = VariantProps<typeof switchThumbVariants>

// ============================================================================
// 类型定义
// ============================================================================

/**
 * Switch Props 类型
 */
export interface SwitchProps {
  // ========== 基础属性 ==========
  /**
   * 是否选中（v-model）
   */
  modelValue?: boolean | string | number
  /**
   * 默认是否选中（非受控）
   * @default false
   */
  defaultChecked?: boolean
  /**
   * 表单字段名
   */
  name?: string
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean
  /**
   * 是否只读
   * @default false
   */
  readonly?: boolean
  /**
   * 是否必填
   * @default false
   */
  required?: boolean

  // ========== 尺寸与样式 ==========
  /**
   * 尺寸
   * @default "default"
   */
  size?: "xs" | "sm" | "default" | "lg" | "xl"
  /**
   * 类型
   * @default "default"
   */
  type?: "default" | "line"
  /**
   * 是否为错误状态
   * @default false
   */
  error?: boolean
  /**
   * 自定义类名
   */
  class?: string

  // ========== 加载状态 ==========
  /**
   * 是否为加载中状态
   * @default false
   */
  loading?: boolean

  // ========== 内容 ==========
  /**
   * 选中时显示的文本
   */
  checkedText?: string
  /**
   * 未选中时显示的文本
   */
  uncheckedText?: string
  /**
   * 标签文本（显示在开关旁边）
   */
  label?: string
  /**
   * 标签位置
   * @default "right"
   */
  labelPosition?: "left" | "right"

  // ========== 自定义值 ==========
  /**
   * 选中时的值
   * @default true
   */
  checkedValue?: any
  /**
   * 未选中时的值
   * @default false
   */
  uncheckedValue?: any

  // ========== 自定义颜色 ==========
  /**
   * 选中时的背景颜色
   */
  checkedColor?: string
  /**
   * 未选中时的背景颜色
   */
  uncheckedColor?: string

  // ========== 异步控制 ==========
  /**
   * 切换前的回调函数
   * 返回 false 或 Promise reject 时不会切换
   * 用于异步确认场景
   */
  beforeChange?: (newValue: any) => boolean | Promise<boolean>

  // ========== 其他 ==========
  /**
   * 是否自动聚焦
   * @default false
   */
  autofocus?: boolean
  /**
   * Tab 键顺序
   */
  tabindex?: number
  /**
   * 无障碍标签
   */
  ariaLabel?: string
  /**
   * 无障碍标签 ID
   */
  ariaLabelledby?: string
}

/**
 * Switch 事件类型
 */
export interface SwitchEmits {
  /**
   * 值变化时触发
   */
  (e: "update:modelValue", value: boolean | string | number): void
  /**
   * 值变化时触发（带事件对象）
   */
  (e: "change", value: boolean | string | number, event: Event): void
  /**
   * 获得焦点时触发
   */
  (e: "focus", event: FocusEvent): void
  /**
   * 失去焦点时触发
   */
  (e: "blur", event: FocusEvent): void
  /**
   * 点击时触发
   */
  (e: "click", event: MouseEvent): void
}
