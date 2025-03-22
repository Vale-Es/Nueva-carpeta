import React from 'react';


function ProductForm({ formData, loading, handleChange, handleSubmit }) {
  return (
    <div className="form__container">
      <form onSubmit={handleSubmit}>
        {/* Item */}
        <div className="form__group">
          <label className="form__input-label" htmlFor="item">Item:</label>
          <input
            className="form__input-input"
            type="text"
            id="item"
            name="item"
            value={formData.item}
            onChange={handleChange}
            required
          />
        </div>

        {/* Precio */}
        <div className="form__group">
          <label className="form__input-label" htmlFor="precio">Precio:</label>
          <input
            className="form__input-input"
            type="number"
            id="precio"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            required
          />
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

        {/* Gramos */}
        <div className="form__group">
          <label className="form__input-label" htmlFor="gramos">Gramos:</label>
          <input
            className="form__input-input"
            type="number"
            id="gramos"
            name="gramos"
            value={formData.gramos}
            onChange={handleChange}
            required
          />
        </div>

        {/* Botón de enviar */}
        <button
          type="submit"
          disabled={loading}
          className="form__submit-button"
        >
          {loading ? 'Enviando...' : 'Enviar Pedido'}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;