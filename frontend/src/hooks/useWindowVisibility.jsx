import { useEffect } from 'react'

export const useWindowVisibility = (winRef, isToggled) => {
  useEffect(() => {
    if (!winRef.current) return

    winRef.current.style.display = isToggled ? '' : 'none'
  }, [isToggled])
}
