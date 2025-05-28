import { apiUrl } from "../Api";
import { useState, useEffect } from "react";

function useClientes() {
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    id: 0,
    nombre: '',
    telefono: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener todos los clientes
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
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar todos los clientes
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
      fetchData(); // recargar datos
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Manejo de inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Crea un nuevo cliente en la base de datos.
   * @param {Object} data - datos del cliente { nombre, telefono }
   * @returns {Object} cliente creado con su ID
   */
  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/clientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Error al enviar los datos del cliente');
      }
      const result = await response.json();
      fetchData();
      return result.cliente || { id: null }; // <-- asumimos que el backend responde con { cliente: { id, ... } }
    } catch (err) {
      console.error(err);
      setError(err.message);
      return { id: null };
    } finally {
      setLoading(false);
    }
  };

  // Cargar clientes al iniciar
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
    handleSubmit, // ahora espera `formData` como argumento
    deleteData,
    fetchData, // por si deseas recargar manualmente desde otro componente
  };
}

export default useClientes;