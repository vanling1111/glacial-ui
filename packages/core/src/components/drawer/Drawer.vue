<script lang="ts" setup>
import type { DrawerRootEmits, DrawerRootProps } from "vaul-vue"
import { DrawerRoot } from "vaul-vue"

const props = withDefaults(defineProps<DrawerRootProps>(), {
  shouldScaleBackground: true,
})

defineEmits<DrawerRootEmits>()
</script>

<template>
  <DrawerRoot
    v-slot="slotProps"
    data-slot="drawer"
    :should-scale-background="shouldScaleBackground"
    :open="open"
    :default-open="defaultOpen"
    :modal="modal"
    :direction="direction"
    :dismissible="dismissible"
    :snap-points="snapPoints"
    :active-snap-point="activeSnapPoint"
    :fade-from-index="fadeFromIndex"
    :nested="nested"
    :fixed="fixed"
    :no-body-styles="noBodyStyles"
    v-on="$attrs"
  >
    <slot v-bind="slotProps" />
  </DrawerRoot>
</template>
