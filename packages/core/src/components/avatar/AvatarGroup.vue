<script setup lang="ts">
/**
 * AvatarGroup 头像组组合组件
 * 
 * 预组合的头像组，支持堆叠展示和最大数量限制
 * 超越 shadcn-vue（它不支持 AvatarGroup）
 */
import type { HTMLAttributes } from "vue"
import { computed, provide } from "vue"
import { cn } from "@/lib/utils"

export interface AvatarGroupItem {
  src?: string
  alt?: string
  fallback?: string
}

const props = withDefaults(defineProps<{
  items?: AvatarGroupItem[]
  max?: number
  size?: "xs" | "sm" | "default" | "lg" | "xl"
  shape?: "circle" | "square"
  class?: HTMLAttributes["class"]
}>(), {
  items: () => [],
  size: "default",
  shape: "circle",
})

provide("avatarGroup", {
  size: props.size,
  shape: props.shape,
})

const visibleItems = computed(() => {
  if (!props.max || props.items.length <= props.max) {
    return props.items
  }
  return props.items.slice(0, props.max)
})

const remainingCount = computed(() => {
  if (!props.max || props.items.length <= props.max) {
    return 0
  }
  return props.items.length - props.max
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

const spacingClasses = {
  xs: "-space-x-2",
  sm: "-space-x-2.5",
  default: "-space-x-3",
  lg: "-space-x-4",
  xl: "-space-x-5",
}
</script>

<template>
  <div :class="cn('flex items-center', spacingClasses[size], props.class)">
    <!-- 通过 items 渲染 -->
    <template v-if="items.length">
      <div
        v-for="(item, index) in visibleItems"
        :key="index"
        :class="cn(
          'relative flex shrink-0 overflow-hidden ring-2 ring-background',
          sizeClasses[size],
          shapeClasses[shape],
        )"
      >
        <img
          v-if="item.src"
          :src="item.src"
          :alt="item.alt"
          class="aspect-square size-full object-cover"
        />
        <div
          v-else
          :class="cn(
            'bg-muted flex size-full items-center justify-center font-medium',
            shapeClasses[shape],
          )"
        >
          {{ item.fallback }}
        </div>
      </div>
      <!-- 剩余数量 -->
      <div
        v-if="remainingCount > 0"
        :class="cn(
          'relative flex shrink-0 overflow-hidden ring-2 ring-background bg-muted items-center justify-center font-medium',
          sizeClasses[size],
          shapeClasses[shape],
        )"
      >
        +{{ remainingCount }}
      </div>
    </template>

    <!-- 通过插槽渲染 -->
    <slot v-else />
  </div>
</template>
