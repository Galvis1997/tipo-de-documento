import CreateElements from "../components/Elementos/CreateElements"
import ListElements from "../components/elementos/ListElements"

export const windowContents = {
  finder: {
    sidebar: [
      { key: 'createElement', icon: 'system-uicons:clipboard-add', label: 'Crear Elemento' },
      { key: 'listElement', icon: 'system-uicons:clipboard-notes', label: 'Listar Elemento' }
    ],
    views: {
      createElement: ({ setAlert }) => <CreateElements setAlert={setAlert} />,
      listElement: ({ setAlert }) => <ListElements setAlert={setAlert} />
    }
  }
}
