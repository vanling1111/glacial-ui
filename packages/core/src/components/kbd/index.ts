import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

// ============================================================================
// 组件导出
// ============================================================================

/**
 * Kbd - 原子化增强版键盘按键组件
 * 
 * 支持 size、variant、keys（快捷键解析）等
 * 
 * @example
 * ```vue
 * <Kbd>⌘</Kbd>
 * <Kbd size="lg">Enter</Kbd>
 * <Kbd variant="outline">Ctrl</Kbd>
 * <Kbd keys="cmd+k" />
 * ```
 */
export { default as Kbd } from "./Kbd.vue"

/**
 * KbdGroup - 键盘按键组
 */
export { default as KbdGroup } from "./KbdGroup.vue"

// ============================================================================
// 变体定义
// ============================================================================

/**
 * Kbd 样式变体
 */
export const kbdVariants = cva(
  "pointer-events-none inline-flex items-center justify-center gap-1 rounded-sm font-sans font-medium select-none",
  {
    variants: {
      /**
       * 尺寸
       * @default "default"
       */
      size: {
        sm: "h-4 min-w-4 px-0.5 text-[10px]",
        default: "h-5 min-w-5 px-1 text-xs",
        lg: "h-6 min-w-6 px-1.5 text-sm",
      },
      /**
       * 变体
       * @default "default"
       */
      variant: {
        default: "bg-muted text-muted-foreground",
        outline: "border border-border text-muted-foreground",
        ghost: "text-muted-foreground",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
)

export type KbdVariants = VariantProps<typeof kbdVariants>
