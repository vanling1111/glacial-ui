/**
 * Input 输入框组件
 * 
 * shadcn 风格的简洁输入框组件
 * 增强功能通过 input-group 组件族提供
 * 
 * @example
 * ```vue
 * <!-- 基础用法 -->
 * <Input v-model="value" placeholder="请输入" />
 * 
 * <!-- 带前后缀（使用 InputGroup） -->
 * <InputGroup>
 *   <InputGroupAddon><SearchIcon /></InputGroupAddon>
 *   <InputGroupInput v-model="value" placeholder="搜索" />
 *   <InputGroupAddon align="inline-end"><Kbd>⌘K</Kbd></InputGroupAddon>
 * </InputGroup>
 * ```
 */
export { default as Input } from "./Input.vue"
