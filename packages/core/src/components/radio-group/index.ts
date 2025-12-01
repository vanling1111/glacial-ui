/**
 * RadioGroup 单选框组组件
 * 
 * shadcn 风格的原子组件 + 组合组件
 */

// ============================================================================
// 原子组件
// ============================================================================

/**
 * RadioGroup 原子组件
 * 
 * 极简的单选框组容器
 * 
 * @example
 * ```vue
 * <RadioGroup v-model="value">
 *   <RadioGroupItem value="1" />
 *   <RadioGroupItem value="2" />
 * </RadioGroup>
 * ```
 */
export { default as RadioGroup } from "./RadioGroup.vue"

/**
 * RadioGroupItem 原子组件
 * 
 * 极简的单选框选项
 * 
 * @example
 * ```vue
 * <RadioGroupItem value="option1" />
 * ```
 */
export { default as RadioGroupItem } from "./RadioGroupItem.vue"

// ============================================================================
// 组合组件
// ============================================================================

/**
 * RadioGroupItemWithLabel 带标签单选框选项
 * 
 * 预组合的带标签单选框选项，支持描述文本
 * 
 * @example
 * ```vue
 * <RadioGroup v-model="value">
 *   <RadioGroupItemWithLabel value="1" label="选项一" />
 *   <RadioGroupItemWithLabel value="2" label="选项二" description="这是描述" />
 * </RadioGroup>
 * ```
 */
export { default as RadioGroupItemWithLabel } from "./RadioGroupItemWithLabel.vue"

/**
 * RadioGroupSimple 简单单选框组
 * 
 * 预组合的单选框组，传入 options 数组即可使用
 * 
 * @example
 * ```vue
 * <RadioGroupSimple v-model="value" :options="[
 *   { label: '选项一', value: '1' },
 *   { label: '选项二', value: '2' },
 * ]" />
 * ```
 */
export { default as RadioGroupSimple } from "./RadioGroupSimple.vue"

/**
 * RadioGroupCard 卡片式单选框组
 * 
 * 预组合的卡片式单选框组，每个选项是一个可点击的卡片
 * 
 * @example
 * ```vue
 * <RadioGroupCard v-model="value" :options="[
 *   { label: '基础版', value: 'basic', description: '适合个人使用' },
 *   { label: '专业版', value: 'pro', description: '适合团队使用' },
 * ]" :columns="2" />
 * ```
 */
export { default as RadioGroupCard } from "./RadioGroupCard.vue"

/**
 * RadioGroupButton 按钮式单选框组
 * 
 * 预组合的按钮式单选框组，类似 SegmentedControl
 * 
 * @example
 * ```vue
 * <RadioGroupButton v-model="value" :options="[
 *   { label: '日', value: 'day' },
 *   { label: '周', value: 'week' },
 *   { label: '月', value: 'month' },
 * ]" />
 * ```
 */
export { default as RadioGroupButton } from "./RadioGroupButton.vue"
