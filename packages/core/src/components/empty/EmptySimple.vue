<script setup lang="ts">
/**
 * ============================================================================
 * EmptySimple - 简化组合组件
 * ============================================================================
 * 
 * 快速创建空状态，适合简单场景
 * 
 * @example
 * ```vue
 * <EmptySimple
 *   title="暂无数据"
 *   description="请稍后再试"
 *   :icon="InboxIcon"
 * >
 *   <template #action>
 *     <Button>刷新</Button>
 *   </template>
 * </EmptySimple>
 * ```
 */
import type { HTMLAttributes, Component } from "vue"
import { Inbox } from "lucide-vue-next"
import Empty from "./Empty.vue"
import EmptyMedia from "./EmptyMedia.vue"
import EmptyHeader from "./EmptyHeader.vue"
import EmptyTitle from "./EmptyTitle.vue"
import EmptyDescription from "./EmptyDescription.vue"
import EmptyContent from "./EmptyContent.vue"

interface Props {
  class?: HTMLAttributes["class"]
  /**
   * 标题
   */
  title?: string
  /**
   * 描述
   */
  description?: string
  /**
   * 图标组件
   */
  icon?: Component
  /**
   * 图片 URL
   */
  image?: string
  /**
   * 图片宽度
   * @default 128
   */
  imageWidth?: number | string
  /**
   * 尺寸
   * @default "default"
   */
  size?: "sm" | "default" | "lg"
  /**
   * 是否显示边框
   * @default false
   */
  bordered?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: "default",
  bordered: false,
  imageWidth: 128,
})
</script>

<template>
  <Empty :class="props.class" :size="size" :bordered="bordered">
    <!-- 媒体区域 -->
    <EmptyMedia v-if="icon || image || $slots.icon" :variant="icon ? 'icon' : 'default'">
      <slot name="icon">
        <img
          v-if="image"
          :src="image"
          :style="{ width: typeof imageWidth === 'number' ? `${imageWidth}px` : imageWidth }"
          alt="empty"
        />
        <component :is="icon" v-else-if="icon" class="size-6" />
        <Inbox v-else class="size-12 text-muted-foreground/50" />
      </slot>
    </EmptyMedia>

    <!-- 头部区域 -->
    <EmptyHeader v-if="title || description || $slots.title || $slots.description">
      <EmptyTitle v-if="title || $slots.title">
        <slot name="title">{{ title }}</slot>
      </EmptyTitle>
      <EmptyDescription v-if="description || $slots.description">
        <slot name="description">{{ description }}</slot>
      </EmptyDescription>
    </EmptyHeader>

    <!-- 操作区域 -->
    <EmptyContent v-if="$slots.action || $slots.default">
      <slot name="action">
        <slot />
      </slot>
    </EmptyContent>
  </Empty>
</template>
