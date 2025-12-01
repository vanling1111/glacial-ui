import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

// ============================================================================
// 组件导出
// ============================================================================

/**
 * 增强版 Select 组件（推荐使用）
 * 
 * 功能完整，开箱即用，类似 Ant Design / Arco Design 的使用体验
 * 支持：options 数据驱动、搜索、多选、远程加载、虚拟滚动等
 * 
 * @example
 * ```vue
 * <GSelect v-model="value" :options="options" searchable multiple />
 * ```
 */
export { default as GSelect } from "./GSelect.vue"

/**
 * 原子化 Select 组件（shadcn 风格）
 * 
 * 高度可定制，需要手动组合子组件
 * 适合需要完全控制 DOM 结构的复杂场景
 * 
 * @example
 * ```vue
 * <Select v-model="value">
 *   <SelectTrigger>
 *     <SelectValue placeholder="请选择" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="apple">苹果</SelectItem>
 *     <SelectItem value="banana">香蕉</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 */
export { default as Select } from "./Select.vue"
export { default as SelectContent } from "./SelectContent.vue"
export { default as SelectGroup } from "./SelectGroup.vue"
export { default as SelectItem } from "./SelectItem.vue"
export { default as SelectItemText } from "./SelectItemText.vue"
export { default as SelectLabel } from "./SelectLabel.vue"
export { default as SelectScrollDownButton } from "./SelectScrollDownButton.vue"
export { default as SelectScrollUpButton } from "./SelectScrollUpButton.vue"
export { default as SelectSeparator } from "./SelectSeparator.vue"
export { default as SelectTrigger } from "./SelectTrigger.vue"
export { default as SelectValue } from "./SelectValue.vue"

/**
 * GSelect 增强版选择器组件
 * 
 * @description
 * 功能全面超越 Ant Design Vue, Arco Design Vue, TDesign Vue Next, PrimeVue
 * 
 * ## 核心功能
 * - ✅ 5种尺寸 (size): xs, sm, default, lg, xl
 * - ✅ 3种变体 (variant): default, filled, borderless
 * - ✅ 4种状态 (status): default, success, warning, error
 * - ✅ 双向绑定 v-model
 * - ✅ options 数据化配置（无需手动构建选项）
 * 
 * ## 选择模式
 * - ✅ 单选模式（默认）
 * - ✅ 多选模式 (multiple)
 * - ✅ 标签模式 (tags) - 可创建新选项
 * - ✅ 最大选择数限制 (max)
 * 
 * ## 搜索与过滤
 * - ✅ 可搜索 (searchable)
 * - ✅ 自定义过滤函数 (filterOption)
 * - ✅ 搜索防抖 (searchDelay)
 * - ✅ 允许创建新选项 (allowCreate)
 * - ✅ 远程搜索 (remote) + onSearch 事件
 * 
 * ## 清空与加载
 * - ✅ 允许清空 (allowClear)
 * - ✅ 加载状态 (loading)
 * - ✅ 加载更多 (loadMore) - 无限滚动
 * 
 * ## 下拉框控制
 * - ✅ 受控显示 (open / v-model:open)
 * - ✅ 默认展开 (defaultOpen)
 * - ✅ 弹出位置 (placement)
 * - ✅ 虚拟滚动 (virtual) - 大数据量优化
 * 
 * ## 多选特性
 * - ✅ 最大标签数 (maxTagCount) - 超出折叠
 * - ✅ 折叠文本自定义 (maxTagPlaceholder)
 * - ✅ 标签可删除
 * - ✅ 全选/反选
 * 
 * ## 字段映射
 * - ✅ 自定义字段名 (fieldNames) - label, value, disabled, children
 * 
 * ## 分组与空状态
 * - ✅ 选项分组 (通过 options 配置)
 * - ✅ 空状态自定义 (empty / slot="empty")
 * - ✅ 头部内容 (slot="header")
 * - ✅ 底部内容 (slot="footer")
 * 
 * ## 样式与布局
 * - ✅ 左侧标签 (label)
 * - ✅ 前缀图标 (prefixIcon)
 * - ✅ 后缀图标 (suffixIcon)
 * - ✅ 宽度自适应 (autoWidth)
 * - ✅ 块级宽度 (block)
 * - ✅ 底部提示 (tips)
 * 
 * ## 事件
 * - ✅ change - 值变化
 * - ✅ search - 搜索输入
 * - ✅ focus / blur - 焦点事件
 * - ✅ clear - 清空
 * - ✅ visibleChange - 下拉框显示状态变化
 * - ✅ loadMore - 滚动到底部加载更多
 * 
 * ## 暴露方法
 * - focus() - 获取焦点
 * - blur() - 失去焦点
 * - open() - 打开下拉框
 * - close() - 关闭下拉框
 * 
 * @example
 * ```vue
 * <!-- 基础用法 -->
 * <GSelect v-model="value" :options="options" placeholder="请选择" />
 * 
 * <!-- 多选 -->
 * <GSelect v-model="values" :options="options" multiple />
 * 
 * <!-- 可搜索 -->
 * <GSelect v-model="value" :options="options" searchable />
 * 
 * <!-- 允许创建 -->
 * <GSelect v-model="value" :options="options" searchable allow-create />
 * 
 * <!-- 远程搜索 -->
 * <GSelect 
 *   v-model="value" 
 *   :options="options" 
 *   searchable 
 *   remote 
 *   :loading="loading"
 *   @search="handleSearch" 
 * />
 * 
 * <!-- 分组 -->
 * <GSelect v-model="value" :options="groupedOptions" />
 * 
 * <!-- 自定义字段 -->
 * <GSelect 
 *   v-model="value" 
 *   :options="options" 
 *   :field-names="{ label: 'name', value: 'id' }" 
 * />
 * 
 * <!-- 状态 -->
 * <GSelect v-model="value" :options="options" status="error" tips="请选择一个选项" />
 * ```
 */

