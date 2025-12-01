<script setup lang="ts">
/**
 * ============================================================================
 * BreadcrumbSimple - 简化组合组件
 * ============================================================================
 * 
 * 通过 items 数组快速创建面包屑
 * 
 * @example
 * ```vue
 * <BreadcrumbSimple
 *   :items="[
 *     { label: '首页', href: '/' },
 *     { label: '产品', href: '/products' },
 *     { label: '详情' },
 *   ]"
 *   :max-items="4"
 * />
 * ```
 */
import type { HTMLAttributes, Component } from "vue"
import { computed } from "vue"
import { ChevronRight, Home } from "lucide-vue-next"
import Breadcrumb from "./Breadcrumb.vue"
import BreadcrumbList from "./BreadcrumbList.vue"
import BreadcrumbItem from "./BreadcrumbItem.vue"
import BreadcrumbLink from "./BreadcrumbLink.vue"
import BreadcrumbPage from "./BreadcrumbPage.vue"
import BreadcrumbSeparator from "./BreadcrumbSeparator.vue"
import BreadcrumbEllipsis from "./BreadcrumbEllipsis.vue"

export interface BreadcrumbItemData {
  /**
   * 显示文本
   */
  label: string
  /**
   * 链接地址（最后一项通常不需要）
   */
  href?: string
  /**
   * 图标
   */
  icon?: Component
  /**
   * 是否禁用
   */
  disabled?: boolean
}

interface Props {
  class?: HTMLAttributes["class"]
  /**
   * 面包屑项数据
   */
  items: BreadcrumbItemData[]
  /**
   * 最大显示数量（超出时显示省略号）
   * @default 0 (不限制)
   */
  maxItems?: number
  /**
   * 尺寸
   * @default "default"
   */
  size?: "sm" | "default" | "lg"
  /**
   * 是否显示首页图标
   * @default false
   */
  showHomeIcon?: boolean
  /**
   * 自定义分隔符
   */
  separator?: Component
}

const props = withDefaults(defineProps<Props>(), {
  maxItems: 0,
  size: "default",
  showHomeIcon: false,
})

// 计算显示的项
const displayItems = computed(() => {
  if (props.maxItems <= 0 || props.items.length <= props.maxItems) {
    return { items: props.items, hasEllipsis: false, ellipsisIndex: -1 }
  }

  // 保留第一项和最后两项，中间用省略号
  const first = props.items.slice(0, 1)
  const last = props.items.slice(-2)
  const hidden = props.items.slice(1, -2)

  return {
    items: [...first, ...last],
    hasEllipsis: true,
    ellipsisIndex: 1,
    hiddenItems: hidden,
  }
})
</script>

<template>
  <Breadcrumb :class="props.class" :size="size">
    <BreadcrumbList>
      <template v-for="(item, index) in displayItems.items" :key="index">
        <!-- 省略号 -->
        <template v-if="displayItems.hasEllipsis && index === displayItems.ellipsisIndex">
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <component :is="separator" v-if="separator" />
            <ChevronRight v-else class="size-3.5" />
          </BreadcrumbSeparator>
        </template>

        <!-- 面包屑项 -->
        <BreadcrumbItem>
          <!-- 最后一项显示为当前页 -->
          <BreadcrumbPage v-if="index === displayItems.items.length - 1">
            <component :is="item.icon" v-if="item.icon" class="size-3.5 mr-1" />
            {{ item.label }}
          </BreadcrumbPage>
          <!-- 其他项显示为链接 -->
          <BreadcrumbLink v-else :href="item.href" :disabled="item.disabled">
            <Home v-if="showHomeIcon && index === 0 && !item.icon" class="size-3.5 mr-1" />
            <component :is="item.icon" v-else-if="item.icon" class="size-3.5 mr-1" />
            {{ item.label }}
          </BreadcrumbLink>
        </BreadcrumbItem>

        <!-- 分隔符（最后一项不需要） -->
        <BreadcrumbSeparator v-if="index < displayItems.items.length - 1">
          <component :is="separator" v-if="separator" />
          <ChevronRight v-else class="size-3.5" />
        </BreadcrumbSeparator>
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>
