<script setup lang="ts">
/**
 * Input 输入框组件
 * 
 * 功能全面超越 Ant Design Vue, Arco Design Vue, TDesign Vue Next, PrimeVue
 * 
 * 特色功能：
 * - 5种尺寸 + 3种变体 + 4种状态
 * - 前后缀 + 前后置标签 + 左侧标签
 * - 字数统计 + 字符/字节限制
 * - 密码显示切换
 * - 加载状态
 * - 格式化显示
 * - 宽度自适应
 * - 输入防抖
 * - 完整的键盘和中文输入法事件
 */
import type { InputProps } from "."
import { computed, ref, useSlots, watch, onMounted, nextTick } from "vue"
import { useVModel, useDebounceFn } from "@vueuse/core"
import { cn } from "@/lib/utils"
import { inputVariants } from "."
import { X as XIcon, Eye, EyeOff, Loader2 } from "lucide-vue-next"

const props = withDefaults(defineProps<InputProps>(), {
  type: "text",
  size: "default",
  variant: "default",
  disabled: false,
  readonly: false,
  allowClear: false,
  showWordLimit: false,
  allowInputOverMax: false,
  error: false,
  status: "default",
  loading: false,
  borderless: false,
  block: false,
  align: "left",
  autoWidth: false,
  spellCheck: false,
  showPassword: false,
  autofocus: false,
} as const)

const emit = defineEmits<{
  /** 值更新 */
  "update:modelValue": [value: string | number]
  /** 输入时触发 */
  input: [value: string | number, event: Event]
  /** 值变化时触发（失焦或回车） */
  change: [value: string | number, event: Event]
  /** 获取焦点 */
  focus: [event: FocusEvent]
  /** 失去焦点 */
  blur: [event: FocusEvent]
  /** 点击清空按钮 */
  clear: [event: MouseEvent]
  /** 按下回车键 */
  pressEnter: [event: KeyboardEvent]
  /** 点击输入框 */
  click: [event: MouseEvent]
  /** 中文输入开始 */
  compositionstart: [event: CompositionEvent]
  /** 中文输入结束 */
  compositionend: [event: CompositionEvent]
  /** 按键按下 */
  keydown: [event: KeyboardEvent]
  /** 按键抬起 */
  keyup: [event: KeyboardEvent]
  /** 按下字符键 */
  keypress: [event: KeyboardEvent]
}>()

const slots = useSlots()

// ==================== 内部状态 ====================

/** 输入框引用 */
const inputRef = ref<HTMLInputElement>()

/** 包装器引用（用于 autoWidth） */
const wrapperRef = ref<HTMLDivElement>()

/** 镜像元素引用（用于 autoWidth） */
const mirrorRef = ref<HTMLSpanElement>()

/** 焦点状态 */
const isFocused = ref(false)

/** 是否正在中文输入 */
const isComposing = ref(false)

/** 密码是否可见 */
const passwordVisible = ref(false)

/** 上次提交的值（用于 change 事件） */
const lastCommittedValue = ref<string | number>("")

// ==================== 双向绑定 ====================

const modelValue = useVModel(props, "modelValue", emit, {
  passive: true,
  defaultValue: props.defaultValue ?? "",
})

// 初始化 lastCommittedValue
onMounted(() => {
  lastCommittedValue.value = modelValue.value ?? ""
})

// ==================== 计算属性 ====================

/** 计算实际状态 */
const computedStatus = computed(() => {
  if (props.error) return "error"
  return props.status
})

/** 是否显示清除按钮 */
const showClearBtn = computed(() => {
  return (
    props.allowClear &&
    !props.disabled &&
    !props.readonly &&
    !props.loading &&
    modelValue.value !== "" &&
    modelValue.value !== undefined &&
    modelValue.value !== null
  )
})

/** 是否显示密码切换按钮 */
const showPasswordToggle = computed(() => {
  return props.type === "password" && props.showPassword && !props.disabled
})

/** 实际的输入类型 */
const actualInputType = computed(() => {
  if (props.type === "password" && passwordVisible.value) {
    return "text"
  }
  return props.type
})

