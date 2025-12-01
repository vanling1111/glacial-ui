/**
 * Avatar 头像组件
 * 
 * shadcn 风格的原子组件 + 组合组件
 * 功能超越 Ant Design Vue, Arco Design Vue, TDesign, PrimeVue
 */

// ============================================================================
// 原子组件
// ============================================================================

/**
 * Avatar 原子组件
 * 
 * 头像容器，需要配合 AvatarImage 和 AvatarFallback 使用
 * 
 * @example
 * ```vue
 * <Avatar>
 *   <AvatarImage src="/avatar.jpg" alt="User" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * ```
 */
export { default as Avatar } from "./Avatar.vue"

/**
 * AvatarImage 头像图片
 * 
 * 头像图片组件
 */
export { default as AvatarImage } from "./AvatarImage.vue"

/**
 * AvatarFallback 头像回退
 * 
 * 图片加载失败时显示的内容
 */
export { default as AvatarFallback } from "./AvatarFallback.vue"

// ============================================================================
// 组合组件
// ============================================================================

/**
 * AvatarSimple 简单头像
 * 
 * 预组合的简单头像，传入 src 和 fallback 即可使用
 * 超越 shadcn-vue
 * 
 * @example
 * ```vue
 * <AvatarSimple src="/avatar.jpg" fallback="JD" />
 * <AvatarSimple src="/avatar.jpg" size="lg" shape="square" />
 * ```
 */
export { default as AvatarSimple } from "./AvatarSimple.vue"

/**
 * AvatarGroup 头像组
 * 
 * 预组合的头像组，支持堆叠展示和最大数量限制
 * 超越 shadcn-vue
 * 
 * @example
 * ```vue
 * <AvatarGroup :items="users" :max="3" />
 * <AvatarGroup>
 *   <AvatarSimple src="/user1.jpg" />
 *   <AvatarSimple src="/user2.jpg" />
 * </AvatarGroup>
 * ```
 */
export { default as AvatarGroup } from "./AvatarGroup.vue"

/**
 * AvatarWithStatus 带状态头像
 * 
 * 预组合的带在线状态头像
 * 超越 shadcn-vue, Ant Design Vue, TDesign, PrimeVue
 * 
 * @example
 * ```vue
 * <AvatarWithStatus src="/avatar.jpg" status="online" />
 * <AvatarWithStatus src="/avatar.jpg" status="busy" fallback="JD" />
 * ```
 */
export { default as AvatarWithStatus } from "./AvatarWithStatus.vue"
