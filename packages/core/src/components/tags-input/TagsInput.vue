<script setup lang="ts">
/**
 * ============================================================================
 * TagsInput - 原子化增强版标签输入根组件
 * ============================================================================
 * 
 * ## 增强功能（超越 4 个库）
 * 
 * | 功能 | shadcn | Ant | Arco | TDesign | PrimeVue | glacial-ui |
 * |-----|--------|-----|------|---------|----------|------------|
 * | 基础标签输入 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * | 尺寸控制 | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * | 最大数量限制 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * | 重复检测 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * | 可清空 | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * | 只读模式 | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * | 状态反馈 | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * | 标签颜色 | ❌ | ✅ | ✅ | ❌ | ❌ | ✅ |
 * 
 * @example
 * ```vue
 * <TagsInput v-model="tags" :max="5" size="default" clearable>
 *   <TagsInputItem v-for="tag in tags" :key="tag" :value="tag">
 *     <TagsInputItemText />
 *     <TagsInputItemDelete />
 *   </TagsInputItem>
 *   <TagsInputInput placeholder="添加标签..." />
 * </TagsInput>
 * ```
 */
import type { TagsInputRootEmits, TagsInputRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed, provide } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { TagsInputRoot, useForwardPropsEmits } from "reka-ui"
import { cn } from "@/lib/utils"
import { tagsInputVariants, tagsInputContextKey } from "./index"

// 扩展 props 类型
interface ExtendedProps extends TagsInputRootProps {
  class?: HTMLAttributes["class"]
  /**
   * 尺寸
   * @default "default"
   */
  size?: "sm" | "default" | "lg"
  /**
   * 状态
   */
  status?: "default" | "success" | "warning" | "error"
  /**
   * 标签颜色
   * @default "default"
   */
  tagColor?: "default" | "primary" | "secondary" | "success" | "warning" | "danger"
  /**
   * 是否可清空所有标签
   * @default false
   */
  clearable?: boolean
  /**
   * 是否只读
   * @default false
   */
  readonly?: boolean
}

const props = withDefaults(defineProps<ExtendedProps>(), {
  size: "default",
  status: "default",
  tagColor: "default",
  clearable: false,
  readonly: false,
})

const emits = defineEmits<TagsInputRootEmits>()

const delegatedProps = reactiveOmit(
  props,
  "class",
  "size",
  "status",
  "tagColor",
  "clearable",
  "readonly",
)

const forwarded = useForwardPropsEmits(delegatedProps, emits)

// 提供上下文给子组件
provide(tagsInputContextKey, {
  size: computed(() => props.size),
  status: computed(() => props.status),
  tagColor: computed(() => props.tagColor),
  clearable: computed(() => props.clearable),
  readonly: computed(() => props.readonly),
})
</script>

<template>
  <TagsInputRoot
    v-slot="slotProps"
    v-bind="forwarded"
    :class="cn(
      tagsInputVariants({ size, status }),
      props.class
    )"
  >
    <slot v-bind="slotProps" />
  </TagsInputRoot>
</template>
