import type { ComputedRef, InjectionKey } from "vue"

export interface NumberFieldContext {
  size: ComputedRef<"sm" | "default" | "lg">
  status: ComputedRef<"default" | "success" | "warning" | "error">
  showControls: ComputedRef<boolean>
  controlsPosition: ComputedRef<"right" | "both">
}

export const numberFieldContextKey: InjectionKey<NumberFieldContext> = Symbol("numberFieldContext")
