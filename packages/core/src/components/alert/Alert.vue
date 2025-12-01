<script setup lang="ts">
/**
 * Alert 警告提示组件
 * 
 * shadcn 风格的简洁警告提示组件
 * 增强功能通过组合组件提供
 */
import type { HTMLAttributes } from "vue"
import type { AlertVariants } from "."
import { cn } from "@/lib/utils"
import { alertVariants } from "."

const props = defineProps<{
  variant?: AlertVariants["variant"]
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="alert"
    :class="cn(alertVariants({ variant }), props.class)"
    role="alert"
  >
    <slot />
  </div>
</template>
