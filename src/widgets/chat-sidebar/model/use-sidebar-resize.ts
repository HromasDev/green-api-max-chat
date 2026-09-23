import { type PointerEvent, useCallback, useRef, useState } from 'react'

const MIN_WIDTH = 240
const MAX_WIDTH = 480
const DEFAULT_WIDTH = 320
const STORAGE_KEY = 'green-api-sidebar-width'

function readStoredWidth(): number {
  const stored = Number(localStorage.getItem(STORAGE_KEY))
  return stored >= MIN_WIDTH && stored <= MAX_WIDTH ? stored : DEFAULT_WIDTH
}

export function useSidebarResize() {
  const [width, setWidth] = useState(readStoredWidth)
  const widthRef = useRef(width)
  const draggingRef = useRef(false)

  const onPointerDown = useCallback((event: PointerEvent) => {
    draggingRef.current = true
    event.currentTarget.setPointerCapture(event.pointerId)
  }, [])

  const onPointerMove = useCallback((event: PointerEvent) => {
    if (!draggingRef.current) return
    const next = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, event.clientX))
    widthRef.current = next
    setWidth(next)
  }, [])

  const onPointerUp = useCallback(() => {
    if (!draggingRef.current) return
    draggingRef.current = false
    localStorage.setItem(STORAGE_KEY, String(widthRef.current))
  }, [])

  return { width, onPointerDown, onPointerMove, onPointerUp }
}
