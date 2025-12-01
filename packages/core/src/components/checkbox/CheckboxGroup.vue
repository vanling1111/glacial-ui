<script setup lang="ts">
/**
 * ============================================================================
 * CheckboxGroup - 增强版复选框组组件
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
 * | 最大/最小选择数限制 | ✅ |
 * | 水平/垂直布局 | ✅ |
 * | 统一尺寸控制 | ✅ |
 * | 统一变体控制 | ✅ |
 * | 全选功能 | ✅ |
 * | 禁用整组 | ✅ |
 * | 插槽自定义 | ✅ |
 * 
 * @example
 * ```vue
 * <!-- 基础用法 -->
 * <CheckboxGroup v-model="values" :options="options" />
 * 
 * <!-- 限制最大选择数 -->
 * <CheckboxGroup v-model="values" :options="options" :max="3" />
 * 
 * <!-- 垂直布局 -->
 * <CheckboxGroup v-model="values" :options="options" direction="vertical" />
 * 
 * <!-- 带全选 -->
 * <CheckboxGroup v-model="values" :options="options" show-check-all />
 * ```
 */
import { computed, ref, watch, provide, reactive } from "vue"
import { cn } from "@/lib/utils"
import Checkbox from "./Checkbox.vue"
import { checkboxGroupVariants, type CheckboxGroupProps, type CheckboxGroupEmits, type CheckboxOption } from "./index"

const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  disabled: false,
  direction: "horizontal",
  size: "default",
  variant: "default",
  showCheckAll: false,
  checkAllLabel: "全选",
})

const emit = defineEmits<CheckboxGroupEmits>()

// 内部状态
const internalValue = ref<(string | number | boolean)[]>(props.defaultValue ?? [])

// 计算当前选中的值
const currentValue = computed(() => {
  return props.modelValue ?? internalValue.value
})

// 计算所有可选的值（排除禁用项）
const enabledValues = computed(() => {
  if (!props.options) return []
  return props.options
    .filter(opt => !opt.disabled)
    .map(opt => opt.value)
})

// 计算全选状态
const checkAllState = computed(() => {
  if (enabledValues.value.length === 0) return false
  const checkedCount = currentValue.value.filter(v => enabledValues.value.includes(v)).length
  if (checkedCount === 0) return false
  if (checkedCount === enabledValues.value.length) return true
  return "indeterminate"
})

// 计算是否达到最大选择数
const isMaxReached = computed(() => {
  if (props.max === undefined) return false
  return currentValue.value.length >= props.max
})

// 检查某个值是否选中
function isChecked(value: string | number | boolean): boolean {
  return currentValue.value.includes(value)
}

// 检查某个值是否禁用
function isDisabled(value: string | number | boolean): boolean {
  const option = props.options?.find(opt => opt.value === value)
  return option?.disabled ?? false
}

// 切换某个值的选中状态
function toggleValue(value: string | number | boolean) {
  const newValue = [...currentValue.value]
  const index = newValue.indexOf(value)
  
  if (index > -1) {
    // 取消选中
    if (props.min !== undefined && newValue.length <= props.min) {
      return // 已达到最小选择数
    }
    newValue.splice(index, 1)
  } else {
    // 选中
    if (props.max !== undefined && newValue.length >= props.max) {
      return // 已达到最大选择数
    }
    newValue.push(value)
  }
  
  updateValue(newValue)
}

// 更新值
function updateValue(newValue: (string | number | boolean)[], event?: Event) {
  internalValue.value = newValue
  emit("update:modelValue", newValue)
  emit("change", newValue, event ?? new Event("change"))
}

// 全选/取消全选
function handleCheckAll() {
  if (checkAllState.value === true) {
    // 取消全选（保留禁用项的选中状态）
    const disabledChecked = currentValue.value.filter(v => !enabledValues.value.includes(v))
    updateValue(disabledChecked)
  } else {
    // 全选（考虑 max 限制）
    let newValue = [...enabledValues.value]
    if (props.max !== undefined && newValue.length > props.max) {
      newValue = newValue.slice(0, props.max)
    }
    // 保留禁用项的选中状态
    const disabledChecked = currentValue.value.filter(v => !enabledValues.value.includes(v))
    updateValue([...disabledChecked, ...newValue])
  }
}

// 监听 modelValue 变化
watch(() => props.modelValue, (newValue) => {
  if (newValue !== undefined) {
    internalValue.value = newValue
  }
}, { immediate: true })

// 提供上下文给子 Checkbox
provide("checkboxGroup", reactive({
  modelValue: currentValue,
  disabled: computed(() => props.disabled),
  size: computed(() => props.size),
  variant: computed(() => props.variant),
  name: computed(() => props.name ?? ""),
  toggleValue,
  isChecked,
  isDisabled,
  isMaxReached: () => isMaxReached.value,
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
  setValue: (value: (string | number | boolean)[]) => updateValue(value),
  /**
   * 全选
   */
  checkAll: () => {
    if (checkAllState.value !== true) {
      handleCheckAll()
    }
  },
  /**
   * 取消全选
   */
  uncheckAll: () => {
    if (checkAllState.value !== false) {
      handleCheckAll()
    }
  },
  /**
   * 切换全选状态
   */
  toggleAll: handleCheckAll,
})
</script>

<template>
  <div
    :class="cn(
      checkboxGroupVariants({ direction, size }),
      props.class
    )"
    role="group"
    :aria-label="name"
  >
    <!-- 全选选项 -->
    <Checkbox
      v-if="showCheckAll"
      :model-value="checkAllState === true"
      :indeterminate="checkAllState === 'indeterminate'"
      :label="checkAllLabel"
      :size="size"
      :variant="variant"
      :disabled="disabled"
      @change="handleCheckAll"
    />

    <!-- 分隔线（全选和选项之间） -->
    <div v-if="showCheckAll && options?.length" class="border-l border-border h-4 mx-1" />

    <!-- 通过 options 渲染 -->
    <template v-if="options?.length">
      <Checkbox
        v-for="option in options"
        :key="String(option.value)"
        :value="option.value"
        :label="option.label"
        :description="option.description"
        :disabled="option.disabled"
        :indeterminate="option.indeterminate"
        :size="size"
        :variant="variant"
      >
        <!-- 自定义选项内容 -->
        <template v-if="$slots.option" #default>
          <slot name="option" :option="option" :checked="isChecked(option.value)" />
        </template>
      </Checkbox>
    </template>

    <!-- 通过插槽渲染 -->
    <slot v-else />
  </div>
</template>
