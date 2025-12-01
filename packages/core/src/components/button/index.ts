import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

/**
 * Button 按钮组件族
 * 
 * shadcn 风格的原子化按钮组件，功能超越 Arco/Antd/TDesign/PrimeVue
 * 
 * ## 组件列表
 * - Button - 基础按钮
 * - ButtonLoader - 加载状态（多种动画）
 * - ButtonIcon - 图标容器（4方向位置）
 * - ButtonBadge - 角标（数字/文字/小红点）
 * - ButtonSuffix - 后缀内容（TDesign 特色）
 * 
 * ## 变体（10种，超越竞品）
 * default, destructive, outline, secondary, ghost, link, success, warning, info, dashed
 * 
 * ## 尺寸（10种）
 * xs, sm, default, lg, xl, 2xl, icon, icon-xs, icon-sm, icon-lg
 * 
 * @example
 * ```vue
 * <!-- 基础用法 -->
 * <Button>默认按钮</Button>
 * <Button variant="destructive">危险按钮</Button>
 * 
 * <!-- 带加载状态 -->
 * <Button disabled>
 *   <ButtonLoader v-if="loading" />
 *   <span v-else>提交</span>
 * </Button>
 * 
 * <!-- 带图标 -->
 * <Button>
 *   <ButtonIcon><SearchIcon /></ButtonIcon>
 *   搜索
 * </Button>
 * 
 * <!-- 带角标 -->
 * <Button class="relative">
 *   消息
 *   <ButtonBadge :count="5" />
 * </Button>
 * ```
 */
export { default as Button } from "./Button.vue"
export { default as ButtonLoader } from "./ButtonLoader.vue"
export { default as ButtonIcon } from "./ButtonIcon.vue"
export { default as ButtonBadge } from "./ButtonBadge.vue"
export { default as ButtonSuffix } from "./ButtonSuffix.vue"

// Composables - 独有功能，竞品库都不支持
export { useRipple, type RippleItem, type UseRippleOptions, type UseRippleReturn } from "./useRipple"
export { useLongPress, type UseLongPressOptions, type UseLongPressReturn } from "./useLongPress"
export { useDebounceClick, type UseDebounceClickOptions, type UseDebounceClickReturn } from "./useDebounceClick"

/**
 * 按钮变体样式定义
 * 
 * 10种变体 + 10种尺寸，超越所有竞品：
 * - Arco: 5类型 × 4状态 × 4尺寸
 * - Antd: 6类型 × 3尺寸
 * - TDesign: 4变体 × 5主题 × 4尺寸
 * - PrimeVue: 多个布尔属性组合
 */
export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-md text-sm font-medium cursor-pointer",
    "transition-all duration-200",
    "outline-none select-none",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    // 支持 data-* 属性控制状态
    "data-[loading=true]:cursor-wait data-[loading=true]:opacity-80",
  ],
  {
    variants: {
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
        info:
          "bg-sky-500 text-white shadow-sm hover:bg-sky-600 active:bg-sky-700 focus-visible:ring-sky-500/20",
        dashed:
          "border border-dashed border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
      },
      size: {
        xs: "h-7 px-2.5 text-xs gap-1 rounded",
        sm: "h-8 px-3 text-xs gap-1.5 rounded-md",
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        lg: "h-10 px-6 text-base has-[>svg]:px-4",
        xl: "h-12 px-8 text-lg",
        "2xl": "h-14 px-10 text-xl",
        icon: "size-9 p-0",
        "icon-xs": "size-7 p-0 rounded",
        "icon-sm": "size-8 p-0",
        "icon-lg": "size-10 p-0",
      },
      /**
       * 阴影效果（PrimeVue raised 特色）
       */
      raised: {
        true: "shadow-lg hover:shadow-xl active:shadow-md",
        false: "",
      },
      /**
       * 块级按钮
       */
      block: {
        true: "w-full",
        false: "",
      },
      /**
       * 圆角按钮
       */
      rounded: {
        true: "rounded-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      raised: false,
      block: false,
      rounded: false,
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
