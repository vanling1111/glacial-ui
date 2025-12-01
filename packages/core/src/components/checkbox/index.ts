import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

// ============================================================================
// 组件导出
// ============================================================================

/**
 * 增强版 Checkbox 组件（推荐使用）
 * 
 * 功能完整，支持 label、description、indeterminate、size 等
 * 
 * @example
 * ```vue
 * <Checkbox v-model="checked" label="同意协议" />
 * <Checkbox v-model="checked" label="记住我" description="下次自动登录" />
 * ```
 */
export { default as Checkbox } from "./Checkbox.vue"

/**
 * 增强版 CheckboxGroup 组件
 * 
 * 支持 options 数据驱动、max 限制、方向布局等
 * 
 * @example
 * ```vue
 * <CheckboxGroup v-model="values" :options="options" :max="3" />
 * ```
 */
export { default as CheckboxGroup } from "./CheckboxGroup.vue"

// ============================================================================
// 变体定义
// ============================================================================

/**
 * Checkbox 尺寸和样式变体
 * 
 * 尺寸：xs, sm, default, lg, xl
 * 变体：default, card, button
 */
export const checkboxVariants = cva(
  "peer shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      /**
       * 尺寸
       * @default "default"
       */
      size: {
        xs: "size-3",
        sm: "size-3.5",
        default: "size-4",
        lg: "size-5",
        xl: "size-6",
      },
      /**
       * 变体样式
       * @default "default"
       */
      variant: {
        default: "border-input data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50",
        card: "border-input data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary",
        button: "border-transparent bg-muted data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      },
      /**
       * 错误状态
       */
      error: {
        true: "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border-destructive",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
      error: false,
    },
  }
)

/**
 * Checkbox 图标尺寸变体
 */
export const checkboxIconVariants = cva(
  "",
  {
    variants: {
      size: {
        xs: "size-2",
        sm: "size-2.5",
        default: "size-3.5",
        lg: "size-4",
        xl: "size-5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

/**
 * CheckboxGroup 布局变体
 */
export const checkboxGroupVariants = cva(
  "flex gap-2",
  {
    variants: {
      /**
       * 布局方向
       * @default "horizontal"
       */
      direction: {
        horizontal: "flex-row flex-wrap",
        vertical: "flex-col",
      },
      /**
       * 尺寸
       */
      size: {
        xs: "gap-1.5",
        sm: "gap-2",
        default: "gap-3",
        lg: "gap-4",
        xl: "gap-5",
      },
    },
    defaultVariants: {
      direction: "horizontal",
      size: "default",
    },
  }
)

export type CheckboxVariants = VariantProps<typeof checkboxVariants>
export type CheckboxIconVariants = VariantProps<typeof checkboxIconVariants>
export type CheckboxGroupVariants = VariantProps<typeof checkboxGroupVariants>

// ============================================================================
// 类型定义
// ============================================================================

/**
 * Checkbox 选项类型（用于 CheckboxGroup）
 */
export interface CheckboxOption {
  /**
   * 选项标签
   */
  label: string
  /**
   * 选项值
   */
  value: string | number | boolean
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 是否为半选状态
   */
  indeterminate?: boolean
  /**
   * 选项描述
   */
  description?: string
}

/**
 * Checkbox Props 类型
 */
export interface CheckboxProps {
  // ========== 基础属性 ==========
  /**
   * 是否选中（v-model）
   */
  modelValue?: boolean
  /**
   * 默认是否选中（非受控）
   * @default false
   */
  defaultChecked?: boolean
  /**
   * 选项值（在 CheckboxGroup 中使用）
   */
  value?: string | number | boolean
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

  // ========== 半选状态 ==========
  /**
   * 是否为半选状态（用于全选场景）
   * @default false
   */
  indeterminate?: boolean

  // ========== 尺寸与样式 ==========
  /**
   * 尺寸
   * @default "default"
   */
  size?: "xs" | "sm" | "default" | "lg" | "xl"
  /**
   * 变体样式
   * @default "default"
   */
  variant?: "default" | "card" | "button"
  /**
   * 是否为错误状态
   * @default false
   */
  error?: boolean
  /**
   * 自定义类名
   */
  class?: string

  // ========== 标签与描述 ==========
  /**
   * 标签文本
   */
  label?: string
  /**
   * 描述文本
   */
  description?: string
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
  trueValue?: any
  /**
   * 未选中时的值
   * @default false
   */
  falseValue?: any

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
  /**
   * 无障碍描述 ID
   */
  ariaDescribedby?: string
}

/**
 * CheckboxGroup Props 类型
 */
export interface CheckboxGroupProps {
  // ========== 基础属性 ==========
  /**
   * 选中的值数组（v-model）
   */
  modelValue?: (string | number | boolean)[]
  /**
   * 默认选中的值数组（非受控）
   */
  defaultValue?: (string | number | boolean)[]
  /**
   * 选项配置
   */
  options?: CheckboxOption[]
  /**
   * 是否禁用整个组
   * @default false
   */
  disabled?: boolean
  /**
   * 表单字段名
   */
  name?: string

  // ========== 限制 ==========
  /**
   * 最大可选数量
   */
  max?: number
  /**
   * 最小可选数量
   */
  min?: number

  // ========== 布局 ==========
  /**
   * 布局方向
   * @default "horizontal"
   */
  direction?: "horizontal" | "vertical"
  /**
   * 尺寸（应用到所有子 Checkbox）
   * @default "default"
   */
  size?: "xs" | "sm" | "default" | "lg" | "xl"
  /**
   * 变体样式（应用到所有子 Checkbox）
   * @default "default"
   */
  variant?: "default" | "card" | "button"

  // ========== 其他 ==========
  /**
   * 自定义类名
   */
  class?: string
  /**
   * 是否显示全选选项
   * @default false
   */
  showCheckAll?: boolean
  /**
   * 全选选项的标签
   * @default "全选"
   */
  checkAllLabel?: string
}

/**
 * Checkbox 事件类型
 */
export interface CheckboxEmits {
  /**
   * 值变化时触发
   */
  (e: "update:modelValue", value: boolean): void
  /**
   * 值变化时触发（带事件对象）
   */
  (e: "change", value: boolean, event: Event): void
  /**
   * 获得焦点时触发
   */
  (e: "focus", event: FocusEvent): void
  /**
   * 失去焦点时触发
   */
  (e: "blur", event: FocusEvent): void
}

/**
 * CheckboxGroup 事件类型
 */
export interface CheckboxGroupEmits {
  /**
   * 值变化时触发
   */
  (e: "update:modelValue", value: (string | number | boolean)[]): void
  /**
   * 值变化时触发（带事件对象）
   */
  (e: "change", value: (string | number | boolean)[], event: Event): void
}
