<script setup lang="ts">
/**
 * TextareaAutosize 自动高度文本域组合组件
 * 
 * 预组合的自动调整高度文本域
 * 支持 minRows/maxRows 配置（超越 Ant Design Vue, Arco Design Vue, TDesign, PrimeVue）
 */
import type { HTMLAttributes } from "vue"
import { ref, watch, onMounted, nextTick, computed } from "vue"
import { useVModel } from "@vueuse/core"
import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<{
  modelValue?: string
  minRows?: number
  maxRows?: number
  disabled?: boolean
  placeholder?: string
  class?: HTMLAttributes["class"]
}>(), {
  minRows: 2,
  maxRows: 10,
  disabled: false,
})

const emits = defineEmits<{
  "update:modelValue": [value: string]
}>()

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: "",
})

const textareaRef = ref<HTMLTextAreaElement | null>(null)
const textareaHeight = ref<string>("auto")
const isOverflow = ref(false)

function adjustHeight() {
  const textarea = textareaRef.value
  if (!textarea) return

  // 重置高度以获取正确的 scrollHeight
  textarea.style.height = "auto"
  
  // 计算行高
  const computedStyle = window.getComputedStyle(textarea)
  const lineHeight = parseInt(computedStyle.lineHeight) || 20
  const paddingTop = parseInt(computedStyle.paddingTop) || 0
  const paddingBottom = parseInt(computedStyle.paddingBottom) || 0
  const borderTop = parseInt(computedStyle.borderTopWidth) || 0
  const borderBottom = parseInt(computedStyle.borderBottomWidth) || 0
  
  const minHeight = props.minRows * lineHeight + paddingTop + paddingBottom + borderTop + borderBottom
  const maxHeight = props.maxRows * lineHeight + paddingTop + paddingBottom + borderTop + borderBottom
  
  // 设置新高度
  const scrollHeight = textarea.scrollHeight
  const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight)
  textareaHeight.value = `${newHeight}px`
  textarea.style.height = textareaHeight.value
  
  // 判断是否需要滚动
  isOverflow.value = scrollHeight > maxHeight
}

watch(modelValue, () => {
  nextTick(adjustHeight)
})

onMounted(() => {
  nextTick(adjustHeight)
})

defineExpose({
  focus: () => textareaRef.value?.focus(),
  blur: () => textareaRef.value?.blur(),
})
</script>

<template>
  <textarea
    ref="textareaRef"
    v-model="modelValue"
    data-slot="textarea"
    :disabled="disabled"
    :placeholder="placeholder"
    :class="cn(
      'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50',
      'flex w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none',
      'focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      'resize-none',
      isOverflow ? 'overflow-auto' : 'overflow-hidden',
      props.class,
    )"
    @input="adjustHeight"
  />
</template>
