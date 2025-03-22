import { useEffect, useState } from 'react';

function useInventario() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    item: '',
    precio: 0,
    cantidad: 0,
    gramos: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/inventario');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError('Error al cargar los datos de inventario');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/delete-inventario', {
        method: 'DELETE',
      });
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        fetchData();
      } else {
        throw new Error('Error al eliminar datos del inventario');
      }
    } catch (err) {
      setError('Error al eliminar datos del inventario');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/inventario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Producto agregado correctamente');
        fetchData();
        setFormData({
          item: '',
          precio: 0,
          cantidad: 0,
          gramos: 0,
        });
      } else {
        throw new Error('Error al agregar producto');
      }
    } catch (err) {
      setError('Error al agregar producto');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    formData,
    loading,
    error,
    handleInputChange,
    handleSubmit,
    deleteData,
  };
}

export default useInventario;
