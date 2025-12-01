<script setup lang="ts">
/**
 * TabsVertical 垂直标签页组合组件
 * 
 * 预组合的垂直布局标签页
 * 超越 shadcn-vue（它不支持 vertical）
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
    orientation="vertical"
    data-slot="tabs"
    :class="cn('flex gap-4', props.class)"
    @update:model-value="handleChange"
  >
    <TabsList
      class="flex h-auto w-48 flex-col items-stretch justify-start gap-1 rounded-lg bg-muted p-1"
    >
      <TabsTrigger
        v-for="item in items"
        :key="item.value"
        :value="item.value"
        :disabled="item.disabled"
        :class="cn(
          'inline-flex items-center justify-start gap-2 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-all',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          'disabled:pointer-events-none disabled:opacity-50',
          'text-muted-foreground hover:text-foreground',
          'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
        )"
      >
        <component v-if="item.icon" :is="item.icon" class="size-4" />
        {{ item.label }}
      </TabsTrigger>
    </TabsList>

    <div class="flex-1">
      <TabsContent
        v-for="item in items"
        :key="item.value"
        :value="item.value"
        class="focus-visible:outline-none"
      >
        <slot :name="item.value" :item="item">
          {{ item.content }}
        </slot>
      </TabsContent>
    </div>
  </TabsRoot>
</template>
