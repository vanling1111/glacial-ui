<script setup lang="ts">
/**
 * ============================================================================
 * AccordionItem - 原子化增强版手风琴项组件
 * ============================================================================
 */
import type { AccordionItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed, inject } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { AccordionItem, useForwardProps } from "reka-ui"
import { cn } from "@/lib/utils"
import { accordionItemVariants } from "./index"
import { accordionContextKey, type AccordionContext } from "./context"

interface ExtendedProps extends AccordionItemProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<ExtendedProps>()

const delegatedProps = reactiveOmit(props, "class")

const forwardedProps = useForwardProps(delegatedProps)

// 获取上下文
const context = inject<AccordionContext | undefined>(accordionContextKey, undefined)

// 计算是否显示边框
const bordered = computed(() => context?.bordered?.value ?? true)
</script>

<template>
  <AccordionItem
    v-slot="slotProps"
    data-slot="accordion-item"
    v-bind="forwardedProps"
    :class="cn(accordionItemVariants({ bordered }), props.class)"
  >
    <slot v-bind="slotProps" />
  </AccordionItem>
</template>
