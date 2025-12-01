<script setup lang="ts">
/**
 * SliderWithMarks 带刻度标记滑块组合组件
 * 
 * 预组合的带刻度标记滑块
 * 超越 shadcn-vue, PrimeVue（它们不支持 marks）
 */
import type { HTMLAttributes } from "vue"
import { ref, computed } from "vue"
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from "reka-ui"
import { cn } from "@/lib/utils"

export interface SliderMark {
  value: number
  label?: string
}

const props = withDefaults(defineProps<{
  modelValue?: number[]
  defaultValue?: number[]
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  marks?: SliderMark[] | Record<number, string>
  showTicks?: boolean
  class?: HTMLAttributes["class"]
}>(), {
  defaultValue: () => [0],
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  showTicks: false,
})

const emits = defineEmits<{
  "update:modelValue": [value: number[]]
}>()

const internalValue = ref(props.defaultValue)
const currentValue = computed(() => props.modelValue ?? internalValue.value)

// 将 marks 转换为统一格式
const normalizedMarks = computed<SliderMark[]>(() => {
  if (!props.marks) return []
  if (Array.isArray(props.marks)) return props.marks
  return Object.entries(props.marks).map(([key, label]) => ({
    value: Number(key),
    label,
  }))
})

// 计算刻度位置百分比
function getPositionPercent(value: number): number {
  return ((value - props.min) / (props.max - props.min)) * 100
}

// 判断刻度是否在当前值范围内
function isInRange(value: number): boolean {
  const [start, end] = currentValue.value.length > 1 
    ? [Math.min(...currentValue.value), Math.max(...currentValue.value)]
    : [props.min, currentValue.value[0]]
  return value >= start && value <= end
}

function handleValueChange(value: number[] | undefined) {
  if (!value) return
  internalValue.value = value
  emits("update:modelValue", value)
}
</script>

<template>
  <div :class="cn('relative w-full', props.class)">
    <SliderRoot
      :model-value="currentValue"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      data-slot="slider"
      class="relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50"
      @update:model-value="handleValueChange"
    >
      <SliderTrack
        data-slot="slider-track"
        class="bg-muted relative h-1.5 w-full grow overflow-hidden rounded-full"
      >
        <SliderRange
          data-slot="slider-range"
          class="bg-primary absolute h-full"
        />
        
        <!-- 刻度点 -->
        <template v-if="showTicks || normalizedMarks.length">
          <span
            v-for="mark in normalizedMarks"
            :key="mark.value"
            :class="cn(
              'absolute top-1/2 -translate-y-1/2 size-1.5 rounded-full',
              isInRange(mark.value) ? 'bg-primary-foreground' : 'bg-muted-foreground/50',
            )"
            :style="{ left: `${getPositionPercent(mark.value)}%` }"
          />
        </template>
      </SliderTrack>

      <SliderThumb
        v-for="(_, key) in currentValue"
        :key="key"
        data-slot="slider-thumb"
        class="bg-background border-primary ring-ring/50 block size-4 shrink-0 rounded-full border-2 shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
      />
    </SliderRoot>

    <!-- 刻度标签 -->
    <div v-if="normalizedMarks.length" class="relative mt-2 h-5">
      <span
        v-for="mark in normalizedMarks"
        :key="mark.value"
        :class="cn(
          'absolute -translate-x-1/2 text-xs',
          isInRange(mark.value) ? 'text-foreground' : 'text-muted-foreground',
        )"
        :style="{ left: `${getPositionPercent(mark.value)}%` }"
      >
        {{ mark.label ?? mark.value }}
      </span>
    </div>
  </div>
</template>
