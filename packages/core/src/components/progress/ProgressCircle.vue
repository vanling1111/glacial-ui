<script setup lang="ts">
/**
 * ProgressCircle 圆形进度条组合组件
 * 
 * 预组合的圆形进度条
 * 超越 shadcn-vue, PrimeVue（它们不支持 circle）
 */
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<{
  modelValue?: number
  max?: number
  size?: number
  strokeWidth?: number
  showLabel?: boolean
  format?: (value: number, max: number) => string
  color?: string
  trackColor?: string
  class?: HTMLAttributes["class"]
}>(), {
  modelValue: 0,
  max: 100,
  size: 80,
  strokeWidth: 6,
  showLabel: true,
})

const percentage = computed(() => {
  return Math.min(100, Math.max(0, (props.modelValue / props.max) * 100))
})

const radius = computed(() => (props.size - props.strokeWidth) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const strokeDashoffset = computed(() => {
  return circumference.value - (percentage.value / 100) * circumference.value
})

const labelText = computed(() => {
  if (props.format) {
    return props.format(props.modelValue, props.max)
  }
  return `${Math.round(percentage.value)}%`
})

const center = computed(() => props.size / 2)
</script>

<template>
  <div
    :class="cn('relative inline-flex items-center justify-center', props.class)"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <svg
      :width="size"
      :height="size"
      :viewBox="`0 0 ${size} ${size}`"
      class="transform -rotate-90"
    >
      <!-- 轨道 -->
      <circle
        :cx="center"
        :cy="center"
        :r="radius"
        :stroke-width="strokeWidth"
        fill="none"
        :class="cn('stroke-primary/20', !trackColor && 'stroke-primary/20')"
        :style="trackColor ? { stroke: trackColor } : undefined"
      />
      <!-- 进度 -->
      <circle
        :cx="center"
        :cy="center"
        :r="radius"
        :stroke-width="strokeWidth"
        fill="none"
        stroke-linecap="round"
        :class="cn('stroke-primary transition-all duration-300')"
        :style="{
          strokeDasharray: circumference,
          strokeDashoffset: strokeDashoffset,
          ...(color ? { stroke: color } : {}),
        }"
      />
    </svg>
    <!-- 标签 -->
    <div
      v-if="showLabel"
      class="absolute inset-0 flex items-center justify-center"
    >
      <slot>
        <span class="text-sm font-medium">{{ labelText }}</span>
      </slot>
    </div>
  </div>
</template>
