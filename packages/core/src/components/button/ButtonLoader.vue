<script setup lang="ts">
/**
 * ButtonLoader 按钮加载器组件
 * 
 * 原子化子组件，提供多种加载动画样式
 * 超越竞品：支持 4 种动画变体，竞品通常只有 spinner
 */
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@/lib/utils"
import Spinner from "../spinner/Spinner.vue"

interface Props {
  /** 自定义类名 */
  class?: HTMLAttributes["class"]
  /** 
   * 加载动画变体
   * - spinner: 旋转圆环（默认）
   * - dots: 跳动圆点
   * - pulse: 脉冲圆点
   * - bars: 跳动条形
   */
  variant?: "spinner" | "dots" | "pulse" | "bars"
  /** 尺寸，继承按钮尺寸或自定义 */
  size?: "xs" | "sm" | "default" | "lg"
}

const props = withDefaults(defineProps<Props>(), {
  variant: "spinner",
  size: "default",
})

const sizeMap = {
  xs: "size-3",
  sm: "size-3.5",
  default: "size-4",
  lg: "size-5",
}

const dotSizeMap = {
  xs: "size-1",
  sm: "size-1",
  default: "size-1.5",
  lg: "size-2",
}

const iconSize = computed(() => sizeMap[props.size])
const dotSize = computed(() => dotSizeMap[props.size])
</script>

<template>
  <span 
    :class="cn('inline-flex items-center justify-center', props.class)" 
    data-slot="button-loader"
  >
    <!-- Spinner 变体 -->
    <Spinner v-if="variant === 'spinner'" :class="cn(iconSize, 'animate-spin')" />
    
    <!-- Dots 变体：三个跳动的圆点 -->
    <span v-else-if="variant === 'dots'" class="inline-flex items-center gap-0.5">
      <span 
        v-for="i in 3" 
        :key="i"
        :class="cn(dotSize, 'rounded-full bg-current animate-bounce')"
        :style="{ animationDelay: `${(i - 1) * 0.15}s` }"
      />
    </span>
    
    <!-- Pulse 变体：脉冲圆点 -->
    <span 
      v-else-if="variant === 'pulse'" 
      :class="cn(iconSize, 'rounded-full bg-current animate-pulse')"
    />
    
    <!-- Bars 变体：跳动的条形 -->
    <span v-else-if="variant === 'bars'" class="inline-flex items-end gap-0.5 h-4">
      <span 
        v-for="i in 3" 
        :key="i"
        :class="cn(
          'w-0.5 bg-current rounded-sm',
          i === 1 ? 'h-2 animate-[bounce_0.6s_ease-in-out_infinite]' : '',
          i === 2 ? 'h-4 animate-[bounce_0.6s_ease-in-out_0.1s_infinite]' : '',
          i === 3 ? 'h-3 animate-[bounce_0.6s_ease-in-out_0.2s_infinite]' : '',
        )"
      />
    </span>
  </span>
</template>
