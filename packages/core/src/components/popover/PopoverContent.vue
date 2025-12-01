<script setup lang="ts">
/**
 * ============================================================================
 * PopoverContent - 原子化增强版气泡卡片内容组件
 * ============================================================================
 * 
 * 所有增强功能都在此原子化组件上实现，用户可以完全控制 DOM 结构
 * 
 * ## 增强功能
 * 
 * | 功能 | 支持 |
 * |-----|------|
 * | 3种主题 (default/light/dark) | ✅ |
 * | 4种尺寸 (sm/default/lg/auto) | ✅ |
 * | 最大宽度/高度 | ✅ |
 * | 箭头控制 | ✅ |
 * | 点击外部关闭控制 | ✅ |
 * | Escape 键关闭控制 | ✅ |
 * | 语义化 placement + container + zIndex | ✅ |
 * | contentClass/contentStyle/arrowStyle | ✅ |
 * 
 * @example
 * ```vue
 * <Popover>
 *   <PopoverTrigger>打开</PopoverTrigger>
 *   <PopoverContent theme="dark" size="lg" placement="bottom-start" :z-index="2000" container="body" show-arrow>
 *     <div class="font-semibold mb-2">标题</div>
 *     <div>内容</div>
 *   </PopoverContent>
 * </Popover>
 * ```
 */
import type { PopoverContentEmits, PopoverContentProps } from "reka-ui"
import type { CSSProperties, HTMLAttributes } from "vue"
import { computed } from "vue"
import { reactiveOmit } from "@vueuse/core"
import {
  PopoverArrow,
  PopoverContent,
  PopoverPortal,
  useForwardPropsEmits,
} from "reka-ui"
import { cn } from "@/lib/utils"
import { popoverVariants } from "./index"
import { mapPlacement } from "./placement"
import { resolveContainer } from "./portal"

defineOptions({
  inheritAttrs: false,
})

// 扩展 props 类型
interface ExtendedProps extends PopoverContentProps {
  class?: HTMLAttributes["class"]
  /**
   * 主题
   * @default "default"
   */
  theme?: "default" | "light" | "dark"
  /**
   * 尺寸
   * @default "default"
   */
  size?: "sm" | "default" | "lg" | "auto"
  /**
   * 语义化位置
   */
  placement?:
    | "top" | "top-start" | "top-end"
    | "bottom" | "bottom-start" | "bottom-end"
    | "left" | "left-start" | "left-end"
    | "right" | "right-start" | "right-end"
  /**
   * 最大宽度
   */
  maxWidth?: string | number
  /**
   * 最大高度
   */
  maxHeight?: string | number
  /**
   * zIndex（覆盖默认层级）
   */
  zIndex?: number | string
  /**
   * 是否显示箭头
   * @default false
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
   * Teleport 容器（等价于 getPopupContainer/appendTo）
   */
  container?: string | HTMLElement
  /**
   * 点击外部是否关闭
   * @default true
   */
  closeOnClickOutside?: boolean
  /**
   * 按 Escape 键是否关闭
   * @default true
   */
  closeOnEscape?: boolean
}

const props = withDefaults(defineProps<ExtendedProps>(), {
  align: "center",
  sideOffset: 4,
  theme: "default",
  size: "default",
  showArrow: false,
  closeOnClickOutside: true,
  closeOnEscape: true,
})

const emits = defineEmits<PopoverContentEmits>()

const delegatedProps = reactiveOmit(
  props,
  "class",
  "theme",
  "size",
  "placement",
  "maxWidth",
  "maxHeight",
  "zIndex",
  "showArrow",
  "arrowClass",
  "arrowStyle",
  "contentClass",
  "contentStyle",
  "container",
  "closeOnClickOutside",
  "closeOnEscape",
)

const forwarded = useForwardPropsEmits(delegatedProps, emits)

// 计算映射后的 side/align
const mapped = computed(() => mapPlacement(props.placement))

// 计算自定义样式
const mergedStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (props.maxWidth) style.maxWidth = typeof props.maxWidth === "number" ? `${props.maxWidth}px` : props.maxWidth
  if (props.maxHeight) {
    style.maxHeight = typeof props.maxHeight === "number" ? `${props.maxHeight}px` : props.maxHeight
    ;(style as any).overflow = "auto"
  }
  if (props.zIndex !== undefined) style.zIndex = props.zIndex as any
  return { ...style, ...(props.contentStyle || {}) }
})

// 箭头样式
const mergedArrowStyle = computed(() => ({ ...(props.arrowStyle || {}) }))

// Teleport 容器
const resolvedContainer = computed(() => resolveContainer(props.container))

// 处理交互事件
function handleInteractOutside(event: Event) {
  if (!props.closeOnClickOutside) {
    event.preventDefault()
  }
}

function handleEscapeKeyDown(event: KeyboardEvent) {
  if (!props.closeOnEscape) {
    event.preventDefault()
  }
}
</script>

<template>
  <teleport v-if="resolvedContainer" :to="resolvedContainer">
    <PopoverContent
      data-slot="popover-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :side="mapped.side ?? forwarded.side"
      :align="mapped.align ?? forwarded.align"
      :class="cn(
        popoverVariants({ theme, size }),
        'origin-(--reka-popover-content-transform-origin) outline-hidden',
        props.class,
        props.contentClass,
      )"
      :style="mergedStyle"
      @interact-outside="handleInteractOutside"
      @escape-key-down="handleEscapeKeyDown"
    >
      <slot />

      <PopoverArrow
        v-if="showArrow"
        :class="cn(
          'fill-popover',
          theme === 'light' && 'fill-white',
          theme === 'dark' && 'fill-zinc-900',
          arrowClass
        )"
        :style="mergedArrowStyle"
      />
    </PopoverContent>
  </teleport>

  <PopoverPortal v-else>
    <PopoverContent
      data-slot="popover-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :side="mapped.side ?? forwarded.side"
      :align="mapped.align ?? forwarded.align"
      :class="cn(
        popoverVariants({ theme, size }),
        'origin-(--reka-popover-content-transform-origin) outline-hidden',
        props.class,
        props.contentClass,
      )"
      :style="mergedStyle"
      @interact-outside="handleInteractOutside"
      @escape-key-down="handleEscapeKeyDown"
    >
      <slot />

      <!-- 箭头 -->
      <PopoverArrow
        v-if="showArrow"
        :class="cn(
          'fill-popover',
          theme === 'light' && 'fill-white',
          theme === 'dark' && 'fill-zinc-900',
          arrowClass
        )"
        :style="mergedArrowStyle"
      />
    </PopoverContent>
  </PopoverPortal>
</template>
