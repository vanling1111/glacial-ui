<script setup lang="ts">
/**
 * ProgressWithStatus 带状态进度条组合组件
 * 
 * 预组合的带状态进度条，支持 success/warning/error 状态
 * 超越 shadcn-vue, PrimeVue（它们不支持 status）
 */
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { CheckCircle2, AlertCircle, XCircle } from "lucide-vue-next"
import { ProgressIndicator, ProgressRoot } from "reka-ui"
import { cn } from "@/lib/utils"

export type ProgressStatus = "default" | "success" | "warning" | "error"

const props = withDefaults(defineProps<{
  modelValue?: number
  max?: number
  status?: ProgressStatus
  showIcon?: boolean
  class?: HTMLAttributes["class"]
}>(), {
  modelValue: 0,
  max: 100,
  status: "default",
  showIcon: true,
})

const percentage = computed(() => {
  return Math.min(100, Math.max(0, (props.modelValue / props.max) * 100))
})

// 自动判断状态
const computedStatus = computed(() => {
  if (props.status !== "default") return props.status
  if (percentage.value >= 100) return "success"
  return "default"
})

const statusColors = {
  default: "bg-primary",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  error: "bg-destructive",
}

const trackColors = {
  default: "bg-primary/20",
  success: "bg-emerald-500/20",
  warning: "bg-amber-500/20",
  error: "bg-destructive/20",
}

const iconColors = {
  success: "text-emerald-500",
  warning: "text-amber-500",
  error: "text-destructive",
}
</script>

<template>
  <div :class="cn('flex items-center gap-3 w-full', props.class)">
    <ProgressRoot
      :model-value="percentage"
      data-slot="progress"
      :class="cn(
        'relative h-2 flex-1 overflow-hidden rounded-full',
        trackColors[computedStatus],
      )"
    >
      <ProgressIndicator
        data-slot="progress-indicator"
        :class="cn(
          'h-full w-full flex-1 transition-all duration-300',
          statusColors[computedStatus],
        )"
        :style="`transform: translateX(-${100 - percentage}%);`"
      />
    </ProgressRoot>

    <!-- 状态图标 -->
    <template v-if="showIcon && computedStatus !== 'default'">
      <CheckCircle2
        v-if="computedStatus === 'success'"
        :class="cn('size-4 shrink-0', iconColors.success)"
      />
      <AlertCircle
        v-else-if="computedStatus === 'warning'"
        :class="cn('size-4 shrink-0', iconColors.warning)"
      />
      <XCircle
        v-else-if="computedStatus === 'error'"
        :class="cn('size-4 shrink-0', iconColors.error)"
      />
    </template>
    <span v-else class="text-sm text-muted-foreground min-w-[3rem] text-right">
      {{ Math.round(percentage) }}%
    </span>
  </div>
</template>
