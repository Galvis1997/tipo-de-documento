const images = import.meta.glob('../assets/images/rocketDockIcons/*.{png,jpg,jpeg,svg,webp}', { eager: true })

const imageList = Object.entries(images)
  .map(([path, img]) => ({ path, src: img.default }))
  .sort((a, b) => {
    const order = [
      'finder.png', 'appstore.png', 'settings.webp', 'calculator.png', 'launchpad.png', 'mail.png', 'maps.png', 'message.png', 'music.png', 'notes.png', 'photos.png', 'terminal.png', 'vscode.svg', 'bin.png'
    ]

    return order.indexOf(a.path.split('/').pop()) - order.indexOf(b.path.split('/').pop())
  })
  .map(item => item.src)

export default function RocketDock () {
  return (
    <section className='rocketDock'>
      {imageList.map((icon, index) => (
        <RocketDockItem key={index} icon={icon} />
      ))}
    </section>
  )
}

function RocketDockItem ({ icon }) {
  return (
    <div className='rocketDock--item'>
      <img src={icon} alt='Dock Icon' />
    </div>
  )
}
