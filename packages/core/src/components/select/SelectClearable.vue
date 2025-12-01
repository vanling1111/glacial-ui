<script setup lang="ts">
/**
 * SelectClearable 可清除选择器组合组件
 * 
 * 预组合的可清除选择器，带清除按钮
 * 内部使用 Select 原子组件 + 清除按钮
 */
import type { HTMLAttributes } from "vue"
import { ref, computed, watch } from "vue"
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
  "update:modelValue": [value: string | number | bigint | boolean | Record<string, any> | null | undefined]
  "clear": []
}>()

const showClear = computed(() => props.modelValue !== undefined && props.modelValue !== "")

function handleClear(e: MouseEvent) {
  e.stopPropagation()
  emits("update:modelValue", undefined)
  emits("clear")
}

function isGroup(option: SelectOption | SelectOptionGroup): option is SelectOptionGroup {
  return "options" in option
}
</script>

<template>
  <div :class="cn('relative inline-block', props.class)">
    <Select
      :model-value="modelValue?.toString()"
      :disabled="disabled"
      @update:model-value="$emit('update:modelValue', $event)"
    >
      <SelectTrigger :size="size" :class="showClear ? 'pr-8' : ''">
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
    <!-- 清除按钮 -->
    <button
      v-if="showClear && !disabled"
      type="button"
      class="absolute right-7 top-1/2 -translate-y-1/2 size-4 rounded-full inline-flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      @click="handleClear"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="size-3"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </button>
  </div>
</template>
