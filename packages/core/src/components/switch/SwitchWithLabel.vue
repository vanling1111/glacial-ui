<script setup lang="ts">
/**
 * SwitchWithLabel 带标签开关组合组件
 * 
 * 预组合的带标签开关
 * 内部使用 Switch + Label
 */
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@/lib/utils"
import Switch from "./Switch.vue"
import { Label } from "@/components/label"

const props = withDefaults(defineProps<{
  modelValue?: boolean
  defaultChecked?: boolean
  label?: string
  description?: string
  disabled?: boolean
  required?: boolean
  name?: string
  id?: string
  labelPosition?: "left" | "right"
  class?: HTMLAttributes["class"]
}>(), {
  disabled: false,
  required: false,
  labelPosition: "right",
})

const emits = defineEmits<{
  "update:modelValue": [value: boolean]
}>()

const switchId = computed(() => props.id || `switch-${Math.random().toString(36).slice(2, 9)}`)
</script>

<template>
  <div :class="cn('flex items-center gap-2', props.class)">
    <!-- 标签在左侧 -->
    <template v-if="labelPosition === 'left' && (label || description || $slots.default)">
      <div class="grid gap-1.5 leading-none">
        <Label
          :for="switchId"
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
    </template>

    <Switch
      :id="switchId"
      :checked="modelValue"
      :default-checked="defaultChecked"
      :disabled="disabled"
      :required="required"
      :name="name"
      @update:checked="$emit('update:modelValue', $event)"
    />

    <!-- 标签在右侧 -->
    <template v-if="labelPosition === 'right' && (label || description || $slots.default)">
      <div class="grid gap-1.5 leading-none">
        <Label
          :for="switchId"
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
    </template>
  </div>
</template>
