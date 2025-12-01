<script setup lang="ts">
/**
 * InputPassword 密码输入框组合组件
 * 
 * 预组合的密码输入框，内置显示/隐藏切换
 * 内部使用 InputGroup + InputGroupAddon + InputGroupButton
 */
import type { HTMLAttributes } from "vue"
import { ref, computed } from "vue"
import { cn } from "@/lib/utils"
import InputGroup from "./InputGroup.vue"
import InputGroupAddon from "./InputGroupAddon.vue"
import InputGroupInput from "./InputGroupInput.vue"
import InputGroupButton from "./InputGroupButton.vue"

const props = defineProps<{
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  class?: HTMLAttributes["class"]
}>()

const emits = defineEmits<{
  "update:modelValue": [value: string]
}>()

const isVisible = ref(false)
const inputType = computed(() => isVisible.value ? "text" : "password")
</script>

<template>
  <InputGroup :class="cn(props.class)">
    <InputGroupInput
      :type="inputType"
      :model-value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @update:model-value="$emit('update:modelValue', $event as string)"
    />
    <InputGroupAddon align="inline-end">
      <InputGroupButton
        size="icon-xs"
        :disabled="disabled"
        @click="isVisible = !isVisible"
      >
        <!-- Eye icon -->
        <svg
          v-if="isVisible"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-4"
        >
          <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <!-- Eye-off icon -->
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-4"
        >
          <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
          <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
          <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
          <path d="m2 2 20 20" />
        </svg>
      </InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
</template>
