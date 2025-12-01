<script setup lang="ts">
/**
 * Button 按钮组件
 * 
 * shadcn 风格的简洁按钮组件
 * 增强功能通过子组件/composable 提供：
 * - ButtonLoader - 加载状态
 * - ButtonIcon - 图标容器
 * - ButtonBadge - 角标
 * - useRipple - 波纹效果
 * - useLongPress - 长按检测
 * - useDebounceClick - 点击防抖
 */
import type { HTMLAttributes } from "vue"
import type { PrimitiveProps } from "reka-ui"
import type { ButtonVariants } from "."
import { computed } from "vue"
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"
import { buttonVariants } from "."

export type ButtonHtmlType = "submit" | "reset" | "button"

interface Props extends PrimitiveProps {
  /** 按钮变体 */
  variant?: ButtonVariants["variant"]
  /** 按钮尺寸 */
  size?: ButtonVariants["size"]
  /** 是否有阴影效果（PrimeVue raised 特色） */
  raised?: boolean
  /** 是否块级按钮 */
  block?: boolean
  /** 是否圆角按钮 */
  rounded?: boolean
  /** 是否加载中 */
  loading?: boolean
  /** 关联的 form id（TDesign 特色） */
  form?: string
  /** 自动获取焦点（Arco 特色） */
  autofocus?: boolean
  /** 
   * 跳转链接，设置后渲染为 <a> 标签（Arco/Antd/TDesign 特色）
   */
  href?: string
  /** 链接打开方式 */
  target?: "_blank" | "_self" | "_parent" | "_top"
  /** 
   * 按钮原生 type 属性（Arco/Antd/TDesign/PrimeVue 都支持）
   * @default "button"
   */
  htmlType?: ButtonHtmlType
  /** 是否禁用 */
  disabled?: boolean
  /** 自定义类名 */
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
  raised: false,
  block: false,
  rounded: false,
  loading: false,
  autofocus: false,
  htmlType: "button",
  disabled: false,
})

// 计算实际渲染的标签
const computedAs = computed(() => {
  if (props.asChild) return undefined
  if (props.href) return "a"
  return props.as
})

// 计算是否禁用（loading 时也禁用）
const isDisabled = computed(() => props.disabled || props.loading)
</script>

<template>
  <Primitive
    :as="computedAs"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size, raised, block, rounded }), props.class)"
    :type="!href ? htmlType : undefined"
    :form="form"
    :autofocus="autofocus"
    :href="href"
    :target="href ? target : undefined"
    :disabled="!href ? isDisabled : undefined"
    :aria-disabled="href && isDisabled ? true : undefined"
    :data-loading="loading || undefined"
    :data-disabled="isDisabled || undefined"
    data-slot="button"
  >
    <slot />
  </Primitive>
</template>
