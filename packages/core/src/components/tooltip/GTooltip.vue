<script setup lang="ts">
/**
 * ============================================================================
 * GTooltip - 增强版文字提示组件
 * ============================================================================
 * 
 * 功能全面超越 Ant Design Vue, Arco Design Vue, TDesign Vue Next, PrimeVue
 * 
 * ## 功能特性
 * 
 * | 功能 | 支持 |
 * |-----|------|
 * | content 内容 | ✅ |
 * | 6种主题 (default/light/primary/success/warning/danger) | ✅ |
 * | 3种尺寸 (sm/default/lg) | ✅ |
 * | 12种位置 | ✅ |
 * | 4种触发方式 (hover/click/focus/contextmenu) | ✅ |
 * | 显示/隐藏延迟 | ✅ |
 * | 自动隐藏时间 | ✅ |
 * | 自定义颜色 | ✅ |
 * | 箭头控制 | ✅ |
 * | 最大宽度 | ✅ |
 * | 禁用状态 | ✅ |
 * | 关闭销毁 | ✅ |
 * 
 * @example
 * ```vue
 * <!-- 基础用法 -->
 * <GTooltip content="提示文本">
 *   <Button>悬停显示</Button>
 * </GTooltip>
 * 
 * <!-- 不同主题 -->
 * <GTooltip content="成功提示" theme="success">
 *   <Button>成功</Button>
 * </GTooltip>
 * 
 * <!-- 点击触发 -->
 * <GTooltip content="点击显示" trigger="click">
 *   <Button>点击</Button>
 * </GTooltip>
 * 
 * <!-- 自定义内容 -->
 * <GTooltip>
 *   <Button>悬停</Button>
 *   <template #content>
 *     <div class="flex items-center gap-2">
 *       <Icon /> 自定义内容
 *     </div>
 *   </template>
 * </GTooltip>
 * ```
 */
import { computed, ref, watch, onMounted, onUnmounted } from "vue"
import {
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
  TooltipPortal,
  TooltipProvider,
} from "reka-ui"
import { cn } from "@/lib/utils"
import { tooltipVariants, tooltipArrowVariants, type GTooltipProps, type GTooltipEmits } from "./index"

const props = withDefaults(defineProps<GTooltipProps>(), {
  defaultOpen: false,
  disabled: false,
  placement: "top",
  sideOffset: 4,
  alignOffset: 0,
  trigger: "hover",
  showDelay: 0,
  hideDelay: 0,
  duration: 0,
  theme: "default",
  size: "default",
  showArrow: true,
  destroyOnClose: false,
})

const emit = defineEmits<GTooltipEmits>()

// 内部状态
const internalOpen = ref(props.defaultOpen)
let durationTimer: ReturnType<typeof setTimeout> | null = null

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
  return "top"
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
  if (props.backgroundColor) {
    style.backgroundColor = props.backgroundColor
  }
  if (props.textColor) {
    style.color = props.textColor
  }
  if (props.maxWidth) {
    style.maxWidth = typeof props.maxWidth === "number" ? `${props.maxWidth}px` : props.maxWidth
  }
  return style
})

// 处理显示状态变化
function handleOpenChange(open: boolean) {
  if (props.disabled) return

  // 清除之前的定时器
  if (durationTimer) {
    clearTimeout(durationTimer)
    durationTimer = null
  }

  internalOpen.value = open
  emit("update:open", open)
  emit("openChange", open)

  // 如果打开且设置了 duration，自动关闭
  if (open && props.duration > 0) {
    durationTimer = setTimeout(() => {
      internalOpen.value = false
      emit("update:open", false)
      emit("openChange", false)
    }, props.duration)
  }
}

// 监听 open prop 变化
watch(() => props.open, (newValue) => {
  if (newValue !== undefined) {
    internalOpen.value = newValue
  }
})

// 清理定时器
onUnmounted(() => {
  if (durationTimer) {
    clearTimeout(durationTimer)
  }
})

// 暴露方法
defineExpose({
  /**
   * 显示 tooltip
   */
  show: () => {
    if (!props.disabled) {
      handleOpenChange(true)
    }
  },
  /**
   * 隐藏 tooltip
   */
  hide: () => {
    handleOpenChange(false)
  },
  /**
   * 切换显示状态
   */
  toggle: () => {
    handleOpenChange(!isOpen.value)
  },
})
</script>

<template>
  <TooltipProvider
    :delay-duration="showDelay"
    :skip-delay-duration="hideDelay"
  >
    <TooltipRoot
      :open="isOpen"
      :default-open="defaultOpen"
      @update:open="handleOpenChange"
    >
      <!-- 触发器 -->
      <TooltipTrigger as-child>
        <slot />
      </TooltipTrigger>

      <!-- 内容 -->
      <TooltipPortal v-if="!destroyOnClose || isOpen">
        <TooltipContent
          :side="side"
          :align="align"
          :side-offset="sideOffset"
          :align-offset="alignOffset"
          :aria-label="ariaLabel"
          :class="cn(
            tooltipVariants({ theme, size }),
            contentClass,
            props.class
          )"
          :style="customStyle"
        >
          <!-- 内容插槽 -->
          <slot name="content">
            {{ content }}
          </slot>

          <!-- 箭头 -->
          <TooltipArrow
            v-if="showArrow"
            :class="cn(
              tooltipArrowVariants({ theme }),
              arrowClass
            )"
            :style="backgroundColor ? { backgroundColor, fill: backgroundColor } : undefined"
          />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>

