import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Input } from "./Input.vue"

/**
 * Input 输入框组件
 * 
 * @description
 * 功能全面超越 Ant Design Vue, Arco Design Vue, TDesign Vue Next, PrimeVue
 * 
 * ## 核心功能
 * - ✅ 5种尺寸 (size): xs, sm, default, lg, xl
 * - ✅ 3种变体 (variant): default, filled, borderless
 * - ✅ 4种状态 (status): default, success, warning, error
 * - ✅ 双向绑定 v-model
 * - ✅ 默认值 defaultValue（非受控）
 * 
 * ## 前后缀功能
 * - ✅ 前缀插槽 (slot="prefix") / 前缀文本 (prefix)
 * - ✅ 后缀插槽 (slot="suffix") / 后缀文本 (suffix)
 * - ✅ 前置标签 (slot="prepend") / 前置文本 (prepend) - 在输入框外部
 * - ✅ 后置标签 (slot="append") / 后置文本 (append) - 在输入框外部
 * - ✅ 前缀图标 (prefixIcon) / 后缀图标 (suffixIcon)
 * - ✅ 左侧标签 (label) - TDesign 特色
 * 
 * ## 清空与字数
 * - ✅ 允许清空 (allowClear)
 * - ✅ 显示字数统计 (showWordLimit)
 * - ✅ 最大长度 (maxLength)
 * - ✅ 最大字符数 (maxCharacter) - 中文算2个字符
 * - ✅ 自定义字符长度计算 (wordLength)
 * - ✅ 自定义字符截取 (wordSlice)
 * - ✅ 超出最大长度后是否允许继续输入 (allowInputOverMax)
 * 
 * ## 状态与样式
 * - ✅ 禁用 (disabled)
 * - ✅ 只读 (readonly)
 * - ✅ 错误状态 (error) / 状态 (status)
 * - ✅ 加载状态 (loading) - Ant Design 特色
 * - ✅ 无边框 (borderless)
 * - ✅ 填充变体 (variant="filled")
 * - ✅ 块级宽度 (block / fluid)
 * 
 * ## 高级功能（超越竞品）
 * - ✅ 文本对齐 (align): left, center, right
 * - ✅ 宽度自适应内容 (autoWidth)
 * - ✅ 格式化显示 (format) - 不改变实际值
 * - ✅ 底部提示文本 (tips) - 支持不同状态样式
 * - ✅ 拼写检查 (spellCheck)
 * - ✅ 密码显示切换 (showPassword)
 * - ✅ 输入防抖 (debounceDelay)
 * - ✅ 中文输入法组合事件支持
 * 
 * ## 事件
 * - ✅ input - 输入时触发
 * - ✅ change - 值变化时触发（失焦或回车）
 * - ✅ focus / blur - 焦点事件
 * - ✅ pressEnter - 回车键
 * - ✅ clear - 清空按钮点击
 * - ✅ click - 点击输入框
 * - ✅ compositionstart / compositionend - 中文输入法事件
 * - ✅ keydown / keyup / keypress - 键盘事件
 * 
 * ## 暴露方法
 * - focus(options?) - 获取焦点，支持光标位置
 * - blur() - 失去焦点
 * - select() - 选中内容
 * - setSelectionRange(start, end, direction?) - 设置选中范围
 * - inputRef - 输入框元素引用
 * 
 * @example
 * ```vue
 * <!-- 基础用法 -->
 * <Input v-model="value" placeholder="请输入" />
 * 
 * <!-- 带前后缀 -->
 * <Input v-model="value" prefix="¥" suffix="元" />
 * <Input v-model="value">
 *   <template #prefix><SearchIcon /></template>
 *   <template #suffix><LoadingIcon v-if="loading" /></template>
 * </Input>
 * 
 * <!-- 带前后置标签 -->
 * <Input v-model="url" prepend="https://" append=".com" />
 * 
 * <!-- 字数统计 -->
 * <Input v-model="value" :max-length="100" show-word-limit />
 * 
 * <!-- 状态 -->
 * <Input v-model="value" status="error" tips="请输入正确的格式" />
 * <Input v-model="value" :loading="isSearching" />
 * 
 * <!-- 密码输入 -->
 * <Input v-model="password" type="password" show-password />
 * 
 * <!-- 格式化显示 -->
 * <Input v-model="phone" :format="v => v.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')" />
 * 
 * <!-- 宽度自适应 -->
 * <Input v-model="tag" auto-width placeholder="输入标签" />
 * ```
 */
export interface InputProps {
  // ==================== 基础属性 ====================
  
  /** 
   * 输入框类型
   * @default "text"
   */
  type?: "text" | "password" | "email" | "number" | "tel" | "url" | "search" | "date" | "time" | "datetime-local"
  
