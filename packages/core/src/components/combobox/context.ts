import type { ComputedRef, InjectionKey } from "vue"

export interface ComboboxContext {
  size: ComputedRef<"sm" | "default" | "lg">
  status: ComputedRef<"default" | "success" | "warning" | "error">
  allowCreate: ComputedRef<boolean>
  loading: ComputedRef<boolean>
}

export const comboboxContextKey: InjectionKey<ComboboxContext> = Symbol("comboboxContext")
