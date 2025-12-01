<script setup lang="ts">
/**
 * Avatar 头像组件
 * 
 * shadcn 风格的简洁头像组件
 * 增强功能通过组合组件提供
 */
import type { HTMLAttributes } from "vue"
import { AvatarRoot } from "reka-ui"
import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<{
  size?: "xs" | "sm" | "default" | "lg" | "xl"
  shape?: "circle" | "square"
  class?: HTMLAttributes["class"]
}>(), {
  size: "default",
  shape: "circle",
})

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
    <slot />
  </AvatarRoot>
</template>