// ==================== 类型定义 ====================

/**
 * 选项数据结构
 */
export interface SelectOption {
  /** 选项显示文本 */
  label?: string
  /** 选项值 */
  value: string | number
  /** 是否禁用 */
  disabled?: boolean
  /** 分组子选项 */
  children?: SelectOption[]
  /** 自定义渲染数据 */
  [key: string]: any
}

/**
 * 字段名映射
 */
export interface SelectFieldNames {
  /** 标签字段名 */
  label?: string
  /** 值字段名 */
  value?: string
  /** 禁用字段名 */
  disabled?: string
  /** 子选项字段名 */
  children?: string
}

/**
 * GSelect Props 接口
 */
export interface GSelectProps {
  // ==================== 基础属性 ====================
  
  /**
   * 绑定值 (v-model)
   */
  modelValue?: string | number | (string | number)[]
  
  /**
   * 默认值（非受控）
   */
  defaultValue?: string | number | (string | number)[]
  
  /**
   * 选项数据
   */
  options?: SelectOption[]
  
  /**
   * 占位符
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
  
  // ==================== 选择模式 ====================
  
  /**
   * 是否多选
   * @default false
   */
  multiple?: boolean
  
  /**
   * 标签模式（多选 + 可创建）
   * @default false
   */
  tags?: boolean
  
  /**
   * 最大选择数量（多选时有效），0 表示不限制
   * @default 0
   */
  max?: number
  
  // ==================== 尺寸与样式 ====================
  
  /**
   * 选择器尺寸
   * @default "default"
   */
  size?: "xs" | "sm" | "default" | "lg" | "xl"
  
  /**
   * 选择器变体
   * @default "default"
   */
  variant?: "default" | "filled" | "borderless"
  
  /**
   * 状态
   * @default "default"
   */
  status?: "default" | "success" | "warning" | "error"
  
  /**
   * 是否为错误状态（简写）
   * @default false
   */
  error?: boolean
  
  /**
   * 无边框模式
   * @default false
   */
  borderless?: boolean
  
  /**
   * 块级宽度
   * @default false
   */
  block?: boolean
  
  /**
   * 宽度自适应内容
   * @default false
   */
  autoWidth?: boolean
  
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
   * 是否加载中
   * @default false
   */
  loading?: boolean
  
  // ==================== 搜索与过滤 ====================
  
  /**
   * 是否可搜索
   * @default false
   */
  searchable?: boolean
  
  /**
   * 自定义过滤函数
   */
  filterOption?: (inputValue: string, option: SelectOption) => boolean
  
  /**
   * 搜索防抖延迟（毫秒）
   * @default 300
   */
  searchDelay?: number
  
  /**
   * 是否允许创建新选项
   * @default false
   */
  allowCreate?: boolean
  
  /**
   * 是否为远程搜索模式
   * @default false
   */
  remote?: boolean
  
  // ==================== 清空 ====================
  
  /**
   * 是否允许清空
   * @default false
   */
  allowClear?: boolean
  
  // ==================== 下拉框 ====================
  
  /**
   * 下拉框是否可见（受控）
   */
  open?: boolean
  
  /**
   * 下拉框默认是否可见
   * @default false
   */
  defaultOpen?: boolean
  
  /**
   * 弹出位置
   * @default "bottom"
   */
  placement?: "top" | "bottom"
  
  /**
   * 是否开启虚拟滚动
   * @default false
   */
  virtual?: boolean
  
  /**
   * 虚拟滚动时的列表高度
   * @default 256
   */
  listHeight?: number
  
  // ==================== 多选特性 ====================
  
  /**
   * 最大显示的标签数量，超出部分折叠
   * @default 0 (不限制)
   */
  maxTagCount?: number
  
  /**
   * 折叠标签的占位文本
   */
  maxTagPlaceholder?: string | ((omittedValues: (string | number)[]) => string)
  
  // ==================== 字段映射 ====================
  
  /**
   * 自定义字段名
   */
  fieldNames?: SelectFieldNames
  
  // ==================== 布局 ====================
  
  /**
   * 左侧标签
   */
  label?: string
  
  /**
   * 底部提示文本
   */
  tips?: string
  
  /**
   * 空状态文本
   */
  empty?: string
  
  /**
   * 自定义类名
   */
  class?: string
  
  /**
   * 自动获取焦点
   * @default false
   */
  autofocus?: boolean
}

/**
 * 选择器触发器变体样式
 */
export const selectTriggerVariants = cva(
  [
    "flex h-9 w-full items-center justify-between gap-2 rounded-md border bg-background px-3 py-2",
    "text-sm shadow-xs transition-[color,box-shadow] outline-none",
    "placeholder:text-muted-foreground",
    "focus:border-ring focus:ring-ring/50 focus:ring-[3px]",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "[&>span]:line-clamp-1",
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  ],
  {
    variants: {
      size: {
        xs: "h-7 text-xs px-2",
        sm: "h-8 text-sm px-2.5",
        default: "h-9 text-sm px-3",
        lg: "h-10 text-base px-3.5",
        xl: "h-12 text-lg px-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export type SelectTriggerVariants = VariantProps<typeof selectTriggerVariants>
