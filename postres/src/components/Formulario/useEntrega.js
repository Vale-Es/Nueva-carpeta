import { apiUrl } from "../Api";
import { useState, useEffect } from "react";

// Eliminamos las importaciones de los otros hooks aquí
// import useClientes from "./useClientes";
// import usePedido from "./usePedido";
// import usePostre from "./usePostre";

// Modificamos la firma del hook para aceptar los datos como argumentos
function useEntrega(initialClientes = [], initialPedidos = [], initialPostres = []) {
  const [entregas, setEntregas] = useState([]);
  const [formData, setFormData] = useState({
	cliente_id: 0,
	pedido_id: 0,
	postre_id: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Ahora, los datos de clientes, pedidos y postres vienen de los argumentos
  // Puedes incluso almacenar una copia interna si necesitas mutarlos o filtrar,
  // pero para solo acceder a ellos, usarlos directamente de los argumentos es suficiente.
  const clientes = initialClientes;
  const pedidos = initialPedidos;
  const postres = initialPostres;

  const fetchData = async () => {
	setLoading(true);
	try {
	  const response = await fetch(`${apiUrl}/entregas`);
	  if (!response.ok) {
		throw new Error("Error al cargar los datos de entregas");
	  }
	  const result = await response.json();
	  setEntregas(result);
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
	  const response = await fetch(`${apiUrl}/delete-entregas`, {
		method: "DELETE",
	  });
	  if (!response.ok) {
		throw new Error("Error al eliminar datos de entregas");
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
   * Envía una entrega al backend
   * @param {Object} data - Datos con cliente_id, pedido_id y postre_id
   * @returns {Object} entrega creada o { id: null }
   */
  const handleSubmit = async (data) => {
	setLoading(true);
	try {
	  const response = await fetch(`${apiUrl}/entregas`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	  });
	  if (!response.ok) {
		throw new Error("Error al agregar entrega");
	  }
	  const result = await response.json();
	  fetchData();
	  return result.entrega || { id: null };
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
	entregas,
	formData,
	clientes, // Ahora estos vienen de los argumentos pasados al hook
	pedidos,
	postres,
	loading,
	error,
	fetchData,
	deleteData,
	handleInputChange,
	handleSubmit,
	setFormData,
  };
}

export default useEntrega;