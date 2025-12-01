<script setup lang="ts">
/**
 * TextareaWithStatus 带状态文本域组合组件
 * 
 * 预组合的带状态文本域，支持 success/warning/error 状态和提示文本
 * 支持 tips 提示（超越 Ant Design Vue, Arco Design Vue, PrimeVue）
 */
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { useVModel } from "@vueuse/core"
import { cn } from "@/lib/utils"

export type TextareaStatus = "default" | "success" | "warning" | "error"

const props = withDefaults(defineProps<{
  modelValue?: string
  status?: TextareaStatus
  tips?: string
  disabled?: boolean
  placeholder?: string
  rows?: number
  class?: HTMLAttributes["class"]
}>(), {
  status: "default",
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

const textareaClass = computed(() => {
  const statusClasses = {
    default: "",
    success: "border-emerald-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20",
    warning: "border-amber-500 focus-visible:border-amber-500 focus-visible:ring-amber-500/20",
    error: "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
  }
  return statusClasses[props.status]
})

const tipsClass = computed(() => {
  const statusClasses = {
    default: "text-muted-foreground",
    success: "text-emerald-500",
    warning: "text-amber-500",
    error: "text-destructive",
  }
  return statusClasses[props.status]
})
</script>

<template>
  <div :class="cn('space-y-1.5', props.class)">
    <textarea
      v-model="modelValue"
      data-slot="textarea"
      :disabled="disabled"
      :placeholder="placeholder"
      :rows="rows"
      :aria-invalid="status === 'error' || undefined"
      :class="cn(
        'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50',
        'flex min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none',
        'focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        textareaClass,
      )"
    />
    <p v-if="tips" :class="cn('text-xs', tipsClass)">
      {{ tips }}
    </p>
  </div>
</template>
