/**
 * Slider 滑块组件
 * 
 * shadcn 风格的原子组件 + 组合组件
 * 功能超越 Ant Design Vue, Arco Design Vue, TDesign, PrimeVue
 */

// ============================================================================
// 原子组件
// ============================================================================

/**
 * Slider 原子组件
 * 
 * 极简的滑块组件，支持单值和范围选择
 * 
 * @example
 * ```vue
 * <Slider v-model="value" />
 * <Slider v-model="range" :default-value="[25, 75]" />
 * ```
 */
export { default as Slider } from "./Slider.vue"

// ============================================================================
// 组合组件
// ============================================================================

/**
 * SliderWithTooltip 带提示滑块
 * 
 * 预组合的带 tooltip 提示滑块，拖动时显示当前值
 * 超越 shadcn-vue, PrimeVue
 * 
 * @example
 * ```vue
 * <SliderWithTooltip v-model="value" />
 * <SliderWithTooltip v-model="value" :format-tooltip="(v) => `${v}%`" />
 * ```
 */
export { default as SliderWithTooltip } from "./SliderWithTooltip.vue"

/**
 * SliderWithMarks 带刻度标记滑块
 * 
 * 预组合的带刻度标记滑块，支持自定义刻度标签
 * 超越 shadcn-vue, PrimeVue
 * 
 * @example
 * ```vue
 * <SliderWithMarks v-model="value" :marks="[
 *   { value: 0, label: '0°C' },
 *   { value: 50, label: '50°C' },
 *   { value: 100, label: '100°C' },
 * ]" />
 * ```
 */
export { default as SliderWithMarks } from "./SliderWithMarks.vue"

/**
 * SliderWithInput 带输入框滑块
 * 
 * 预组合的带输入框滑块，可直接输入数值
 * 超越 shadcn-vue, Ant Design Vue, PrimeVue
 * 
 * @example
 * ```vue
 * <SliderWithInput v-model="value" :min="0" :max="100" />
 * ```
 */
export { default as SliderWithInput } from "./SliderWithInput.vue"
