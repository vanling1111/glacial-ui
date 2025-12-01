<script setup lang="ts">
/**
 * RadioGroupButton 按钮式单选框组组合组件
 * 
 * 预组合的按钮式单选框组，类似 SegmentedControl
 */
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { RadioGroupRoot, RadioGroupItem } from "reka-ui"

export interface RadioButtonOption {
  label: string
  value: string
  disabled?: boolean
}

const props = withDefaults(defineProps<{
  modelValue?: string
  options?: RadioButtonOption[]
  disabled?: boolean
  size?: "sm" | "default" | "lg"
  class?: HTMLAttributes["class"]
}>(), {
  options: () => [],
  disabled: false,
  size: "default",
})

const emits = defineEmits<{
  "update:modelValue": [value: string]
}>()

const sizeClasses = {
  sm: "h-8 px-3 text-xs",
  default: "h-9 px-4 text-sm",
  lg: "h-10 px-5 text-base",
}
</script>

<template>
  <RadioGroupRoot
    data-slot="radio-group"
    :model-value="modelValue"
    :disabled="disabled"
    :class="cn(
      'inline-flex items-center rounded-lg bg-muted p-1',
      props.class,
    )"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <RadioGroupItem
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      :disabled="option.disabled"
      :class="cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-all outline-none',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'data-[state=unchecked]:text-muted-foreground data-[state=unchecked]:hover:text-foreground',
        'data-[state=checked]:bg-background data-[state=checked]:text-foreground data-[state=checked]:shadow-sm',
        'disabled:pointer-events-none disabled:opacity-50',
        sizeClasses[size],
      )"
    >
      {{ option.label }}
    </RadioGroupItem>
  </RadioGroupRoot>
</template>
