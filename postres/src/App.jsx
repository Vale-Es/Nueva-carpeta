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

  // Función para obtener datos del backend
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
    <div>
      <h1>Formulario de Pedido</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="telefono">Teléfono:</label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          value={formData.telefono}
          onChange={handleInputChange}
          required
        />

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

        <label htmlFor="fechaEntrega">Día y Hora de Entrega:</label>
        <input
          type="datetime-local"
          id="fechaEntrega"
          name="fechaEntrega"
          value={formData.fechaEntrega}
          onChange={handleInputChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar Pedido'}
        </button>
      </form>

      <h1>Datos de la base de datos</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item.Numero}>
              {item.nombre} - Tel: {item.telefono} - Sabor 1: {item.sabor1} - Sabor 2: {item.sabor2} - Pago: {item.Pagos} - Entrega: {item.fechaEntrega}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;