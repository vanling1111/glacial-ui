<script setup lang="ts">
/**
 * ============================================================================
 * SkeletonCard - 卡片骨架屏组件
 * ============================================================================
 * 
 * 快速创建卡片骨架屏
 * 
 * @example
 * ```vue
 * <SkeletonCard show-avatar show-image />
 * ```
 */
import type { HTMLAttributes } from "vue"
import Skeleton from "./Skeleton.vue"
import SkeletonText from "./SkeletonText.vue"
import { cn } from "@/lib/utils"

interface Props {
  class?: HTMLAttributes["class"]
  /**
   * 是否显示头像
   * @default true
   */
  showAvatar?: boolean
  /**
   * 是否显示图片
   * @default false
   */
  showImage?: boolean
  /**
   * 文本行数
   * @default 3
   */
  lines?: number
  /**
   * 是否显示动画
   * @default true
   */
  animated?: boolean
  /**
   * 是否处于加载状态
   * @default true
   */
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showAvatar: true,
  showImage: false,
  lines: 3,
  animated: true,
  loading: true,
})
</script>

<template>
  <template v-if="loading">
    <div :class="cn('space-y-4', props.class)">
      <!-- 图片区域 -->
      <Skeleton
        v-if="showImage"
        :animated="animated"
        class="w-full h-48 rounded-lg"
      />
      
      <!-- 头部区域 -->
      <div v-if="showAvatar" class="flex items-center gap-3">
        <Skeleton
          :animated="animated"
          variant="circle"
          size="lg"
        />
        <div class="flex-1 space-y-2">
          <Skeleton :animated="animated" class="h-4 w-1/2" />
          <Skeleton :animated="animated" class="h-3 w-1/3" />
        </div>
      </div>
      
      <!-- 内容区域 -->
      <SkeletonText
        :lines="lines"
        :animated="animated"
      />
    </div>
  </template>
  <slot v-else />
</template>
