import { useEffect, useRef } from 'react'
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

  // Manejador de zIndex
  useEffect(() => {
    if (!winRef.current) return

    winRef.current.style.zIndex = isTop === id ? '20' : '10'
  }, [isTop])

  // Configurar la ventana para arrastrar
  useEffect(() => {
    const draggableRef = dragRef.current
    const windowRef = winRef.current
    const screen = document.querySelector('.mainScreen')

    if (!draggableRef || !windowRef || !screen) return

    let isDragging = false
    let offsetX, offsetY

    const mouseDown = (e) => {
      isDragging = true

      // Obtiene la posicion del mouse con respecto a la ventana
      offsetX = e.clientX - windowRef.getBoundingClientRect().left
      offsetY = e.clientY - windowRef.getBoundingClientRect().top
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

      windowRef.style.transform = 'none'
      windowRef.style.top = `${newY}px`
      windowRef.style.left = `${newX}px`
    }

    const mouseUp = () => {
      isDragging = false
      windowRef.style.cursor = 'auto'
      document.body.style.userSelect = 'auto'
    }

    draggableRef.addEventListener('mousedown', mouseDown)
    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', mouseUp)

    return () => {
      draggableRef.removeEventListener('mousedown', mouseDown)
      document.removeEventListener('mousemove', mouseMove)
      document.removeEventListener('mouseup', mouseUp)
    }
  }, [id])

  useEffect(() => {
    winRef.current.style.display = isToggled ? 'flex' : 'none'
  }, [isToggled])

  return (
    <section ref={winRef} className='window' id={id} onClick={() => onWindowClick(id)}>
      <div className='draggable' ref={dragRef} />

      <header className='window--sidebar__header'>
        <button type='button' onClick={() => onWindowClose(id)} className='window--btn window--close' />
        <button type='button' onClick={() => onWindowToggle(id)} className='window--btn window--minimize' />
        <button type='button' className='window--btn window--maximize' />
      </header>

      <aside className='window--sidebar'>
        <ul className='window--menu'>
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

      <article className='window--article'>
        <header className='window--article__header'>
          <span>{title}</span>
        </header>
      </article>
    </section>
  )
}
