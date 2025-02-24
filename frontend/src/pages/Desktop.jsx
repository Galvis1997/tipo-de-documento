import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import RocketDock from '../components/RocketDock'
import '../styles/desktop.css'

export default function Desktop() {
  const [openWindow, setOpenWindow] = useState()

  const onIconClick = (name) => {
    setOpenWindow(name)
  }

  useEffect(() => {
    openWindow && console.log(`You clicked on ${openWindow}`);
  }, [openWindow]);

  return (
    <main className='mainScreen'>
      <Navbar />

      <RocketDock onIconClick={onIconClick} />
    </main>
  )
}
