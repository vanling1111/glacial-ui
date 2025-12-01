<script setup lang="ts">
/**
 * Button 按钮组件
 * 
 * 功能全面超越 Ant Design Vue, Arco Design Vue, TDesign Vue Next, PrimeVue
 * 
 * 特色功能：
 * - 8种变体样式 + 10种尺寸
 * - 点击波纹效果 (Material Design)
 * - 角标支持 (数字/文字/小红点)
 * - 长按事件检测
 * - 点击防抖
 * - 完整的无障碍支持
 */
import type { ButtonVariants, ButtonProps } from "."
import { computed, ref, useSlots, onUnmounted } from "vue"
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"
import { buttonVariants } from "."
import Spinner from "../spinner/Spinner.vue"

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: "default",
  size: "default",
  shape: "default",
  loading: false,
  disabled: false,
  block: false,
  ghost: false,
  danger: false,
  htmlType: "button",
  iconPosition: "left",
  ripple: true,
  badgeType: "default",
  badgeMax: 99,
  as: "button",
  asChild: false,
})

const emit = defineEmits<{
  /** 点击事件 */
  click: [event: MouseEvent]
  /** 长按事件，需设置 longPressDelay */
  longPress: [event: MouseEvent]
}>()

const slots = useSlots()

// ==================== 内部状态 ====================

/** 按钮元素引用 */
const buttonRef = ref<HTMLElement>()

/** 波纹效果列表 */
const ripples = ref<Array<{ id: number; x: number; y: number; size: number }>>([])
let rippleId = 0

/** 长按定时器 */
const longPressTimer = ref<ReturnType<typeof setTimeout>>()

/** 是否触发了长按 */
const isLongPress = ref(false)

/** 上次点击时间（用于防抖） */
const lastClickTime = ref(0)

// ==================== 计算属性 ====================

/** 是否禁用（disabled 或 loading 时都禁用） */
const isDisabled = computed(() => props.disabled || props.loading)

/** 渲染的标签（有 href 时渲染为 a 标签） */
const renderTag = computed(() => {
  if (props.href) return "a"
  return props.as
})

/** 是否只有图标（用于自动调整样式） */
const isIconOnly = computed(() => {
  return slots.icon && !slots.default
})

/** 角标显示内容 */
const badgeContent = computed(() => {
  if (props.badgeType === "dot") return ""
  if (typeof props.badge === "number" && props.badgeMax && props.badge > props.badgeMax) {
    return `${props.badgeMax}+`
  }
  return props.badge
})

/** 按钮类名 */
const buttonClass = computed(() => {
  return cn(
    buttonVariants({ 
      variant: props.danger ? "destructive" : props.variant, 
      size: props.size 
    }),
    // 形状
    props.shape === "circle" && "rounded-full aspect-square p-0",
    props.shape === "round" && "rounded-full",
    // 块级
    props.block && "w-full",
    // 幽灵模式
    props.ghost && "bg-transparent border border-current hover:bg-current/10",
    // 加载中
    props.loading && "relative cursor-wait",
    // 禁用
    isDisabled.value && "pointer-events-none opacity-50",
    // 只有图标时的样式
    isIconOnly.value && props.size === "default" && "size-9 p-0",
    isIconOnly.value && props.size === "sm" && "size-8 p-0",
    isIconOnly.value && props.size === "lg" && "size-10 p-0",
    // 波纹效果需要 overflow-hidden 和 relative
    props.ripple && "overflow-hidden relative",
    // 有角标时需要 relative
    props.badge !== undefined && "relative",
    props.class
  )
})

/** 链接属性（仅 href 模式） */
const linkAttrs = computed(() => {
  if (!props.href) return {}
  return {
    href: isDisabled.value ? undefined : props.href,
    target: props.target,
    rel: props.target === "_blank" ? "noopener noreferrer" : undefined,
  }
})

/** 按钮原生属性 */
const buttonAttrs = computed(() => {
  if (props.href) return {}
  return {
    type: props.htmlType,
    disabled: isDisabled.value,
  }
})

// ==================== 方法 ====================

/**
 * 创建波纹效果
 * @param event 鼠标事件
 */
const createRipple = (event: MouseEvent) => {
  if (!props.ripple || isDisabled.value || !buttonRef.value) return
  
  const button = buttonRef.value
  const rect = button.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height) * 2
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2
  
  const id = rippleId++
  ripples.value.push({ id, x, y, size })
  
  // 动画结束后移除波纹
  setTimeout(() => {
    ripples.value = ripples.value.filter(r => r.id !== id)
  }, 600)
}

