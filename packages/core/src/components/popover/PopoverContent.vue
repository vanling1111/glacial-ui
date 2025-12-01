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
 * 
 * @example
 * ```vue
 * <Popover>
 *   <PopoverTrigger>打开</PopoverTrigger>
 *   <PopoverContent theme="dark" size="lg" show-arrow>
 *     <div class="font-semibold mb-2">标题</div>
 *     <div>内容</div>
 *   </PopoverContent>
 * </Popover>
 * ```
 */
import type { PopoverContentEmits, PopoverContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
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
   * 最大宽度
   */
  maxWidth?: string | number
  /**
   * 最大高度
   */
  maxHeight?: string | number
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

const delegatedProps = reactiveOmit(props, "class", "theme", "size", "maxWidth", "maxHeight", "showArrow", "arrowClass", "closeOnClickOutside", "closeOnEscape")

const forwarded = useForwardPropsEmits(delegatedProps, emits)

// 计算自定义样式
const customStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.maxWidth) {
    style.maxWidth = typeof props.maxWidth === "number" ? `${props.maxWidth}px` : props.maxWidth
  }
  if (props.maxHeight) {
    style.maxHeight = typeof props.maxHeight === "number" ? `${props.maxHeight}px` : props.maxHeight
    style.overflow = "auto"
  }
  return style
})

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
  <PopoverPortal>
    <PopoverContent
      data-slot="popover-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="cn(
        popoverVariants({ theme, size }),
        'origin-(--reka-popover-content-transform-origin) outline-hidden',
        props.class
      )"
      :style="customStyle"
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
      />
    </PopoverContent>
  </PopoverPortal>
</template>
