import React from 'react';
import './ClienteTable.css';

function ClienteTable({ data, loading }) {
    if (loading) return <p>Cargando...</p>;
  
    return (
      <div className="client__list-container">
        <h2 className='client__list-tittle' >Datos de la base de datos</h2>
        <table className="client__list-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Sabor 1</th>
              <th>Sabor 2</th>
              <th>Pagos</th>
              <th>Racha</th>
              <th>Fecha Entrega</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.nombre}</td>
                  <td>{item.telefono}</td>
                  <td>{item.sabor_1}</td>
                  <td>{item.sabor_2}</td>
                  <td>{item.pagos}</td>
                  <td>{item.racha}</td>
                  <td>{item.dia_entrega}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center' }}>No hay datos disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default ClienteTable;