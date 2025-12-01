import type { ComputedRef, InjectionKey } from "vue"

export interface TagsInputContext {
  size: ComputedRef<"sm" | "default" | "lg">
  status: ComputedRef<"default" | "success" | "warning" | "error">
  tagColor: ComputedRef<"default" | "primary" | "secondary" | "success" | "warning" | "danger">
  clearable: ComputedRef<boolean>
  readonly: ComputedRef<boolean>
}

export const tagsInputContextKey: InjectionKey<TagsInputContext> = Symbol("tagsInputContext")
