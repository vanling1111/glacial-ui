/**
 * 构建 Registry JSON 文件
 * 将 packages/core/src/components 下的组件转换为 registry 格式
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, '..')
const COMPONENTS_DIR = path.resolve(ROOT_DIR, 'packages/core/src/components')
const REGISTRY_DIR = path.resolve(ROOT_DIR, 'registry/styles/new-york-v4')

// 组件依赖映射
const COMPONENT_DEPENDENCIES: Record<string, string[]> = {
  'button': ['reka-ui', 'class-variance-authority'],
  'input': ['reka-ui'],
  'select': ['reka-ui', 'lucide-vue-next'],
  'checkbox': ['reka-ui', 'lucide-vue-next'],
  'dialog': ['reka-ui', 'lucide-vue-next'],
  'dropdown-menu': ['reka-ui', 'lucide-vue-next'],
  'popover': ['reka-ui'],
  'tooltip': ['reka-ui'],
  'tabs': ['reka-ui'],
  'accordion': ['reka-ui', 'lucide-vue-next'],
  'alert': ['class-variance-authority', 'lucide-vue-next'],
  'alert-dialog': ['reka-ui'],
  'avatar': ['reka-ui'],
  'badge': ['class-variance-authority'],
  'breadcrumb': ['reka-ui', 'lucide-vue-next'],
  'calendar': ['reka-ui', '@internationalized/date'],
  'card': [],
  'carousel': ['embla-carousel-vue', '@vueuse/core'],
  'chart': ['@unovis/vue', '@unovis/ts'],
  'collapsible': ['reka-ui'],
  'combobox': ['reka-ui', 'lucide-vue-next'],
  'command': ['reka-ui', 'lucide-vue-next'],
  'context-menu': ['reka-ui'],
  'drawer': ['vaul-vue'],
  'form': ['vee-validate', '@vee-validate/zod', 'zod'],
  'hover-card': ['reka-ui'],
  'label': ['reka-ui'],
  'menubar': ['reka-ui'],
  'navigation-menu': ['reka-ui', 'lucide-vue-next'],
  'number-field': ['reka-ui', 'lucide-vue-next'],
  'pagination': ['reka-ui', 'lucide-vue-next'],
  'pin-input': ['reka-ui'],
  'progress': ['reka-ui'],
  'radio-group': ['reka-ui', 'lucide-vue-next'],
  'range-calendar': ['reka-ui', '@internationalized/date'],
  'resizable': ['reka-ui', 'lucide-vue-next'],
  'scroll-area': ['reka-ui'],
  'separator': ['reka-ui'],
  'sheet': ['reka-ui', 'lucide-vue-next'],
  'sidebar': ['reka-ui', 'lucide-vue-next', '@vueuse/core'],
  'skeleton': [],
  'slider': ['reka-ui'],
  'sonner': ['vue-sonner'],
  'spinner': [],
  'stepper': ['reka-ui', 'lucide-vue-next'],
  'switch': ['reka-ui'],
  'table': [],
  'tags-input': ['reka-ui', 'lucide-vue-next'],
  'textarea': [],
  'toggle': ['reka-ui'],
  'toggle-group': ['reka-ui'],
  'input-otp': ['vue-input-otp'],
  'input-group': [],
  'native-select': ['lucide-vue-next'],
  'field': [],
  'item': [],
  'kbd': [],
  'empty': [],
  'aspect-ratio': ['reka-ui'],
  'button-group': [],
}

// 组件间依赖（registryDependencies）
const REGISTRY_DEPENDENCIES: Record<string, string[]> = {
  'alert-dialog': ['button'],
  'dialog': ['button'],
  'sheet': ['button'],
  'drawer': ['button'],
  'command': ['dialog'],
  'combobox': ['command', 'popover'],
  'form': ['label'],
  'calendar': ['button'],
  'range-calendar': ['button'],
  'pagination': ['button'],
  'carousel': ['button'],
  'sidebar': ['button', 'input', 'separator', 'sheet', 'skeleton', 'tooltip'],
  'toggle-group': ['toggle'],
  'input-group': ['button', 'input', 'textarea'],
  'field': ['label'],
}

interface RegistryFile {
  path: string
  content: string
  type: 'registry:ui'
  target?: string
}

interface RegistryItem {
  name: string
  type: 'registry:ui'
  dependencies?: string[]
  devDependencies?: string[]
  registryDependencies?: string[]
  files: RegistryFile[]
  cssVars?: Record<string, unknown>
  meta?: Record<string, unknown>
}

function getComponentFiles(componentName: string): RegistryFile[] {
  const componentDir = path.join(COMPONENTS_DIR, componentName)
  
  if (!fs.existsSync(componentDir)) {
    console.warn(`组件目录不存在: ${componentName}`)
    return []
  }

  const files: RegistryFile[] = []
  const entries = fs.readdirSync(componentDir, { withFileTypes: true })

  for (const entry of entries) {
    if (entry.isFile() && (entry.name.endsWith('.vue') || entry.name.endsWith('.ts'))) {
      const filePath = path.join(componentDir, entry.name)
      const content = fs.readFileSync(filePath, 'utf-8')
      
      files.push({
        path: `ui/${componentName}/${entry.name}`,
        content,
        type: 'registry:ui',
        target: `components/ui/${componentName}/${entry.name}`,
      })
    }
  }

  return files
}

function buildRegistryItem(componentName: string): RegistryItem | null {
  const files = getComponentFiles(componentName)
  
  if (files.length === 0) {
    return null
  }

  const item: RegistryItem = {
    name: componentName,
    type: 'registry:ui',
    files,
  }

  // 添加 npm 依赖
  const deps = COMPONENT_DEPENDENCIES[componentName]
  if (deps && deps.length > 0) {
    item.dependencies = deps
  }

  // 添加组件间依赖
  const regDeps = REGISTRY_DEPENDENCIES[componentName]
  if (regDeps && regDeps.length > 0) {
    item.registryDependencies = regDeps
  }

  return item
}

function buildIndex(): { name: string; type: string }[] {
  const components = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)

  return components.map(name => ({
    name,
    type: 'registry:ui',
  }))
}

async function main() {
  console.log('🚀 开始构建 Registry...\n')

  // 确保目录存在
  if (!fs.existsSync(REGISTRY_DIR)) {
    fs.mkdirSync(REGISTRY_DIR, { recursive: true })
  }

  // 获取所有组件
  const components = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)

  console.log(`📦 找到 ${components.length} 个组件\n`)

  let successCount = 0
  let failCount = 0

  for (const componentName of components) {
    const item = buildRegistryItem(componentName)
    
    if (item) {
      const outputPath = path.join(REGISTRY_DIR, `${componentName}.json`)
      fs.writeFileSync(outputPath, JSON.stringify(item, null, 2))
      console.log(`  ✅ ${componentName}`)
      successCount++
    } else {
      console.log(`  ⚠️  ${componentName} (跳过)`)
      failCount++
    }
  }

  // 构建 index.json
  const index = buildIndex()
  const indexPath = path.join(ROOT_DIR, 'registry/index.json')
  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2))
  console.log(`\n📋 index.json 已生成`)

  console.log(`\n✨ 构建完成！`)
  console.log(`   成功: ${successCount}`)
  console.log(`   跳过: ${failCount}`)
  console.log(`\n📁 输出目录: ${REGISTRY_DIR}`)
}

main().catch(console.error)

