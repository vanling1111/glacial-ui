import type { ComputedRef, InjectionKey } from "vue"

export interface AccordionContext {
  bordered: ComputedRef<boolean>
  ghost: ComputedRef<boolean>
  expandIconPosition: ComputedRef<"start" | "end">
  destroyInactivePanel: ComputedRef<boolean>
  disabled: ComputedRef<boolean>
}

export const accordionContextKey: InjectionKey<AccordionContext> = Symbol("accordionContext")
