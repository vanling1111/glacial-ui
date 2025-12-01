<script setup lang="ts">
/**
 * ============================================================================
 * TooltipProvider - 原子化增强版提示提供者组件
 * ============================================================================
 * 
 * 所有增强功能都在原子化组件上实现
 * 
 * ## 增强功能
 * 
 * | 功能 | 支持 |
 * |-----|------|
 * | 显示延迟 (delayDuration) | ✅ |
 * | 隐藏延迟 (skipDelayDuration) | ✅ |
 * | 禁用悬停保持 (disableHoverableContent) | ✅ |
 * 
 * @example
 * ```vue
 * <TooltipProvider :delay-duration="500" :skip-delay-duration="300">
 *   <Tooltip>
 *     <TooltipTrigger>悬停</TooltipTrigger>
 *     <TooltipContent>延迟500ms显示</TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 * ```
 */
import type { TooltipProviderProps } from "reka-ui"
import { TooltipProvider } from "reka-ui"

const props = withDefaults(defineProps<TooltipProviderProps>(), {
  /**
   * 显示延迟（毫秒）
   * @default 0
   */
  delayDuration: 0,
  /**
   * 快速切换时跳过延迟的时间（毫秒）
   * @default 300
   */
  skipDelayDuration: 300,
  /**
   * 是否禁用悬停在内容上时保持显示
   * @default false
   */
  disableHoverableContent: false,
})
</script>

<template>
  <TooltipProvider v-bind="props">
    <slot />
  </TooltipProvider>
</template>
