<script setup lang="ts">
/**
 * ============================================================================
 * Select - 原子化选择器组件（shadcn 风格）
 * ============================================================================
 * 
 * 这是一个基础的原子化组件，需要与其他子组件配合使用。
 * 如果你需要开箱即用的完整功能，请使用增强版 GSelect 组件。
 * 
 * ## 与增强版组件的区别
 * 
 * | 特性 | Select (原子化) | GSelect (增强版) |
 * |-----|----------------|-----------------|
 * | 使用方式 | 手动组合子组件 | options 数据驱动 |
 * | 可定制性 | 完全控制 DOM | 通过插槽定制 |
 * | 内置功能 | 基础选择 | 搜索/多选/远程等 |
 * | 适用场景 | 复杂定制场景 | 常规场景 |
 * 
 * ## 子组件列表
 * - SelectTrigger - 触发器
 * - SelectValue - 显示选中值
 * - SelectContent - 下拉内容容器
 * - SelectItem - 选项
 * - SelectGroup - 选项分组
 * - SelectLabel - 分组标签
 * - SelectSeparator - 分隔符
 * 
 * @example
 * ```vue
 * <Select v-model="value">
 *   <SelectTrigger>
 *     <SelectValue placeholder="请选择" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectGroup>
 *       <SelectLabel>水果</SelectLabel>
 *       <SelectItem value="apple">苹果</SelectItem>
 *       <SelectItem value="banana">香蕉</SelectItem>
 *     </SelectGroup>
 *   </SelectContent>
 * </Select>
 * ```
 */
import type { SelectRootEmits, SelectRootProps } from "reka-ui"
import { SelectRoot, useForwardPropsEmits } from "reka-ui"

const props = defineProps<SelectRootProps>()
const emits = defineEmits<SelectRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <SelectRoot
    v-slot="slotProps"
    data-slot="select"
    v-bind="forwarded"
  >
    <slot v-bind="slotProps" />
  </SelectRoot>
</template>
