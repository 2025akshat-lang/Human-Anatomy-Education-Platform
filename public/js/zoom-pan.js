window.HumanAtlasZoomPan = {
  bind({
    viewport,
    onTap,
    onRotate,
    onPan,
    onZoom,
    panMode,
  }) {
    const pointers = new Map()
    let pinchDistance = 0
    let previousCenter = null
    let moved = 0
    let startedAt = 0

    const center = () => {
      const points = [...pointers.values()]
      return points.reduce((point, current) => ({
        x: point.x + current.x / points.length,
        y: point.y + current.y / points.length,
      }), { x: 0, y: 0 })
    }

    const distance = () => {
      const [a, b] = [...pointers.values()]
      return a && b ? Math.hypot(a.x - b.x, a.y - b.y) : 0
    }

    viewport.addEventListener("pointerdown", event => {
      if (event.button !== 0 && event.button !== 1 && event.button !== 2) return
      viewport.setPointerCapture(event.pointerId)
      pointers.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY,
        pan: event.button !== 0 || event.shiftKey || panMode(),
      })
      if (pointers.size === 1) {
        moved = 0
        startedAt = Date.now()
      } else if (pointers.size === 2) {
        pinchDistance = distance()
        previousCenter = center()
      }
    })

    viewport.addEventListener("pointermove", event => {
      const pointer = pointers.get(event.pointerId)
      if (!pointer) return
      const dx = event.clientX - pointer.x
      const dy = event.clientY - pointer.y
      pointer.x = event.clientX
      pointer.y = event.clientY
      moved += Math.abs(dx) + Math.abs(dy)

      if (pointers.size === 1) {
        if (pointer.pan) onPan(dx, dy)
        else onRotate(dx, dy)
        return
      }

      if (pointers.size >= 2) {
        const nextCenter = center()
        const nextDistance = distance()
        if (previousCenter) onPan(nextCenter.x - previousCenter.x, nextCenter.y - previousCenter.y)
        if (pinchDistance && nextDistance) {
          onZoom(pinchDistance / nextDistance, nextCenter.x, nextCenter.y, true)
        }
        pinchDistance = nextDistance
        previousCenter = nextCenter
      }
    })

    const finish = event => {
      if (!pointers.has(event.pointerId)) return
      const isTap = event.type === "pointerup" && pointers.size === 1 && moved < 8 && Date.now() - startedAt < 400
      pointers.delete(event.pointerId)
      pinchDistance = 0
      previousCenter = null
      if (isTap) onTap(event)
    }
    viewport.addEventListener("pointerup", finish)
    viewport.addEventListener("pointercancel", finish)
    viewport.addEventListener("contextmenu", event => event.preventDefault())
    viewport.addEventListener("wheel", event => {
      event.preventDefault()
      onZoom(Math.exp(Math.max(-120, Math.min(120, event.deltaY)) * 0.001), event.clientX, event.clientY, false)
    }, { passive: false })
  },
}
