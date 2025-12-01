<script setup lang="ts">
/**
 * BadgeCount 数字徽章组合组件
 * 
 * 预组合的数字徽章，支持 count、maxCount、showZero
 * 超越 shadcn-vue（它不支持 count）
 */
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<{
  count?: number
  maxCount?: number
  showZero?: boolean
  dot?: boolean
  offset?: [number, number]
  class?: HTMLAttributes["class"]
}>(), {
  count: 0,
  maxCount: 99,
  showZero: false,
  dot: false,
})

const displayCount = computed(() => {
  if (props.dot) return ""
  if (props.count > props.maxCount) return `${props.maxCount}+`
  return String(props.count)
})

const isHidden = computed(() => {
  return props.count === 0 && !props.showZero && !props.dot
})

const offsetStyle = computed(() => {
  if (!props.offset) return {}
  return {
    transform: `translate(${props.offset[0]}px, ${props.offset[1]}px)`,
  }
})
</script>

<template>
  <span class="relative inline-flex">
    <slot />
    <span
      v-if="!isHidden"
      data-slot="badge"
      :class="cn(
        'absolute -top-1 -right-1 flex items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs font-medium',
        dot ? 'size-2' : 'min-w-[1.25rem] h-5 px-1.5',
        props.class,
      )"
      :style="offsetStyle"
    >
      {{ displayCount }}
    </span>
  </span>
</template>
