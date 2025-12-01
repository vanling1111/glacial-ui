import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      cleanVueTsc: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'GlacialUI',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: [
        'vue',
        'reka-ui',
        'reka-ui/date',
        '@vueuse/core',
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
        'lucide-vue-next',
        '@unovis/vue',
        '@unovis/ts',
        '@tanstack/vue-table',
        'embla-carousel-vue',
        'embla-carousel-autoplay',
        'vaul-vue',
        'vee-validate',
        '@vee-validate/zod',
        'zod',
        'v-calendar',
        '@internationalized/date',
        'vue-input-otp',
        'vue-sonner',
      ],
      output: {
        globals: {
          vue: 'Vue',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'style.css'
          return assetInfo.name || ''
        },
      },
    },
    cssCodeSplit: false,
  },
})

