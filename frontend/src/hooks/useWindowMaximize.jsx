import { useEffect, useState } from 'react'

export const useWindowMaximize = (winRef, dragRef, windowPosition, windowSize) => {
  const [isMaximized, setIsMaximized] = useState()

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized)
  }

  useEffect(() => {
    if (!winRef.current || !dragRef.current) return

    if (isMaximized) {
      winRef.current.classList.add('maximized_window')
      winRef.current.style.top = ''
      winRef.current.style.left = ''
      winRef.current.style.width = ''
      winRef.current.style.height = ''
    } else {
      winRef.current.classList.remove('maximized_window')
      winRef.current.style.top = `${windowPosition.y}px`
      winRef.current.style.left = `${windowPosition.x}px`
      winRef.current.style.width = `${windowSize.width}px`
      winRef.current.style.height = `${windowSize.height}px`
    }

    dragRef.current.style.display = isMaximized ? 'none' : ''
  }, [isMaximized])

  return { isMaximized, toggleMaximize }
}
