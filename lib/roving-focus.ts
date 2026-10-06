export type RovingKeyAction =
  | { type: "move"; index: number }
  | { type: "select"; index: number }
  | { type: "none" };

function clampIndex(index: number, length: number) {
  if (length <= 0) return 0;
  return Math.max(0, Math.min(length - 1, index));
}

/**
 * Arrow keys move a roving index. Enter and Space select only when asked,
 * so a listbox can move without activating on those keys.
 */
export function rovingKeyAction(
  key: string,
  index: number,
  length: number,
  options?: { selectOnEnter?: boolean },
): RovingKeyAction {
  if (length <= 0) return { type: "none" };

  switch (key) {
    case "ArrowDown":
    case "ArrowRight":
      return { type: "move", index: clampIndex(index + 1, length) };
    case "ArrowUp":
    case "ArrowLeft":
      return { type: "move", index: clampIndex(index - 1, length) };
    case "Home":
      return { type: "move", index: 0 };
    case "End":
      return { type: "move", index: length - 1 };
    case " ":
    case "Enter":
      if (!options?.selectOnEnter) return { type: "none" };
      return { type: "select", index: clampIndex(index, length) };
    default:
      return { type: "none" };
  }
}
