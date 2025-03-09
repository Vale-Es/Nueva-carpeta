function ClienteTable({ data, loading }) {
    if (loading) return <p>Cargando...</p>;
  
    return (
      <div className="client-list">
        <h2>Datos de la base de datos</h2>
        <table>
          <thead>
            <tr>
              <th>Número</th>
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
                <tr key={item.Numero}>
                  <td>{item.Numero}</td>
                  <td>{item.nombre || item.Nombre}</td>
                  <td>{item.telefono || item.Telefono}</td>
                  <td>{item.sabor1 || item.Sabor_1}</td>
                  <td>{item.sabor2 || item.Sabor_2}</td>
                  <td>{item.Pagos}</td>
                  <td>{item.Racha}</td>
                  <td>{item.fechaEntrega || item.Dia_de_la_entrega}</td>
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