/** 计算字符长度 */
const valueLength = computed(() => {
  const val = String(modelValue.value ?? "")
  if (props.wordLength) {
    return props.wordLength(val)
  }
  if (props.maxCharacter) {
    // 中文算2个字符
    return val.split("").reduce((len, char) => {
      return len + (char.charCodeAt(0) > 127 ? 2 : 1)
    }, 0)
  }
  return val.length
})

/** 最大限制值 */
const maxLimit = computed(() => {
  return props.maxCharacter || props.maxLength || 0
})

/** 是否超出最大长度 */
const isOverLimit = computed(() => {
  if (!maxLimit.value) return false
  return valueLength.value > maxLimit.value
})

/** 显示的值（支持格式化） */
const displayValue = computed(() => {
  const val = String(modelValue.value ?? "")
  if (props.format && !isFocused.value) {
    return props.format(val)
  }
  return val
})

/** 是否有前置/后置内容 */
const hasPrepend = computed(() => !!slots.prepend || !!props.prepend)
const hasAppend = computed(() => !!slots.append || !!props.append)

/** 是否有前缀/后缀 */
const hasPrefix = computed(() => !!slots.prefix || !!props.prefix || !!props.label)
const hasSuffix = computed(() => {
  return (
    !!slots.suffix ||
    !!props.suffix ||
    showClearBtn.value ||
    showPasswordToggle.value ||
    props.loading ||
    (props.showWordLimit && maxLimit.value)
  )
})

/** 状态对应的样式类 */
const statusClass = computed(() => {
  const statusMap = {
    default: "",
    success: "border-emerald-500 focus-within:border-emerald-500 focus-within:ring-emerald-500/20",
    warning: "border-amber-500 focus-within:border-amber-500 focus-within:ring-amber-500/20",
    error: "border-destructive focus-within:border-destructive focus-within:ring-destructive/20",
  }
  return statusMap[computedStatus.value]
})

/** 提示文本样式 */
const tipsClass = computed(() => {
  const statusMap = {
    default: "text-muted-foreground",
    success: "text-emerald-600",
    warning: "text-amber-600",
    error: "text-destructive",
  }
  return statusMap[computedStatus.value]
})

/** 包装器类名 */
const wrapperClass = computed(() => {
  return cn(
    "relative inline-flex items-center",
    inputVariants({ size: props.size }),
    "p-0 gap-1",
    // 变体
    props.variant === "filled" && "bg-muted border-transparent",
    props.variant === "borderless" && "border-transparent shadow-none",
    props.borderless && "border-transparent shadow-none",
    // 焦点状态
    isFocused.value && "border-ring ring-ring/50 ring-[3px]",
    // 禁用状态
    props.disabled && "opacity-50 cursor-not-allowed bg-muted",
    // 只读状态
    props.readonly && "bg-muted/50",
    // 状态样式
    statusClass.value,
    // 块级
    props.block && "w-full",
    // 自动宽度
    props.autoWidth && "w-auto",
    // 有前置时去掉左圆角
    hasPrepend.value && "rounded-l-none",
    // 有后置时去掉右圆角
    hasAppend.value && "rounded-r-none",
  )
})

/** 输入框类名 */
const inputClass = computed(() => {
  return cn(
    "flex-1 h-full min-w-0 bg-transparent outline-none border-none",
    "placeholder:text-muted-foreground",
    "disabled:cursor-not-allowed",
    // 文本对齐
    props.align === "center" && "text-center",
    props.align === "right" && "text-right",
    // 左右内边距
    !hasPrefix.value && "pl-3",
    !hasSuffix.value && "pr-3",
    // 自定义类名
    props.inputClass
  )
})

// ==================== 防抖处理 ====================

const debouncedEmit = props.debounceDelay
  ? useDebounceFn((value: string | number, event: Event) => {
      emit("input", value, event)
    }, props.debounceDelay)
  : null

// ==================== 自动宽度 ====================

