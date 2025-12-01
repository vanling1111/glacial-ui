<script setup lang="ts">
/**
 * ============================================================================
 * Card - 原子化增强版卡片组件
 * ============================================================================
 * 
 * ## 增强功能（超越 4 个库）
 * 
 * | 功能 | shadcn | Ant | Arco | TDesign | PrimeVue | glacial-ui |
 * |-----|--------|-----|------|---------|----------|------------|
 * | 基础卡片 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * | 尺寸控制 | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * | 悬停效果 | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * | 可点击 | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * | 边框控制 | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * | 阴影控制 | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * 
 * @example
 * ```vue
 * <Card hoverable clickable>
 *   <CardHeader>
 *     <CardTitle>标题</CardTitle>
 *     <CardDescription>描述</CardDescription>
 *   </CardHeader>
 *   <CardContent>内容</CardContent>
 *   <CardFooter>底部</CardFooter>
 * </Card>
 * ```
 */
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { cardVariants } from "./index"

interface Props {
  class?: HTMLAttributes["class"]
  /**
   * 尺寸
   * @default "default"
   */
  size?: "sm" | "default" | "lg"
  /**
   * 是否显示悬停效果
   * @default false
   */
  hoverable?: boolean
  /**
   * 是否可点击（显示指针）
   * @default false
   */
  clickable?: boolean
  /**
   * 是否显示边框
   * @default true
   */
  bordered?: boolean
  /**
   * 阴影大小
   * @default "sm"
   */
  shadow?: "none" | "sm" | "default" | "lg"
}

const props = withDefaults(defineProps<Props>(), {
  size: "default",
  hoverable: false,
  clickable: false,
  bordered: true,
  shadow: "sm",
})

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void
}>()
</script>

<template>
  <div
    data-slot="card"
    :class="cn(
      cardVariants({ size, hoverable, clickable, bordered, shadow }),
      props.class,
    )"
    @click="clickable ? emit('click', $event) : undefined"
  >
    <slot />
  </div>
</template>
