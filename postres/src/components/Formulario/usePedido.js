import { apiUrl } from "../Api";
import { useState, useEffect } from "react";

function usePedido() {
  const [pedidos, setPedidos] = useState([]);
  const [formData, setFormData] = useState({
    cantidad: 0,
    dia_entrega: 0,
    pago: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/pedidos`);
      if (!response.ok) {
        throw new Error('Error al cargar los datos de pedidos');
      }
      const result = await response.json();
      setPedidos(result);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/delete-pedidos`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar datos de pedidos');
      }
      const result = await response.json();
      alert(result.message);
      fetchData();
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  /**
   * Envía un nuevo pedido al servidor
   * @param {Object} data - Datos del pedido { cantidad, dia_entrega, pago }
   * @returns {Object} pedido creado
   */
  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/pedidos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Error al enviar el pedido');
      }
      const result = await response.json();
      fetchData();
      return result.pedido || { id: null };
    } catch (err) {
      console.error(err);
      setError(err.message);
      return { id: null };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    pedidos,
    formData,
    loading,
    error,
    setFormData,
    handleInputChange,
    handleSubmit,
    deleteData,
    fetchData,
  };
}

export default usePedido;