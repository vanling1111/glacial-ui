import type { VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "@/components/button"
import { cva } from "class-variance-authority"

/**
 * InputGroup 输入框组组件族
 * 
 * shadcn 风格的原子化输入框组合组件，功能超越 Arco/Antd/TDesign/PrimeVue
 * 
 * ## 原子组件
 * - InputGroup - 包装器
 * - InputGroupAddon - 前后缀容器（支持 4 方向，独有）
 * - InputGroupButton - 按钮
 * - InputGroupInput - 输入框
 * - InputGroupText - 文本
 * - InputGroupTextarea - 文本域
 * 
 * ## 组合组件（预组合的便捷组件）
 * - InputPassword - 密码输入框（内置显示/隐藏切换）
 * - InputSearch - 搜索输入框（内置搜索图标、清除、loading）
 * - InputClearable - 可清除输入框
 * - InputWithLimit - 带字数限制输入框
 * 
 * ## 独有功能
 * - InputGroupAddon 支持 4 方向（inline-start/end, block-start/end）
 * - 组合组件开箱即用，也可用原子组件自由组合
 * 
 * @example
 * ```vue
 * <!-- 使用组合组件 -->
 * <InputPassword v-model="password" placeholder="请输入密码" />
 * <InputSearch v-model="keyword" @search="handleSearch" />
 * <InputClearable v-model="value" />
 * <InputWithLimit v-model="bio" :max-length="100" />
 * 
 * <!-- 使用原子组件自由组合 -->
 * <InputGroup>
 *   <InputGroupAddon><SearchIcon /></InputGroupAddon>
 *   <InputGroupInput v-model="value" placeholder="搜索" />
 *   <InputGroupAddon align="inline-end"><Kbd>⌘K</Kbd></InputGroupAddon>
 * </InputGroup>
 * ```
 */
// 原子组件
export { default as InputGroup } from "./InputGroup.vue"
export { default as InputGroupAddon } from "./InputGroupAddon.vue"
export { default as InputGroupButton } from "./InputGroupButton.vue"
export { default as InputGroupInput } from "./InputGroupInput.vue"
export { default as InputGroupText } from "./InputGroupText.vue"
export { default as InputGroupTextarea } from "./InputGroupTextarea.vue"

// 组合组件
export { default as InputPassword } from "./InputPassword.vue"
export { default as InputSearch } from "./InputSearch.vue"
export { default as InputClearable } from "./InputClearable.vue"
export { default as InputWithLimit } from "./InputWithLimit.vue"

export const inputGroupAddonVariants = cva(
  "text-muted-foreground flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium select-none [&>svg:not([class*='size-'])]:size-4 [&>kbd]:rounded-[calc(var(--radius)-5px)] group-data-[disabled=true]/input-group:opacity-50",
  {
    variants: {
      align: {
        "inline-start":
          "order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]",
        "inline-end":
          "order-last pr-3 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]",
        "block-start":
          "order-first w-full justify-start px-3 pt-3 [.border-b]:pb-3 group-has-[>input]/input-group:pt-2.5",
        "block-end":
          "order-last w-full justify-start px-3 pb-3 [.border-t]:pt-3 group-has-[>input]/input-group:pb-2.5",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  },
)

export type InputGroupVariants = VariantProps<typeof inputGroupAddonVariants>

export const inputGroupButtonVariants = cva(
  "text-sm shadow-none flex gap-2 items-center",
  {
    variants: {
      size: {
        "xs": "h-6 gap-1 px-2 rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-3.5 has-[>svg]:px-2",
        "sm": "h-8 px-2.5 gap-1.5 rounded-md has-[>svg]:px-2.5",
        "icon-xs": "size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0",
        "icon-sm": "size-8 p-0 has-[>svg]:p-0",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  },
)

export type InputGroupButtonVariants = VariantProps<typeof inputGroupButtonVariants>

export interface InputGroupButtonProps {
  variant?: ButtonVariants["variant"]
  size?: InputGroupButtonVariants["size"]
  class?: HTMLAttributes["class"]
}
