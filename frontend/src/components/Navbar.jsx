import appleLogo from '../assets/images/macIcon.webp'

export default function Navbar () {
  const options = ['Archivo', 'Editar', 'Ver', 'Ir', 'Ventana', 'Ayuda']

  return (
    <nav className='topBar'>
      <div className='topBar--fileOptions'>
        <img src={appleLogo} alt='' />

        <span><strong>Finder</strong></span>
        {
          options.map(option => (
            <span key={option}>{option}</span>
          ))
        }
      </div>
    </nav>
  )
}
