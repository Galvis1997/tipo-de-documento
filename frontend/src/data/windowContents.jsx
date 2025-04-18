import CreateElements from "../components/Elementos/CreateElements"
import ListElements from "../components/elementos/ListElements"

export const windowContents = {
  finder: {
    sidebar: [
      { key: 'listElement', icon: 'system-uicons:clipboard-notes', label: 'Lista elementos' },
      { key: 'createElement', icon: 'system-uicons:clipboard-add', label: 'Crear elemento' },
    ],
    views: {
      listElement: ({ setAlert }) => <ListElements setAlert={setAlert} />,
      createElement: ({ setAlert }) => <CreateElements setAlert={setAlert} />,
    }
  }
}
