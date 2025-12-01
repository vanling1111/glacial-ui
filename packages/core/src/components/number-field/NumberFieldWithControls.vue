<script setup lang="ts">
/**
 * ============================================================================
 * NumberFieldWithControls - 带控制按钮的数字输入组件
 * ============================================================================
 * 
 * 完整的数字输入组件，包含增减按钮
 * 
 * @example
 * ```vue
 * <NumberFieldWithControls
 *   v-model="value"
 *   :min="0"
 *   :max="100"
 *   :step="1"
 *   size="default"
 *   controls-position="both"
 * />
 * ```
 */
import type { NumberFieldRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import NumberField from "./NumberField.vue"
import NumberFieldContent from "./NumberFieldContent.vue"
import NumberFieldDecrement from "./NumberFieldDecrement.vue"
import NumberFieldIncrement from "./NumberFieldIncrement.vue"
import NumberFieldInput from "./NumberFieldInput.vue"

interface Props extends /* @vue-ignore */ Omit<NumberFieldRootProps, 'asChild'> {
  class?: HTMLAttributes["class"]
  /**
   * 尺寸
   * @default "default"
   */
  size?: "sm" | "default" | "lg"
  /**
   * 状态
   */
  status?: "default" | "success" | "warning" | "error"
  /**
   * 控制按钮位置
   * @default "right"
   */
  controlsPosition?: "right" | "both"
  /**
   * 前缀文本
   */
  prefix?: string
  /**
   * 后缀文本
   */
  suffix?: string
  /**
   * 占位符
   */
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: "default",
  status: "default",
  controlsPosition: "right",
})

const emit = defineEmits<{
  (e: "update:modelValue", value: number | undefined): void
}>()
</script>

<template>
  <NumberField
    :class="props.class"
    :model-value="(props as any).modelValue"
    :default-value="(props as any).defaultValue"
    :min="(props as any).min"
    :max="(props as any).max"
    :step="(props as any).step"
    :disabled="(props as any).disabled"
    :size="size"
    :status="status"
    :controls-position="controlsPosition"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <NumberFieldContent>
      <!-- 左侧减少按钮（both 模式） -->
      <NumberFieldDecrement v-if="controlsPosition === 'both'" />
      
      <!-- 前缀 -->
      <span v-if="prefix" class="text-muted-foreground text-sm px-2">{{ prefix }}</span>
      
      <!-- 输入框 -->
      <NumberFieldInput :placeholder="placeholder" />
      
      <!-- 后缀 -->
      <span v-if="suffix" class="text-muted-foreground text-sm px-2">{{ suffix }}</span>
      
      <!-- 右侧控制按钮 -->
      <template v-if="controlsPosition === 'right'">
        <NumberFieldDecrement />
        <NumberFieldIncrement />
      </template>
      
      <!-- 右侧增加按钮（both 模式） -->
      <NumberFieldIncrement v-if="controlsPosition === 'both'" />
    </NumberFieldContent>
  </NumberField>
</template>
