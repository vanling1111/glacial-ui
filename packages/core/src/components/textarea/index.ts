/**
 * Textarea 文本域组件
 * 
 * shadcn 风格的原子组件 + 组合组件
 * 功能超越 Ant Design Vue, Arco Design Vue, TDesign, PrimeVue
 */

// ============================================================================
// 原子组件
// ============================================================================

/**
 * Textarea 原子组件
 * 
 * 极简的文本域组件
 * 
 * @example
 * ```vue
 * <Textarea v-model="value" placeholder="请输入内容" />
 * ```
 */
export { default as Textarea } from "./Textarea.vue"

// ============================================================================
// 组合组件
// ============================================================================

/**
 * TextareaWithLimit 带字数限制文本域
 * 
 * 预组合的带字数限制文本域，支持 maxLength 和字数统计
 * 
 * @example
 * ```vue
 * <TextareaWithLimit v-model="value" :max-length="200" />
 * <TextareaWithLimit v-model="value" :max-length="500" show-count />
 * ```
 */
export { default as TextareaWithLimit } from "./TextareaWithLimit.vue"

/**
 * TextareaAutosize 自动高度文本域
 * 
 * 预组合的自动调整高度文本域，支持 minRows/maxRows
 * 
 * @example
 * ```vue
 * <TextareaAutosize v-model="value" :min-rows="2" :max-rows="6" />
 * ```
 */
export { default as TextareaAutosize } from "./TextareaAutosize.vue"

/**
 * TextareaClearable 可清除文本域
 * 
 * 预组合的可清除文本域，带清除按钮
 * 
 * @example
 * ```vue
 * <TextareaClearable v-model="value" @clear="handleClear" />
 * ```
 */
export { default as TextareaClearable } from "./TextareaClearable.vue"

/**
 * TextareaWithStatus 带状态文本域
 * 
 * 预组合的带状态文本域，支持 success/warning/error 状态和提示文本
 * 
 * @example
 * ```vue
 * <TextareaWithStatus v-model="value" status="error" tips="内容不能为空" />
 * <TextareaWithStatus v-model="value" status="success" tips="内容格式正确" />
 * ```
 */
export { default as TextareaWithStatus } from "./TextareaWithStatus.vue"
