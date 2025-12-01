<script setup lang="ts">
/**
 * BadgeStatus 状态徽章组合组件
 * 
 * 预组合的状态徽章，支持 status 状态点
 * 超越 shadcn-vue, TDesign, PrimeVue（它们不支持 status）
 */
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

export type BadgeStatusType = "default" | "success" | "processing" | "warning" | "error"

const props = withDefaults(defineProps<{
  status?: BadgeStatusType
  text?: string
  color?: string
  class?: HTMLAttributes["class"]
}>(), {
  status: "default",
})

const statusColors = {
  default: "bg-muted-foreground",
  success: "bg-emerald-500",
  processing: "bg-blue-500 animate-pulse",
  warning: "bg-amber-500",
  error: "bg-destructive",
}
</script>

<template>
  <span :class="cn('inline-flex items-center gap-1.5', props.class)">
    <span
      data-slot="badge-dot"
      :class="cn(
        'size-1.5 rounded-full shrink-0',
        statusColors[status],
      )"
      :style="color ? { backgroundColor: color } : undefined"
    />
    <span v-if="text || $slots.default" class="text-sm">
      <slot>{{ text }}</slot>
    </span>
  </span>
</template>
