import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import RocketDock from '../components/RocketDock'
import '../styles/desktop.css'
import AppWindow from '../components/AppWindow'

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
      <AppWindow title='Window 1' id='settings' />
      <AppWindow title='Window 2' id='mail' />
      <RocketDock onIconClick={onIconClick} />
    </main>
  )
}
