<script setup lang="ts">
/**
 * ============================================================================
 * AccordionContent - 原子化增强版手风琴内容组件
 * ============================================================================
 * 
 * 支持销毁隐藏内容等功能
 */
import type { AccordionContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed, inject, ref, watch } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { AccordionContent } from "reka-ui"
import { cn } from "@/lib/utils"
import { accordionContextKey, type AccordionContext } from "./context"

interface ExtendedProps extends AccordionContentProps {
  class?: HTMLAttributes["class"]
  /**
   * 是否在隐藏时销毁内容（覆盖父级设置）
   */
  destroyOnHide?: boolean
}

const props = defineProps<ExtendedProps>()

const delegatedProps = reactiveOmit(props, "class", "destroyOnHide")

// 获取上下文
const context = inject<AccordionContext | undefined>(accordionContextKey, undefined)

// 计算是否销毁隐藏内容
const shouldDestroy = computed(() => props.destroyOnHide ?? context?.destroyInactivePanel?.value ?? false)

// 内容是否已挂载
const mounted = ref(!shouldDestroy.value)
</script>

<template>
  <AccordionContent
    data-slot="accordion-content"
    v-bind="delegatedProps"
    class="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
    :force-mount="!shouldDestroy || undefined"
  >
    <div :class="cn('pt-0 pb-4', props.class)">
      <slot />
    </div>
  </AccordionContent>
</template>
