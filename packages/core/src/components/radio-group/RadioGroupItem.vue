<script setup lang="ts">
/**
 * RadioGroupItem 单选框选项组件
 * 
 * shadcn 风格的简洁单选框选项
 */
import type { RadioGroupItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { CircleIcon } from "lucide-vue-next"
import { RadioGroupIndicator, RadioGroupItem, useForwardProps } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<RadioGroupItemProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <RadioGroupItem
    v-bind="forwardedProps"
    data-slot="radio-group-item"
    :class="cn(
      'aspect-square size-4 shrink-0 rounded-full border border-input shadow-xs transition-shadow outline-none',
      'focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring',
      'data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
      props.class,
    )"
  >
    <RadioGroupIndicator class="flex items-center justify-center">
      <CircleIcon class="size-2 fill-current" />
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>
