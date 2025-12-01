<script setup lang="ts">
/**
 * RadioGroupItemWithLabel 带标签单选框选项组合组件
 * 
 * 预组合的带标签单选框选项
 * 内部使用 RadioGroupItem + Label
 */
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { CircleIcon } from "lucide-vue-next"
import { RadioGroupIndicator, RadioGroupItem } from "reka-ui"
import { cn } from "@/lib/utils"
import { Label } from "@/components/label"

const props = withDefaults(defineProps<{
  value: string
  label?: string
  description?: string
  disabled?: boolean
  id?: string
  class?: HTMLAttributes["class"]
}>(), {
  disabled: false,
})

const radioId = computed(() => props.id || `radio-${Math.random().toString(36).slice(2, 9)}`)
</script>

<template>
  <div :class="cn('flex items-start gap-2', props.class)">
    <RadioGroupItem
      :id="radioId"
      :value="value"
      :disabled="disabled"
      data-slot="radio-group-item"
      :class="cn(
        'aspect-square size-4 shrink-0 rounded-full border border-input shadow-xs transition-shadow outline-none mt-0.5',
        'focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring',
        'data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        'disabled:cursor-not-allowed disabled:opacity-50',
      )"
    >
      <RadioGroupIndicator class="flex items-center justify-center">
        <CircleIcon class="size-2 fill-current" />
      </RadioGroupIndicator>
    </RadioGroupItem>
    <div v-if="label || description || $slots.default" class="grid gap-1.5 leading-none">
      <Label
        :for="radioId"
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
