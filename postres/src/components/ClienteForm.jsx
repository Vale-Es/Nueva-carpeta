function ClienteForm({ formData, loading, handleChange, handleSubmit }) {
    return (
      <form onSubmit={handleSubmit} className="form-container">
        {/* Campos del formulario */}
        {/* ... mismo contenido, solo cambiando `onChange={handleChange}` y valores recibidos como props */}
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </div>
        {/* Repite esto para los demás campos... */}
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Enviando...' : 'Enviar Pedido'}
        </button>
      </form>
    );
  }
  
  export default ClienteForm;