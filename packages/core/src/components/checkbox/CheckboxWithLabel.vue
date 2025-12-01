<script setup lang="ts">
/**
 * CheckboxWithLabel 带标签复选框组合组件
 * 
 * 预组合的带标签复选框
 * 内部使用 Checkbox + Label
 */
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@/lib/utils"
import Checkbox from "./Checkbox.vue"
import { Label } from "@/components/label"

const props = withDefaults(defineProps<{
  modelValue?: boolean
  defaultChecked?: boolean
  label?: string
  description?: string
  disabled?: boolean
  required?: boolean
  name?: string
  value?: string
  id?: string
  class?: HTMLAttributes["class"]
}>(), {
  disabled: false,
  required: false,
})

const emits = defineEmits<{
  "update:modelValue": [value: boolean]
}>()

const checkboxId = computed(() => props.id || `checkbox-${Math.random().toString(36).slice(2, 9)}`)
</script>

<template>
  <div :class="cn('flex items-start gap-2', props.class)">
    <Checkbox
      :id="checkboxId"
      :checked="modelValue"
      :default-checked="defaultChecked"
      :disabled="disabled"
      :required="required"
      :name="name"
      :value="value"
      @update:checked="$emit('update:modelValue', $event === true)"
    />
    <div v-if="label || description || $slots.default" class="grid gap-1.5 leading-none">
      <Label
        :for="checkboxId"
        :class="cn(
          'text-sm font-medium leading-none',
          disabled && 'cursor-not-allowed opacity-70',
        )"
      >
        <slot>{{ label }}</slot>
      </Label>
      <p v-if="description || $slots.description" class="text-xs text-muted-foreground">
        <slot name="description">{{ description }}</slot>
      </p>
    </div>
  </div>
</template>
