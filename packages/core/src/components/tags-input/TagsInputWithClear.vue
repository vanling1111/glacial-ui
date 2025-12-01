<script setup lang="ts">
/**
 * ============================================================================
 * TagsInputWithClear - 带清空功能的标签输入组件
 * ============================================================================
 * 
 * 完整的标签输入组件，包含清空按钮
 * 
 * @example
 * ```vue
 * <TagsInputWithClear
 *   v-model="tags"
 *   :max="5"
 *   placeholder="添加标签..."
 *   clearable
 * />
 * ```
 */
import type { TagsInputRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed, ref } from "vue"
import { X } from "lucide-vue-next"
import TagsInput from "./TagsInput.vue"
import TagsInputItem from "./TagsInputItem.vue"
import TagsInputItemText from "./TagsInputItemText.vue"
import TagsInputItemDelete from "./TagsInputItemDelete.vue"
import TagsInputInput from "./TagsInputInput.vue"
import { cn } from "@/lib/utils"

interface Props extends /* @vue-ignore */ Omit<TagsInputRootProps, 'asChild' | 'modelValue'> {
  class?: HTMLAttributes["class"]
  /**
   * 标签值数组
   */
  modelValue?: string[]
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
   * @default true
   */
  clearable?: boolean
  /**
   * 占位符
   */
  placeholder?: string
  /**
   * 最大标签数量
   */
  max?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  size: "default",
  status: "default",
  tagColor: "default",
  clearable: true,
})

const emit = defineEmits<{
  (e: "update:modelValue", value: string[]): void
}>()

// 内部标签状态
const internalTags = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
})

// 是否显示清空按钮
const showClear = computed(() => props.clearable && internalTags.value.length > 0)

// 清空所有标签
function handleClear() {
  emit("update:modelValue", [])
}
</script>

<template>
  <div class="relative">
    <TagsInput
      v-model="internalTags"
      :class="cn(showClear && 'pr-8', props.class)"
      :size="size"
      :status="status"
      :tag-color="tagColor"
      :max="max"
      :disabled="(props as any).disabled"
    >
      <TagsInputItem
        v-for="tag in internalTags"
        :key="tag"
        :value="tag"
      >
        <TagsInputItemText />
        <TagsInputItemDelete />
      </TagsInputItem>
      <TagsInputInput :placeholder="placeholder" />
    </TagsInput>

    <!-- 清空按钮 -->
    <button
      v-if="showClear"
      type="button"
      class="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
      @click="handleClear"
    >
      <X class="size-4" />
    </button>
  </div>
</template>
