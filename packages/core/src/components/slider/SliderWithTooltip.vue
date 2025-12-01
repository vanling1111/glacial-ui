<script setup lang="ts">
/**
 * SliderWithTooltip 带提示滑块组合组件
 * 
 * 预组合的带 tooltip 提示滑块
 * 超越 shadcn-vue, PrimeVue（它们不支持 tooltip）
 */
import type { HTMLAttributes } from "vue"
import { ref, computed } from "vue"
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from "reka-ui"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/tooltip"
import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<{
  modelValue?: number[]
  defaultValue?: number[]
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  orientation?: "horizontal" | "vertical"
  formatTooltip?: (value: number) => string
  class?: HTMLAttributes["class"]
}>(), {
  defaultValue: () => [0],
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  orientation: "horizontal",
})

const emits = defineEmits<{
  "update:modelValue": [value: number[]]
}>()

const internalValue = ref(props.defaultValue)
const currentValue = computed(() => props.modelValue ?? internalValue.value)

const isDragging = ref<number | null>(null)

function handleValueChange(value: number[] | undefined) {
  if (value) {
    internalValue.value = value
    emits("update:modelValue", value)
  }
}

function formatValue(value: number): string {
  if (props.formatTooltip) {
    return props.formatTooltip(value)
  }
  return String(value)
}
</script>

<template>
  <TooltipProvider :delay-duration="0">
    <SliderRoot
      :model-value="currentValue"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :orientation="orientation"
      data-slot="slider"
      :class="cn(
        'relative flex w-full touch-none items-center select-none',
        'data-[disabled]:opacity-50',
        orientation === 'vertical' && 'h-full min-h-44 w-auto flex-col',
        props.class,
      )"
      @update:model-value="handleValueChange"
    >
      <SliderTrack
        data-slot="slider-track"
        :class="cn(
          'bg-muted relative grow overflow-hidden rounded-full',
          orientation === 'horizontal' ? 'h-1.5 w-full' : 'h-full w-1.5',
        )"
      >
        <SliderRange
          data-slot="slider-range"
          :class="cn(
            'bg-primary absolute',
            orientation === 'horizontal' ? 'h-full' : 'w-full',
          )"
        />
      </SliderTrack>

      <Tooltip v-for="(value, key) in currentValue" :key="key" :open="isDragging === key || undefined">
        <TooltipTrigger as-child>
          <SliderThumb
            data-slot="slider-thumb"
            class="bg-background border-primary ring-ring/50 block size-4 shrink-0 rounded-full border-2 shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
            @pointerdown="isDragging = key"
            @pointerup="isDragging = null"
          />
        </TooltipTrigger>
        <TooltipContent :side="orientation === 'horizontal' ? 'top' : 'right'" :side-offset="8">
          {{ formatValue(value) }}
        </TooltipContent>
      </Tooltip>
    </SliderRoot>
  </TooltipProvider>
</template>
