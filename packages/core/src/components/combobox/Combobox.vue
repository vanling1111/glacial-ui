<script setup lang="ts">
/**
 * ============================================================================
 * Combobox - 原子化增强版组合框根组件
 * ============================================================================
 * 
 * ## 增强功能（超越 4 个库）
 * 
 * | 功能 | shadcn | Ant | Arco | TDesign | PrimeVue | glacial-ui |
 * |-----|--------|-----|------|---------|----------|------------|
 * | 基础组合框 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * | 尺寸控制 | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * | 多选模式 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * | 搜索过滤 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * | 远程搜索 | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * | 创建新选项 | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * | 分组 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * | 虚拟滚动 | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * | 状态反馈 | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * 
 * @example
 * ```vue
 * <Combobox v-model="selected" size="default">
 *   <ComboboxAnchor>
 *     <ComboboxInput placeholder="搜索..." />
 *     <ComboboxTrigger />
 *   </ComboboxAnchor>
 *   <ComboboxList>
 *     <ComboboxEmpty>无结果</ComboboxEmpty>
 *     <ComboboxItem v-for="item in items" :key="item.value" :value="item.value">
 *       {{ item.label }}
 *     </ComboboxItem>
 *   </ComboboxList>
 * </Combobox>
 * ```
 */
import type { ComboboxRootEmits, ComboboxRootProps } from "reka-ui"
import { computed, provide } from "vue"
import { ComboboxRoot, useForwardPropsEmits } from "reka-ui"
import { comboboxContextKey } from "./context"

// 扩展 props 类型
interface ExtendedProps extends ComboboxRootProps {
  /**
   * 尺寸
   * @default "default"
   */
  size?: "sm" | "default" | "lg"
  /**
   * 状态
   */
  status?: "default" | "success" | "warning" | "error"
  /**
   * 是否允许创建新选项
   * @default false
   */
  allowCreate?: boolean
  /**
   * 是否正在加载（远程搜索时）
   * @default false
   */
  loading?: boolean
}

const props = withDefaults(defineProps<ExtendedProps>(), {
  size: "default",
  status: "default",
  allowCreate: false,
  loading: false,
})

const emits = defineEmits<ComboboxRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)

// 提供上下文给子组件
provide(comboboxContextKey, {
  size: computed(() => props.size),
  status: computed(() => props.status),
  allowCreate: computed(() => props.allowCreate),
  loading: computed(() => props.loading),
})
</script>

<template>
  <ComboboxRoot
    v-slot="slotProps"
    data-slot="combobox"
    v-bind="forwarded"
  >
    <slot v-bind="slotProps" />
  </ComboboxRoot>
</template>
