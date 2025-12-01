<script setup lang="ts">
/**
 * SelectSimple 简单选择器组合组件
 * 
 * 预组合的选择器，传入 options 数组即可使用
 * 内部使用 Select + SelectTrigger + SelectContent + SelectItem
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

const props = withDefaults(defineProps<{
  modelValue?: string | number
  options?: (SelectOption | SelectOptionGroup)[]
  placeholder?: string
  disabled?: boolean
  size?: "sm" | "default"
  class?: HTMLAttributes["class"]
}>(), {
  options: () => [],
  size: "default",
})

const emits = defineEmits<{
  "update:modelValue": [value: string | number | bigint | boolean | Record<string, any> | null]
}>()

// 判断是否为分组选项
function isGroup(option: SelectOption | SelectOptionGroup): option is SelectOptionGroup {
  return "options" in option
}

// 扁平化选项用于查找 label
const flatOptions = computed(() => {
  const result: SelectOption[] = []
  for (const opt of props.options) {
    if (isGroup(opt)) {
      result.push(...opt.options)
    } else {
      result.push(opt)
    }
  }
  return result
})
</script>

<template>
  <Select
    :model-value="modelValue?.toString()"
    :disabled="disabled"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <SelectTrigger :size="size" :class="cn(props.class)">
      <SelectValue :placeholder="placeholder" />
    </SelectTrigger>
    <SelectContent>
      <template v-for="(option, index) in options" :key="index">
        <!-- 分组选项 -->
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
        <!-- 普通选项 -->
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
