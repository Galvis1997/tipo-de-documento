import Navbar from '../components/Navbar'
import RocketDock from '../components/RocketDock'
import '../styles/desktop.css'

export default function Desktop () {
  return (
    <main className='mainScreen'>
      <Navbar />

      <RocketDock />
    </main>
  )
}
