import type { ComputedRef, InjectionKey } from "vue"

export interface BreadcrumbContext {
  size: ComputedRef<"sm" | "default" | "lg">
}

export const breadcrumbContextKey: InjectionKey<BreadcrumbContext> = Symbol("breadcrumbContext")
