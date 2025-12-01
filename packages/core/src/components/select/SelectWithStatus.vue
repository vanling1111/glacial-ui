<script setup lang="ts">
/**
 * SelectWithStatus 带状态选择器组合组件
 * 
 * 预组合的带状态选择器，支持 success/warning/error 状态
 * 内部使用 Select 原子组件 + 状态样式
 */
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@/lib/utils"
import Select from "./Select.vue"
import SelectTrigger from "./SelectTrigger.vue"
import SelectValue from "./SelectValue.vue"
import SelectContent from "./SelectContent.vue"
import SelectItem from "./SelectItem.vue"
import SelectGroup from "./SelectGroup.vue"
import SelectLabel from "./SelectLabel.vue"
import SelectSeparator from "./SelectSeparator.vue"

export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

export interface SelectOptionGroup {
  label: string
  options: SelectOption[]
}

export type SelectStatus = "default" | "success" | "warning" | "error"

const props = withDefaults(defineProps<{
  modelValue?: string | number
  options?: (SelectOption | SelectOptionGroup)[]
  placeholder?: string
  disabled?: boolean
  status?: SelectStatus
  tips?: string
  size?: "sm" | "default"
  class?: HTMLAttributes["class"]
}>(), {
  options: () => [],
  size: "default",
  status: "default",
})

const emits = defineEmits<{
  "update:modelValue": [value: string | number | bigint | boolean | Record<string, any> | null]
}>()

function isGroup(option: SelectOption | SelectOptionGroup): option is SelectOptionGroup {
  return "options" in option
}

const triggerClass = computed(() => {
  const statusClasses = {
    default: "",
    success: "border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/20",
    warning: "border-amber-500 focus:border-amber-500 focus:ring-amber-500/20",
    error: "border-destructive focus:border-destructive focus:ring-destructive/20",
  }
  return statusClasses[props.status]
})

const tipsClass = computed(() => {
  const statusClasses = {
    default: "text-muted-foreground",
    success: "text-emerald-500",
    warning: "text-amber-500",
    error: "text-destructive",
  }
  return statusClasses[props.status]
})
</script>

<template>
  <div :class="cn('space-y-1.5', props.class)">
    <Select
      :model-value="modelValue?.toString()"
      :disabled="disabled"
      @update:model-value="$emit('update:modelValue', $event)"
    >
      <SelectTrigger
        :size="size"
        :class="triggerClass"
        :aria-invalid="status === 'error' || undefined"
      >
        <SelectValue :placeholder="placeholder" />
      </SelectTrigger>
      <SelectContent>
        <template v-for="(option, index) in options" :key="index">
          <template v-if="isGroup(option)">
            <SelectSeparator v-if="index > 0" />
            <SelectGroup>
              <SelectLabel>{{ option.label }}</SelectLabel>
              <SelectItem
                v-for="item in option.options"
                :key="item.value"
                :value="item.value.toString()"
                :disabled="item.disabled"
              >
                {{ item.label }}
              </SelectItem>
            </SelectGroup>
          </template>
          <SelectItem
            v-else
            :value="option.value.toString()"
            :disabled="option.disabled"
          >
            {{ option.label }}
          </SelectItem>
        </template>
      </SelectContent>
    </Select>
    <!-- 提示文本 -->
    <p v-if="tips" :class="cn('text-xs', tipsClass)">
      {{ tips }}
    </p>
  </div>
</template>
