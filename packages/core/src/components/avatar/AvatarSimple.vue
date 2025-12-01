<script setup lang="ts">
/**
 * AvatarSimple 简单头像组合组件
 * 
 * 预组合的简单头像，传入 src 和 fallback 即可使用
 * 超越 shadcn-vue（需要手动组合 Avatar + AvatarImage + AvatarFallback）
 */
import type { HTMLAttributes } from "vue"
import { ref } from "vue"
import { AvatarRoot, AvatarImage, AvatarFallback } from "reka-ui"
import { User } from "lucide-vue-next"
import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<{
  src?: string
  alt?: string
  fallback?: string
  size?: "xs" | "sm" | "default" | "lg" | "xl"
  shape?: "circle" | "square"
  class?: HTMLAttributes["class"]
}>(), {
  size: "default",
  shape: "circle",
})

const emits = defineEmits<{
  error: [event: Event]
}>()

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

function handleError(e: Event) {
  hasError.value = true
  emits("error", e)
}
</script>

<template>
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
      @error="handleError"
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
</template>