const updateAutoWidth = () => {
  if (!props.autoWidth || !mirrorRef.value || !wrapperRef.value) return
  
  nextTick(() => {
    const mirror = mirrorRef.value!
    const wrapper = wrapperRef.value!
    mirror.textContent = displayValue.value || props.placeholder || ""
    const width = mirror.offsetWidth + 24 // 加上内边距
    wrapper.style.width = `${Math.max(width, 60)}px`
  })
}

watch(() => modelValue.value, updateAutoWidth)
watch(() => props.placeholder, updateAutoWidth)
onMounted(updateAutoWidth)

// ==================== 事件处理 ====================

/** 处理输入 */
const handleInput = (event: Event) => {
  if (isComposing.value) return
  
  const target = event.target as HTMLInputElement
  let value: string | number = target.value
  
  // 字符限制处理
  if (!props.allowInputOverMax && maxLimit.value) {
    if (props.wordSlice) {
      value = props.wordSlice(value, maxLimit.value)
    } else if (props.maxCharacter) {
      // 按字符数截取
      let len = 0
      let result = ""
      for (const char of value) {
        const charLen = char.charCodeAt(0) > 127 ? 2 : 1
        if (len + charLen > maxLimit.value) break
        result += char
        len += charLen
      }
      value = result
    } else if (value.length > maxLimit.value) {
      value = value.slice(0, maxLimit.value)
    }
    target.value = value
  }
  
  // 数字类型转换
  if (props.type === "number" && value !== "") {
    value = Number(value)
  }
  
  modelValue.value = value
  
  if (debouncedEmit) {
    debouncedEmit(value, event)
  } else {
    emit("input", value, event)
  }
}

/** 处理变更（失焦或回车时触发） */
const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value: string | number = target.value
  
  if (props.type === "number" && value !== "") {
    value = Number(value)
  }
  
  // 只有值真正变化时才触发 change
  if (value !== lastCommittedValue.value) {
    lastCommittedValue.value = value
    emit("change", value, event)
  }
}

/** 处理焦点 */
const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit("focus", event)
}

/** 处理失焦 */
const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  handleChange(event)
  emit("blur", event)
}

/** 处理清除 */
const handleClear = (event: MouseEvent) => {
  event.stopPropagation()
  modelValue.value = ""
  lastCommittedValue.value = ""
  emit("clear", event)
  inputRef.value?.focus()
}

/** 处理点击 */
const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    inputRef.value?.focus()
    emit("click", event)
  }
}

/** 处理键盘事件 */
const handleKeydown = (event: KeyboardEvent) => {
  emit("keydown", event)
  if (event.key === "Enter" && !isComposing.value) {
    handleChange(event)
    emit("pressEnter", event)
  }
}

const handleKeyup = (event: KeyboardEvent) => {
  emit("keyup", event)
}

const handleKeypress = (event: KeyboardEvent) => {
  emit("keypress", event)
}

/** 处理中文输入 */
const handleCompositionStart = (event: CompositionEvent) => {
  isComposing.value = true
  emit("compositionstart", event)
}

const handleCompositionEnd = (event: CompositionEvent) => {
  isComposing.value = false
  emit("compositionend", event)
  // 中文输入结束后触发 input
  handleInput(event)
}

/** 切换密码可见性 */
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value
}

// ==================== 暴露方法 ====================

export interface InputFocusOptions {
  cursor?: "start" | "end" | "all"
  preventScroll?: boolean
}

defineExpose({
  /** 获取输入框焦点 */
  focus: (options?: InputFocusOptions) => {
    inputRef.value?.focus({ preventScroll: options?.preventScroll })
    if (options?.cursor && inputRef.value) {
      const len = inputRef.value.value.length
      switch (options.cursor) {
        case "start":
          inputRef.value.setSelectionRange(0, 0)
          break
        case "end":
          inputRef.value.setSelectionRange(len, len)
          break
        case "all":
          inputRef.value.setSelectionRange(0, len)
          break
      }
    }
  },
  /** 失去焦点 */
  blur: () => inputRef.value?.blur(),
  /** 选中输入框内容 */
  select: () => inputRef.value?.select(),
  /** 设置选中范围 */
  setSelectionRange: (
    start: number,
    end: number,
    direction?: "forward" | "backward" | "none"
  ) => inputRef.value?.setSelectionRange(start, end, direction),
  /** 输入框元素引用 */
  inputRef,
})
</script>

