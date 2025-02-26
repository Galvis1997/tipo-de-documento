import { useEffect, useRef, useState } from 'react'
import '../styles/window.css'

export default function AppWindow ({
  id,
  title,
  isTop,
  onWindowClick,
  onWindowClose,
  onWindowToggle,
  isToggled
}) {
  const winRef = useRef(null)
  const dragRef = useRef(null)
  const [windowPosition, setWindowPosition] = useState({ x: '50%', y: '50%' })
  const [isMaximized, setIsMaximized] = useState(false)

  // Manejador de zIndex
  useEffect(() => {
    if (!winRef.current) return

    if (isMaximized) {
      winRef.current.style.zIndex = '200'
    } else {
      winRef.current.style.zIndex = isTop === id ? '20' : '10'
    }
  }, [isTop, isMaximized])

  // Configurar la ventana para arrastrar
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
      offsetY = e.clientY - windowRef.getBoundingClientRect().top + 35.2
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
      newY = Math.max(screenRect.top, Math.min(newY, screenRect.bottom - windowRect.height))
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

  // Minimiza la ventane o restaura
  useEffect(() => {
    if (!winRef.current) return

    winRef.current.style.display = isToggled ? '' : 'none'
  }, [isToggled])

  // Maximiza o restaura la ventana
  const onWindowMaximize = () => {
    setIsMaximized(!isMaximized)
  }

  useEffect(() => {
    if (!winRef.current || !dragRef.current) return

    if (isMaximized) {
      winRef.current.classList.add('maximized_window')
      winRef.current.style.top = ''
      winRef.current.style.left = ''
    } else {
      winRef.current.classList.remove('maximized_window')
      winRef.current.style.top = `${windowPosition.y}px`
      winRef.current.style.left = `${windowPosition.x}px`
    }

    dragRef.current.style.display = isMaximized ? 'none' : ''
  }, [isMaximized])

  return (
    <section ref={winRef} className='window' id={id} onClick={() => onWindowClick(id)}>
      <div className='draggable' ref={dragRef} />

      <header className='window-btns'>
        <button type='button' onClick={() => onWindowClose(id)} className='window__btn window__btn--close' />
        <button type='button' onClick={() => onWindowToggle(id)} className='window__btn window__btn--minimize' />
        <button type='button' onClick={onWindowMaximize} className='window__btn window__btn--maximize' />
      </header>

      <aside className='window__sidebar'>
        <ul className='window__menu'>
          <li>
            <i className='fas fa-desktop' />
            <span>Pantalla</span>
          </li>
          <li>
            <i className='fas fa-video' />
            <span>Animaciones</span>
          </li>
        </ul>
      </aside>

      <article className='window__article'>
        <header className='window-article__header'>
          <span>{title}</span>
        </header>
      </article>
    </section>
  )
}
