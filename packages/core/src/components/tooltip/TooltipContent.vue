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
 * | 语义化 placement + container + zIndex | ✅ |
 * | contentClass/contentStyle/arrowStyle | ✅ |
 * 
 * @example
 * ```vue
 * <TooltipProvider>
 *   <Tooltip>
 *     <TooltipTrigger>悬停</TooltipTrigger>
 *     <TooltipContent theme="success" size="lg" placement="top-start" :z-index="1000" container="body">
 *       提示内容
 *     </TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 * ```
 */
import type { TooltipContentEmits, TooltipContentProps } from "reka-ui"
import type { CSSProperties, HTMLAttributes } from "vue"
import { computed } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { TooltipArrow, TooltipContent, TooltipPortal, useForwardPropsEmits } from "reka-ui"
import { cn } from "@/lib/utils"
import { tooltipVariants, tooltipArrowVariants } from "./index"
import { mapPlacement } from "./placement"
import { resolveContainer } from "./portal"

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
   * 位置（语义化 API，自动映射 side/align）
   */
  placement?:
    | "top" | "top-start" | "top-end"
    | "bottom" | "bottom-start" | "bottom-end"
    | "left" | "left-start" | "left-end"
    | "right" | "right-start" | "right-end"
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
   * zIndex（覆盖默认层级）
   */
  zIndex?: number | string
  /**
   * 是否显示箭头
   * @default true
   */
  showArrow?: boolean
  /**
   * 箭头自定义类名
   */
  arrowClass?: string
  /**
   * 箭头样式
   */
  arrowStyle?: CSSProperties
  /**
   * 内容容器类名
   */
  contentClass?: HTMLAttributes["class"]
  /**
   * 内容容器样式
   */
  contentStyle?: CSSProperties
  /**
   * Teleport 容器（等价于 getPopupContainer）
   */
  container?: string | HTMLElement
}

const props = withDefaults(defineProps<ExtendedProps>(), {
  sideOffset: 4,
  theme: "default",
  size: "default",
  showArrow: true,
})

const emits = defineEmits<TooltipContentEmits>()

const delegatedProps = reactiveOmit(
  props,
  "class",
  "theme",
  "size",
  "placement",
  "backgroundColor",
  "textColor",
  "maxWidth",
  "zIndex",
  "showArrow",
  "arrowClass",
  "arrowStyle",
  "contentClass",
  "contentStyle",
  "container",
)
const forwarded = useForwardPropsEmits(delegatedProps, emits)

// 计算映射后的 side/align
const mapped = computed(() => mapPlacement(props.placement))

// 计算容器
const resolvedContainer = computed(() => resolveContainer(props.container))

// 计算内容样式
const mergedStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.backgroundColor) style.backgroundColor = props.backgroundColor
  if (props.textColor) style.color = props.textColor
  if (props.maxWidth) style.maxWidth = typeof props.maxWidth === "number" ? `${props.maxWidth}px` : props.maxWidth
  if (props.zIndex !== undefined) style.zIndex = props.zIndex as any
  return { ...style, ...(props.contentStyle || {}) }
})

// 箭头样式
const mergedArrowStyle = computed(() => {
  const base: CSSProperties = {}
  if (props.backgroundColor) {
    base.backgroundColor = props.backgroundColor
    ;(base as any).fill = props.backgroundColor
  }
  return { ...base, ...(props.arrowStyle || {}) }
})
</script>

<template>
  <!-- 当传入 container 时，使用 Teleport。否则使用 Reka 的 Portal -->
  <teleport v-if="resolvedContainer" :to="resolvedContainer">
    <TooltipContent
      data-slot="tooltip-content"
      v-bind="{ ...forwarded, ...$attrs }"
      :side="mapped.side ?? forwarded.side"
      :align="mapped.align ?? forwarded.align"
      :class="cn(
        tooltipVariants({ theme, size }),
        props.class,
        props.contentClass
      )"
      :style="mergedStyle"
    >
      <slot />

      <TooltipArrow
        v-if="showArrow"
        :class="cn(
          tooltipArrowVariants({ theme }),
          arrowClass
        )"
        :style="mergedArrowStyle"
      />
    </TooltipContent>
  </teleport>
  <TooltipPortal v-else>
    <TooltipContent
      data-slot="tooltip-content"
      v-bind="{ ...forwarded, ...$attrs }"
      :side="mapped.side ?? forwarded.side"
      :align="mapped.align ?? forwarded.align"
      :class="cn(
        tooltipVariants({ theme, size }),
        props.class,
        props.contentClass
      )"
      :style="mergedStyle"
    >
      <slot />

      <TooltipArrow
        v-if="showArrow"
        :class="cn(
          tooltipArrowVariants({ theme }),
          arrowClass
        )"
        :style="mergedArrowStyle"
      />
    </TooltipContent>
  </TooltipPortal>
</template>
