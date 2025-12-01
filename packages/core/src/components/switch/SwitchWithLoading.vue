<script setup lang="ts">
/**
 * SwitchWithLoading 带加载状态开关组合组件
 * 
 * 预组合的带加载状态开关，支持异步切换
 * 内部使用 Switch + loading 状态
 */
import type { HTMLAttributes } from "vue"
import { ref, computed } from "vue"
import { Loader2 } from "lucide-vue-next"
import { SwitchRoot, SwitchThumb } from "reka-ui"
import { cn } from "@/lib/utils"
import { Label } from "@/components/label"

const props = withDefaults(defineProps<{
  modelValue?: boolean
  defaultChecked?: boolean
  label?: string
  disabled?: boolean
  loading?: boolean
  beforeChange?: (newValue: boolean) => boolean | Promise<boolean>
  id?: string
  class?: HTMLAttributes["class"]
}>(), {
  disabled: false,
  loading: false,
})

const emits = defineEmits<{
  "update:modelValue": [value: boolean]
}>()

const internalLoading = ref(false)
const switchId = computed(() => props.id || `switch-${Math.random().toString(36).slice(2, 9)}`)

const isLoading = computed(() => props.loading || internalLoading.value)
const isDisabled = computed(() => props.disabled || isLoading.value)

async function handleChange(checked: boolean | "indeterminate") {
  if (isDisabled.value) return
  
  const newValue = checked === true
  
  if (props.beforeChange) {
    internalLoading.value = true
    try {
      const result = await props.beforeChange(newValue)
      if (result === false) {
        internalLoading.value = false
        return
      }
    } catch {
      internalLoading.value = false
      return
    }
    internalLoading.value = false
  }
  
  emits("update:modelValue", newValue)
}
</script>

<template>
  <div :class="cn('flex items-center gap-2', props.class)">
    <SwitchRoot
      :id="switchId"
      data-slot="switch"
      :checked="modelValue"
      :default-checked="defaultChecked"
      :disabled="isDisabled"
      :class="cn(
        'peer inline-flex h-5 w-9 shrink-0 items-center rounded-full border-2 border-transparent shadow-xs transition-all outline-none cursor-pointer',
        'focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring',
        'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
        'disabled:cursor-not-allowed disabled:opacity-50',
      )"
      @update:checked="handleChange"
    >
      <SwitchThumb
        data-slot="switch-thumb"
        :class="cn(
          'pointer-events-none flex items-center justify-center size-4 rounded-full bg-background shadow-lg ring-0 transition-transform',
          'data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
        )"
      >
        <Loader2 v-if="isLoading" class="size-2.5 animate-spin text-muted-foreground" />
      </SwitchThumb>
    </SwitchRoot>

    <Label
      v-if="label || $slots.default"
      :for="switchId"
      :class="cn(
        'text-sm font-medium leading-none',
        isDisabled && 'cursor-not-allowed opacity-70',
      )"
    >
      <slot>{{ label }}</slot>
    </Label>
  </div>
</template>
