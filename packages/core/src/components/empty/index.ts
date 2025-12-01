import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

// ============================================================================
// 组件导出
// ============================================================================

/**
 * Empty - 原子化增强版空状态根组件
 * 
 * 支持 size、bordered 等
 * 
 * @example
 * ```vue
 * <Empty size="lg" bordered>
 *   <EmptyMedia>
 *     <InboxIcon />
 *   </EmptyMedia>
 *   <EmptyHeader>
 *     <EmptyTitle>暂无数据</EmptyTitle>
 *     <EmptyDescription>请稍后再试</EmptyDescription>
 *   </EmptyHeader>
 *   <EmptyContent>
 *     <Button>刷新</Button>
 *   </EmptyContent>
 * </Empty>
 * ```
 */
export { default as Empty } from "./Empty.vue"

/**
 * EmptyContent - 空状态内容区域
 */
export { default as EmptyContent } from "./EmptyContent.vue"

/**
 * EmptyDescription - 空状态描述
 */
export { default as EmptyDescription } from "./EmptyDescription.vue"

/**
 * EmptyHeader - 空状态头部
 */
export { default as EmptyHeader } from "./EmptyHeader.vue"

/**
 * EmptyMedia - 空状态媒体区域（图标/图片）
 */
export { default as EmptyMedia } from "./EmptyMedia.vue"

/**
 * EmptyTitle - 空状态标题
 */
export { default as EmptyTitle } from "./EmptyTitle.vue"

/**
 * EmptySimple - 简化组合组件
 * 
 * 快速创建空状态
 * 
 * @example
 * ```vue
 * <EmptySimple
 *   title="暂无数据"
 *   description="请稍后再试"
 *   :icon="InboxIcon"
 * >
 *   <template #action>
 *     <Button>刷新</Button>
 *   </template>
 * </EmptySimple>
 * ```
 */
export { default as EmptySimple } from "./EmptySimple.vue"

// ============================================================================
// 变体定义
// ============================================================================

/**
 * Empty 样式变体
 */
export const emptyVariants = cva(
  "flex min-w-0 flex-1 flex-col items-center justify-center gap-4 text-balance rounded-lg text-center",
  {
    variants: {
      /**
       * 尺寸
       * @default "default"
       */
      size: {
        sm: "p-4 gap-2",
        default: "p-6 gap-4 md:p-12 md:gap-6",
        lg: "p-8 gap-6 md:p-16 md:gap-8",
      },
      /**
       * 是否显示边框
       * @default false
       */
      bordered: {
        true: "border border-dashed",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      bordered: false,
    },
  }
)

/**
 * EmptyMedia 样式变体
 */
export const emptyMediaVariants = cva(
  "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "bg-muted text-foreground flex size-12 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export type EmptyVariants = VariantProps<typeof emptyVariants>
export type EmptyMediaVariants = VariantProps<typeof emptyMediaVariants>
