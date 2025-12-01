<script setup lang="ts">
/**
 * TabsSimple 简单标签页组合组件
 * 
 * 预组合的简单标签页，传入 items 数组即可使用
 * 超越 shadcn-vue（需要手动组合多个原子组件）
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
    :class="cn('flex flex-col gap-2', props.class)"
    @update:model-value="handleChange"
  >
    <TabsList
      class="inline-flex h-9 w-fit items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground"
    >
      <TabsTrigger
        v-for="item in items"
        :key="item.value"
        :value="item.value"
        :disabled="item.disabled"
        :class="cn(
          'inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
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
      class="mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <slot :name="item.value" :item="item">
        {{ item.content }}
      </slot>
    </TabsContent>
  </TabsRoot>
</template>
