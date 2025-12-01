<script setup lang="ts">
/**
 * ProgressWithLabel 带标签进度条组合组件
 * 
 * 预组合的带标签进度条，支持格式化显示
 * 超越 shadcn-vue（它不支持 showText）
 */
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { ProgressIndicator, ProgressRoot } from "reka-ui"
import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<{
  modelValue?: number
  max?: number
  showLabel?: boolean
  labelPosition?: "right" | "top" | "inside"
  format?: (value: number, max: number) => string
  class?: HTMLAttributes["class"]
}>(), {
  modelValue: 0,
  max: 100,
  showLabel: true,
  labelPosition: "right",
})

const percentage = computed(() => {
  return Math.min(100, Math.max(0, (props.modelValue / props.max) * 100))
})

const labelText = computed(() => {
  if (props.format) {
    return props.format(props.modelValue, props.max)
  }
  return `${Math.round(percentage.value)}%`
})
</script>

<template>
  <div :class="cn(
    'w-full',
    labelPosition === 'top' && 'space-y-1.5',
    labelPosition === 'right' && 'flex items-center gap-3',
    props.class,
  )">
    <!-- 顶部标签 -->
    <div v-if="showLabel && labelPosition === 'top'" class="flex justify-between text-sm">
      <slot name="label" />
      <span class="text-muted-foreground">{{ labelText }}</span>
    </div>

    <!-- 进度条 -->
    <ProgressRoot
      :model-value="percentage"
      data-slot="progress"
      :class="cn(
        'bg-primary/20 relative overflow-hidden rounded-full',
        labelPosition === 'inside' ? 'h-5' : 'h-2',
        labelPosition === 'right' ? 'flex-1' : 'w-full',
      )"
    >
      <ProgressIndicator
        data-slot="progress-indicator"
        :class="cn(
          'bg-primary h-full w-full flex-1 transition-all duration-300',
          labelPosition === 'inside' && 'flex items-center justify-end pr-2',
        )"
        :style="`transform: translateX(-${100 - percentage}%);`"
      >
        <!-- 内部标签 -->
        <span
          v-if="showLabel && labelPosition === 'inside'"
          class="text-xs font-medium text-primary-foreground"
        >
          {{ labelText }}
        </span>
      </ProgressIndicator>
    </ProgressRoot>

    <!-- 右侧标签 -->
    <span
      v-if="showLabel && labelPosition === 'right'"
      class="text-sm text-muted-foreground min-w-[3rem] text-right"
    >
      {{ labelText }}
    </span>
  </div>
</template>
