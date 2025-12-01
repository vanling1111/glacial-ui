<script setup lang="ts">
/**
 * RadioGroupSimple 简单单选框组组合组件
 * 
 * 预组合的单选框组，传入 options 数组即可使用
 * 内部使用 RadioGroup + RadioGroupItemWithLabel
 */
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { RadioGroupRoot } from "reka-ui"
import RadioGroupItemWithLabel from "./RadioGroupItemWithLabel.vue"

export interface RadioOption {
  label: string
  value: string
  description?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<{
  modelValue?: string
  options?: RadioOption[]
  disabled?: boolean
  direction?: "horizontal" | "vertical"
  name?: string
  class?: HTMLAttributes["class"]
}>(), {
  options: () => [],
  disabled: false,
  direction: "vertical",
})

const emits = defineEmits<{
  "update:modelValue": [value: string]
}>()
</script>

<template>
  <RadioGroupRoot
    data-slot="radio-group"
    :model-value="modelValue"
    :disabled="disabled"
    :name="name"
    :class="cn(
      'grid gap-2',
      direction === 'horizontal' && 'flex flex-row flex-wrap gap-4',
      props.class,
    )"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <RadioGroupItemWithLabel
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      :label="option.label"
      :description="option.description"
      :disabled="option.disabled"
    />
  </RadioGroupRoot>
</template>
