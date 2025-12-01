import type { ComputedRef, InjectionKey } from "vue"

export interface StepperContext {
  size: ComputedRef<"sm" | "default" | "lg">
  variant: ComputedRef<"default" | "dot" | "navigation">
  labelPlacement: ComputedRef<"end" | "bottom">
  clickable: ComputedRef<boolean>
  orientation: ComputedRef<"horizontal" | "vertical">
}

export const stepperContextKey: InjectionKey<StepperContext> = Symbol("stepperContext")
