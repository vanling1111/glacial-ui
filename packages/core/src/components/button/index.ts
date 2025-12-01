import type { VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "vue"
import { cva } from "class-variance-authority"

export { default as Button } from "./Button.vue"

/**
 * Button 按钮组件
 * 
 * @description
 * 功能全面超越 Ant Design Vue, Arco Design Vue, TDesign Vue Next, PrimeVue
 * 
 * ## 核心功能
 * - ✅ 8种变体样式 (variant): default, destructive, outline, secondary, ghost, link, success, warning
 * - ✅ 10种尺寸 (size): xs, sm, default, lg, xl, icon, icon-xs, icon-sm, icon-lg, icon-xl
 * - ✅ 3种形状 (shape): default, circle, round
 * - ✅ 加载状态 (loading): 带 Spinner 动画
 * - ✅ 禁用状态 (disabled)
 * - ✅ 块级按钮 (block): 宽度100%
 * - ✅ 幽灵按钮 (ghost): 背景透明
 * - ✅ 危险按钮 (danger): 红色警告样式
 * 
 * ## 链接功能
 * - ✅ 链接模式 (href): 渲染为 <a> 标签
 * - ✅ 链接打开方式 (target): _blank, _self, _parent, _top
 * - ✅ 原生类型 (htmlType): button, submit, reset
 * 
 * ## 图标功能
 * - ✅ 图标插槽 (slot="icon")
 * - ✅ 图标位置 (iconPosition): left, right
 * - ✅ 后缀插槽 (slot="suffix")
 * 
 * ## 高级功能（超越竞品）
 * - ✅ 点击波纹效果 (ripple): Material Design 风格
 * - ✅ 角标 (badge): 支持数字、文字、小红点
 * - ✅ 角标类型 (badgeType): default, dot, count
 * - ✅ 角标最大值 (badgeMax): 超过显示 max+
 * - ✅ 角标偏移 (badgeOffset): 自定义位置
 * - ✅ 长按事件 (longPress): 自定义延迟触发
 * - ✅ 点击防抖 (debounceDelay): 防止重复点击
 * 
 * ## 暴露方法
 * - focus(): 获取焦点
 * - blur(): 失去焦点
 * - buttonRef: 按钮元素引用
 * 
 * @example
 * ```vue
 * <!-- 基础用法 -->
 * <Button>默认按钮</Button>
 * <Button variant="destructive">危险按钮</Button>
 * <Button variant="success">成功按钮</Button>
 * 
 * <!-- 带图标 -->
 * <Button>
 *   <template #icon><SearchIcon /></template>
 *   搜索
 * </Button>
 * 
 * <!-- 加载状态 -->
 * <Button :loading="isLoading">提交</Button>
 * 
 * <!-- 带角标 -->
 * <Button :badge="5">消息</Button>
 * <Button badge-type="dot" :badge="true">通知</Button>
 * 
 * <!-- 波纹效果 -->
 * <Button :ripple="true">点击有波纹</Button>
 * 
 * <!-- 长按事件 -->
 * <Button :long-press-delay="500" @long-press="handleLongPress">
 *   长按我
 * </Button>
 * 
 * <!-- 防抖点击 -->
 * <Button :debounce-delay="300" @click="handleClick">
 *   防抖按钮
 * </Button>
 * ```
 */
export interface ButtonProps {
  /** 
   * 按钮变体样式
   * @default "default"
   */
  variant?: ButtonVariants["variant"]
  
  /** 
   * 按钮尺寸
   * @default "default"
   */
  size?: ButtonVariants["size"]
  
  /** 
   * 按钮形状
   * - default: 默认圆角
   * - circle: 圆形（通常用于图标按钮）
   * - round: 全圆角
   * @default "default"
   */
  shape?: "default" | "circle" | "round"
  
  /** 
   * 是否加载中，加载时显示 Spinner 并禁用交互
   * @default false
   */
  loading?: boolean
  
  /** 
   * 加载延迟（毫秒），防止加载状态闪烁
   * 当加载时间小于此值时不显示加载状态
   */
  loadingDelay?: number
  
  /** 
   * 是否禁用
   * @default false
   */
  disabled?: boolean
  
  /** 
   * 是否为块级按钮（宽度100%）
   * @default false
   */
  block?: boolean
  
  /** 
   * 是否为幽灵按钮（背景透明，边框显示）
   * @default false
   */
  ghost?: boolean
  
  /** 
   * 危险按钮，会覆盖 variant 为 destructive 样式
   * @default false
   */
  danger?: boolean
  
  /** 
   * 链接地址，设置后渲染为 <a> 标签
   */
  href?: string
  
  /** 
   * 链接打开方式，仅在 href 设置时有效
   */
  target?: "_blank" | "_self" | "_parent" | "_top"
  
  /** 
   * 原生 button type 属性
   * @default "button"
   */
  htmlType?: "button" | "submit" | "reset"
  
  /** 
   * 图标位置
   * @default "left"
   */
  iconPosition?: "left" | "right"
  
  /** 
   * 是否启用点击波纹效果（Material Design 风格）
   * @default true
   */
  ripple?: boolean
  
  /** 
   * 角标内容，可以是数字或文字
   */
  badge?: string | number
  
  /** 
   * 角标类型
   * - default: 显示内容
   * - dot: 只显示小红点
   * - count: 显示数字
   * @default "default"
   */
  badgeType?: "default" | "dot" | "count"
  
  /** 
   * 角标最大值，超过时显示 max+
   * @default 99
   */
  badgeMax?: number
  
  /** 
   * 角标偏移量 [x, y]，单位 px
   */
  badgeOffset?: [number, number]
  
  /** 
   * 长按事件延迟（毫秒），设置后启用长按检测
   * 长按触发后不会触发 click 事件
   */
  longPressDelay?: number
  
  /** 
   * 双击防抖延迟（毫秒），防止用户重复点击
   */
  debounceDelay?: number
  
  /** 
   * 自定义类名
   */
  class?: HTMLAttributes["class"]
  
  /** 
   * 渲染的元素类型
   * @default "button"
   */
  as?: string
  
  /** 
   * 是否作为子元素渲染（Radix 模式）
   * @default false
   */
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
    "outline-none select-none",
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
       * 按钮变体（8种，超越所有竞品）
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
       * 按钮尺寸（10种，超越所有竞品）
       * - xs: 超小尺寸 h-7
       * - sm: 小尺寸 h-8
       * - default: 默认尺寸 h-9
       * - lg: 大尺寸 h-10
       * - xl: 超大尺寸 h-12
       * - icon: 图标按钮 size-9
       * - icon-xs/sm/lg/xl: 各尺寸图标按钮
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
