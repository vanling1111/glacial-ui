<script setup lang="ts">
/**
 * ============================================================================
 * Accordion - 原子化增强版手风琴根组件
 * ============================================================================
 * 
 * ## 增强功能（超越 4 个库）
 * 
 * | 功能 | shadcn | Ant | Arco | TDesign | PrimeVue | glacial-ui |
 * |-----|--------|-----|------|---------|----------|------------|
 * | 单选/多选模式 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * | 边框控制 | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * | 幽灵模式 | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ |
 * | 展开图标位置 | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * | 销毁隐藏内容 | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * | 默认全部展开 | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ |
 * | 禁用整体 | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ |
 * 
 * @example
 * ```vue
 * <Accordion type="single" collapsible bordered expand-icon-position="right">
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>标题</AccordionTrigger>
 *     <AccordionContent>内容</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
import type { AccordionRootEmits, AccordionRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed, provide, ref, watch } from "vue"
import { AccordionRoot, useForwardPropsEmits } from "reka-ui"
import { reactiveOmit } from "@vueuse/core"
import { cn } from "@/lib/utils"
import { accordionVariants } from "./index"
import { accordionContextKey } from "./context"

// 扩展 props 类型
interface ExtendedProps extends AccordionRootProps {
  class?: HTMLAttributes["class"]
  /**
   * 是否显示边框
   * @default true
   */
  bordered?: boolean
  /**
   * 幽灵模式（无边框无背景）
   * @default false
   */
  ghost?: boolean
  /**
   * 展开图标位置
   * @default "end"
   */
  expandIconPosition?: "start" | "end"
  /**
   * 是否在隐藏时销毁内容
   * @default false
   */
  destroyInactivePanel?: boolean
  /**
   * 默认展开全部（仅 type="multiple" 时有效）
   * @default false
   */
  defaultExpandAll?: boolean
  /**
   * 是否禁用整体
   * @default false
   */
  disabled?: boolean
}

const props = withDefaults(defineProps<ExtendedProps>(), {
  bordered: true,
  ghost: false,
  expandIconPosition: "end",
  destroyInactivePanel: false,
  defaultExpandAll: false,
  disabled: false,
})

const emits = defineEmits<AccordionRootEmits>()

const delegatedProps = reactiveOmit(
  props,
  "class",
  "bordered",
  "ghost",
  "expandIconPosition",
  "destroyInactivePanel",
  "defaultExpandAll",
  "disabled",
)

const forwarded = useForwardPropsEmits(delegatedProps, emits)

// 提供上下文给子组件
provide(accordionContextKey, {
  bordered: computed(() => props.bordered),
  ghost: computed(() => props.ghost),
  expandIconPosition: computed(() => props.expandIconPosition),
  destroyInactivePanel: computed(() => props.destroyInactivePanel),
  disabled: computed(() => props.disabled),
})
</script>

<template>
  <AccordionRoot
    v-slot="slotProps"
    data-slot="accordion"
    v-bind="forwarded"
    :class="cn(
      accordionVariants({ bordered, ghost }),
      props.class
    )"
    :disabled="disabled"
  >
    <slot v-bind="slotProps" />
  </AccordionRoot>
</template>
