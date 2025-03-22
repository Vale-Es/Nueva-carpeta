import { useEffect, useState } from 'react';

function useClientes() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    sabor1: 0,
    sabor2: 0,
    fechaEntrega: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/data');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError('Error al cargar los datos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/delete-data', {
        method: 'DELETE',
      });
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        fetchData();
      } else {
        throw new Error('Error al eliminar datos');
      }
    } catch (err) {
      setError('Error al eliminar datos');
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
      const response = await fetch('http://localhost:5000/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Cliente agregado correctamente');
        fetchData();
        setFormData({
          nombre: '',
          telefono: '',
          sabor1: 0,
          sabor2: 0,
          fechaEntrega: '',
        });
      } else {
        throw new Error('Error al agregar cliente');
      }
    } catch (err) {
      setError('Error al agregar cliente');
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

export default useClientes;