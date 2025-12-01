export type ContainerLike = string | HTMLElement | null | undefined

export function resolveContainer(container?: ContainerLike): HTMLElement | undefined {
  if (typeof window === 'undefined') return undefined
  if (!container) return undefined
  if (typeof container === 'string') {
    try {
      const target = document.querySelector(container)
      return (target as HTMLElement) || undefined
    } catch {
      return undefined
    }
  }
  return container || undefined
}

