import React from 'react';
import './ClienteForm.css';
import EliminarClientes from './EliminarClientes';
import useClientes from './useClientes';


function ClienteForm({ formData, loading, handleChange, handleSubmit }) {
  const { deleteData } = useClientes();
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

    {/* Sabor */}
    <div className="form__group">
      <label className="form__input-label" htmlFor="sabor">Sabor:</label>
      <input
        className="form__input-input"
        type="text"
        id="sabor"
        name="sabor"
        value={formData.sabor}
        onChange={handleChange}
        required
      />
    </div>

    {/* Celular */}
    <div className="form__group">
      <label className="form__input-label" htmlFor="celular">Celular:</label>
      <input
        className="form__input-input"
        type="tel"
        id="celular"
        name="celular"
        value={formData.celular}
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