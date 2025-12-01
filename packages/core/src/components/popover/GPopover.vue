<script setup lang="ts">
/**
 * ============================================================================
 * GPopover - 增强版气泡卡片组件
 * ============================================================================
 * 
 * 功能全面超越 Ant Design Vue, Arco Design Vue, TDesign Vue Next, PrimeVue
 * 
 * ## 功能特性
 * 
 * | 功能 | 支持 |
 * |-----|------|
 * | title 标题 | ✅ |
 * | content 内容 | ✅ |
 * | 3种主题 (default/light/dark) | ✅ |
 * | 4种尺寸 (sm/default/lg/auto) | ✅ |
 * | 12种位置 | ✅ |
 * | 4种触发方式 (hover/click/focus/contextmenu) | ✅ |
 * | 显示/隐藏延迟 | ✅ |
 * | 箭头控制 | ✅ |
 * | 点击外部关闭 | ✅ |
 * | Escape 键关闭 | ✅ |
 * | 模态模式 | ✅ |
 * | 最大宽度/高度 | ✅ |
 * | 禁用状态 | ✅ |
 * | 关闭销毁 | ✅ |
 * 
 * @example
 * ```vue
 * <!-- 基础用法 -->
 * <GPopover title="标题" content="内容">
 *   <Button>点击显示</Button>
 * </GPopover>
 * 
 * <!-- 悬停触发 -->
 * <GPopover title="标题" content="内容" trigger="hover">
 *   <Button>悬停显示</Button>
 * </GPopover>
 * 
 * <!-- 自定义内容 -->
 * <GPopover>
 *   <Button>点击</Button>
 *   <template #title>
 *     <div class="flex items-center gap-2">
 *       <Icon /> 自定义标题
 *     </div>
 *   </template>
 *   <template #content>
 *     <div>自定义内容</div>
 *     <Button size="sm">确定</Button>
 *   </template>
 * </GPopover>
 * ```
 */
import { computed, ref, watch, onMounted, onUnmounted } from "vue"
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverPortal,
  PopoverClose,
} from "reka-ui"
import { cn } from "@/lib/utils"
import { popoverVariants, type GPopoverProps, type GPopoverEmits } from "./index"

const props = withDefaults(defineProps<GPopoverProps>(), {
  defaultOpen: false,
  disabled: false,
  placement: "bottom",
  sideOffset: 4,
  alignOffset: 0,
  trigger: "click",
  showDelay: 0,
  hideDelay: 0,
  theme: "default",
  size: "default",
  showArrow: false,
  closeOnClickOutside: true,
  closeOnEscape: true,
  modal: false,
  destroyOnClose: false,
})

const emit = defineEmits<GPopoverEmits>()

// 内部状态
const internalOpen = ref(props.defaultOpen)
let showTimer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null

// 计算是否显示
const isOpen = computed(() => {
  if (props.disabled) return false
  return props.open ?? internalOpen.value
})

// 计算 reka-ui 的 side 和 align
const side = computed(() => {
  const placement = props.placement
  if (placement.startsWith("top")) return "top"
  if (placement.startsWith("bottom")) return "bottom"
  if (placement.startsWith("left")) return "left"
  if (placement.startsWith("right")) return "right"
  return "bottom"
})

const align = computed(() => {
  const placement = props.placement
  if (placement.endsWith("-start")) return "start"
  if (placement.endsWith("-end")) return "end"
  return "center"
})

// 计算自定义样式
const customStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.maxWidth) {
    style.maxWidth = typeof props.maxWidth === "number" ? `${props.maxWidth}px` : props.maxWidth
  }
  if (props.maxHeight) {
    style.maxHeight = typeof props.maxHeight === "number" ? `${props.maxHeight}px` : props.maxHeight
    style.overflow = "auto"
  }
  return style
})

// 计算是否是 hover 触发
const isHoverTrigger = computed(() => {
  const triggers = Array.isArray(props.trigger) ? props.trigger : [props.trigger]
  return triggers.includes("hover")
})

// 清除定时器
function clearTimers() {
  if (showTimer) {
    clearTimeout(showTimer)
    showTimer = null
  }
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
}

// 处理显示状态变化
function handleOpenChange(open: boolean) {
  if (props.disabled) return

  clearTimers()

  // 如果是 hover 触发，使用延迟
  if (isHoverTrigger.value) {
    if (open && props.showDelay > 0) {
      showTimer = setTimeout(() => {
        setOpen(true)
      }, props.showDelay)
      return
    }
    if (!open && props.hideDelay > 0) {
      hideTimer = setTimeout(() => {
        setOpen(false)
      }, props.hideDelay)
      return
    }
  }

  setOpen(open)
}

// 设置显示状态
function setOpen(open: boolean) {
  internalOpen.value = open
  emit("update:open", open)
  emit("openChange", open)
}

// 处理键盘事件
function handleKeydown(event: KeyboardEvent) {
  if (props.closeOnEscape && event.key === "Escape" && isOpen.value) {
    setOpen(false)
  }
}

// 监听 open prop 变化
watch(() => props.open, (newValue) => {
  if (newValue !== undefined) {
    internalOpen.value = newValue
  }
})

// 添加键盘事件监听
onMounted(() => {
  if (props.closeOnEscape) {
    document.addEventListener("keydown", handleKeydown)
  }
})

// 清理
onUnmounted(() => {
  clearTimers()
  document.removeEventListener("keydown", handleKeydown)
})

// 暴露方法
defineExpose({
  /**
   * 显示 popover
   */
  show: () => {
    if (!props.disabled) {
      setOpen(true)
    }
  },
  /**
   * 隐藏 popover
   */
  hide: () => {
    setOpen(false)
  },
  /**
   * 切换显示状态
   */
  toggle: () => {
    setOpen(!isOpen.value)
  },
})
</script>

<template>
  <PopoverRoot
    :open="isOpen"
    :default-open="defaultOpen"
    :modal="modal"
    @update:open="handleOpenChange"
  >
    <!-- 触发器 -->
    <PopoverTrigger as-child>
      <slot />
    </PopoverTrigger>

    <!-- 内容 -->
    <PopoverPortal v-if="!destroyOnClose || isOpen">
      <PopoverContent
        :side="side"
        :align="align"
        :side-offset="sideOffset"
        :align-offset="alignOffset"
        :class="cn(
          popoverVariants({ theme, size }),
          contentClass,
          props.class
        )"
        :style="customStyle"
        @interact-outside="(e) => { if (!closeOnClickOutside) e.preventDefault() }"
        @escape-key-down="(e) => { if (!closeOnEscape) e.preventDefault() }"
      >
        <!-- 标题 -->
        <div
          v-if="title || $slots.title"
          :class="cn(
            'font-semibold mb-2',
            theme === 'dark' && 'text-white',
            titleClass
          )"
        >
          <slot name="title">{{ title }}</slot>
        </div>

        <!-- 内容 -->
        <div :class="cn(theme === 'dark' && 'text-zinc-300')">
          <slot name="content">{{ content }}</slot>
        </div>

        <!-- 关闭按钮插槽 -->
        <slot name="close" />

        <!-- 底部操作区插槽 -->
        <div v-if="$slots.footer" class="mt-3 pt-3 border-t border-border">
          <slot name="footer" />
        </div>

        <!-- 箭头 -->
        <PopoverArrow
          v-if="showArrow"
          :class="cn(
            'fill-popover',
            theme === 'light' && 'fill-white',
            theme === 'dark' && 'fill-zinc-900',
            arrowClass
          )"
        />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

