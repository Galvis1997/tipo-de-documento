import { useEffect, useState } from "react"
import { FetchElementsEndpoint } from "../../config/apiRoutes"

import { Icon } from '@iconify/react'

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
      <div className="title">Listar Elementos</div>

      <table className="table">
        <thead className="table__header">
          <tr className="table__row">
            <th>Codigo</th>
            <th>Nombre</th>
            <th>Area</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className="table__body">
          {elements && elements.map(({ codigo, nombre, area, tipo, estado }, index) => (
            <tr key={index} className={`table__row ${index % 2 === 1 ? 'table__row--alt' : ''}`}>
              <td>{codigo}</td>
              <td>{nombre}</td>
              <td>{area}</td>
              <td>{tipo}</td>
              <td>{estado}</td>
              <td className="table__body--actions">
                <div className="tooltip-container">
                  <Icon icon="system-uicons:eye" width="24" strokeWidth={1.2} />
                  <span className="tooltip">Ver</span>
                </div>
                <div className="tooltip-container">
                  <Icon icon="system-uicons:create" width="24" strokeWidth={1.2} />
                  <span className="tooltip">Editar</span>
                </div>
                <div className="tooltip-container">
                  <Icon icon="system-uicons:trash" width="24" strokeWidth={1.2} />
                  <span className="tooltip">Eliminar</span>
                </div>
                <div className="tooltip-container">
                  <Icon icon="system-uicons:settings" width="24" strokeWidth={1.2} />
                  <span className="tooltip">Opciones</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
