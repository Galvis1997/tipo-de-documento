import { useEffect } from "react"

export const useWindowDraggable = (winRef, dragRef, tobBarHeight, setWindowPosition) => {
  useEffect(() => {
    const draggableRef = dragRef.current
    const windowRef = winRef.current
    const screen = document.querySelector('.screen')

    if (!draggableRef || !windowRef || !screen) return

    let isDragging = false
    let offsetX, offsetY

    const mouseDown = (e) => {
      isDragging = true

      // Obtiene la posicion del mouse con respecto a la ventana
      offsetX = e.clientX - windowRef.getBoundingClientRect().left
      offsetY = e.clientY - windowRef.getBoundingClientRect().top + tobBarHeight
      windowRef.style.cursor = 'grabbing'
      document.body.style.userSelect = 'none'
    }

    const mouseMove = (e) => {
      if (!isDragging) return
      e.preventDefault()

      const windowRect = windowRef.getBoundingClientRect()
      const screenRect = screen.getBoundingClientRect()

      let newX = e.clientX - offsetX
      let newY = e.clientY - offsetY

      // Limitar la posición de la ventana dentro de la pantalla
      newX = Math.max(screenRect.left, Math.min(newX, screenRect.right - windowRect.width))
      newY = Math.max((screenRect.top - tobBarHeight), Math.min(newY, (screenRect.bottom - windowRect.height) - tobBarHeight))
      setWindowPosition({ x: newX, y: newY })

      windowRef.style.transform = 'none'
      windowRef.style.top = `${newY}px`
      windowRef.style.left = `${newX}px`
    }

    const mouseUp = () => {
      isDragging = false
      windowRef.style.cursor = ''
      document.body.style.userSelect = ''
    }

    draggableRef.addEventListener('mousedown', mouseDown)
    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', mouseUp)

    return () => {
      draggableRef.removeEventListener('mousedown', mouseDown)
      document.removeEventListener('mousemove', mouseMove)
      document.removeEventListener('mouseup', mouseUp)
    }
  }, [])

}