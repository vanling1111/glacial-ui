/**
 * Progress 进度条组件
 * 
 * shadcn 风格的原子组件 + 组合组件
 * 功能超越 Ant Design Vue, Arco Design Vue, TDesign, PrimeVue
 */

// ============================================================================
// 原子组件
// ============================================================================

/**
 * Progress 原子组件
 * 
 * 极简的线形进度条组件
 * 
 * @example
 * ```vue
 * <Progress :model-value="50" />
 * ```
 */
export { default as Progress } from "./Progress.vue"

// ============================================================================
// 组合组件
// ============================================================================

/**
 * ProgressWithLabel 带标签进度条
 * 
 * 预组合的带标签进度条，支持格式化显示和多种标签位置
 * 超越 shadcn-vue
 * 
 * @example
 * ```vue
 * <ProgressWithLabel :model-value="75" />
 * <ProgressWithLabel :model-value="75" label-position="top" />
 * <ProgressWithLabel :model-value="75" label-position="inside" />
 * <ProgressWithLabel :model-value="30" :max="50" :format="(v, m) => `${v}/${m}`" />
 * ```
 */
export { default as ProgressWithLabel } from "./ProgressWithLabel.vue"

/**
 * ProgressCircle 圆形进度条
 * 
 * 预组合的圆形进度条，支持自定义尺寸和颜色
 * 超越 shadcn-vue, PrimeVue
 * 
 * @example
 * ```vue
 * <ProgressCircle :model-value="75" />
 * <ProgressCircle :model-value="75" :size="120" :stroke-width="8" />
 * <ProgressCircle :model-value="75" color="#10b981" />
 * ```
 */
export { default as ProgressCircle } from "./ProgressCircle.vue"

/**
 * ProgressWithStatus 带状态进度条
 * 
 * 预组合的带状态进度条，支持 success/warning/error 状态
 * 超越 shadcn-vue, PrimeVue
 * 
 * @example
 * ```vue
 * <ProgressWithStatus :model-value="100" status="success" />
 * <ProgressWithStatus :model-value="50" status="warning" />
 * <ProgressWithStatus :model-value="30" status="error" />
 * ```
 */
export { default as ProgressWithStatus } from "./ProgressWithStatus.vue"

/**
 * ProgressIndeterminate 不确定进度条
 * 
 * 预组合的不确定进度条，用于未知进度场景
 * 超越 shadcn-vue, Ant Design Vue, Arco, TDesign
 * 
 * @example
 * ```vue
 * <ProgressIndeterminate />
 * ```
 */
export { default as ProgressIndeterminate } from "./ProgressIndeterminate.vue"
