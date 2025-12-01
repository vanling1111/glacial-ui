<script setup lang="ts">
/**
 * ProgressIndeterminate 不确定进度条组合组件
 * 
 * 预组合的不确定进度条，用于未知进度场景
 * 超越 shadcn-vue, Ant Design Vue, Arco, TDesign（它们不支持或支持有限）
 */
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
}>(), {})
</script>

<template>
  <div
    data-slot="progress"
    :class="cn(
      'bg-primary/20 relative h-2 w-full overflow-hidden rounded-full',
      props.class,
    )"
  >
    <div
      data-slot="progress-indicator"
      class="bg-primary h-full w-1/3 animate-indeterminate rounded-full"
    />
  </div>
</template>

<style scoped>
@keyframes indeterminate {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(400%);
  }
}

.animate-indeterminate {
  animation: indeterminate 1.5s ease-in-out infinite;
}
</style>
