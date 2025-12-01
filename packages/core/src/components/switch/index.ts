/**
 * Switch 开关组件
 * 
 * shadcn 风格的原子组件 + 组合组件
 */

// ============================================================================
// 原子组件
// ============================================================================

/**
 * Switch 原子组件
 * 
 * 极简的开关组件，只包含核心功能
 * 
 * @example
 * ```vue
 * <Switch v-model:checked="checked" />
 * ```
 */
export { default as Switch } from "./Switch.vue"

// ============================================================================
// 组合组件
// ============================================================================

/**
 * SwitchWithLabel 带标签开关
 * 
 * 预组合的带标签开关，支持描述文本和标签位置
 * 
 * @example
 * ```vue
 * <SwitchWithLabel v-model="checked" label="启用通知" />
 * <SwitchWithLabel v-model="checked" label="飞行模式" description="关闭所有无线连接" />
 * <SwitchWithLabel v-model="checked" label="左侧标签" label-position="left" />
 * ```
 */
export { default as SwitchWithLabel } from "./SwitchWithLabel.vue"

/**
 * SwitchWithLoading 带加载状态开关
 * 
 * 预组合的带加载状态开关，支持异步切换
 * 
 * @example
 * ```vue
 * <SwitchWithLoading v-model="checked" loading />
 * <SwitchWithLoading v-model="checked" :before-change="handleBeforeChange" />
 * ```
 */
export { default as SwitchWithLoading } from "./SwitchWithLoading.vue"

/**
 * SwitchWithText 带文本开关
 * 
 * 预组合的带开关文本开关（开/关文字显示在开关内部）
 * 
 * @example
 * ```vue
 * <SwitchWithText v-model="checked" checked-text="开" unchecked-text="关" />
 * <SwitchWithText v-model="checked" checked-text="ON" unchecked-text="OFF" />
 * ```
 */
export { default as SwitchWithText } from "./SwitchWithText.vue"
