<script setup lang="ts">
/**
 * TextareaWithLimit 带字数限制文本域组合组件
 * 
 * 预组合的带字数限制文本域
 * 内部使用 Textarea + 字数统计
 */
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { useVModel } from "@vueuse/core"
import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<{
  modelValue?: string
  maxLength?: number
  showCount?: boolean
  disabled?: boolean
  placeholder?: string
  rows?: number
  class?: HTMLAttributes["class"]
}>(), {
  showCount: true,
  disabled: false,
  rows: 3,
})

const emits = defineEmits<{
  "update:modelValue": [value: string]
}>()

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: "",
})

const currentLength = computed(() => modelValue.value?.length || 0)
const isOverLimit = computed(() => props.maxLength && currentLength.value > props.maxLength)
</script>

<template>
  <div :class="cn('relative', props.class)">
    <textarea
      v-model="modelValue"
      data-slot="textarea"
      :disabled="disabled"
      :placeholder="placeholder"
      :rows="rows"
      :maxlength="maxLength"
      :class="cn(
        'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50',
        'flex min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none',
        'focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        showCount && 'pb-6',
        isOverLimit && 'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20',
      )"
    />
    <div
      v-if="showCount"
      :class="cn(
        'absolute bottom-2 right-3 text-xs text-muted-foreground',
        isOverLimit && 'text-destructive',
      )"
    >
      {{ currentLength }}<span v-if="maxLength">/{{ maxLength }}</span>
    </div>
  </div>
</template>
