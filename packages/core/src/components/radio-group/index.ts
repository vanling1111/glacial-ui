import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

// ============================================================================
// 组件导出
// ============================================================================

/**
 * 增强版 RadioGroup 组件
 * 
 * 支持 options 数据驱动、方向布局、按钮样式等
 * 
 * @example
 * ```vue
 * <RadioGroup v-model="value" :options="options" />
 * <RadioGroup v-model="value" :options="options" type="button" />
 * ```
 */
export { default as RadioGroup } from "./RadioGroup.vue"

/**
 * 增强版 RadioGroupItem 组件
 * 
 * 支持 label、description、size 等
 * 
 * @example
 * ```vue
 * <RadioGroup v-model="value">
 *   <RadioGroupItem value="1" label="选项一" />
 *   <RadioGroupItem value="2" label="选项二" description="这是描述" />
 * </RadioGroup>
 * ```
 */
export { default as RadioGroupItem } from "./RadioGroupItem.vue"

// ============================================================================
// 变体定义
// ============================================================================

/**
 * Radio 尺寸和样式变体
 * 
 * 尺寸：xs, sm, default, lg, xl
 * 变体：default, card, button
 */
export const radioVariants = cva(
  "aspect-square shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
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
        default: "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30",
        card: "border-input text-primary",
        button: "border-transparent",
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
 * Radio 指示器尺寸变体
 */
export const radioIndicatorVariants = cva(
  "fill-primary",
  {
    variants: {
      size: {
        xs: "size-1.5",
        sm: "size-2",
        default: "size-2",
        lg: "size-2.5",
        xl: "size-3",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

/**
 * RadioGroup 布局变体
 */
export const radioGroupVariants = cva(
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
      /**
       * 类型（按钮样式时的布局）
       */
      type: {
        default: "",
        button: "inline-flex rounded-md border border-input p-1 bg-muted",
      },
    },
    defaultVariants: {
      direction: "horizontal",
      size: "default",
      type: "default",
    },
  }
)

/**
 * 按钮样式的 Radio 变体
 */
export const radioButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      /**
       * 按钮样式
       * @default "outline"
       */
      buttonStyle: {
        outline: "data-[state=checked]:bg-background data-[state=checked]:text-foreground data-[state=checked]:shadow-sm",
        solid: "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      },
      /**
       * 尺寸
       */
      size: {
        xs: "h-6 px-2 text-xs",
        sm: "h-7 px-2.5 text-xs",
        default: "h-8 px-3 text-sm",
        lg: "h-9 px-4 text-sm",
        xl: "h-10 px-5 text-base",
      },
    },
    defaultVariants: {
      buttonStyle: "outline",
      size: "default",
    },
  }
)

export type RadioVariants = VariantProps<typeof radioVariants>
export type RadioIndicatorVariants = VariantProps<typeof radioIndicatorVariants>
export type RadioGroupVariants = VariantProps<typeof radioGroupVariants>
export type RadioButtonVariants = VariantProps<typeof radioButtonVariants>

// ============================================================================
// 类型定义
// ============================================================================

/**
 * Radio 选项类型（用于 RadioGroup）
 */
export interface RadioOption {
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
   * 选项描述
   */
  description?: string
}

/**
 * RadioGroupItem Props 类型
 */
export interface RadioGroupItemProps {
  // ========== 基础属性 ==========
  /**
   * 选项值
   */
  value: string | number | boolean
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

  // ========== 其他 ==========
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
 * RadioGroup Props 类型
 */
export interface RadioGroupProps {
  // ========== 基础属性 ==========
  /**
   * 选中的值（v-model）
   */
  modelValue?: string | number | boolean
  /**
   * 默认选中的值（非受控）
   */
  defaultValue?: string | number | boolean
  /**
   * 选项配置
   */
  options?: RadioOption[]
  /**
   * 是否禁用整个组
   * @default false
   */
  disabled?: boolean
  /**
   * 表单字段名
   */
  name?: string

  // ========== 布局 ==========
  /**
   * 布局方向
   * @default "horizontal"
   */
  direction?: "horizontal" | "vertical"
  /**
   * 尺寸（应用到所有子 Radio）
   * @default "default"
   */
  size?: "xs" | "sm" | "default" | "lg" | "xl"
  /**
   * 变体样式（应用到所有子 Radio）
   * @default "default"
   */
  variant?: "default" | "card" | "button"

  // ========== 按钮类型 ==========
  /**
   * 类型
   * @default "default"
   */
  type?: "default" | "button"
  /**
   * 按钮样式（仅 type="button" 时有效）
   * @default "outline"
   */
  buttonStyle?: "outline" | "solid"

  // ========== 其他 ==========
  /**
   * 自定义类名
   */
  class?: string
  /**
   * 是否允许取消选中
   * @default false
   */
  allowUncheck?: boolean
}

/**
 * RadioGroupItem 事件类型
 */
export interface RadioGroupItemEmits {
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
 * RadioGroup 事件类型
 */
export interface RadioGroupEmits {
  /**
   * 值变化时触发
   */
  (e: "update:modelValue", value: string | number | boolean): void
  /**
   * 值变化时触发（带事件对象）
   */
  (e: "change", value: string | number | boolean, event: Event): void
}
