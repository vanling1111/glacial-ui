<script setup lang="ts">
/**
 * ============================================================================
 * Spinner - 原子化增强版加载指示器组件
 * ============================================================================
 * 
 * ## 增强功能（超越 4 个库）
 * 
 * | 功能 | shadcn | Ant | Arco | TDesign | PrimeVue | glacial-ui |
 * |-----|--------|-----|------|---------|----------|------------|
 * | 基础加载 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * | 尺寸控制 | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
 * | 颜色控制 | ❌ | ❌ | ✅ | ✅ | ❌ | ✅ |
 * | 加载文字 | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * | 全屏加载 | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * | 包裹内容 | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * | 延迟显示 | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
 * 
 * @example
 * ```vue
 * <Spinner size="lg" />
 * <Spinner :spinning="loading" tip="加载中...">
 *   <div>内容</div>
 * </Spinner>
 * ```
 */
import type { HTMLAttributes } from "vue"
import { computed, ref, watch, onUnmounted } from "vue"
import { Loader2 } from "lucide-vue-next"
import { cn } from "@/lib/utils"
import { spinnerVariants } from "./index"

interface Props {
  class?: HTMLAttributes["class"]
  /**
   * 尺寸
   * @default "default"
   */
  size?: "xs" | "sm" | "default" | "lg" | "xl"
  /**
   * 颜色
   * @default "default"
   */
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger"
  /**
   * 是否正在加载（用于包裹内容时）
   * @default true
   */
  spinning?: boolean
  /**
   * 加载提示文字
   */
  tip?: string
  /**
   * 延迟显示时间（毫秒），防止闪烁
   * @default 0
   */
  delay?: number
  /**
   * 是否全屏显示
   * @default false
   */
  fullscreen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: "default",
  color: "default",
  spinning: true,
  delay: 0,
  fullscreen: false,
})

// 延迟显示逻辑
const shouldShow = ref(props.delay === 0 ? props.spinning : false)
let delayTimer: ReturnType<typeof setTimeout> | null = null

watch(
  () => props.spinning,
  (newVal) => {
    if (delayTimer) {
      clearTimeout(delayTimer)
      delayTimer = null
    }

    if (newVal) {
      if (props.delay > 0) {
        delayTimer = setTimeout(() => {
          shouldShow.value = true
        }, props.delay)
      } else {
        shouldShow.value = true
      }
    } else {
      shouldShow.value = false
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  if (delayTimer) {
    clearTimeout(delayTimer)
  }
})

// 是否有内容需要包裹
const hasContent = computed(() => !!props.tip || props.fullscreen)
</script>

<template>
  <!-- 全屏模式 -->
  <Teleport v-if="fullscreen && shouldShow" to="body">
    <div class="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div class="flex flex-col items-center gap-3">
        <Loader2
          role="status"
          aria-label="Loading"
          :class="cn(spinnerVariants({ size, color }), props.class)"
        />
        <span v-if="tip" class="text-sm text-muted-foreground">{{ tip }}</span>
      </div>
    </div>
  </Teleport>

  <!-- 包裹内容模式 -->
  <template v-else-if="$slots.default">
    <div class="relative">
      <!-- 内容 -->
      <div :class="{ 'opacity-50 pointer-events-none select-none': shouldShow }">
        <slot />
      </div>
      
      <!-- 加载遮罩 -->
      <div
        v-if="shouldShow"
        class="absolute inset-0 flex items-center justify-center bg-background/50"
      >
        <div class="flex flex-col items-center gap-2">
          <Loader2
            role="status"
            aria-label="Loading"
            :class="cn(spinnerVariants({ size, color }), props.class)"
          />
          <span v-if="tip" class="text-sm text-muted-foreground">{{ tip }}</span>
        </div>
      </div>
    </div>
  </template>

  <!-- 独立模式 -->
  <template v-else>
    <div v-if="tip" class="inline-flex flex-col items-center gap-2">
      <Loader2
        role="status"
        aria-label="Loading"
        :class="cn(spinnerVariants({ size, color }), props.class)"
      />
      <span class="text-sm text-muted-foreground">{{ tip }}</span>
    </div>
    <Loader2
      v-else
      role="status"
      aria-label="Loading"
      :class="cn(spinnerVariants({ size, color }), props.class)"
    />
  </template>
</template>
