<script setup lang="ts">
/**
 * SwitchWithText 带文本开关组合组件
 * 
 * 预组合的带开关文本开关（开/关文字显示在开关内部）
 * 内部使用 Switch + 文本
 */
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { SwitchRoot, SwitchThumb } from "reka-ui"
import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<{
  modelValue?: boolean
  defaultChecked?: boolean
  checkedText?: string
  uncheckedText?: string
  disabled?: boolean
  id?: string
  class?: HTMLAttributes["class"]
}>(), {
  disabled: false,
  checkedText: "开",
  uncheckedText: "关",
})

const emits = defineEmits<{
  "update:modelValue": [value: boolean]
}>()

const switchId = computed(() => props.id || `switch-${Math.random().toString(36).slice(2, 9)}`)
</script>

<template>
  <SwitchRoot
    :id="switchId"
    data-slot="switch"
    :checked="modelValue"
    :default-checked="defaultChecked"
    :disabled="disabled"
    :class="cn(
      'peer relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 border-transparent shadow-xs transition-all outline-none cursor-pointer',
      'focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring',
      'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
      'disabled:cursor-not-allowed disabled:opacity-50',
      props.class,
    )"
    @update:checked="$emit('update:modelValue', $event)"
  >
    <!-- 开关文本 -->
    <span
      v-if="modelValue"
      class="absolute left-1.5 text-[10px] text-primary-foreground font-medium select-none"
    >
      <slot name="checkedText">{{ checkedText }}</slot>
    </span>
    <span
      v-else
      class="absolute right-1.5 text-[10px] text-muted-foreground font-medium select-none"
    >
      <slot name="uncheckedText">{{ uncheckedText }}</slot>
    </span>

    <SwitchThumb
      data-slot="switch-thumb"
      :class="cn(
        'pointer-events-none block size-5 rounded-full bg-background shadow-lg ring-0 transition-transform',
        'data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
      )"
    />
  </SwitchRoot>
</template>
