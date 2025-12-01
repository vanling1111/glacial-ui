<script lang="ts" setup>
/**
 * ============================================================================
 * Stepper - 原子化增强版步骤条根组件
 * ============================================================================
 * 
 * ## 增强功能（超越 4 个库）
 * 
 * | 功能 | shadcn | Ant | Arco | TDesign | PrimeVue | glacial-ui |
 * |-----|--------|-----|------|---------|----------|------------|
 * | 水平/垂直方向 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * | 尺寸控制 | ❌ | ✅ | ✅ | ❌ | ❌ | ✅ |
 * | 点状样式 | ❌ | ✅ | ✅ | ❌ | ❌ | ✅ |
 * | 导航样式 | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ |
 * | 可点击切换 | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * | 进度百分比 | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ |
 * | 标签位置 | ❌ | ✅ | ✅ | ❌ | ❌ | ✅ |
 * 
 * @example
 * ```vue
 * <Stepper v-model="step" orientation="horizontal" size="default" variant="default">
 *   <StepperItem :step="1">
 *     <StepperTrigger>
 *       <StepperIndicator />
 *       <StepperTitle>步骤1</StepperTitle>
 *     </StepperTrigger>
 *     <StepperSeparator />
 *   </StepperItem>
 * </Stepper>
 * ```
 */
import type { StepperRootEmits, StepperRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed, provide } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { StepperRoot, useForwardPropsEmits } from "reka-ui"
import { cn } from "@/lib/utils"
import { stepperVariants } from "./index"
import { stepperContextKey } from "./context"

// 扩展 props 类型
interface ExtendedProps extends StepperRootProps {
  class?: HTMLAttributes["class"]
  /**
   * 尺寸
   * @default "default"
   */
  size?: "sm" | "default" | "lg"
  /**
   * 变体样式
   * @default "default"
   */
  variant?: "default" | "dot" | "navigation"
  /**
   * 标签位置（仅水平方向有效）
   * @default "end"
   */
  labelPlacement?: "end" | "bottom"
  /**
   * 是否可点击切换步骤
   * @default false
   */
  clickable?: boolean
}

const props = withDefaults(defineProps<ExtendedProps>(), {
  size: "default",
  variant: "default",
  labelPlacement: "end",
  clickable: false,
})

const emits = defineEmits<StepperRootEmits>()

const delegatedProps = reactiveOmit(
  props,
  "class",
  "size",
  "variant",
  "labelPlacement",
  "clickable",
)

const forwarded = useForwardPropsEmits(delegatedProps, emits)

// 计算方向
const isVertical = computed(() => props.orientation === "vertical")

// 提供上下文给子组件
provide(stepperContextKey, {
  size: computed(() => props.size),
  variant: computed(() => props.variant),
  labelPlacement: computed(() => props.labelPlacement),
  clickable: computed(() => props.clickable),
  orientation: computed(() => props.orientation ?? "horizontal"),
})
</script>

<template>
  <StepperRoot
    v-slot="slotProps"
    :class="cn(
      stepperVariants({ orientation: isVertical ? 'vertical' : 'horizontal' }),
      props.class,
    )"
    v-bind="forwarded"
  >
    <slot v-bind="slotProps" />
  </StepperRoot>
</template>
