<script setup lang="ts">
/**
 * TextareaClearable 可清除文本域组合组件
 * 
 * 预组合的可清除文本域
 * 支持清除按钮（超越 TDesign, PrimeVue）
 */
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { useVModel } from "@vueuse/core"
import { X } from "lucide-vue-next"
import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<{
  modelValue?: string
  disabled?: boolean
  placeholder?: string
  rows?: number
  class?: HTMLAttributes["class"]
}>(), {
  disabled: false,
  rows: 3,
})

const emits = defineEmits<{
  "update:modelValue": [value: string]
  "clear": []
}>()

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: "",
})

const showClear = computed(() => modelValue.value && modelValue.value.length > 0 && !props.disabled)

function handleClear() {
  modelValue.value = ""
  emits("clear")
}
</script>

<template>
  <div :class="cn('relative', props.class)">
    <textarea
      v-model="modelValue"
      data-slot="textarea"
      :disabled="disabled"
      :placeholder="placeholder"
      :rows="rows"
      :class="cn(
        'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50',
        'flex min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none',
        'focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        showClear && 'pr-8',
      )"
    />
    <button
      v-if="showClear"
      type="button"
      class="absolute top-2 right-2 size-5 rounded-full inline-flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      @click="handleClear"
    >
      <X class="size-3.5" />
    </button>
  </div>
</template>
