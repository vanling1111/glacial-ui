import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

/**
 * Badge 徽章组件
 * 
 * shadcn 风格的原子组件 + 组合组件
 * 功能超越 Ant Design Vue, Arco Design Vue, TDesign, PrimeVue
 */

// ============================================================================
// 原子组件
// ============================================================================

/**
 * Badge 原子组件
 * 
 * 极简的徽章组件，用于标签展示
 * 
 * @example
 * ```vue
 * <Badge>New</Badge>
 * <Badge variant="secondary">Beta</Badge>
 * <Badge variant="destructive">Error</Badge>
 * ```
 */
export { default as Badge } from "./Badge.vue"

// ============================================================================
// 组合组件
// ============================================================================

/**
 * BadgeCount 数字徽章
 * 
 * 预组合的数字徽章，支持 count、maxCount、showZero、dot
 * 超越 shadcn-vue
 * 
 * @example
 * ```vue
 * <BadgeCount :count="5">
 *   <Avatar />
 * </BadgeCount>
 * <BadgeCount :count="100" :max-count="99">
 *   <Button>消息</Button>
 * </BadgeCount>
 * <BadgeCount dot>
 *   <Bell />
 * </BadgeCount>
 * ```
 */
export { default as BadgeCount } from "./BadgeCount.vue"

/**
 * BadgeStatus 状态徽章
 * 
 * 预组合的状态徽章，支持 status 状态点
 * 超越 shadcn-vue, TDesign, PrimeVue
 * 
 * @example
 * ```vue
 * <BadgeStatus status="success" text="已完成" />
 * <BadgeStatus status="processing" text="进行中" />
 * <BadgeStatus status="error" text="失败" />
 * ```
 */
export { default as BadgeStatus } from "./BadgeStatus.vue"

/**
 * BadgeRibbon 缎带徽章
 * 
 * 预组合的缎带徽章，用于角标展示
 * 超越 shadcn-vue, Arco, TDesign, PrimeVue
 * 
 * @example
 * ```vue
 * <BadgeRibbon text="Hot">
 *   <Card>...</Card>
 * </BadgeRibbon>
 * <BadgeRibbon text="New" placement="start" color="#52c41a">
 *   <Card>...</Card>
 * </BadgeRibbon>
 * ```
 */
export { default as BadgeRibbon } from "./BadgeRibbon.vue"

// ============================================================================
// 变体定义
// ============================================================================

export const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground",
        outline:
          "text-foreground border-border",
        success:
          "border-transparent bg-emerald-500 text-white",
        warning:
          "border-transparent bg-amber-500 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export type BadgeVariants = VariantProps<typeof badgeVariants>
