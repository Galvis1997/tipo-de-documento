import { useEffect, useState } from "react";
import { FetchElementByCodeEndpoint } from "../../config/apiRoutes";

export default function SeeElements({ setAlert, searchElement }) {
  const [element, setElement] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log(searchElement)

    const fetchElement = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${FetchElementByCodeEndpoint}${searchElement}`)
        const response = await res.json()

        console.log(response)

        if (response.error) {
          setAlert({ type: "error", message: response.error })
          setElement(null)
        } else {
          setElement(response)
        }
      } catch (error) {
        setAlert({ type: "error", message: "Error al buscar el elemento", active: true })
        setElement(null)
      } finally {
        setLoading(false)
      }
    };

    fetchElement()
  }, [searchElement])

  return (
    <>
      <span className="title see-title">
        Ver elemento
        <div className="search-input">
          <span>Codigo</span>
          <input type="text" value={searchElement} placeholder="Código" readOnly />
        </div>
      </span>


      {loading ? (
        <p>Cargando...</p>
      ) : element && element.tipo === 'devolutivo' ? (
        <div className="element-info__container">
          <div className="element-info">
            <span className="element-info__title">Nombre</span>
            <span className="element-info__content">{element.nombre}</span>
          </div>
          <div className="element-info">
            <span className="element-info__title">Placa</span>
            <span className="element-info__content">{element.placa}</span>
          </div>
          <div className="element-info">
            <span className="element-info__title">Marca</span>
            <span className="element-info__content">{element.marca}</span>
          </div>
          <div className="element-info">
            <span className="element-info__title">Modelo</span>
            <span className="element-info__content">{element.modelo}</span>
          </div>
          <div className="element-info">
            <span className="element-info__title">Serial</span>
            <span className="element-info__content">{element.serial}</span>
          </div>
          <div className="element-info">
            <span className="element-info__title">Area</span>
            <span className="element-info__content">{element.area}</span>
          </div>
          <div className="element-info">
            <span className="element-info__title">Tipo</span>
            <span className="element-info__content">{element.tipo}</span>
          </div>
          <div className="element-info">
            <span className="element-info__title">Estado</span>
            <span className="element-info__content">{element.estado}</span>
          </div>
        </div>
      ) : element && element.tipo === 'consumible' ? (
        <div className="element-info__container">
          <div className="element-info">
            <span className="element-info__title">Nombre</span>
            <span className="element-info__content">{element.nombre}</span>
          </div>
          <div className="element-info">
            <span className="element-info__title">Cantidad</span>
            <span className="element-info__content">{element.cantidad} {element.medida}</span>
          </div>
          <div className="element-info">
            <span className="element-info__title">Nombre</span>
            <span className="element-info__content">{element.nombre}</span>
          </div>
          <div className="element-info">
            <span className="element-info__title">Area</span>
            <span className="element-info__content">{element.area}</span>
          </div>
          <div className="element-info">
            <span className="element-info__title">Tipo</span>
            <span className="element-info__content">{element.tipo}</span>
          </div>
          <div className="element-info">
            <span className="element-info__title">Estado</span>
            <span className="element-info__content">{element.estado}</span>
          </div>
        </div>
      ) : (
        <p>No se encontró el elemento.</p>
      )}
    </>
  )
}
