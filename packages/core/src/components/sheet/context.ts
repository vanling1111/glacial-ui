import type { ComputedRef, InjectionKey } from "vue"

export interface SheetContext {
  showOverlay: ComputedRef<boolean>
  closeOnOverlayClick: ComputedRef<boolean>
  closeOnEscape: ComputedRef<boolean>
}

export const sheetContextKey: InjectionKey<SheetContext> = Symbol("sheetContext")
