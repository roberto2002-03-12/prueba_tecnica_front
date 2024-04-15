import { useState } from 'react';
import { IFutbolista } from "../../../models/futbolista.model"
import './style.css'

export const Card = ({ futbolista }: { futbolista: IFutbolista }) => {
  const [modalStatus, setModalStatus] = useState(false);

  return (
    <>
      <div className="card" style={{ width: '200px' }}>
        <img className="card-img-top" src={`${futbolista.foto}`} alt="Card image cap" style={{ width: '100%', height: 'auto' }} />
        <div className="card-body">
          <h5 className="card-title">{`${futbolista.nombres} ${futbolista.apellidos}`}</h5>
          <p className="card-text">{futbolista.caracteristicas}</p>
          <a className="btn btn-primary" onClick={() => setModalStatus(true)}>See details</a>
          {modalStatus && (
          <div className="modal">
            <div className="modal-content">
              <span style={{ cursor: 'pointer' }} className="close" onClick={() => setModalStatus(false)}>&times;</span>
              <h2>{`${futbolista.nombres} ${futbolista.apellidos}`}</h2>
              <img src={`${futbolista.foto}`} alt="Futbolista" style={{ width: '100%', height: 'auto'}} />
              <p>{futbolista.caracteristicas}</p>
              <p>Nacimiento {futbolista.fechaNacimiento.toString()}</p>
            </div>
          </div>
        )}
        </div>
      </div>
    </>
  )
}
