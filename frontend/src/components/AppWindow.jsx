import { useEffect, useRef } from "react";
import "../styles/window.css";

export default function AppWindow({ id, title }) {
  const dragRef = useRef(null);

  // Congigura la ventana para que se pueda arrastrar
  useEffect(() => {
    let windowDrag = dragRef.current
    let window = document.querySelector(`#${id}`)
    let screen = document.querySelector('.mainScreen')

    if (!windowDrag || !screen) return

    let isDragging = false;
    let offsetX, offsetY

    const mouseDown = (e) => {
      isDragging = true

      // Obtiene la posición del mouse (X, Y) relativo a la ventana a arrastrar
      offsetX = e.clientX - windowDrag.getBoundingClientRect().left
      offsetY = e.clientY - windowDrag.getBoundingClientRect().top
    }

    const mouseMove = (e) => {
      if (!isDragging) return

      e.preventDefault()

      // Obtiene las dimensiones y posiciones de la ventana a arrastrar y la pantalla
      const windowRect = window.getBoundingClientRect()
      const screenRect = screen.getBoundingClientRect()

      // Calcula la posición de la esquina superior izquierda de la ventana a arrastrar
      let newX = e.clientX - offsetX;
      let newY = e.clientY - offsetY;

      // Limita la posicion de la ventana a arrastrar a las dimensiones de la pantalla
      if (newX < screenRect.left) newX = screenRect.left
      if (newX + windowRect.width > screenRect.right) newX = screenRect.right - windowRect.width

      if (newY < screenRect.top) newY = screenRect.top
      if (newY + windowRect.height > screenRect.bottom) newY = screenRect.bottom - windowRect.height

      windowDrag.style.cursor = 'grabbing'
      window.style.transform = 'none'
      window.style.top = `${newY}px`
      window.style.left = `${newX}px`

    }

    const mouseUp = () => {
      isDragging = false
      windowDrag.style.cursor = 'auto'
    }

    windowDrag.addEventListener('mousedown', mouseDown)
    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', mouseUp)

    return () => {
      windowDrag.removeEventListener('mousedown', mouseDown)
      document.removeEventListener('mousemove', mouseMove)
      document.removeEventListener('mouseup', mouseUp)
    }

  }, []);

  return (
    <section className="window" id={id}>
      <div className="draggable" ref={dragRef} />
      <aside className="window--sidebar">
        <header className="window--sidebar__header">
          <button type="button" className="window--btn window--close" />
          <button type="button" className="window--btn window--minimize" />
          <button type="button" className="window--btn window--maximize" />
        </header>
        <ul className="window--menu">
          <li>
            <i className="fas fa-desktop" />
            <span>Pantalla</span>
          </li>
          <li>
            <i className="fas fa-video" />
            <span>Animaciones</span>
          </li>
        </ul>
      </aside>
      <article className="window--article">
        <header className="window--article__header">
          <span>{title}</span>
        </header>
      </article>
    </section>
  );
}
