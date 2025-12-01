<script setup lang="ts">
/**
 * ============================================================================
 * Select - 原子化选择器组件（shadcn 风格）
 * ============================================================================
 * 
 * 这是一个基础的原子化组件，需要与其他子组件配合使用。
 * 注意：本库遵循 shadcn 原子化结构，不提供 G* 封装组件。
 * 进阶场景（搜索/多选/可创建/远程）请使用 Combobox 原子化组件族。
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
