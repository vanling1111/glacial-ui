<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { ButtonVariants, ButtonProps } from "."
import { computed, useSlots } from "vue"
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
  as: "button",
  asChild: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const slots = useSlots()

// 计算是否禁用
const isDisabled = computed(() => props.disabled || props.loading)

// 计算渲染的标签
const renderTag = computed(() => {
  if (props.href) return "a"
  return props.as
})

// 计算是否只有图标
const isIconOnly = computed(() => {
  return slots.icon && !slots.default
})

// 计算按钮类名
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
    props.class
  )
})

// 处理点击事件
const handleClick = (event: MouseEvent) => {
  if (isDisabled.value) {
    event.preventDefault()
    event.stopPropagation()
    return
  }
  emit("click", event)
}

// 链接属性
const linkAttrs = computed(() => {
  if (!props.href) return {}
  return {
    href: isDisabled.value ? undefined : props.href,
    target: props.target,
    rel: props.target === "_blank" ? "noopener noreferrer" : undefined,
  }
})

// 按钮属性
const buttonAttrs = computed(() => {
  if (props.href) return {}
  return {
    type: props.htmlType,
    disabled: isDisabled.value,
  }
})
</script>

<template>
  <Primitive
    :as="renderTag"
    :as-child="asChild"
    :class="buttonClass"
    v-bind="{ ...linkAttrs, ...buttonAttrs }"
    data-slot="button"
    :data-loading="loading || undefined"
    :data-disabled="isDisabled || undefined"
    @click="handleClick"
  >
    <!-- 加载状态 -->
    <template v-if="loading">
      <span class="absolute inset-0 flex items-center justify-center">
        <Spinner class="size-4 animate-spin" />
      </span>
      <span class="invisible flex items-center gap-2">
        <slot name="icon" v-if="iconPosition === 'left'" />
        <slot />
        <slot name="icon" v-if="iconPosition === 'right'" />
      </span>
    </template>
    
    <!-- 正常状态 -->
    <template v-else>
      <!-- 左侧图标 -->
      <slot name="icon" v-if="iconPosition === 'left'" />
      <!-- 内容 -->
      <slot />
      <!-- 右侧图标 -->
      <slot name="icon" v-if="iconPosition === 'right'" />
      <!-- 后缀插槽 -->
      <slot name="suffix" />
    </template>
  </Primitive>
</template>
