<script setup lang="ts">
/**
 * ============================================================================
 * SheetContent - 原子化增强版侧边抽屉内容组件
 * ============================================================================
 * 
 * 支持 side、size、showCloseButton 等
 */
import type { DialogContentEmits, DialogContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed, inject } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { X } from "lucide-vue-next"
import {
  DialogClose,
  DialogContent,
  DialogPortal,
  useForwardPropsEmits,
} from "reka-ui"
import { cn } from "@/lib/utils"
import { sheetContentVariants } from "./index"
import { sheetContextKey, type SheetContext } from "./context"
import SheetOverlay from "./SheetOverlay.vue"

interface ExtendedProps extends DialogContentProps {
  class?: HTMLAttributes["class"]
  /**
   * 抽屉方向
   * @default "right"
   */
  side?: "top" | "right" | "bottom" | "left"
  /**
   * 尺寸
   * @default "default"
   */
  size?: "sm" | "default" | "lg" | "xl" | "full"
  /**
   * 是否显示关闭按钮
   * @default true
   */
  showCloseButton?: boolean
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ExtendedProps>(), {
  side: "right",
  size: "default",
  showCloseButton: true,
})

const emits = defineEmits<DialogContentEmits>()

const delegatedProps = reactiveOmit(props, "class", "side", "size", "showCloseButton")

const forwarded = useForwardPropsEmits(delegatedProps, emits)

// 获取上下文
const context = inject<SheetContext | undefined>(sheetContextKey, undefined)

// 处理交互事件
function handleInteractOutside(event: Event) {
  if (context?.closeOnOverlayClick?.value === false) {
    event.preventDefault()
  }
}

function handleEscapeKeyDown(event: KeyboardEvent) {
  if (context?.closeOnEscape?.value === false) {
    event.preventDefault()
  }
}
</script>

<template>
  <DialogPortal>
    <SheetOverlay v-if="context?.showOverlay?.value !== false" />
    <DialogContent
      data-slot="sheet-content"
      :class="cn(
        sheetContentVariants({ side, size }),
        props.class
      )"
      v-bind="{ ...$attrs, ...forwarded }"
      @interact-outside="handleInteractOutside"
      @escape-key-down="handleEscapeKeyDown"
    >
      <slot />

      <DialogClose
        v-if="showCloseButton"
        class="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none"
      >
        <X class="size-4" />
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
