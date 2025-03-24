import { useEffect } from "react"

export const useWindowZIndex = (winRef, isMaximized, isTop, id) => {
  useEffect(() => {
    if (!winRef.current) return

    winRef.current.style.zIndex = isMaximized ? '200' : isTop === id ? '20' : '10';

  }, [isTop, isMaximized])
}