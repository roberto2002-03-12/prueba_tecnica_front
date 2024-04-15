import { useState, useEffect, ChangeEvent } from 'react'

import { Card } from './components/Card'
import { IFutbolistaRespond } from '../../models/responds.model';
import { ISeleccion } from '../../models/seleccion.model';
import { IPosicion } from '../../models/posicion.model';

export const FutbolistaPage = () => {
  const [futbolistaRespond, setFutbolistaRespond] = useState<IFutbolistaRespond>();
  const [selecciones, setSelecciones] = useState<ISeleccion[]>([]);
  const [seleccion, setSeleccion] = useState(1);
  const [posiciones, setPosiciones] = useState<IPosicion[]>([]);
  const [posicion, setPosicion] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:8090/api/v1/futbol/selecciones`)
      .then(respond => respond.json())
      .then((data) => {
        setSelecciones(data)
      })

    fetch(`http://localhost:8090/api/v1/futbol/posiciones`)
      .then(respond => respond.json())
      .then((data) => {
        setPosiciones(data)
      })
  }, [])

  useEffect(() => {
    if (posicion !== 0) {
      fetch(`http://localhost:8090/api/v1/futbol/futbolista/posicion?idPosicion=${posicion}&idSeleccion=${seleccion}&size=5&page=${page}`)
        .then(respond => respond.json())
        .then((data) => {
          setFutbolistaRespond(data)
        })
    } else {
      fetch(`http://localhost:8090/api/v1/futbol/futbolista?idSeleccion=${seleccion}&size=5&page=${page}`)
        .then(respond => respond.json())
        .then((data) => {
          setFutbolistaRespond(data)
        })
    }
    console.log(posicion)
  }, [page, seleccion, posicion])

  const handleSeleccionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSeleccion(parseInt(event.target.value));
  };

  const handlePosicionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPosicion(parseInt(event.target.value));
  };

  return (
    <div className='container'>
      <div style={{ width: '100%', display: 'flex', justifyContent: "space-around", alignItems: 'center' }}>
        <select name="selecciones" onChange={handleSeleccionChange} value={seleccion}>
          {
            selecciones?.map((sel) => (
              <option value={sel.idSeleccion}>{sel.nombreSeleccion}</option>
            ))
          }
        </select>

        <select name="posiciones" onChange={handlePosicionChange} value={posicion}>
          {
            posiciones?.map((pos) => (
              <option value={pos.idPosicion}>{pos.colocacion}</option>
            ))
          }
        </select>
      </div>
      <div className="row">
        {
          futbolistaRespond?.content?.map((fut) => (
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
              <Card futbolista={fut} />
            </div>
          ))
        }
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item"><a className="page-link" style={{ cursor: 'pointer' }} onClick={() => { if (page !== 0) setPage(prev => prev - 1) }}>Previous</a></li>
            <li className="page-item"><a className="page-link" style={{ cursor: 'pointer' }} onClick={() => { setPage(prev => prev + 1) }}>Next</a></li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