/**
 * 处理鼠标按下
 * - 创建波纹效果
 * - 启动长按检测
 */
const handleMouseDown = (event: MouseEvent) => {
  createRipple(event)
  
  // 长按检测
  if (props.longPressDelay && props.longPressDelay > 0) {
    isLongPress.value = false
    longPressTimer.value = setTimeout(() => {
      isLongPress.value = true
      emit("longPress", event)
    }, props.longPressDelay)
  }
}

/**
 * 处理鼠标抬起
 * - 清除长按定时器
 */
const handleMouseUp = () => {
  if (longPressTimer.value) {
    clearTimeout(longPressTimer.value)
    longPressTimer.value = undefined
  }
}

/**
 * 处理点击事件
 * - 禁用状态不触发
 * - 长按后不触发
 * - 支持防抖
 */
const handleClick = (event: MouseEvent) => {
  if (isDisabled.value || isLongPress.value) {
    event.preventDefault()
    event.stopPropagation()
    return
  }
  
  // 防抖检测
  if (props.debounceDelay && props.debounceDelay > 0) {
    const now = Date.now()
    if (now - lastClickTime.value < props.debounceDelay) {
      event.preventDefault()
      return
    }
    lastClickTime.value = now
  }
  
  emit("click", event)
}

// ==================== 生命周期 ====================

onUnmounted(() => {
  if (longPressTimer.value) {
    clearTimeout(longPressTimer.value)
  }
})

// ==================== 暴露方法 ====================

defineExpose({
  /** 获取按钮焦点 */
  focus: () => buttonRef.value?.focus(),
  /** 失去焦点 */
  blur: () => buttonRef.value?.blur(),
  /** 按钮元素引用 */
  buttonRef,
})
</script>

<template>
  <Primitive
    ref="buttonRef"
    :as="renderTag"
    :as-child="asChild"
    :class="buttonClass"
    v-bind="{ ...linkAttrs, ...buttonAttrs }"
    data-slot="button"
    :data-loading="loading || undefined"
    :data-disabled="isDisabled || undefined"
    @click="handleClick"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseUp"
  >
    <!-- 波纹效果层 -->
    <span
      v-for="ripple in ripples"
      :key="ripple.id"
      class="absolute rounded-full bg-current opacity-20 animate-ripple pointer-events-none"
      :style="{
        left: `${ripple.x}px`,
        top: `${ripple.y}px`,
        width: `${ripple.size}px`,
        height: `${ripple.size}px`,
      }"
    />
    
    <!-- 加载状态 -->
    <template v-if="loading">
      <span class="absolute inset-0 flex items-center justify-center z-10">
        <Spinner class="size-4 animate-spin" />
      </span>
      <span class="invisible flex items-center gap-2">
        <slot name="icon" v-if="iconPosition === 'left'" />
        <slot />
        <slot name="icon" v-if="iconPosition === 'right'" />
      </span>
    </template>
    
    <!-- 正常状态内容 -->
    <template v-else>
      <!-- 左侧图标插槽 -->
      <slot name="icon" v-if="iconPosition === 'left'" />
      <!-- 默认内容插槽 -->
      <slot />
      <!-- 右侧图标插槽 -->
      <slot name="icon" v-if="iconPosition === 'right'" />
      <!-- 后缀插槽 -->
      <slot name="suffix" />
    </template>
    
    <!-- 角标 -->
    <span
      v-if="badge !== undefined"
      :class="cn(
        'absolute z-10 flex items-center justify-center',
        'text-xs font-medium text-white bg-destructive',
        'transform translate-x-1/2 -translate-y-1/2',
        badgeType === 'dot' 
          ? 'size-2 rounded-full' 
          : 'min-w-[18px] h-[18px] px-1 rounded-full',
      )"
      :style="{
        top: badgeOffset ? `${badgeOffset[1]}px` : '0',
        right: badgeOffset ? `${badgeOffset[0]}px` : '0',
      }"
    >
      {{ badgeContent }}
    </span>
  </Primitive>
</template>

<style>
/* 波纹动画 */
@keyframes ripple {
  to {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-ripple {
  animation: ripple 0.6s linear;
}
</style>
