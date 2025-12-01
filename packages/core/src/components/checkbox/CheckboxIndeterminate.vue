<script setup lang="ts">
/**
 * CheckboxIndeterminate 半选复选框组合组件
 * 
 * 预组合的支持半选状态的复选框
 * 用于全选场景
 */
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { Check, Minus } from "lucide-vue-next"
import { CheckboxIndicator, CheckboxRoot } from "reka-ui"
import { cn } from "@/lib/utils"
import { Label } from "@/components/label"

const props = withDefaults(defineProps<{
  modelValue?: boolean
  indeterminate?: boolean
  label?: string
  disabled?: boolean
  id?: string
  class?: HTMLAttributes["class"]
}>(), {
  indeterminate: false,
  disabled: false,
})

const emits = defineEmits<{
  "update:modelValue": [value: boolean]
}>()

const checkboxId = computed(() => props.id || `checkbox-${Math.random().toString(36).slice(2, 9)}`)

// reka-ui 需要的 checked 状态
const rekaChecked = computed(() => {
  if (props.indeterminate) return "indeterminate"
  return props.modelValue
})

function handleChange(checked: boolean | "indeterminate") {
  emits("update:modelValue", checked === true)
}
</script>

<template>
  <div :class="cn('flex items-center gap-2', props.class)">
    <CheckboxRoot
      :id="checkboxId"
      data-slot="checkbox"
      :checked="rekaChecked"
      :disabled="disabled"
      :class="cn(
        'peer border-input data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary',
        'data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground data-[state=indeterminate]:border-primary',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
      )"
      @update:checked="handleChange"
    >
      <CheckboxIndicator class="grid place-content-center text-current transition-none">
        <Minus v-if="indeterminate" class="size-3.5" />
        <Check v-else class="size-3.5" />
      </CheckboxIndicator>
    </CheckboxRoot>
    <Label
      v-if="label || $slots.default"
      :for="checkboxId"
      :class="cn(
        'text-sm font-medium leading-none',
        disabled && 'cursor-not-allowed opacity-70',
      )"
    >
      <slot>{{ label }}</slot>
    </Label>
  </div>
</template>
