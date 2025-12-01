<script setup lang="ts">
import type { InputProps } from "."
import { computed, ref, useSlots, watch } from "vue"
import { useVModel } from "@vueuse/core"
import { cn } from "@/lib/utils"
import { inputVariants } from "."
import { X as XIcon } from "lucide-vue-next"

const props = withDefaults(defineProps<InputProps>(), {
  type: "text",
  size: "default",
  disabled: false,
  readonly: false,
  allowClear: false,
  showWordLimit: false,
})

const emit = defineEmits<{
  "update:modelValue": [value: string | number]
  input: [value: string | number, event: Event]
  change: [value: string | number, event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  clear: [event: MouseEvent]
  pressEnter: [event: KeyboardEvent]
}>()

const slots = useSlots()

// 双向绑定
const modelValue = useVModel(props, "modelValue", emit, {
  passive: true,
  defaultValue: props.defaultValue ?? "",
})

// 输入框引用
const inputRef = ref<HTMLInputElement>()

// 焦点状态
const isFocused = ref(false)

// 计算是否显示清除按钮
const showClearBtn = computed(() => {
  return (
    props.allowClear &&
    !props.disabled &&
    !props.readonly &&
    modelValue.value !== "" &&
    modelValue.value !== undefined &&
    modelValue.value !== null
  )
})

// 计算字符长度
const valueLength = computed(() => {
  const val = String(modelValue.value ?? "")
  return props.wordLength ? props.wordLength(val) : val.length
})

// 计算是否超出最大长度
const isOverLimit = computed(() => {
  if (!props.maxLength) return false
  return valueLength.value > props.maxLength
})

// 输入框类名
const inputClass = computed(() => {
  return cn(
    inputVariants({ size: props.size }),
    // 有前缀时去掉左边距
    (slots.prefix || props.prefix) && "pl-0",
    // 有后缀或清除按钮或字数统计时去掉右边距
    (slots.suffix || props.suffix || showClearBtn.value || (props.showWordLimit && props.maxLength)) && "pr-0",
    // 错误状态
    (props.error || isOverLimit.value) && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
    props.class
  )
})

// 包装器类名
const wrapperClass = computed(() => {
  return cn(
    "relative inline-flex items-center w-full",
    inputVariants({ size: props.size }),
    "p-0 gap-2",
    // 焦点状态
    isFocused.value && "border-ring ring-ring/50 ring-[3px]",
    // 禁用状态
    props.disabled && "opacity-50 cursor-not-allowed",
    // 错误状态
    (props.error || isOverLimit.value) && "border-destructive focus-within:border-destructive focus-within:ring-destructive/20",
  )
})

// 处理输入
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value: string | number = target.value
  
  // 如果是数字类型，转换为数字
  if (props.type === "number" && value !== "") {
    value = Number(value)
  }
  
  modelValue.value = value
  emit("input", value, event)
}

// 处理变更
const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value: string | number = target.value
  
  if (props.type === "number" && value !== "") {
    value = Number(value)
  }
  
  emit("change", value, event)
}

// 处理焦点
const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit("focus", event)
}

// 处理失焦
const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit("blur", event)
}

// 处理清除
const handleClear = (event: MouseEvent) => {
  modelValue.value = ""
  emit("clear", event)
  inputRef.value?.focus()
}

// 处理键盘事件
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    emit("pressEnter", event)
  }
}

// 暴露方法
defineExpose({
  /** 获取输入框焦点 */
  focus: () => inputRef.value?.focus(),
  /** 失去焦点 */
  blur: () => inputRef.value?.blur(),
  /** 选中输入框内容 */
  select: () => inputRef.value?.select(),
  /** 输入框元素 */
  inputRef,
})
</script>

<template>
  <div :class="wrapperClass" @click="inputRef?.focus()">
    <!-- 前缀 -->
    <span 
      v-if="$slots.prefix || prefix" 
      class="flex items-center text-muted-foreground pl-3 shrink-0"
    >
      <slot name="prefix">{{ prefix }}</slot>
    </span>
    
    <!-- 输入框 -->
    <input
      ref="inputRef"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxLength"
      :autofocus="autofocus"
      :autocomplete="autocomplete"
      :name="name"
      :class="cn(
        'flex-1 h-full bg-transparent outline-none border-none',
        'placeholder:text-muted-foreground',
        'disabled:cursor-not-allowed',
        (!$slots.prefix && !prefix) && 'pl-3',
        (!$slots.suffix && !suffix && !showClearBtn && !(showWordLimit && maxLength)) && 'pr-3',
      )"
      data-slot="input"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
    >
    
    <!-- 清除按钮 -->
    <button
      v-if="showClearBtn"
      type="button"
      class="flex items-center justify-center text-muted-foreground hover:text-foreground shrink-0 px-1"
      tabindex="-1"
      @click.stop="handleClear"
    >
      <XIcon class="size-4" />
    </button>
    
    <!-- 字数统计 -->
    <span 
      v-if="showWordLimit && maxLength" 
      :class="cn(
        'text-xs text-muted-foreground shrink-0 px-2',
        isOverLimit && 'text-destructive'
      )"
    >
      {{ valueLength }}/{{ maxLength }}
    </span>
    
    <!-- 后缀 -->
    <span 
      v-if="$slots.suffix || suffix" 
      class="flex items-center text-muted-foreground pr-3 shrink-0"
    >
      <slot name="suffix">{{ suffix }}</slot>
    </span>
  </div>
</template>
