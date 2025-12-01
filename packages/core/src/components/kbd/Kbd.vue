<script setup lang="ts">
/**
 * ============================================================================
 * Kbd - 原子化增强版键盘按键组件
 * ============================================================================
 * 
 * ## 增强功能（超越 4 个库）
 * 
 * | 功能 | shadcn | Ant | Arco | TDesign | PrimeVue | glacial-ui |
 * |-----|--------|-----|------|---------|----------|------------|
 * | 基础按键 | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ |
 * | 尺寸控制 | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
 * | 变体样式 | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
 * | 快捷键解析 | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
 * 
 * @example
 * ```vue
 * <Kbd>⌘</Kbd>
 * <Kbd size="lg">Enter</Kbd>
 * <Kbd variant="outline">Ctrl</Kbd>
 * <Kbd keys="cmd+k" />
 * ```
 */
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@/lib/utils"
import { kbdVariants } from "./index"

interface Props {
  class?: HTMLAttributes["class"]
  /**
   * 尺寸
   * @default "default"
   */
  size?: "sm" | "default" | "lg"
  /**
   * 变体
   * @default "default"
   */
  variant?: "default" | "outline" | "ghost"
  /**
   * 快捷键字符串（自动解析为符号）
   * 支持: cmd, ctrl, alt, shift, enter, tab, esc, space, up, down, left, right
   */
  keys?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: "default",
  variant: "default",
})

// 快捷键映射
const keyMap: Record<string, string> = {
  cmd: "⌘",
  command: "⌘",
  ctrl: "⌃",
  control: "⌃",
  alt: "⌥",
  option: "⌥",
  shift: "⇧",
  enter: "↵",
  return: "↵",
  tab: "⇥",
  esc: "⎋",
  escape: "⎋",
  space: "␣",
  up: "↑",
  down: "↓",
  left: "←",
  right: "→",
  backspace: "⌫",
  delete: "⌦",
}

// 解析快捷键
const parsedKeys = computed(() => {
  if (!props.keys) return null
  return props.keys
    .toLowerCase()
    .split("+")
    .map(key => keyMap[key.trim()] || key.trim().toUpperCase())
})
</script>

<template>
  <!-- 解析快捷键模式 -->
  <template v-if="parsedKeys">
    <span class="inline-flex items-center gap-0.5">
      <kbd
        v-for="(key, index) in parsedKeys"
        :key="index"
        :class="cn(
          kbdVariants({ size, variant }),
          '[&_svg:not([class*=\'size-\'])]:size-3',
          '[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10',
          props.class,
        )"
      >
        {{ key }}
      </kbd>
    </span>
  </template>

  <!-- 普通模式 -->
  <kbd
    v-else
    :class="cn(
      kbdVariants({ size, variant }),
      '[&_svg:not([class*=\'size-\'])]:size-3',
      '[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10',
      props.class,
    )"
  >
    <slot />
  </kbd>
</template>
