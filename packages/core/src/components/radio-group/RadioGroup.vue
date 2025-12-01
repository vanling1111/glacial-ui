<script setup lang="ts">
/**
 * ============================================================================
 * RadioGroup - 增强版单选框组组件
 * ============================================================================
 * 
 * 功能全面超越 Ant Design Vue, Arco Design Vue, TDesign Vue Next, PrimeVue
 * 
 * ## 功能特性
 * 
 * | 功能 | 支持 |
 * |-----|------|
 * | v-model 双向绑定 | ✅ |
 * | options 数据驱动 | ✅ |
 * | 5种尺寸 (xs/sm/default/lg/xl) | ✅ |
 * | 3种变体 (default/card/button) | ✅ |
 * | 按钮类型 (type="button") | ✅ |
 * | 按钮样式 (outline/solid) | ✅ |
 * | 水平/垂直布局 | ✅ |
 * | 允许取消选中 | ✅ |
 * | 禁用整组 | ✅ |
 * | 插槽自定义 | ✅ |
 * 
 * @example
 * ```vue
 * <!-- 基础用法 -->
 * <RadioGroup v-model="value" :options="options" />
 * 
 * <!-- 按钮类型 -->
 * <RadioGroup v-model="value" :options="options" type="button" />
 * 
 * <!-- 垂直布局 -->
 * <RadioGroup v-model="value" :options="options" direction="vertical" />
 * 
 * <!-- 允许取消选中 -->
 * <RadioGroup v-model="value" :options="options" allow-uncheck />
 * ```
 */
import { computed, ref, watch, provide, reactive } from "vue"
import { RadioGroupRoot } from "reka-ui"
import { cn } from "@/lib/utils"
import RadioGroupItem from "./RadioGroupItem.vue"
import { radioGroupVariants, radioButtonVariants, type RadioGroupProps, type RadioGroupEmits, type RadioOption } from "./index"

const props = withDefaults(defineProps<RadioGroupProps>(), {
  disabled: false,
  direction: "horizontal",
  size: "default",
  variant: "default",
  type: "default",
  buttonStyle: "outline",
  allowUncheck: false,
})

const emit = defineEmits<RadioGroupEmits>()

// 内部状态
const internalValue = ref<string | number | boolean | undefined>(props.defaultValue)

// 计算当前选中的值
const currentValue = computed(() => {
  return props.modelValue ?? internalValue.value
})

// 处理值变化
function handleChange(value: string) {
  // 如果允许取消选中且点击的是当前选中项
  if (props.allowUncheck && value === String(currentValue.value)) {
    internalValue.value = undefined
    emit("update:modelValue", undefined as any)
    emit("change", undefined as any, new Event("change"))
    return
  }

  // 尝试转换回原始类型
  let typedValue: string | number | boolean = value
  
  // 检查是否是数字
  if (!isNaN(Number(value)) && value !== "") {
    typedValue = Number(value)
  }
  // 检查是否是布尔值
  else if (value === "true") {
    typedValue = true
  } else if (value === "false") {
    typedValue = false
  }

  internalValue.value = typedValue
  emit("update:modelValue", typedValue)
  emit("change", typedValue, new Event("change"))
}

// 监听 modelValue 变化
watch(() => props.modelValue, (newValue) => {
  if (newValue !== undefined) {
    internalValue.value = newValue
  }
}, { immediate: true })

// 提供上下文给子 RadioGroupItem
provide("radioGroup", reactive({
  modelValue: currentValue,
  disabled: computed(() => props.disabled),
  size: computed(() => props.size),
  variant: computed(() => props.variant),
  type: computed(() => props.type),
  buttonStyle: computed(() => props.buttonStyle),
  name: computed(() => props.name ?? ""),
  allowUncheck: computed(() => props.allowUncheck),
}))

// 暴露方法
defineExpose({
  /**
   * 获取当前选中的值
   */
  getValue: () => currentValue.value,
  /**
   * 设置选中的值
   */
  setValue: (value: string | number | boolean) => {
    internalValue.value = value
    emit("update:modelValue", value)
    emit("change", value, new Event("change"))
  },
  /**
   * 清除选中
   */
  clear: () => {
    if (props.allowUncheck) {
      internalValue.value = undefined
      emit("update:modelValue", undefined as any)
      emit("change", undefined as any, new Event("change"))
    }
  },
})
</script>

<template>
  <RadioGroupRoot
    :model-value="String(currentValue ?? '')"
    :disabled="disabled"
    :name="name"
    :class="cn(
      radioGroupVariants({ direction, size, type }),
      props.class
    )"
    @update:model-value="handleChange"
  >
    <!-- 通过 options 渲染 -->
    <template v-if="options?.length">
      <!-- 按钮类型 -->
      <template v-if="type === 'button'">
        <RadioGroupItem
          v-for="option in options"
          :key="String(option.value)"
          :value="option.value"
          :label="option.label"
          :disabled="option.disabled"
          :size="size"
          variant="button"
          :class="radioButtonVariants({ buttonStyle, size })"
        />
      </template>
      <!-- 默认类型 -->
      <template v-else>
        <RadioGroupItem
          v-for="option in options"
          :key="String(option.value)"
          :value="option.value"
          :label="option.label"
          :description="option.description"
          :disabled="option.disabled"
          :size="size"
          :variant="variant"
        >
          <!-- 自定义选项内容 -->
          <template v-if="$slots.option" #default>
            <slot name="option" :option="option" :checked="currentValue === option.value" />
          </template>
        </RadioGroupItem>
      </template>
    </template>

    <!-- 通过插槽渲染 -->
    <slot v-else />
  </RadioGroupRoot>
</template>
