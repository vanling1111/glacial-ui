/**
 * Tabs 标签页组件
 * 
 * shadcn 风格的原子组件 + 组合组件
 * 功能超越 Ant Design Vue, Arco Design Vue, TDesign, PrimeVue
 */

// ============================================================================
// 原子组件
// ============================================================================

/**
 * Tabs 原子组件
 * 
 * 标签页容器，需要配合 TabsList, TabsTrigger, TabsContent 使用
 * 
 * @example
 * ```vue
 * <Tabs default-value="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 *   <TabsContent value="tab2">Content 2</TabsContent>
 * </Tabs>
 * ```
 */
export { default as Tabs } from "./Tabs.vue"

/**
 * TabsList 标签列表
 */
export { default as TabsList } from "./TabsList.vue"

/**
 * TabsTrigger 标签触发器
 */
export { default as TabsTrigger } from "./TabsTrigger.vue"

/**
 * TabsContent 标签内容
 */
export { default as TabsContent } from "./TabsContent.vue"

// ============================================================================
// 组合组件
// ============================================================================

/**
 * TabsSimple 简单标签页
 * 
 * 预组合的简单标签页，传入 items 数组即可使用
 * 超越 shadcn-vue
 * 
 * @example
 * ```vue
 * <TabsSimple v-model="activeTab" :items="[
 *   { value: 'tab1', label: 'Tab 1' },
 *   { value: 'tab2', label: 'Tab 2' },
 * ]">
 *   <template #tab1>Content 1</template>
 *   <template #tab2>Content 2</template>
 * </TabsSimple>
 * ```
 */
export { default as TabsSimple } from "./TabsSimple.vue"

/**
 * TabsUnderline 下划线标签页
 * 
 * 预组合的下划线风格标签页
 * 超越 shadcn-vue
 * 
 * @example
 * ```vue
 * <TabsUnderline v-model="activeTab" :items="items" />
 * ```
 */
export { default as TabsUnderline } from "./TabsUnderline.vue"

/**
 * TabsCard 卡片标签页
 * 
 * 预组合的卡片风格标签页
 * 超越 shadcn-vue, PrimeVue
 * 
 * @example
 * ```vue
 * <TabsCard v-model="activeTab" :items="items" />
 * ```
 */
export { default as TabsCard } from "./TabsCard.vue"

/**
 * TabsVertical 垂直标签页
 * 
 * 预组合的垂直布局标签页
 * 超越 shadcn-vue
 * 
 * @example
 * ```vue
 * <TabsVertical v-model="activeTab" :items="items" />
 * ```
 */
export { default as TabsVertical } from "./TabsVertical.vue"
