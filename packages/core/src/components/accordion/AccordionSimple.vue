<script setup lang="ts">
/**
 * ============================================================================
 * AccordionSimple - 简化组合组件
 * ============================================================================
 * 
 * 通过 items 数组快速创建手风琴，适合简单场景
 * 
 * @example
 * ```vue
 * <AccordionSimple
 *   :items="[
 *     { value: '1', title: '标题1', content: '内容1' },
 *     { value: '2', title: '标题2', content: '内容2' },
 *   ]"
 *   type="single"
 *   collapsible
 * />
 * ```
 */
import type { AccordionRootProps } from "reka-ui"
import type { HTMLAttributes, VNode } from "vue"
import { computed } from "vue"
import Accordion from "./Accordion.vue"
import AccordionItem from "./AccordionItem.vue"
import AccordionTrigger from "./AccordionTrigger.vue"
import AccordionContent from "./AccordionContent.vue"

export interface AccordionItemData {
  /**
   * 唯一标识
   */
  value: string
  /**
   * 标题
   */
  title: string
  /**
   * 内容
   */
  content?: string
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 额外内容（右侧）
   */
  extra?: string | VNode
}

interface Props extends /* @vue-ignore */ Omit<AccordionRootProps, 'asChild'> {
  class?: HTMLAttributes["class"]
  /**
   * 手风琴项数据
   */
  items: AccordionItemData[]
  /**
   * 是否显示边框
   * @default true
   */
  bordered?: boolean
  /**
   * 幽灵模式
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
}

const props = withDefaults(defineProps<Props>(), {
  bordered: true,
  ghost: false,
  expandIconPosition: "end",
  destroyInactivePanel: false,
})

const emit = defineEmits<{
  (e: "update:modelValue", value: string | string[]): void
}>()
</script>

<template>
  <Accordion
    :class="props.class"
    :type="(props as any).type"
    :collapsible="(props as any).collapsible"
    :default-value="(props as any).defaultValue"
    :model-value="(props as any).modelValue"
    :bordered="bordered"
    :ghost="ghost"
    :expand-icon-position="expandIconPosition"
    :destroy-inactive-panel="destroyInactivePanel"
    @update:model-value="emit('update:modelValue', $event as any)"
  >
    <AccordionItem
      v-for="item in items"
      :key="item.value"
      :value="item.value"
      :disabled="item.disabled"
    >
      <AccordionTrigger :disabled="item.disabled">
        <slot name="title" :item="item">
          {{ item.title }}
        </slot>
        <template v-if="item.extra" #icon>
          <span class="text-muted-foreground text-sm">{{ item.extra }}</span>
        </template>
      </AccordionTrigger>
      <AccordionContent>
        <slot name="content" :item="item">
          {{ item.content }}
        </slot>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
