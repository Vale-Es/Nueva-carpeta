import { apiUrl } from "../Api";
import { useState, useEffect } from "react";

function useClientes() {
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
  });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/clientes`);
      if (!response.ok) {
        throw new Error('Error al cargar los datos de clientes');
      }
      const result = await response.json();
      setClientes(result);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }

  }

  const deleteData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/delete-clientes`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar datos de clientes');
      }
      const result = await response.json();
      alert(result.message);
      fetchData();
    } catch (err) {
      setError(err.message);
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
      const response = await fetch(`${apiUrl}/clientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Error al enviar los datos del cliente');
      }
      const result = await response.json();
      alert(result.message);
      fetchData();
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return {
    clientes,
    formData,
    loading,
    error,
    setFormData,
    handleInputChange,
    handleSubmit,
    deleteData,
  };

}

export default useClientes;