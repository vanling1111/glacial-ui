<script setup lang="ts">
/**
 * InputSearch 搜索输入框组合组件
 * 
 * 预组合的搜索输入框，内置搜索图标和清除按钮
 * 内部使用 InputGroup + InputGroupAddon + InputGroupButton
 */
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@/lib/utils"
import InputGroup from "./InputGroup.vue"
import InputGroupAddon from "./InputGroupAddon.vue"
import InputGroupInput from "./InputGroupInput.vue"
import InputGroupButton from "./InputGroupButton.vue"

const props = withDefaults(defineProps<{
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  loading?: boolean
  /** 是否显示清除按钮 */
  clearable?: boolean
  class?: HTMLAttributes["class"]
}>(), {
  clearable: true,
})

const emits = defineEmits<{
  "update:modelValue": [value: string]
  "search": [value: string]
  "clear": []
}>()

const showClear = computed(() => props.clearable && props.modelValue)

function handleSearch() {
  if (props.disabled || props.loading) return
  emits("search", props.modelValue ?? "")
}

function handleClear() {
  emits("update:modelValue", "")
  emits("clear")
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === "Enter") {
    handleSearch()
  }
}
</script>

<template>
  <InputGroup :class="cn(props.class)">
    <InputGroupAddon>
      <!-- Search icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="size-4"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    </InputGroupAddon>
    <InputGroupInput
      :model-value="modelValue"
      :placeholder="placeholder ?? '搜索...'"
      :disabled="disabled"
      @update:model-value="$emit('update:modelValue', $event as string)"
      @keydown="handleKeydown"
    />
    <InputGroupAddon v-if="showClear || loading" align="inline-end">
      <!-- Loading spinner -->
      <svg
        v-if="loading"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        class="size-4 animate-spin text-muted-foreground"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      <!-- Clear button -->
      <InputGroupButton
        v-else-if="showClear"
        size="icon-xs"
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
      </InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
</template>
