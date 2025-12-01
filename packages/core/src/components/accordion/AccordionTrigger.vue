<script setup lang="ts">
/**
 * ============================================================================
 * AccordionTrigger - 原子化增强版手风琴触发器组件
 * ============================================================================
 * 
 * 支持展开图标位置控制、禁用状态等
 */
import type { AccordionTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed, inject } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { ChevronDown } from "lucide-vue-next"
import {
  AccordionHeader,
  AccordionTrigger,
} from "reka-ui"
import { cn } from "@/lib/utils"
import { accordionContextKey, type AccordionContext } from "./context"

interface ExtendedProps extends AccordionTriggerProps {
  class?: HTMLAttributes["class"]
  /**
   * 是否显示展开图标
   * @default true
   */
  showIcon?: boolean
  /**
   * 展开图标位置（覆盖父级设置）
   */
  iconPosition?: "start" | "end"
}

const props = withDefaults(defineProps<ExtendedProps>(), {
  showIcon: true,
})

const delegatedProps = reactiveOmit(props, "class", "showIcon", "iconPosition")

// 获取上下文
const context = inject<AccordionContext | undefined>(accordionContextKey, undefined)

// 计算图标位置
const iconPos = computed(() => props.iconPosition ?? context?.expandIconPosition?.value ?? "end")
const isDisabled = computed(() => context?.disabled?.value ?? false)
</script>

<template>
  <AccordionHeader class="flex">
    <AccordionTrigger
      data-slot="accordion-trigger"
      v-bind="delegatedProps"
      :disabled="isDisabled || (delegatedProps as any).disabled"
      :class="
        cn(
          'focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
          iconPos === 'start' ? 'flex-row-reverse justify-end' : 'justify-between',
          props.class,
        )
      "
    >
      <slot />
      <slot name="icon">
        <ChevronDown
          v-if="showIcon"
          class="text-muted-foreground pointer-events-none size-4 shrink-0 transition-transform duration-200"
        />
      </slot>
    </AccordionTrigger>
  </AccordionHeader>
</template>
