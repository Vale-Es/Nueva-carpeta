import React from 'react';
import './ClienteForm.css';
function ClienteForm({ formData, loading, handleChange, handleSubmit }) {
    return (
      <div className="form__container">
      <form onSubmit={handleSubmit} className="">
        {/* Campos del formulario */}
        {/* ... mismo contenido, solo cambiando `onChange={handleChange}` y valores recibidos como props */}
        <div className="form__group">
          <div className='form__input'>
          <label className='form__input-label' htmlFor="nombre">Nombre:</label>
          <input className='form__input-input' type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
          </div>
        {/* Repite esto para los demás campos... */}
        <button type="submit" disabled={loading} className="form__submit-button">
          {loading ? 'Enviando...' : 'Enviar Pedido'}
        </button>
        </div>
      </form>
      </div>
    );
  }
  
  export default ClienteForm;