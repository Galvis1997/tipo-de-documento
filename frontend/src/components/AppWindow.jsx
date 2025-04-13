import { useEffect, useRef, useState } from 'react'
import { useWindowDraggable } from '../hooks/useWindowDraggable'
import { useWindowZIndex } from '../hooks/useWindowZIndex'
import { useWindowVisibility } from '../hooks/useWindowVisibility'
import { useWindowMaximize } from '../hooks/useWindowMaximize'
import { useWindowResizable } from '../hooks/useWindowResizable'

import { Icon } from '@iconify/react'
import '../styles/window.css'
import { windowContents } from '../data/windowContents'

export default function AppWindow({
  id,
  title,
  isTop,
  onWindowClick,
  onWindowClose,
  onWindowToggle,
  isToggled,
  setAlert
}) {
  // #region Window Config
  const winRef = useRef(null)
  const dragRef = useRef(null)
  const screen = document.querySelector('.screen')

  const [windowPosition, setWindowPosition] = useState({ x: '50%', y: '50%' })
  const [windowSize, setWindowSize] = useState({ width: 900, height: 532 })
  const topBarHeight = 35.2

  // Maximiza o restaura la ventana
  const { isMaximized, toggleMaximize } = useWindowMaximize(winRef, dragRef, windowPosition, windowSize)

  // Configurar la ventana para arrastrar
  useWindowDraggable(winRef, dragRef, screen, topBarHeight, setWindowPosition)

  // Manejador de zIndex
  useWindowZIndex(winRef, isMaximized, isTop, id)

  // Minimiza la ventane o restaura
  useWindowVisibility(winRef, isToggled)

  useWindowResizable(winRef, screen, isMaximized, setWindowSize, setWindowPosition, topBarHeight)
  // #endregion

  // #region Window Content
  const [activeView, setActiveView] = useState()

  const content = windowContents[id]

  useEffect(() => {
    if (content?.sidebar?.length > 0) {
      setActiveView(content.sidebar[0].key)
    }

  }, [id])

  const renderSidebarContent = () => {
    if (!content?.sidebar) return

    return (
      <ul className='window__menu'>
        {content.sidebar?.map(item => (
          <li key={item.key} onClick={() => setActiveView(item.key)} className={`window__menu--item ${activeView === item.key ? 'window__menu--item--active' : ''}`}>
            <Icon
              icon={item.icon}
              width='28px'
              strokeWidth={1.2}
              className='window__menu--item--icon'/>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    )
  }

  const renderMainContent = () => {
    if (!content?.views) return

    const ViewComponent = content.views?.[activeView]
    return ViewComponent ? ViewComponent({ setAlert }) : ''
  }
  // #endregion

  return (
    <section ref={winRef} className='window' id={id} onClick={() => onWindowClick(id)}>
      <div className='draggable' ref={dragRef} />

      <header className='window-btns'>
        <button type='button' onClick={() => onWindowClose(id)} className='window__btn window__btn--close' />
        <button type='button' onClick={() => onWindowToggle(id)} className='window__btn window__btn--minimize' />
        <button type='button' onClick={toggleMaximize} className='window__btn window__btn--maximize' />
      </header>

      <aside className='window__sidebar'>
        {renderSidebarContent()}
      </aside>

      <main className='window__main'>
        <header className='window-main__header'>
          <span>{title}</span>
        </header>
        <article className='window-main__article'>
          {renderMainContent()}
        </article>
      </main>
    </section>
  )
}