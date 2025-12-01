<script setup lang="ts">
/**
 * ============================================================================
 * Switch - 增强版开关组件
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
 * | 2种类型 (default/line) | ✅ |
 * | 加载状态 | ✅ |
 * | 开关文本 (checkedText/uncheckedText) | ✅ |
 * | 自定义值 (checkedValue/uncheckedValue) | ✅ |
 * | 自定义颜色 | ✅ |
 * | 异步切换 (beforeChange) | ✅ |
 * | 标签文本 | ✅ |
 * | 错误状态 | ✅ |
 * | 禁用/只读 | ✅ |
 * | 自动聚焦 | ✅ |
 * | 完整键盘导航 | ✅ |
 * | 无障碍支持 | ✅ |
 * 
 * @example
 * ```vue
 * <!-- 基础用法 -->
 * <Switch v-model="checked" />
 * 
 * <!-- 加载状态 -->
 * <Switch v-model="checked" loading />
 * 
 * <!-- 带文本 -->
 * <Switch v-model="checked" checked-text="开" unchecked-text="关" />
 * 
 * <!-- 异步切换 -->
 * <Switch v-model="checked" :before-change="handleBeforeChange" />
 * 
 * <!-- 自定义颜色 -->
 * <Switch v-model="checked" checked-color="#52c41a" unchecked-color="#ff4d4f" />
 * ```
 */
import { computed, ref, watch, onMounted } from "vue"
import { Loader2 } from "lucide-vue-next"
import { SwitchRoot, SwitchThumb } from "reka-ui"
import { cn } from "@/lib/utils"
import { switchVariants, switchThumbVariants, type SwitchProps, type SwitchEmits } from "./index"

const props = withDefaults(defineProps<SwitchProps>(), {
  defaultChecked: false,
  disabled: false,
  readonly: false,
  required: false,
  size: "default",
  type: "default",
  error: false,
  labelPosition: "right",
  checkedValue: true,
  uncheckedValue: false,
  loading: false,
  autofocus: false,
})

const emit = defineEmits<SwitchEmits>()

// 内部状态
const internalChecked = ref(props.defaultChecked)
const isLoading = ref(false)
const switchRef = ref<InstanceType<typeof SwitchRoot> | null>(null)

// 计算是否选中
const isChecked = computed(() => {
  // 受控模式
  if (props.modelValue !== undefined) {
    return props.modelValue === props.checkedValue
  }
  // 非受控模式
  return internalChecked.value
})

// 计算是否禁用
const isDisabled = computed(() => {
  return props.disabled || props.loading || isLoading.value
})

// 计算当前显示的加载状态
const showLoading = computed(() => {
  return props.loading || isLoading.value
})

// 计算自定义样式
const customStyle = computed(() => {
  const style: Record<string, string> = {}
  if (isChecked.value && props.checkedColor) {
    style.backgroundColor = props.checkedColor
    style.borderColor = props.checkedColor
  }
  if (!isChecked.value && props.uncheckedColor) {
    style.backgroundColor = props.uncheckedColor
    style.borderColor = props.uncheckedColor
  }
  return style
})

// reka-ui 需要的 checked 状态
const rekaChecked = computed(() => isChecked.value)

// 处理值变化
async function handleChange(checked: boolean | "indeterminate") {
  if (isDisabled.value || props.readonly) return

  const newChecked = checked === true
  const newValue = newChecked ? props.checkedValue : props.uncheckedValue
  
  // 如果有 beforeChange 回调
  if (props.beforeChange) {
    isLoading.value = true
    try {
      const result = await props.beforeChange(newValue)
      if (result === false) {
        isLoading.value = false
        return // 不执行切换
      }
    } catch {
      isLoading.value = false
      return // 异常时不执行切换
    }
    isLoading.value = false
  }

  // 更新内部状态
  internalChecked.value = newChecked
  
  // 发出事件
  emit("update:modelValue", newValue)
  emit("change", newValue, new Event("change"))
}

