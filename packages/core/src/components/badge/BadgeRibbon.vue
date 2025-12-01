<script setup lang="ts">
/**
 * BadgeRibbon 缎带徽章组合组件
 * 
 * 预组合的缎带徽章，用于角标展示
 * 超越 shadcn-vue, Arco, TDesign, PrimeVue（它们不支持 ribbon）
 */
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<{
  text?: string
  color?: string
  placement?: "start" | "end"
  class?: HTMLAttributes["class"]
}>(), {
  placement: "end",
})
</script>

<template>
  <div class="relative">
    <slot />
    <div
      data-slot="badge-ribbon"
      :class="cn(
        'absolute top-2 px-2 py-0.5 text-xs font-medium text-white',
        placement === 'end' ? '-right-2 rounded-l-sm' : '-left-2 rounded-r-sm',
        !color && 'bg-primary',
        props.class,
      )"
      :style="color ? { backgroundColor: color } : undefined"
    >
      <slot name="text">{{ text }}</slot>
      <!-- 三角形尾巴 -->
      <span
        :class="cn(
          'absolute top-full size-0 border-4 border-transparent',
          placement === 'end' 
            ? 'right-0 border-t-primary/80 border-r-primary/80' 
            : 'left-0 border-t-primary/80 border-l-primary/80',
        )"
        :style="color ? { borderTopColor: `color-mix(in srgb, ${color} 80%, black)`, [placement === 'end' ? 'borderRightColor' : 'borderLeftColor']: `color-mix(in srgb, ${color} 80%, black)` } : undefined"
      />
    </div>
  </div>
</template>
