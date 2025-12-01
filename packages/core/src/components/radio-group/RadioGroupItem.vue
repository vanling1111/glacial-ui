<script setup lang="ts">
/**
 * ============================================================================
 * RadioGroupItem - 增强版单选框选项组件
 * ============================================================================
 * 
 * 功能全面超越 Ant Design Vue, Arco Design Vue, TDesign Vue Next, PrimeVue
 * 
 * ## 功能特性
 * 
 * | 功能 | 支持 |
 * |-----|------|
 * | 5种尺寸 (xs/sm/default/lg/xl) | ✅ |
 * | 3种变体 (default/card/button) | ✅ |
 * | 标签与描述 | ✅ |
 * | 标签位置 (left/right) | ✅ |
 * | 错误状态 | ✅ |
 * | 禁用/只读 | ✅ |
 * | 完整键盘导航 | ✅ |
 * | 无障碍支持 | ✅ |
 * 
 * @example
 * ```vue
 * <RadioGroup v-model="value">
 *   <RadioGroupItem value="1" label="选项一" />
 *   <RadioGroupItem value="2" label="选项二" description="这是描述" />
 *   <RadioGroupItem value="3" label="选项三" disabled />
 * </RadioGroup>
 * ```
 */
import { computed, inject } from "vue"
import { CircleIcon } from "lucide-vue-next"
import { RadioGroupItem, RadioGroupIndicator } from "reka-ui"
import { cn } from "@/lib/utils"
import { radioVariants, radioIndicatorVariants, type RadioGroupItemProps, type RadioGroupItemEmits } from "./index"

// 注入 RadioGroup 上下文
const radioGroupContext = inject<{
  modelValue: string | number | boolean | undefined
  disabled: boolean
  size: RadioGroupItemProps["size"]
  variant: RadioGroupItemProps["variant"]
  type: "default" | "button"
  buttonStyle: "outline" | "solid"
  name: string
  allowUncheck: boolean
} | null>("radioGroup", null)

const props = withDefaults(defineProps<RadioGroupItemProps>(), {
  disabled: false,
  readonly: false,
  required: false,
  size: "default",
  variant: "default",
  error: false,
  labelPosition: "right",
})

const emit = defineEmits<RadioGroupItemEmits>()

// 计算是否禁用
const isDisabled = computed(() => {
  return props.disabled || radioGroupContext?.disabled
})

// 计算实际尺寸（优先使用 group 的尺寸）
const actualSize = computed(() => {
  return radioGroupContext?.size ?? props.size
})

// 计算实际变体（优先使用 group 的变体）
const actualVariant = computed(() => {
  return radioGroupContext?.variant ?? props.variant
})

// 计算是否是按钮类型
const isButtonType = computed(() => {
  return radioGroupContext?.type === "button" || props.variant === "button"
})
</script>

<template>
  <!-- 按钮类型 -->
  <RadioGroupItem
    v-if="isButtonType"
    :value="String(value)"
    :disabled="isDisabled"
    :aria-label="ariaLabel || label"
    :aria-labelledby="ariaLabelledby"
    :aria-describedby="ariaDescribedby"
    :class="cn(props.class)"
    @focus="(e: FocusEvent) => emit('focus', e)"
    @blur="(e: FocusEvent) => emit('blur', e)"
  >
    <slot>{{ label }}</slot>
  </RadioGroupItem>

  <!-- 默认类型 -->
  <label
    v-else
    :class="cn(
      'inline-flex items-start gap-2 cursor-pointer',
      isDisabled && 'cursor-not-allowed opacity-50',
    )"
  >
    <!-- 标签在左侧 -->
    <template v-if="labelPosition === 'left' && (label || $slots.default)">
      <div class="flex flex-col">
        <span :class="cn('text-sm font-medium leading-none', actualSize === 'xs' && 'text-xs', actualSize === 'lg' && 'text-base', actualSize === 'xl' && 'text-lg')">
          <slot>{{ label }}</slot>
        </span>
        <span v-if="description || $slots.description" class="text-xs text-muted-foreground mt-1">
          <slot name="description">{{ description }}</slot>
        </span>
      </div>
    </template>

    <!-- Radio 本体 -->
    <RadioGroupItem
      data-slot="radio-group-item"
      :value="String(value)"
      :disabled="isDisabled"
      :required="required"
      :aria-label="ariaLabel"
      :aria-labelledby="ariaLabelledby"
      :aria-describedby="ariaDescribedby"
      :class="cn(
        radioVariants({ size: actualSize, variant: actualVariant, error }),
        readonly && 'pointer-events-none'
      )"
      @focus="(e: FocusEvent) => emit('focus', e)"
      @blur="(e: FocusEvent) => emit('blur', e)"
    >
      <RadioGroupIndicator
        data-slot="radio-group-indicator"
        class="relative flex items-center justify-center"
      >
        <slot name="icon">
          <CircleIcon :class="cn('absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2', radioIndicatorVariants({ size: actualSize }))" />
        </slot>
      </RadioGroupIndicator>
    </RadioGroupItem>

    <!-- 标签在右侧 -->
    <template v-if="labelPosition === 'right' && (label || $slots.default)">
      <div class="flex flex-col">
        <span :class="cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', actualSize === 'xs' && 'text-xs', actualSize === 'lg' && 'text-base', actualSize === 'xl' && 'text-lg')">
          <slot>{{ label }}</slot>
        </span>
        <span v-if="description || $slots.description" class="text-xs text-muted-foreground mt-1">
          <slot name="description">{{ description }}</slot>
        </span>
      </div>
    </template>
  </label>
</template>
