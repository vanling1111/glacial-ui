<script setup lang="ts">
/**
 * Switch 开关组件
 * 
 * shadcn 风格的简洁开关组件
 * 增强功能通过组合组件提供
 */
import type { SwitchRootEmits, SwitchRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { SwitchRoot, SwitchThumb, useForwardPropsEmits } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<SwitchRootProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<SwitchRootEmits>()

const delegatedProps = reactiveOmit(props, "class")
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <SwitchRoot
    v-bind="forwarded"
    data-slot="switch"
    :class="cn(
      'peer inline-flex h-5 w-9 shrink-0 items-center rounded-full border-2 border-transparent shadow-xs transition-all outline-none cursor-pointer',
      'focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring',
      'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
      'disabled:cursor-not-allowed disabled:opacity-50',
      props.class,
    )"
  >
    <SwitchThumb
      data-slot="switch-thumb"
      :class="cn(
        'pointer-events-none block size-4 rounded-full bg-background shadow-lg ring-0 transition-transform',
        'data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
      )"
    >
      <slot name="thumb" />
    </SwitchThumb>
  </SwitchRoot>
</template>
