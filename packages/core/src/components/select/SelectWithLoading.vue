<script setup lang="ts">
/**
 * SelectWithLoading 带加载状态选择器组合组件
 * 
 * 预组合的带加载状态选择器
 * 内部使用 Select 原子组件 + loading 状态
 */
import type { HTMLAttributes } from "vue"
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

const props = withDefaults(defineProps<{
  modelValue?: string | number
  options?: (SelectOption | SelectOptionGroup)[]
  placeholder?: string
  disabled?: boolean
  loading?: boolean
  loadingText?: string
  emptyText?: string
  size?: "sm" | "default"
  class?: HTMLAttributes["class"]
}>(), {
  options: () => [],
  size: "default",
  loading: false,
  loadingText: "加载中...",
  emptyText: "暂无数据",
})

const emits = defineEmits<{
  "update:modelValue": [value: string | number | bigint | boolean | Record<string, any> | null]
}>()

function isGroup(option: SelectOption | SelectOptionGroup): option is SelectOptionGroup {
  return "options" in option
}
</script>

<template>
  <Select
    :model-value="modelValue?.toString()"
    :disabled="disabled || loading"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <SelectTrigger :size="size" :class="cn(props.class)">
      <!-- Loading spinner -->
      <svg
        v-if="loading"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        class="size-4 animate-spin text-muted-foreground mr-2"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      <SelectValue :placeholder="loading ? loadingText : placeholder" />
    </SelectTrigger>
    <SelectContent>
      <!-- 加载中 -->
      <div v-if="loading" class="py-6 text-center text-sm text-muted-foreground">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          class="size-5 animate-spin mx-auto mb-2"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        {{ loadingText }}
      </div>
      <!-- 空状态 -->
      <div v-else-if="options.length === 0" class="py-6 text-center text-sm text-muted-foreground">
        {{ emptyText }}
      </div>
      <!-- 选项列表 -->
      <template v-else v-for="(option, index) in options" :key="index">
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
</template>
