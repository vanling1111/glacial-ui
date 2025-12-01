<script setup lang="ts">
/**
 * AvatarWithStatus 带状态头像组合组件
 * 
 * 预组合的带在线状态头像
 * 超越 shadcn-vue, Ant Design Vue, TDesign, PrimeVue（它们不支持状态指示器）
 */
import type { HTMLAttributes } from "vue"
import { ref } from "vue"
import { AvatarRoot, AvatarImage, AvatarFallback } from "reka-ui"
import { User } from "lucide-vue-next"
import { cn } from "@/lib/utils"

export type AvatarStatusType = "online" | "offline" | "busy" | "away"

const props = withDefaults(defineProps<{
  src?: string
  alt?: string
  fallback?: string
  status?: AvatarStatusType
  size?: "xs" | "sm" | "default" | "lg" | "xl"
  shape?: "circle" | "square"
  class?: HTMLAttributes["class"]
}>(), {
  size: "default",
  shape: "circle",
  status: "offline",
})

const hasError = ref(false)

const sizeClasses = {
  xs: "size-6 text-xs",
  sm: "size-8 text-sm",
  default: "size-10 text-base",
  lg: "size-12 text-lg",
  xl: "size-16 text-xl",
}

const shapeClasses = {
  circle: "rounded-full",
  square: "rounded-md",
}

const iconSizes = {
  xs: "size-3",
  sm: "size-4",
  default: "size-5",
  lg: "size-6",
  xl: "size-8",
}

const statusColors = {
  online: "bg-emerald-500",
  offline: "bg-muted-foreground",
  busy: "bg-destructive",
  away: "bg-amber-500",
}

const statusSizes = {
  xs: "size-1.5 ring-1",
  sm: "size-2 ring-1",
  default: "size-2.5 ring-2",
  lg: "size-3 ring-2",
  xl: "size-4 ring-2",
}
</script>

<template>
  <div class="relative inline-block">
    <AvatarRoot
      data-slot="avatar"
      :class="cn(
        'relative flex shrink-0 overflow-hidden',
        sizeClasses[size],
        shapeClasses[shape],
        props.class,
      )"
    >
      <AvatarImage
        v-if="src && !hasError"
        :src="src"
        :alt="alt"
        class="aspect-square size-full object-cover"
        @error="hasError = true"
      />
      <AvatarFallback
        :class="cn(
          'bg-muted flex size-full items-center justify-center font-medium',
          shapeClasses[shape],
        )"
      >
        <slot name="fallback">
          <span v-if="fallback">{{ fallback }}</span>
          <User v-else :class="cn('text-muted-foreground', iconSizes[size])" />
        </slot>
      </AvatarFallback>
    </AvatarRoot>
    
    <!-- 状态指示器 -->
    <span
      :class="cn(
        'absolute bottom-0 right-0 rounded-full ring-background',
        statusColors[status],
        statusSizes[size],
      )"
    />
  </div>
</template>
