import React, { useState, useEffect } from 'react';
import './ClienteForm.css';
import EliminarClientes from './EliminarClientes';
import useClientes from './useClientes';

function ClienteForm({ formData, loading, handleChange, handleSubmit }) {
  const { deleteData } = useClientes();
  const [sabores, setSabores] = useState([]);

  // Obtener los sabores de postres de la API
  useEffect(() => {
    const fetchSabores = async () => {
      try {
        const response = await fetch('/api/sabores');
        const data = await response.json();
        setSabores(data);
      } catch (error) {
        console.error('Error al obtener los sabores:', error);
      }
    };

    fetchSabores();
  }, []);

  return (
    <div className="form__container">
      <form onSubmit={handleSubmit}>
        {/* Nombre */}
        <div className="form__group">
          <label className="form__input-label" htmlFor="nombre">Nombre:</label>
          <input
            className="form__input-input"
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        {/* Teléfono */}
        <div className="form__group">
          <label className="form__input-label" htmlFor="telefono">Celular:</label>
          <input
            className="form__input-input"
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>

        {/* Primer sabor */}
        <div className="form__group">
          <label className="form__input-label" htmlFor="sabor1">Primer Sabor:</label>
          <select
            className="form__input-input"
            id="sabor1"
            name="sabor1"
            value={formData.sabor1}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un sabor</option>
            {sabores.map(postre => (
              <option key={postre.sabor_postre} value={postre.sabor_postre}>
                {postre.sabor_postre} (${postre.precio})
              </option>
            ))}
          </select>
        </div>

        {/* Segundo sabor */}
        <div className="form__group">
          <label className="form__input-label" htmlFor="sabor2">Segundo Sabor (opcional):</label>
          <select
            className="form__input-input"
            id="sabor2"
            name="sabor2"
            value={formData.sabor2 || ''}
            onChange={handleChange}
          >
            <option value="">Ninguno</option>
            {sabores.map(postre => (
              <option key={postre.sabor_postre} value={postre.sabor_postre}>
                {postre.sabor_postre} (${postre.precio})
              </option>
            ))}
          </select>
        </div>

        {/* Cantidad */}
        <div className="form__group">
          <label className="form__input-label" htmlFor="cantidad">Cantidad:</label>
          <input
            className="form__input-input"
            type="number"
            id="cantidad"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            required
          />
        </div>

        {/* Día */}
        <div className="form__group">
          <label className="form__input-label" htmlFor="dia">Día:</label>
          <input
            className="form__input-input"
            type="date"
            id="dia"
            name="dia"
            value={formData.dia}
            onChange={handleChange}
            required
          />
        </div>

        {/* Hora */}
        <div className="form__group">
          <label className="form__input-label" htmlFor="hora">Hora:</label>
          <input
            className="form__input-input"
            type="time"
            id="hora"
            name="hora"
            value={formData.hora}
            onChange={handleChange}
            required
          />
        </div>

        {/* Entregado */}
        <div className="form__group">
          <label className="form__input-label" htmlFor="entregado">Entregado:</label>
          <select
            className="form__input-input"
            id="entregado"
            name="entregado"
            value={formData.entregado}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione</option>
            <option value="si">Sí</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Pago */}
        <div className="form__group">
          <label className="form__input-label" htmlFor="pago">Pago:</label>
          <select
            className="form__input-input"
            id="pago"
            name="pago"
            value={formData.pago}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione</option>
            <option value="pendiente">Pendiente</option>
            <option value="completo">Completo</option>
          </select>
        </div>
        
        <div className='form__btn'>
          {/* Botón de enviar */}
          <button
            type="submit"
            disabled={loading}
            className="form__submit-button"
          >
            {loading ? 'Enviando...' : 'Enviar Pedido'}
          </button>

          <EliminarClientes
            className="formulario__eliminar"
            loading={loading}
            onDelete={deleteData}
          />
        </div>
      </form>
    </div>
  );
}

export default ClienteForm;