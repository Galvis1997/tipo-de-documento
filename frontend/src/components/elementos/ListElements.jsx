import { useEffect, useState } from "react"
import { FetchElementsEndpoint } from "../../config/apiRoutes"

export default function ListElements({ setAlert }) {

  const [elements, setElements] = useState([])

  useEffect(() => {
    fetch(FetchElementsEndpoint)
      .then((res) => res.json())
      .then((response) => {
        setElements(response)
      })
      .catch((error) => {
        console.error(error)
        setAlert({ type: 'error', message: 'Error al cargar los elementos', active: true })
      })
  }, [])


  return (
    <>
      <div className="form__title">Consultar elementos</div>

      <table>
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Nombre</th>
            <th>Area</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {elements && elements.map(({ codigo, nombre, area, tipo }, index) => (
            <tr key={index}>
              <td>{codigo}</td>
              <td>{nombre}</td>
              <td>{area}</td>
              <td>{tipo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
