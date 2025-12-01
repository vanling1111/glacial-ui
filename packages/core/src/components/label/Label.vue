<script setup lang="ts">
/**
 * ============================================================================
 * Label - 原子化增强版标签组件
 * ============================================================================
 * 
 * ## 增强功能（超越 4 个库）
 * 
 * | 功能 | shadcn | Ant | Arco | TDesign | PrimeVue | glacial-ui |
 * |-----|--------|-----|------|---------|----------|------------|
 * | 基础标签 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * | 必填标记 | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * | 可选标记 | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
 * | 提示信息 | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * | 尺寸控制 | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
 * 
 * @example
 * ```vue
 * <Label for="email">邮箱</Label>
 * <Label for="name" required>姓名</Label>
 * <Label for="phone" optional>电话</Label>
 * <Label for="desc" tooltip="这是一个提示">描述</Label>
 * ```
 */
import type { LabelProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { Label } from "reka-ui"
import { CircleHelp } from "lucide-vue-next"
import { cn } from "@/lib/utils"
import { labelVariants } from "./index"

interface ExtendedProps extends LabelProps {
  class?: HTMLAttributes["class"]
  /**
   * 尺寸
   * @default "default"
   */
  size?: "sm" | "default" | "lg"
  /**
   * 是否必填（显示红色星号）
   * @default false
   */
  required?: boolean
  /**
   * 是否可选（显示"可选"文字）
   * @default false
   */
  optional?: boolean
  /**
   * 提示信息
   */
  tooltip?: string
}

const props = withDefaults(defineProps<ExtendedProps>(), {
  size: "default",
  required: false,
  optional: false,
})

const delegatedProps = reactiveOmit(props, "class", "size", "required", "optional", "tooltip")
</script>

<template>
  <Label
    data-slot="label"
    v-bind="delegatedProps"
    :class="cn(
      labelVariants({ size }),
      props.class,
    )"
  >
    <slot />
    
    <!-- 必填标记 -->
    <span v-if="required" class="text-destructive ml-0.5">*</span>
    
    <!-- 可选标记 -->
    <span v-if="optional" class="text-muted-foreground text-xs font-normal ml-1">(可选)</span>
    
    <!-- 提示图标 -->
    <span
      v-if="tooltip"
      :title="tooltip"
      class="text-muted-foreground hover:text-foreground cursor-help ml-1"
    >
      <CircleHelp class="size-3.5" />
    </span>
  </Label>
</template>