// 监听 modelValue 变化
watch(() => props.modelValue, (newValue) => {
  if (newValue !== undefined) {
    internalChecked.value = newValue === props.checkedValue
  }
})

// 自动聚焦
onMounted(() => {
  if (props.autofocus) {
    setTimeout(() => {
      const button = switchRef.value?.$el
      button?.focus()
    }, 0)
  }
})

// 暴露方法
defineExpose({
  /**
   * 聚焦
   */
  focus: () => {
    const button = switchRef.value?.$el
    button?.focus()
  },
  /**
   * 失焦
   */
  blur: () => {
    const button = switchRef.value?.$el
    button?.blur()
  },
  /**
   * 切换状态
   */
  toggle: () => {
    handleChange(!isChecked.value)
  },
})
</script>

<template>
  <label
    :class="cn(
      'inline-flex items-center gap-2 cursor-pointer',
      isDisabled && 'cursor-not-allowed opacity-50',
    )"
  >
    <!-- 标签在左侧 -->
    <span
      v-if="labelPosition === 'left' && (label || $slots.label)"
      :class="cn(
        'text-sm font-medium',
        size === 'xs' && 'text-xs',
        size === 'lg' && 'text-base',
        size === 'xl' && 'text-lg'
      )"
    >
      <slot name="label">{{ label }}</slot>
    </span>

    <!-- Switch 本体 -->
    <SwitchRoot
      ref="switchRef"
      v-slot="slotProps"
      data-slot="switch"
      :checked="rekaChecked"
      :disabled="isDisabled"
      :required="required"
      :name="name"
      :aria-label="ariaLabel"
      :aria-labelledby="ariaLabelledby"
      :tabindex="tabindex"
      :class="cn(
        switchVariants({ size, type, error }),
        readonly && 'pointer-events-none',
        props.class
      )"
      :style="customStyle"
      @update:checked="handleChange"
      @focus="(e: FocusEvent) => emit('focus', e)"
      @blur="(e: FocusEvent) => emit('blur', e)"
      @click="(e: MouseEvent) => emit('click', e)"
    >
      <!-- 开关文本（在滑块内部） -->
      <template v-if="(checkedText || uncheckedText || $slots.checkedText || $slots.uncheckedText) && size !== 'xs' && size !== 'sm'">
        <span
          v-if="isChecked"
          class="absolute left-1 text-[10px] text-primary-foreground font-medium"
        >
          <slot name="checkedText">{{ checkedText }}</slot>
        </span>
        <span
          v-else
          class="absolute right-1 text-[10px] text-muted-foreground font-medium"
        >
          <slot name="uncheckedText">{{ uncheckedText }}</slot>
        </span>
      </template>

      <!-- 滑块 -->
      <SwitchThumb
        data-slot="switch-thumb"
        :class="cn(
          switchThumbVariants({ size, type }),
          'flex items-center justify-center'
        )"
      >
        <!-- 加载图标 -->
        <Loader2
          v-if="showLoading"
          :class="cn(
            'animate-spin text-muted-foreground',
            size === 'xs' && 'size-1.5',
            size === 'sm' && 'size-2',
            size === 'default' && 'size-2.5',
            size === 'lg' && 'size-3',
            size === 'xl' && 'size-3.5'
          )"
        />
        <!-- 自定义滑块内容 -->
        <slot v-else name="thumb" v-bind="slotProps">
          <!-- 选中时的图标 -->
          <slot v-if="isChecked" name="checkedIcon" />
          <!-- 未选中时的图标 -->
          <slot v-else name="uncheckedIcon" />
        </slot>
      </SwitchThumb>
    </SwitchRoot>

    <!-- 标签在右侧 -->
    <span
      v-if="labelPosition === 'right' && (label || $slots.label)"
      :class="cn(
        'text-sm font-medium',
        size === 'xs' && 'text-xs',
        size === 'lg' && 'text-base',
        size === 'xl' && 'text-lg'
      )"
    >
      <slot name="label">{{ label }}</slot>
    </span>
  </label>
</template>
