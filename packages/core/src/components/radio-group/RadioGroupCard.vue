<script setup lang="ts">
/**
 * RadioGroupCard 卡片式单选框组组合组件
 * 
 * 预组合的卡片式单选框组，每个选项是一个可点击的卡片
 */
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { RadioGroupRoot, RadioGroupItem, RadioGroupIndicator } from "reka-ui"
import { CircleIcon, CheckIcon } from "lucide-vue-next"

export interface RadioCardOption {
  label: string
  value: string
  description?: string
  icon?: any
  disabled?: boolean
}

const props = withDefaults(defineProps<{
  modelValue?: string
  options?: RadioCardOption[]
  disabled?: boolean
  columns?: 1 | 2 | 3 | 4
  class?: HTMLAttributes["class"]
}>(), {
  options: () => [],
  disabled: false,
  columns: 1,
})

const emits = defineEmits<{
  "update:modelValue": [value: string]
}>()

const gridCols = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
}
</script>

<template>
  <RadioGroupRoot
    data-slot="radio-group"
    :model-value="modelValue"
    :disabled="disabled"
    :class="cn('grid gap-3', gridCols[columns], props.class)"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <RadioGroupItem
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      :disabled="option.disabled"
      :class="cn(
        'relative flex cursor-pointer rounded-lg border bg-card p-4 shadow-sm transition-all outline-none',
        'hover:bg-accent/50',
        'focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring',
        'data-[state=checked]:border-primary data-[state=checked]:ring-1 data-[state=checked]:ring-primary',
        'disabled:cursor-not-allowed disabled:opacity-50',
      )"
    >
      <div class="flex w-full items-start gap-3">
        <!-- 图标 -->
        <component
          :is="option.icon"
          v-if="option.icon"
          class="size-5 text-muted-foreground shrink-0 mt-0.5"
        />
        <!-- 内容 -->
        <div class="flex-1 min-w-0">
          <div class="text-sm font-medium">{{ option.label }}</div>
          <p v-if="option.description" class="text-xs text-muted-foreground mt-1">
            {{ option.description }}
          </p>
        </div>
        <!-- 选中指示器 -->
        <RadioGroupIndicator class="shrink-0">
          <CheckIcon class="size-4 text-primary" />
        </RadioGroupIndicator>
      </div>
    </RadioGroupItem>
  </RadioGroupRoot>
</template>
