<script setup lang="ts">
/**
 * ============================================================================
 * Checkbox - 增强版复选框组件
 * ============================================================================
 * 
 * 功能全面超越 Ant Design Vue, Arco Design Vue, TDesign Vue Next, PrimeVue
 * 
 * ## 功能特性
 * 
 * | 功能 | 支持 |
 * |-----|------|
 * | v-model 双向绑定 | ✅ |
 * | 5种尺寸 (xs/sm/default/lg/xl) | ✅ |
 * | 3种变体 (default/card/button) | ✅ |
 * | 半选状态 (indeterminate) | ✅ |
 * | 标签与描述 | ✅ |
 * | 标签位置 (left/right) | ✅ |
 * | 自定义选中值 (trueValue/falseValue) | ✅ |
 * | 错误状态 | ✅ |
 * | 禁用/只读 | ✅ |
 * | 自动聚焦 | ✅ |
 * | 完整键盘导航 | ✅ |
 * | 无障碍支持 | ✅ |
 * 
 * @example
 * ```vue
 * <!-- 基础用法 -->
 * <Checkbox v-model="checked" label="同意协议" />
 * 
 * <!-- 带描述 -->
 * <Checkbox v-model="checked" label="记住我" description="下次自动登录" />
 * 
 * <!-- 半选状态 -->
 * <Checkbox v-model="checked" :indeterminate="isIndeterminate" label="全选" />
 * 
 * <!-- 不同尺寸 -->
 * <Checkbox v-model="checked" size="lg" label="大尺寸" />
 * ```
 */
import type { HTMLAttributes } from "vue"
import { computed, ref, watch, onMounted, inject } from "vue"
import { Check, Minus } from "lucide-vue-next"
import { CheckboxIndicator, CheckboxRoot } from "reka-ui"
import { cn } from "@/lib/utils"
import { checkboxVariants, checkboxIconVariants, type CheckboxProps, type CheckboxEmits } from "./index"

// 注入 CheckboxGroup 上下文
const checkboxGroupContext = inject<{
  modelValue: (string | number | boolean)[]
  disabled: boolean
  size: CheckboxProps["size"]
  variant: CheckboxProps["variant"]
  name: string
  toggleValue: (value: string | number | boolean) => void
  isChecked: (value: string | number | boolean) => boolean
  isDisabled: (value: string | number | boolean) => boolean
  isMaxReached: () => boolean
} | null>("checkboxGroup", null)

const props = withDefaults(defineProps<CheckboxProps>(), {
  defaultChecked: false,
  disabled: false,
  readonly: false,
  required: false,
  indeterminate: false,
  size: "default",
  variant: "default",
  error: false,
  labelPosition: "right",
  trueValue: true,
  falseValue: false,
  autofocus: false,
})

const emit = defineEmits<CheckboxEmits>()

// 内部状态
const internalChecked = ref(props.defaultChecked)
const checkboxRef = ref<InstanceType<typeof CheckboxRoot> | null>(null)

// 计算是否选中（支持 v-model 和非受控模式）
const isChecked = computed(() => {
  // 如果在 CheckboxGroup 中
  if (checkboxGroupContext && props.value !== undefined) {
    return checkboxGroupContext.isChecked(props.value)
  }
  // 受控模式
  if (props.modelValue !== undefined) {
    return props.modelValue === props.trueValue
  }
  // 非受控模式
  return internalChecked.value
})

// 计算是否禁用
const isDisabled = computed(() => {
  // 如果在 CheckboxGroup 中
  if (checkboxGroupContext) {
    if (props.value !== undefined && checkboxGroupContext.isDisabled(props.value)) {
      return true
    }
    // 检查是否达到最大选择数
    if (!isChecked.value && checkboxGroupContext.isMaxReached()) {
      return true
    }
    if (checkboxGroupContext.disabled) {
      return true
    }
  }
  return props.disabled
})

// 计算实际尺寸（优先使用 group 的尺寸）
const actualSize = computed(() => {
  return checkboxGroupContext?.size ?? props.size
})

// 计算实际变体（优先使用 group 的变体）
const actualVariant = computed(() => {
  return checkboxGroupContext?.variant ?? props.variant
})

// 计算表单字段名
const actualName = computed(() => {
  return checkboxGroupContext?.name ?? props.name
})

// reka-ui 需要的 checked 状态
const rekaChecked = computed(() => {
  if (props.indeterminate) {
    return "indeterminate"
  }
  return isChecked.value
})

// 处理值变化
function handleChange(checked: boolean | "indeterminate") {
  if (isDisabled.value || props.readonly) return

  const newChecked = checked === true
  
  // 如果在 CheckboxGroup 中
  if (checkboxGroupContext && props.value !== undefined) {
    checkboxGroupContext.toggleValue(props.value)
    return
  }

  // 更新内部状态
  internalChecked.value = newChecked
  
  // 发出事件
  const emitValue = newChecked ? props.trueValue : props.falseValue
  emit("update:modelValue", emitValue)
  emit("change", emitValue, new Event("change"))
}

// 监听 modelValue 变化
watch(() => props.modelValue, (newValue) => {
  if (newValue !== undefined) {
    internalChecked.value = newValue === props.trueValue
  }
})

// 自动聚焦
onMounted(() => {
  if (props.autofocus) {
    // 延迟聚焦以确保 DOM 已渲染
    setTimeout(() => {
      const input = checkboxRef.value?.$el?.querySelector("input")
      input?.focus()
    }, 0)
  }
})

// 暴露方法
defineExpose({
  /**
   * 聚焦
   */
  focus: () => {
    const input = checkboxRef.value?.$el?.querySelector("input")
    input?.focus()
  },
  /**
   * 失焦
   */
  blur: () => {
    const input = checkboxRef.value?.$el?.querySelector("input")
    input?.blur()
  },
  /**
   * 切换选中状态
   */
  toggle: () => {
    handleChange(!isChecked.value)
  },
})
</script>

<template>
  <label
    :class="cn(
      'inline-flex items-start gap-2 cursor-pointer',
      isDisabled && 'cursor-not-allowed opacity-50',
      props.class
    )"
    :for="props.name"
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

    <!-- Checkbox 本体 -->
    <CheckboxRoot
      ref="checkboxRef"
      v-slot="slotProps"
      data-slot="checkbox"
      :checked="rekaChecked"
      :disabled="isDisabled"
      :required="required"
      :name="actualName"
      :value="value?.toString()"
      :aria-label="ariaLabel"
      :aria-labelledby="ariaLabelledby"
      :aria-describedby="ariaDescribedby"
      :tabindex="tabindex"
      :class="cn(
        checkboxVariants({ size: actualSize, variant: actualVariant, error }),
        readonly && 'pointer-events-none'
      )"
      @update:checked="handleChange"
      @focus="(e: FocusEvent) => emit('focus', e)"
      @blur="(e: FocusEvent) => emit('blur', e)"
    >
      <CheckboxIndicator
        data-slot="checkbox-indicator"
        class="grid place-content-center text-current transition-none"
      >
        <slot name="icon" v-bind="slotProps">
          <!-- 半选状态显示横线 -->
          <Minus v-if="indeterminate" :class="checkboxIconVariants({ size: actualSize })" />
          <!-- 选中状态显示勾选 -->
          <Check v-else :class="checkboxIconVariants({ size: actualSize })" />
        </slot>
      </CheckboxIndicator>
    </CheckboxRoot>

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
