import type { ComputedRef, InjectionKey } from "vue"

export interface PaginationContext {
  size: ComputedRef<"sm" | "default" | "lg">
  simple: ComputedRef<boolean>
  disabled: ComputedRef<boolean>
}

export const paginationContextKey: InjectionKey<PaginationContext> = Symbol("paginationContext")