<template>
  <div class="inline-flex flex-col" :class="[block && 'w-full']">
    <div class="inline-flex items-stretch" :class="[block && 'w-full']">
      <!-- 前置标签 -->
      <span
        v-if="hasPrepend"
        :class="cn(
          'inline-flex items-center px-3 border border-r-0 rounded-l-md',
          'bg-muted text-muted-foreground text-sm',
          inputVariants({ size }),
          'rounded-r-none w-auto'
        )"
      >
        <slot name="prepend">{{ prepend }}</slot>
      </span>
      
      <!-- 输入框包装器 -->
      <div
        ref="wrapperRef"
        :class="wrapperClass"
        @click="handleClick"
      >
        <!-- 自动宽度镜像元素 -->
        <span
          v-if="autoWidth"
          ref="mirrorRef"
          class="absolute invisible whitespace-pre"
          :style="{ font: 'inherit' }"
        />
        
        <!-- 左侧标签 -->
        <span
          v-if="label"
          class="flex items-center text-muted-foreground pl-3 shrink-0 select-none"
        >
          {{ label }}
        </span>
        
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
          :value="displayValue"
          :type="actualInputType"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          :maxlength="allowInputOverMax ? undefined : maxLength"
          :autofocus="autofocus"
          :autocomplete="autocomplete"
          :name="name"
          :id="id"
          :spellcheck="spellCheck"
          :class="inputClass"
          data-slot="input"
          :aria-invalid="computedStatus === 'error' || undefined"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @keydown="handleKeydown"
          @keyup="handleKeyup"
          @keypress="handleKeypress"
          @compositionstart="handleCompositionStart"
          @compositionend="handleCompositionEnd"
        >
        
        <!-- 后缀区域 -->
        <span
          v-if="hasSuffix"
          class="flex items-center gap-1 text-muted-foreground pr-2 shrink-0"
        >
          <!-- 加载图标 -->
          <Loader2 v-if="loading" class="size-4 animate-spin" />
          
          <!-- 清除按钮 -->
          <button
            v-if="showClearBtn"
            type="button"
            class="flex items-center justify-center hover:text-foreground p-0.5 rounded-sm hover:bg-accent transition-colors"
            tabindex="-1"
            @click="handleClear"
          >
            <XIcon class="size-3.5" />
          </button>
          
          <!-- 密码切换 -->
          <button
            v-if="showPasswordToggle"
            type="button"
            class="flex items-center justify-center hover:text-foreground p-0.5 rounded-sm hover:bg-accent transition-colors"
            tabindex="-1"
            @click="togglePasswordVisibility"
          >
            <EyeOff v-if="passwordVisible" class="size-4" />
            <Eye v-else class="size-4" />
          </button>
          
          <!-- 字数统计 -->
          <span
            v-if="showWordLimit && maxLimit"
            :class="cn(
              'text-xs tabular-nums',
              isOverLimit && 'text-destructive'
            )"
          >
            {{ valueLength }}/{{ maxLimit }}
          </span>
          
          <!-- 自定义后缀 -->
          <slot name="suffix">
            <span v-if="suffix">{{ suffix }}</span>
          </slot>
        </span>
      </div>
      
      <!-- 后置标签 -->
      <span
        v-if="hasAppend"
        :class="cn(
          'inline-flex items-center px-3 border border-l-0 rounded-r-md',
          'bg-muted text-muted-foreground text-sm',
          inputVariants({ size }),
          'rounded-l-none w-auto'
        )"
      >
        <slot name="append">{{ append }}</slot>
      </span>
    </div>
    
    <!-- 底部提示 -->
    <span
      v-if="tips"
      :class="cn('text-xs mt-1.5 px-1', tipsClass)"
    >
      {{ tips }}
    </span>
  </div>
</template>
