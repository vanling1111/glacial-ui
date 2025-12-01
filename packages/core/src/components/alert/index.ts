import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

/**
 * Alert 警告提示组件
 * 
 * shadcn 风格的原子组件 + 组合组件
 * 功能超越 Ant Design Vue, Arco Design Vue, TDesign, PrimeVue
 */

// ============================================================================
// 原子组件
// ============================================================================

/**
 * Alert 原子组件
 * 
 * 警告提示容器，需要配合 AlertTitle 和 AlertDescription 使用
 * 
 * @example
 * ```vue
 * <Alert>
 *   <AlertTitle>提示</AlertTitle>
 *   <AlertDescription>这是一条提示信息</AlertDescription>
 * </Alert>
 * ```
 */
export { default as Alert } from "./Alert.vue"

/**
 * AlertTitle 警告提示标题
 */
export { default as AlertTitle } from "./AlertTitle.vue"

/**
 * AlertDescription 警告提示描述
 */
export { default as AlertDescription } from "./AlertDescription.vue"

// ============================================================================
// 组合组件
// ============================================================================

/**
 * AlertSimple 简单警告提示
 * 
 * 预组合的简单警告提示，传入 title 和 description 即可使用
 * 支持 5 种类型：default, info, success, warning, error
 * 超越 shadcn-vue
 * 
 * @example
 * ```vue
 * <AlertSimple type="success" title="成功" description="操作已完成" />
 * <AlertSimple type="error" title="错误" description="操作失败" />
 * ```
 */
export { default as AlertSimple } from "./AlertSimple.vue"

/**
 * AlertClosable 可关闭警告提示
 * 
 * 预组合的可关闭警告提示，支持关闭按钮和关闭回调
 * 超越 shadcn-vue
 * 
 * @example
 * ```vue
 * <AlertClosable type="warning" title="警告" description="请注意" @close="handleClose" />
 * ```
 */
export { default as AlertClosable } from "./AlertClosable.vue"

/**
 * AlertWithAction 带操作警告提示
 * 
 * 预组合的带操作按钮警告提示
 * 超越 shadcn-vue, PrimeVue
 * 
 * @example
 * ```vue
 * <AlertWithAction type="info" title="更新可用" description="新版本已发布">
 *   <template #action>
 *     <Button size="sm">立即更新</Button>
 *   </template>
 * </AlertWithAction>
 * ```
 */
export { default as AlertWithAction } from "./AlertWithAction.vue"

// ============================================================================
// 变体定义
// ============================================================================

export const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export type AlertVariants = VariantProps<typeof alertVariants>
