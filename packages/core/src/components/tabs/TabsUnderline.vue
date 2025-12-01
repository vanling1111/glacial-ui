<script setup lang="ts">
/**
 * TabsUnderline 下划线标签页组合组件
 * 
 * 预组合的下划线风格标签页
 * 超越 shadcn-vue（它只有一种样式）
 */
import type { HTMLAttributes } from "vue"
import { ref, computed } from "vue"
import { TabsRoot, TabsList, TabsTrigger, TabsContent } from "reka-ui"
import { cn } from "@/lib/utils"

export interface TabItem {
  value: string
  label: string
  content?: string
  disabled?: boolean
  icon?: any
}

const props = withDefaults(defineProps<{
  modelValue?: string
  defaultValue?: string
  items?: TabItem[]
  class?: HTMLAttributes["class"]
}>(), {
  items: () => [],
})

const emits = defineEmits<{
  "update:modelValue": [value: string]
}>()

const internalValue = ref(props.defaultValue || props.items[0]?.value || "")
const currentValue = computed(() => props.modelValue ?? internalValue.value)

function handleChange(value: string) {
  internalValue.value = value
  emits("update:modelValue", value)
}
</script>

<template>
  <TabsRoot
    :model-value="currentValue"
    data-slot="tabs"
    :class="cn('flex flex-col', props.class)"
    @update:model-value="handleChange"
  >
    <TabsList
      class="inline-flex h-auto w-full items-center justify-start gap-4 border-b bg-transparent p-0"
    >
      <TabsTrigger
        v-for="item in items"
        :key="item.value"
        :value="item.value"
        :disabled="item.disabled"
        :class="cn(
          'relative inline-flex items-center justify-center gap-1.5 whitespace-nowrap px-1 pb-3 pt-2 text-sm font-medium transition-all',
          'focus-visible:outline-none',
          'disabled:pointer-events-none disabled:opacity-50',
          'text-muted-foreground hover:text-foreground',
          'data-[state=active]:text-foreground',
          'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform',
          'data-[state=active]:after:scale-x-100',
        )"
      >
        <component v-if="item.icon" :is="item.icon" class="size-4" />
        {{ item.label }}
      </TabsTrigger>
    </TabsList>

    <TabsContent
      v-for="item in items"
      :key="item.value"
      :value="item.value"
      class="mt-4 focus-visible:outline-none"
    >
      <slot :name="item.value" :item="item">
        {{ item.content }}
      </slot>
    </TabsContent>
  </TabsRoot>
</template>
