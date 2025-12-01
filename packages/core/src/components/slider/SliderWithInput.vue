<script setup lang="ts">
/**
 * SliderWithInput 带输入框滑块组合组件
 * 
 * 预组合的带输入框滑块
 * 超越 shadcn-vue, Ant Design Vue, PrimeVue（它们不支持 showInput）
 */
import type { HTMLAttributes } from "vue"
import { ref, computed, watch } from "vue"
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from "reka-ui"
import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<{
  modelValue?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  class?: HTMLAttributes["class"]
}>(), {
  defaultValue: 0,
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
})

const emits = defineEmits<{
  "update:modelValue": [value: number]
}>()

const internalValue = ref(props.defaultValue)
const currentValue = computed(() => props.modelValue ?? internalValue.value)

// 用于 SliderRoot 的数组格式
const sliderValue = computed(() => [currentValue.value])

function handleSliderChange(value: number[] | undefined) {
  if (!value) return
  const newValue = value[0]
  internalValue.value = newValue
  emits("update:modelValue", newValue)
}

function handleInputChange(e: Event) {
  const target = e.target as HTMLInputElement
  let newValue = Number(target.value)
  
  // 限制范围
  if (newValue < props.min) newValue = props.min
  if (newValue > props.max) newValue = props.max
  
  internalValue.value = newValue
  emits("update:modelValue", newValue)
}
</script>

<template>
  <div :class="cn('flex items-center gap-4', props.class)">
    <SliderRoot
      :model-value="sliderValue"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      data-slot="slider"
      class="relative flex flex-1 touch-none items-center select-none data-[disabled]:opacity-50"
      @update:model-value="handleSliderChange"
    >
      <SliderTrack
        data-slot="slider-track"
        class="bg-muted relative h-1.5 w-full grow overflow-hidden rounded-full"
      >
        <SliderRange
          data-slot="slider-range"
          class="bg-primary absolute h-full"
        />
      </SliderTrack>

      <SliderThumb
        data-slot="slider-thumb"
        class="bg-background border-primary ring-ring/50 block size-4 shrink-0 rounded-full border-2 shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
      />
    </SliderRoot>

    <input
      type="number"
      :value="currentValue"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :class="cn(
        'border-input focus-visible:border-ring focus-visible:ring-ring/50',
        'h-9 w-16 rounded-md border bg-transparent px-2 text-center text-sm shadow-xs outline-none',
        'focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
      )"
      @change="handleInputChange"
    />
  </div>
</template>
