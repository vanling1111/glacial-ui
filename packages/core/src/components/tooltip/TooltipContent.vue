<script setup lang="ts">
/**
 * ============================================================================
 * TooltipContent - 原子化增强版提示内容组件
 * ============================================================================
 * 
 * 所有增强功能都在此原子化组件上实现，用户可以完全控制 DOM 结构
 * 
 * ## 增强功能
 * 
 * | 功能 | 支持 |
 * |-----|------|
 * | 6种主题 (default/light/primary/success/warning/danger) | ✅ |
 * | 3种尺寸 (sm/default/lg) | ✅ |
 * | 自定义背景颜色 | ✅ |
 * | 自定义文字颜色 | ✅ |
 * | 最大宽度 | ✅ |
 * | 箭头控制 | ✅ |
 * 
 * @example
 * ```vue
 * <TooltipProvider>
 *   <Tooltip>
 *     <TooltipTrigger>悬停</TooltipTrigger>
 *     <TooltipContent theme="success" size="lg">
 *       提示内容
 *     </TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 * ```
 */
import type { TooltipContentEmits, TooltipContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { TooltipArrow, TooltipContent, TooltipPortal, useForwardPropsEmits } from "reka-ui"
import { cn } from "@/lib/utils"
import { tooltipVariants, tooltipArrowVariants } from "./index"

defineOptions({
  inheritAttrs: false,
})

// 扩展 props 类型
interface ExtendedProps extends TooltipContentProps {
  class?: HTMLAttributes["class"]
  /**
   * 主题
   * @default "default"
   */
  theme?: "default" | "light" | "primary" | "success" | "warning" | "danger"
  /**
   * 尺寸
   * @default "default"
   */
  size?: "sm" | "default" | "lg"
  /**
   * 自定义背景颜色
   */
  backgroundColor?: string
  /**
   * 自定义文字颜色
   */
  textColor?: string
  /**
   * 最大宽度
   */
  maxWidth?: string | number
  /**
   * 是否显示箭头
   * @default true
   */
  showArrow?: boolean
  /**
   * 箭头自定义类名
   */
  arrowClass?: string
}

const props = withDefaults(defineProps<ExtendedProps>(), {
  sideOffset: 4,
  theme: "default",
  size: "default",
  showArrow: true,
})

const emits = defineEmits<TooltipContentEmits>()

const delegatedProps = reactiveOmit(props, "class", "theme", "size", "backgroundColor", "textColor", "maxWidth", "showArrow", "arrowClass")
const forwarded = useForwardPropsEmits(delegatedProps, emits)

// 计算自定义样式
const customStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.backgroundColor) {
    style.backgroundColor = props.backgroundColor
  }
  if (props.textColor) {
    style.color = props.textColor
  }
  if (props.maxWidth) {
    style.maxWidth = typeof props.maxWidth === "number" ? `${props.maxWidth}px` : props.maxWidth
  }
  return style
})
</script>

<template>
  <TooltipPortal>
    <TooltipContent
      data-slot="tooltip-content"
      v-bind="{ ...forwarded, ...$attrs }"
      :class="cn(
        tooltipVariants({ theme, size }),
        props.class
      )"
      :style="customStyle"
    >
      <slot />

      <TooltipArrow
        v-if="showArrow"
        :class="cn(
          tooltipArrowVariants({ theme }),
          arrowClass
        )"
        :style="backgroundColor ? { backgroundColor, fill: backgroundColor } : undefined"
      />
    </TooltipContent>
  </TooltipPortal>
</template>
