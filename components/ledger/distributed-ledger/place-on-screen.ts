type Frame = { top: number; bottom: number };

/** Offset from the frame top that puts a card on the viewport center, kept inside the frame. */
export function screenCenterTop(
  frame: Frame,
  cardHeight: number,
  viewMid: number,
  pad = 0,
) {
  const minTop = frame.top + pad;
  const maxTop = Math.max(minTop, frame.bottom - cardHeight - pad);
  const unclamped = viewMid - cardHeight / 2;
  return Math.min(Math.max(unclamped, minTop), maxTop) - frame.top;
}
