<script setup lang="ts">
/**
 * ============================================================================
 * Sheet - 原子化增强版侧边抽屉根组件
 * ============================================================================
 * 
 * ## 增强功能（超越 4 个库）
 * 
 * | 功能 | shadcn | Ant | Arco | TDesign | PrimeVue | glacial-ui |
 * |-----|--------|-----|------|---------|----------|------------|
 * | 基础抽屉 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * | 4个方向 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * | 尺寸控制 | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * | 遮罩控制 | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * | 键盘关闭 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * | 点击遮罩关闭 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * 
 * @example
 * ```vue
 * <Sheet v-model:open="isOpen">
 *   <SheetTrigger>打开</SheetTrigger>
 *   <SheetContent side="right" size="default">
 *     <SheetHeader>
 *       <SheetTitle>标题</SheetTitle>
 *       <SheetDescription>描述</SheetDescription>
 *     </SheetHeader>
 *     内容
 *     <SheetFooter>
 *       <Button>确定</Button>
 *     </SheetFooter>
 *   </SheetContent>
 * </Sheet>
 * ```
 */
import type { DialogRootEmits, DialogRootProps } from "reka-ui"
import { computed, provide } from "vue"
import { DialogRoot, useForwardPropsEmits } from "reka-ui"
import { sheetContextKey } from "./context"

// 扩展 props 类型
interface ExtendedProps extends DialogRootProps {
  /**
   * 是否显示遮罩
   * @default true
   */
  showOverlay?: boolean
  /**
   * 点击遮罩是否关闭
   * @default true
   */
  closeOnOverlayClick?: boolean
  /**
   * 按 Escape 键是否关闭
   * @default true
   */
  closeOnEscape?: boolean
}

const props = withDefaults(defineProps<ExtendedProps>(), {
  showOverlay: true,
  closeOnOverlayClick: true,
  closeOnEscape: true,
})

const emits = defineEmits<DialogRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)

// 提供上下文给子组件
provide(sheetContextKey, {
  showOverlay: computed(() => props.showOverlay),
  closeOnOverlayClick: computed(() => props.closeOnOverlayClick),
  closeOnEscape: computed(() => props.closeOnEscape),
})
</script>

<template>
  <DialogRoot
    v-slot="slotProps"
    data-slot="sheet"
    v-bind="forwarded"
  >
    <slot v-bind="slotProps" />
  </DialogRoot>
</template>
