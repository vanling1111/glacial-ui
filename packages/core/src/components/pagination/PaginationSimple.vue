<script setup lang="ts">
/**
 * ============================================================================
 * PaginationSimple - 简化组合组件
 * ============================================================================
 * 
 * 快速创建分页，适合简单场景
 * 
 * @example
 * ```vue
 * <PaginationSimple
 *   v-model:page="currentPage"
 *   :total="100"
 *   :items-per-page="10"
 *   show-total
 *   show-quick-jumper
 * />
 * ```
 */
import type { HTMLAttributes } from "vue"
import { computed, ref, watch } from "vue"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from "lucide-vue-next"
import Pagination from "./Pagination.vue"
import PaginationContent from "./PaginationContent.vue"
import PaginationItem from "./PaginationItem.vue"
import PaginationPrevious from "./PaginationPrevious.vue"
import PaginationNext from "./PaginationNext.vue"
import PaginationFirst from "./PaginationFirst.vue"
import PaginationLast from "./PaginationLast.vue"
import PaginationEllipsis from "./PaginationEllipsis.vue"
import { cn } from "@/lib/utils"

interface Props {
  class?: HTMLAttributes["class"]
  /**
   * 当前页码
   */
  page?: number
  /**
   * 总条数
   */
  total: number
  /**
   * 每页条数
   * @default 10
   */
  itemsPerPage?: number
  /**
   * 显示的页码按钮数量
   * @default 5
   */
  siblingCount?: number
  /**
   * 尺寸
   * @default "default"
   */
  size?: "sm" | "default" | "lg"
  /**
   * 是否显示首页/末页按钮
   * @default false
   */
  showEdges?: boolean
  /**
   * 是否显示总数
   * @default false
   */
  showTotal?: boolean
  /**
   * 是否显示快速跳转
   * @default false
   */
  showQuickJumper?: boolean
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean
  /**
   * 对齐方式
   * @default "center"
   */
  align?: "start" | "center" | "end"
  /**
   * 简洁模式
   * @default false
   */
  simple?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  page: 1,
  itemsPerPage: 10,
  siblingCount: 1,
  size: "default",
  showEdges: false,
  showTotal: false,
  showQuickJumper: false,
  disabled: false,
  align: "center",
  simple: false,
})

const emit = defineEmits<{
  (e: "update:page", value: number): void
}>()

// 内部页码状态
const currentPage = ref(props.page)

// 同步外部 page 变化
watch(() => props.page, (val) => {
  currentPage.value = val
})

// 计算总页数
const totalPages = computed(() => Math.ceil(props.total / props.itemsPerPage))

// 计算显示范围
const displayRange = computed(() => {
  const start = (currentPage.value - 1) * props.itemsPerPage + 1
  const end = Math.min(currentPage.value * props.itemsPerPage, props.total)
  return { start, end }
})

// 快速跳转输入
const jumpInput = ref("")

// 处理页码变化
function handlePageChange(page: number) {
  currentPage.value = page
  emit("update:page", page)
}

// 处理快速跳转
function handleJump() {
  const page = parseInt(jumpInput.value)
  if (!isNaN(page) && page >= 1 && page <= totalPages.value) {
    handlePageChange(page)
    jumpInput.value = ""
  }
}
</script>

<template>
  <div :class="cn('flex items-center gap-4', props.class)">
    <!-- 显示总数 -->
    <span v-if="showTotal" class="text-sm text-muted-foreground whitespace-nowrap">
      共 {{ total }} 条，第 {{ displayRange.start }}-{{ displayRange.end }} 条
    </span>

    <!-- 简洁模式 -->
    <template v-if="simple">
      <div class="flex items-center gap-2">
        <button
          :disabled="disabled || currentPage <= 1"
          class="inline-flex items-center justify-center size-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
          @click="handlePageChange(currentPage - 1)"
        >
          <ChevronLeft class="size-4" />
        </button>
        <span class="text-sm">
          {{ currentPage }} / {{ totalPages }}
        </span>
        <button
          :disabled="disabled || currentPage >= totalPages"
          class="inline-flex items-center justify-center size-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
          @click="handlePageChange(currentPage + 1)"
        >
          <ChevronRight class="size-4" />
        </button>
      </div>
    </template>

    <!-- 完整分页 -->
    <Pagination
      v-else
      :page="currentPage"
      :total="total"
      :items-per-page="itemsPerPage"
      :sibling-count="siblingCount"
      :show-edges="showEdges"
      :size="size"
      :disabled="disabled"
      :align="align"
      @update:page="handlePageChange"
    >
      <PaginationContent>
        <PaginationFirst v-if="showEdges" />
        <PaginationPrevious />
        
        <template v-for="(item, index) in totalPages" :key="index">
          <PaginationItem :value="item" />
        </template>
        
        <PaginationNext />
        <PaginationLast v-if="showEdges" />
      </PaginationContent>
    </Pagination>

    <!-- 快速跳转 -->
    <div v-if="showQuickJumper && !simple" class="flex items-center gap-2 text-sm">
      <span class="text-muted-foreground">跳至</span>
      <input
        v-model="jumpInput"
        type="text"
        :disabled="disabled"
        class="w-12 h-8 px-2 text-center border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
        @keyup.enter="handleJump"
      />
      <span class="text-muted-foreground">页</span>
    </div>
  </div>
</template>
