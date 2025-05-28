import { apiUrl } from "../Api";
import { useState, useEffect } from "react";

function usePostre() {
  const [postres, setPostres] = useState([]);
  const [formData, setFormData] = useState({
    id: 0,
    sabor: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/postres`);
      if (!response.ok) {
        throw new Error('Error al cargar los datos de postres');
      }
      const result = await response.json();
      setPostres(result);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/delete-postres`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar datos de postres');
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

  /**
   * Envía un nuevo postre al servidor
   * @param {Object} data - Datos del postre (ej: { sabor: 'Maracuyá' })
   * @returns {Object} postre creado o { id: null }
   */
  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/postres`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Error al agregar postre');
      }
      const result = await response.json();
      fetchData();
      return result.postre || { id: null };
    } catch (err) {
      setError(err.message);
      console.error(err);
      return { id: null };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    postres,
    formData,
    loading,
    error,
    fetchData,
    deleteData,
    handleInputChange,
    handleSubmit,
    setFormData,
  };
}

export default usePostre;