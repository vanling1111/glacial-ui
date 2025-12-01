import type { VariantProps } from "class-variance-authority"
import type { ComputedRef, InjectionKey } from "vue"
import { cva } from "class-variance-authority"

// ============================================================================
// 组件导出
// ============================================================================

/**
 * Stepper - 原子化增强版根组件
 * 
 * 支持 size、variant、labelPlacement、clickable 等
 * 
 * @example
 * ```vue
 * <Stepper v-model="step" orientation="horizontal" size="default" variant="default">
 *   <StepperItem :step="1">
 *     <StepperTrigger>
 *       <StepperIndicator />
 *       <StepperTitle>步骤1</StepperTitle>
 *     </StepperTrigger>
 *     <StepperSeparator />
 *   </StepperItem>
 * </Stepper>
 * ```
 */
export { default as Stepper } from "./Stepper.vue"

/**
 * StepperDescription - 步骤描述组件
 */
export { default as StepperDescription } from "./StepperDescription.vue"

/**
 * StepperIndicator - 步骤指示器组件
 */
export { default as StepperIndicator } from "./StepperIndicator.vue"

/**
 * StepperItem - 步骤项组件
 */
export { default as StepperItem } from "./StepperItem.vue"

/**
 * StepperSeparator - 步骤分隔线组件
 */
export { default as StepperSeparator } from "./StepperSeparator.vue"

/**
 * StepperTitle - 步骤标题组件
 */
export { default as StepperTitle } from "./StepperTitle.vue"

/**
 * StepperTrigger - 步骤触发器组件
 */
export { default as StepperTrigger } from "./StepperTrigger.vue"

/**
 * StepperSimple - 简化组合组件
 * 
 * 通过 steps 数组快速创建步骤条
 * 
 * @example
 * ```vue
 * <StepperSimple
 *   v-model="currentStep"
 *   :steps="[
 *     { title: '步骤1', description: '描述1' },
 *     { title: '步骤2', description: '描述2' },
 *   ]"
 *   clickable
 * />
 * ```
 */
export { default as StepperSimple } from "./StepperSimple.vue"

// ============================================================================
// 上下文
// ============================================================================

export { stepperContextKey, type StepperContext } from "./context"

// ============================================================================
// 变体定义
// ============================================================================

/**
 * Stepper 样式变体
 */
export const stepperVariants = cva(
  "flex gap-2",
  {
    variants: {
      /**
       * 方向
       * @default "horizontal"
       */
      orientation: {
        horizontal: "flex-row items-center",
        vertical: "flex-col",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
)

/**
 * StepperIndicator 样式变体
 */
export const stepperIndicatorVariants = cva(
  "flex items-center justify-center rounded-full border-2 font-medium transition-colors",
  {
    variants: {
      /**
       * 尺寸
       * @default "default"
       */
      size: {
        sm: "size-6 text-xs",
        default: "size-8 text-sm",
        lg: "size-10 text-base",
      },
      /**
       * 变体
       * @default "default"
       */
      variant: {
        default: "",
        dot: "size-3 border-0",
        navigation: "rounded-md",
      },
      /**
       * 状态
       */
      state: {
        inactive: "border-muted-foreground/50 text-muted-foreground",
        active: "border-primary bg-primary text-primary-foreground",
        completed: "border-primary bg-primary text-primary-foreground",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
      state: "inactive",
    },
  }
)

/**
 * StepperSeparator 样式变体
 */
export const stepperSeparatorVariants = cva(
  "bg-muted-foreground/30 transition-colors data-[state=completed]:bg-primary",
  {
    variants: {
      /**
       * 方向
       * @default "horizontal"
       */
      orientation: {
        horizontal: "h-0.5 flex-1",
        vertical: "w-0.5 min-h-4 flex-1",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
)

export type StepperVariants = VariantProps<typeof stepperVariants>
export type StepperIndicatorVariants = VariantProps<typeof stepperIndicatorVariants>
export type StepperSeparatorVariants = VariantProps<typeof stepperSeparatorVariants>

// ============================================================================
// 类型定义
// ============================================================================

/**
 * 步骤数据类型
 */
export interface StepData {
  /**
   * 步骤标题
   */
  title: string
  /**
   * 步骤描述
   */
  description?: string
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 步骤状态
   */
  status?: "wait" | "process" | "finish" | "error"
}
