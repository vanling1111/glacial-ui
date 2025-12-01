<script setup lang="ts">
/**
 * InputWithLimit 带字数限制输入框组合组件
 * 
 * 预组合的带字数统计输入框
 * 内部使用 InputGroup + InputGroupAddon + InputGroupText
 */
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@/lib/utils"
import InputGroup from "./InputGroup.vue"
import InputGroupAddon from "./InputGroupAddon.vue"
import InputGroupInput from "./InputGroupInput.vue"
import InputGroupText from "./InputGroupText.vue"

const props = withDefaults(defineProps<{
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  /** 最大长度 */
  maxLength: number
  /** 是否允许超出 */
  allowOverflow?: boolean
  class?: HTMLAttributes["class"]
}>(), {
  allowOverflow: false,
})

const emits = defineEmits<{
  "update:modelValue": [value: string]
}>()

const currentLength = computed(() => (props.modelValue ?? "").length)
const isOverLimit = computed(() => currentLength.value > props.maxLength)

const limitClass = computed(() => cn(
  "text-xs tabular-nums",
  isOverLimit.value ? "text-destructive" : "text-muted-foreground",
))

function handleInput(value: string | number) {
  let strValue = String(value)
  if (!props.allowOverflow && strValue.length > props.maxLength) {
    strValue = strValue.slice(0, props.maxLength)
  }
  emits("update:modelValue", strValue)
}
</script>

<template>
  <InputGroup :class="cn(props.class)">
    <InputGroupInput
      :model-value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="allowOverflow ? undefined : maxLength"
      @update:model-value="handleInput"
    />
    <InputGroupAddon align="inline-end">
      <InputGroupText :class="limitClass">
        {{ currentLength }}/{{ maxLength }}
      </InputGroupText>
    </InputGroupAddon>
  </InputGroup>
</template>
