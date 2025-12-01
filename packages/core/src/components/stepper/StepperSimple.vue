<script setup lang="ts">
/**
 * ============================================================================
 * StepperSimple - 简化组合组件
 * ============================================================================
 * 
 * 通过 steps 数组快速创建步骤条，适合简单场景
 * 
 * @example
 * ```vue
 * <StepperSimple
 *   v-model="currentStep"
 *   :steps="[
 *     { title: '步骤1', description: '描述1' },
 *     { title: '步骤2', description: '描述2' },
 *     { title: '步骤3', description: '描述3' },
 *   ]"
 *   clickable
 * />
 * ```
 */
import type { StepperRootProps } from "reka-ui"
import type { HTMLAttributes, VNode } from "vue"
import { computed } from "vue"
import { Check, Circle, Dot } from "lucide-vue-next"
import Stepper from "./Stepper.vue"
import StepperItem from "./StepperItem.vue"
import StepperTrigger from "./StepperTrigger.vue"
import StepperIndicator from "./StepperIndicator.vue"
import StepperTitle from "./StepperTitle.vue"
import StepperDescription from "./StepperDescription.vue"
import StepperSeparator from "./StepperSeparator.vue"

export interface StepData {
  /**
   * 步骤标题
   */
  title: string
  /**
   * 步骤描述
   */
  description?: string
  /**
   * 自定义图标
   */
  icon?: VNode
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 步骤状态
   */
  status?: "wait" | "process" | "finish" | "error"
}

interface Props extends /* @vue-ignore */ Omit<StepperRootProps, 'asChild'> {
  class?: HTMLAttributes["class"]
  /**
   * 步骤数据
   */
  steps: StepData[]
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
   * 标签位置
   * @default "end"
   */
  labelPlacement?: "end" | "bottom"
  /**
   * 是否可点击切换
   * @default false
   */
  clickable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: "default",
  variant: "default",
  labelPlacement: "end",
  clickable: false,
})

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void
}>()

// 计算当前步骤
const currentStep = computed(() => (props as any).modelValue ?? 1)
</script>

<template>
  <Stepper
    :class="props.class"
    :model-value="currentStep"
    :orientation="(props as any).orientation"
    :size="size"
    :variant="variant"
    :label-placement="labelPlacement"
    :clickable="clickable"
    @update:model-value="emit('update:modelValue', $event as number)"
  >
    <StepperItem
      v-for="(step, index) in steps"
      :key="index"
      :step="index + 1"
      :disabled="step.disabled"
      class="relative flex items-center gap-2"
      :class="[
        (props as any).orientation === 'vertical' ? 'flex-col' : '',
        labelPlacement === 'bottom' && (props as any).orientation !== 'vertical' ? 'flex-col items-center' : ''
      ]"
    >
      <StepperTrigger :disabled="step.disabled || !clickable">
        <StepperIndicator>
          <template v-if="step.icon">
            <component :is="step.icon" />
          </template>
          <template v-else-if="variant === 'dot'">
            <Dot v-if="index + 1 > currentStep" class="size-4" />
            <Circle v-else-if="index + 1 === currentStep" class="size-4 fill-current" />
            <Check v-else class="size-4" />
          </template>
          <template v-else>
            <Check v-if="index + 1 < currentStep" class="size-4" />
            <span v-else>{{ index + 1 }}</span>
          </template>
        </StepperIndicator>
        <div class="flex flex-col gap-0.5">
          <StepperTitle>{{ step.title }}</StepperTitle>
          <StepperDescription v-if="step.description">
            {{ step.description }}
          </StepperDescription>
        </div>
      </StepperTrigger>
      <StepperSeparator v-if="index < steps.length - 1" />
    </StepperItem>
  </Stepper>
</template>
