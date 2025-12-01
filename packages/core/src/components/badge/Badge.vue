<script setup lang="ts">
/**
 * Badge 徽章组件
 * 
 * shadcn 风格的简洁徽章组件
 * 增强功能通过组合组件提供
 */
import type { HTMLAttributes } from "vue"
import type { BadgeVariants } from "."
import { cn } from "@/lib/utils"
import { badgeVariants } from "."

const props = defineProps<{
  variant?: BadgeVariants["variant"]
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <span
    data-slot="badge"
    :class="cn(badgeVariants({ variant }), props.class)"
  >
    <slot />
  </span>
</template>
