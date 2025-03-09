import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    sabor1: 0,
    sabor2: 0,
    fechaEntrega: '',
  });

  // Función para obtener todos los datos del backend
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/data');
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError('Error al cargar los datos');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar datos
  const deleteData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/delete-data', {
        method: 'DELETE',
      });
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        fetchData(); // Actualiza la lista de clientes después de eliminar
      } else {
        throw new Error('Error al eliminar datos');
      }
    } catch (error) {
      setError('Error al eliminar datos');
      console.error('Error deleting data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Función para enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Enviar datos al backend usando fetch
      const response = await fetch('http://localhost:5000/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Cliente agregado correctamente');
        fetchData(); // Actualiza la lista de clientes
        setFormData({
          nombre: '',
          telefono: '',
          sabor1: 0,
          sabor2: 0,
          fechaEntrega: ''
        });
      } else {
        throw new Error('Error al agregar cliente');
      }
    } catch (error) {
      setError('Error al agregar cliente');
      console.error('Error al agregar cliente:', error);
    } finally {
      setLoading(false);
    }
  };

  // Llamar a la función al cargar el componente
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Formulario de Pedido</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="sabor1">Cantidad de Sabor 1:</label>
          <input
            type="number"
            id="sabor1"
            name="sabor1"
            value={formData.sabor1}
            onChange={handleInputChange}
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="sabor2">Cantidad de Sabor 2:</label>
          <input
            type="number"
            id="sabor2"
            name="sabor2"
            value={formData.sabor2}
            onChange={handleInputChange}
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="fechaEntrega">Día y Hora de Entrega:</label>
          <input
            type="datetime-local"
            id="fechaEntrega"
            name="fechaEntrega"
            value={formData.fechaEntrega}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Enviando...' : 'Enviar Pedido'}
        </button>
      </form>
      
      <div className="action-buttons">
        <button 
          onClick={deleteData} 
          disabled={loading}
          className="delete-button"
        >
          Eliminar Clientes Especiales
        </button>
      </div>

      <h2>Datos de la base de datos</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="client-list">
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
      )}

      <style jsx>{`
        .container {
          padding: 20px;
          font-family: Arial, sans-serif;
          max-width: 1200px;
          margin: 0 auto;
        }
        .form-container {
          margin-bottom: 20px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }
        .form-group {
          margin-bottom: 10px;
          display: flex;
          flex-direction: column;
        }
        .form-group label {
          margin-bottom: 5px;
          font-weight: bold;
        }
        input {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .submit-button, .delete-button {
          padding: 10px 15px;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          margin-right: 10px;
        }
        .submit-button {
          background-color: #4CAF50;
        }
        .delete-button {
          background-color: #f44336;
        }
        button:hover {
          opacity: 0.9;
        }
        button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }
        .action-buttons {
          margin: 20px 0;
        }
        .client-list {
          margin-top: 20px;
          overflow-x: auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
          font-weight: bold;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        h1, h2 {
          color: #333;
        }
      `}</style>
    </div>
  );
}

export default App;