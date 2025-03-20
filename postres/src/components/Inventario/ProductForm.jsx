import React from 'react';


function ProductForm () {
    <div className="form__container">
    <form onSubmit={handleProductSubmit} className="">
      {/* Campos del formulario */}
      {/* ... mismo contenido, solo cambiando `onChange={handleProductChange}` y valores recibidos como props */}
      <div className="form__group">
        <div className='form__input'>
        <label className='form__input-label' htmlFor="productName">Nombre del Producto:</label>
        <input className='form__input-input' type="text" id="productName" name="productName" value={productData.productName} onChange={handleProductChange} required />
        </div>
      {/* Repite esto para los demás campos... */}
      <button type="submit" disabled={productLoading} className="form__submit-button">
        {productLoading ? 'Enviando...' : 'Enviar Producto'}
      </button>
      </div>
    </form>
    </div>
}

export default ProductForm;