  /** 
   * 输入框尺寸
   * @default "default"
   */
  size?: "xs" | "sm" | "default" | "lg" | "xl"
  
  /**
   * 输入框变体
   * - default: 默认带边框
   * - filled: 填充背景
   * - borderless: 无边框
   * @default "default"
   */
  variant?: "default" | "filled" | "borderless"
  
  /** 
   * 绑定值 (v-model)
   */
  modelValue?: string | number
  
  /** 
   * 默认值（非受控状态）
   */
  defaultValue?: string | number
  
  /** 
   * 提示文字
   */
  placeholder?: string
  
  /** 
   * 原生 name 属性
   */
  name?: string
  
  /** 
   * 原生 id 属性
   */
  id?: string
  
  // ==================== 前后缀 ====================
  
  /** 
   * 前缀内容（输入框内部左侧）
   */
  prefix?: string
  
  /** 
   * 后缀内容（输入框内部右侧）
   */
  suffix?: string
  
  /**
   * 前置标签（输入框外部左侧）
   */
  prepend?: string
  
  /**
   * 后置标签（输入框外部右侧）
   */
  append?: string
  
  /**
   * 左侧标签文本（TDesign 特色）
   */
  label?: string
  
  // ==================== 清空与字数 ====================
  
  /** 
   * 是否允许清空
   * @default false
   */
  allowClear?: boolean
  
  /** 
   * 最大长度（字符数）
   */
  maxLength?: number
  
  /**
   * 最大字符数（中文算2个字符）
   */
  maxCharacter?: number
  
  /** 
   * 是否显示字数统计
   * @default false
   */
  showWordLimit?: boolean
  
  /** 
   * 字符长度的计算方法
   */
  wordLength?: (value: string) => number
  
  /**
   * 字符截取方法，配合 wordLength 使用
   */
  wordSlice?: (value: string, maxLength: number) => string
  
  /**
   * 超出 maxLength 或 maxCharacter 后是否允许继续输入
   * @default false
   */
  allowInputOverMax?: boolean
  
  // ==================== 状态 ====================
  
  /** 
   * 是否禁用
   * @default false
   */
  disabled?: boolean
  
  /** 
   * 是否只读
   * @default false
   */
  readonly?: boolean
  
  /** 
   * 是否为错误状态（简写，等同于 status="error"）
   * @default false
   */
  error?: boolean
  
  /**
   * 输入框状态
   * @default "default"
   */
  status?: "default" | "success" | "warning" | "error"
  
  /**
   * 是否加载中（显示加载图标）
   * @default false
   */
  loading?: boolean
  
  // ==================== 样式 ====================
  
  /**
   * 无边框模式
   * @default false
   */
  borderless?: boolean
  
  /**
   * 块级宽度（100%）
   * @default false
   */
  block?: boolean
  
  /**
   * 文本对齐方式
   * @default "left"
   */
  align?: "left" | "center" | "right"
  
  /**
   * 宽度随内容自适应
   * @default false
   */
  autoWidth?: boolean
  
  // ==================== 高级功能 ====================
  
  /**
   * 格式化显示值（不改变实际值）
   * 注意：type="number" 时不要使用
   */
  format?: (value: string) => string
  
  /**
   * 底部提示文本，会根据 status 显示不同样式
   */
  tips?: string
  
  /**
   * 是否开启拼写检查
   * @default false
   */
  spellCheck?: boolean
  
  /**
   * 是否显示密码切换按钮（仅 type="password" 时有效）
   * @default false
   */
  showPassword?: boolean
  
  /**
   * 输入防抖延迟（毫秒）
   */
  debounceDelay?: number
  
  /** 
   * 是否自动获取焦点
   * @default false
   */
  autofocus?: boolean
  
  /** 
   * 自动完成
   */
  autocomplete?: "on" | "off" | "name" | "email" | "username" | "new-password" | "current-password" | "tel" | "url" | string
  
  /** 
   * 自定义类名
   */
  class?: string
  
  /**
   * 输入框内部类名
   */
  inputClass?: string
}

/**
 * 输入框变体样式定义
 * 使用 class-variance-authority 管理变体
 */
export const inputVariants = cva(
  [
    "flex w-full rounded-md border bg-background text-base shadow-xs transition-[color,box-shadow] outline-none",
    "placeholder:text-muted-foreground",
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  ],
  {
    variants: {
      /**
       * 输入框尺寸（5种）
       */
      size: {
        xs: "h-7 text-xs px-2",
        sm: "h-8 text-sm px-2.5",
        default: "h-9 text-base px-3",
        lg: "h-10 text-base px-3.5",
        xl: "h-12 text-lg px-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)

export type InputVariants = VariantProps<typeof inputVariants>
