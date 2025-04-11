import CreateElements from "../components/Elementos/CreateElements"
import ListElements from "../components/elementos/ListElements"

export const windowContents = {
  finder: {
    sidebar: [
      { key: 'createElement', icon: 'fas fa-folder', label: 'Crear Elemento' },
      { key: 'listElement', icon: 'fas fa-cog', label: 'Listar Elemento' }
    ],
    views: {
      createElement: ({ setAlert }) => <CreateElements setAlert={setAlert} />,
      listElement: ({ setAlert }) => <ListElements setAlert={setAlert} />
    }
  }
}
