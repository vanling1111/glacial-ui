export type TooltipPlacement =
  | "top" | "top-start" | "top-end"
  | "bottom" | "bottom-start" | "bottom-end"
  | "left" | "left-start" | "left-end"
  | "right" | "right-start" | "right-end"

/**
 * 将语义化 placement 映射为 reka 的 side/align
 */
export function mapPlacement(placement?: TooltipPlacement): { side?: "top" | "bottom" | "left" | "right"; align?: "start" | "center" | "end" } {
  switch (placement) {
    case "top":
      return { side: "top", align: "center" }
    case "top-start":
      return { side: "top", align: "start" }
    case "top-end":
      return { side: "top", align: "end" }

    case "bottom":
      return { side: "bottom", align: "center" }
    case "bottom-start":
      return { side: "bottom", align: "start" }
    case "bottom-end":
      return { side: "bottom", align: "end" }

    case "left":
      return { side: "left", align: "center" }
    case "left-start":
      return { side: "left", align: "start" }
    case "left-end":
      return { side: "left", align: "end" }

    case "right":
      return { side: "right", align: "center" }
    case "right-start":
      return { side: "right", align: "start" }
    case "right-end":
      return { side: "right", align: "end" }

    default:
      return {}
  }
}

