<script setup lang="ts">
/**
 * RadioGroup 单选框组组件
 * 
 * shadcn 风格的简洁单选框组组件
 * 增强功能通过组合组件提供
 */
import type { RadioGroupRootEmits, RadioGroupRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { RadioGroupRoot, useForwardPropsEmits } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<RadioGroupRootProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<RadioGroupRootEmits>()

const delegatedProps = reactiveOmit(props, "class")
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <RadioGroupRoot
    data-slot="radio-group"
    :class="cn('grid gap-2', props.class)"
    v-bind="forwarded"
  >
    <slot />
  </RadioGroupRoot>
</template>
