<script setup lang="ts">
/**
 * InputClearable 可清除输入框组合组件
 * 
 * 预组合的可清除输入框，内置清除按钮
 * 内部使用 InputGroup + InputGroupAddon + InputGroupButton
 */
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@/lib/utils"
import InputGroup from "./InputGroup.vue"
import InputGroupAddon from "./InputGroupAddon.vue"
import InputGroupInput from "./InputGroupInput.vue"
import InputGroupButton from "./InputGroupButton.vue"

const props = defineProps<{
  modelValue?: string | number
  placeholder?: string
  disabled?: boolean
  type?: string
  class?: HTMLAttributes["class"]
}>()

const emits = defineEmits<{
  "update:modelValue": [value: string | number]
  "clear": []
}>()

const showClear = computed(() => props.modelValue !== undefined && props.modelValue !== "")

function handleClear() {
  emits("update:modelValue", "")
  emits("clear")
}
</script>

<template>
  <InputGroup :class="cn(props.class)">
    <InputGroupInput
      :type="type"
      :model-value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @update:model-value="$emit('update:modelValue', $event)"
    />
    <InputGroupAddon v-if="showClear" align="inline-end">
      <InputGroupButton
        size="icon-xs"
        :disabled="disabled"
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
