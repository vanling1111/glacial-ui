<script setup lang="ts">
/**
 * AlertSimple 简单警告提示组合组件
 * 
 * 预组合的简单警告提示，传入 title 和 description 即可使用
 * 超越 shadcn-vue（需要手动组合 Alert + AlertTitle + AlertDescription）
 */
import type { HTMLAttributes } from "vue"
import { AlertCircle, CheckCircle2, Info, AlertTriangle, XCircle } from "lucide-vue-next"
import { cn } from "@/lib/utils"

export type AlertType = "default" | "info" | "success" | "warning" | "error"

const props = withDefaults(defineProps<{
  type?: AlertType
  title?: string
  description?: string
  showIcon?: boolean
  class?: HTMLAttributes["class"]
}>(), {
  type: "default",
  showIcon: true,
})

const typeConfig = {
  default: {
    icon: Info,
    classes: "bg-card text-card-foreground border-border",
    iconClass: "text-muted-foreground",
  },
  info: {
    icon: Info,
    classes: "bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-800",
    iconClass: "text-blue-500",
  },
  success: {
    icon: CheckCircle2,
    classes: "bg-emerald-50 text-emerald-900 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-100 dark:border-emerald-800",
    iconClass: "text-emerald-500",
  },
  warning: {
    icon: AlertTriangle,
    classes: "bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950 dark:text-amber-100 dark:border-amber-800",
    iconClass: "text-amber-500",
  },
  error: {
    icon: XCircle,
    classes: "bg-red-50 text-red-900 border-red-200 dark:bg-red-950 dark:text-red-100 dark:border-red-800",
    iconClass: "text-destructive",
  },
}

const config = typeConfig[props.type]
</script>

<template>
  <div
    data-slot="alert"
    :class="cn(
      'relative w-full rounded-lg border px-4 py-3 text-sm',
      showIcon && 'grid grid-cols-[auto_1fr] gap-x-3',
      config.classes,
      props.class,
    )"
    role="alert"
  >
    <component
      v-if="showIcon"
      :is="config.icon"
      :class="cn('size-4 mt-0.5', config.iconClass)"
    />
    <div>
      <h5 v-if="title || $slots.title" class="mb-1 font-medium leading-none tracking-tight">
        <slot name="title">{{ title }}</slot>
      </h5>
      <div v-if="description || $slots.default" class="text-sm opacity-90">
        <slot>{{ description }}</slot>
      </div>
    </div>
  </div>
</template>
