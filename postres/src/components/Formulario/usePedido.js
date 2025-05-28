import { apiUrl } from "../Api";
import { useState, useEffect } from "react";


function usePedido() {
    const [pedidos, setPedidos] = useState([]);
    const [formData, setFormData] = useState({
        cliente: '',
        producto: '',
        cantidad: 0,
        precio: 0,
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
        setError(err.message);
        console.error(err);
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
        const response = await fetch(`${apiUrl}/pedidos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error('Error al enviar el pedido');
        }
        await response.json();
        alert('Pedido enviado correctamente');
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
    
    return { pedidos, formData, loading, error, handleInputChange, handleSubmit, deleteData };
}