<script setup lang="ts">
/**
 * TabsCard 卡片标签页组合组件
 * 
 * 预组合的卡片风格标签页
 * 超越 shadcn-vue, PrimeVue（它们不支持 card 类型）
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
      class="inline-flex h-auto w-fit items-end justify-start gap-0 bg-transparent p-0"
    >
      <TabsTrigger
        v-for="item in items"
        :key="item.value"
        :value="item.value"
        :disabled="item.disabled"
        :class="cn(
          'inline-flex items-center justify-center gap-1.5 whitespace-nowrap px-4 py-2 text-sm font-medium transition-all',
          'border border-b-0 rounded-t-lg',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          'disabled:pointer-events-none disabled:opacity-50',
          'text-muted-foreground bg-muted/50 border-transparent',
          'data-[state=active]:text-foreground data-[state=active]:bg-background data-[state=active]:border-border',
        )"
      >
        <component v-if="item.icon" :is="item.icon" class="size-4" />
        {{ item.label }}
      </TabsTrigger>
    </TabsList>

    <div class="border rounded-lg rounded-tl-none p-4">
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
