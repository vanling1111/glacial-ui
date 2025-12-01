<script setup lang="ts">
/**
 * ButtonSuffix 按钮后缀组件
 * 
 * 原子化子组件，用于在按钮右侧放置后缀内容
 * TDesign 特色功能，其他三个库都没有
 * 
 * @example
 * ```vue
 * <Button>
 *   提交
 *   <ButtonSuffix>
 *     <ChevronDownIcon />
 *   </ButtonSuffix>
 * </Button>
 * ```
 */
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@/lib/utils"

interface Props {
  /** 自定义类名 */
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

const suffixClass = computed(() => cn(
  "shrink-0 ml-1 -mr-1 [&>svg]:size-4",
  props.class
))
</script>

<template>
  <span :class="suffixClass" data-slot="button-suffix">
    <slot />
  </span>
</template>
