import { useEffect, useState } from 'react';
import './ClienteForm.css'; // Asegúrate de que tu archivo CSS existe
import EliminarClientes from './EliminarClientes'; // Asegúrate de que este componente existe

function ClienteForm({
  formData, 
  handleChange, 
  handleSubmitTodo, 
  deleteData, 
  loading 
}) {
  const [sabores, setSabores] = useState([]);

  useEffect(() => {
    setSabores([
      { sabor_postre: 'Maracuyá' },
      { sabor_postre: 'Mora' },
      { sabor_postre: 'Mango' },
      { sabor_postre: 'Milo' },
      { sabor_postre: 'Capuchino' },
      { sabor_postre: 'Uchuva' },
      { sabor_postre: 'Oreo' },
      { sabor_postre: 'Fresa' },
      { sabor_postre: 'Café' }
    ]);
  }, []);

  return (
    <div className="form__container">
      {/* El formulario ahora llama directamente a la prop handleSubmitTodo */}
      <form onSubmit={handleSubmitTodo}>
        {/* Campo: Nombre del Cliente */}
        <div className="form__group">
          <label htmlFor="nombre" className="form__label">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="form__input"
          />
        </div>

        {/* Campo: Teléfono del Cliente */}
        <div className="form__group">
          <label htmlFor="telefono" className="form__label">Celular:</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
            className="form__input"
          />
        </div>

        {/* Campo: Sabor del Postre */}
        <div className="form__group">
          <label htmlFor="sabor1" className="form__label">Sabor:</label>
          <select
            id="sabor1"
            name="sabor1" // 'sabor1' para que coincida con el formData unificado
            value={formData.sabor1}
            onChange={handleChange}
            required
            className="form__input"
          >
            <option value="">Seleccione un sabor</option>
            {sabores.map(postre => (
              <option key={postre.sabor_postre} value={postre.sabor_postre}>
                {postre.sabor_postre}
              </option>
            ))}
          </select>
        </div>

        {/* Campo: Cantidad del Pedido */}
        <div className="form__group">
          <label htmlFor="cantidad" className="form__label">Cantidad:</label>
          <input
            type="number"
            id="cantidad"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            required
            className="form__input"
          />
        </div>

        {/* Campo: Día de Entrega del Pedido */}
        <div className="form__group">
          <label htmlFor="dia" className="form__label">Día:</label>
          <input
            type="date"
            id="dia"
            name="dia" // 'dia' para que coincida con el formData unificado
            value={formData.dia}
            onChange={handleChange}
            required
            className="form__input"
          />
        </div>

        {/* Campo: Estado de Pago del Pedido */}
        <div className="form__group">
          <label htmlFor="entregado" className="form__label">Pago:</label>
          <select
            id="entregado"
            name="entregado" // 'entregado' para que coincida con el formData unificado
            value={formData.entregado}
            onChange={handleChange}
            required
            className="form__input"
          >
            <option value="">Seleccione</option>
            <option value="si">Sí</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Botones de Acción */}
        <div className="form__btn">
          <button
            type="submit"
            disabled={loading} // Deshabilita el botón mientras se procesa el envío
            className="form__submit-button"
          >
            {loading ? 'Enviando...' : 'Enviar Pedido'}
          </button>

          {/* Componente para eliminar clientes (se asume que existe y funciona) */}
          <EliminarClientes
            className="formulario__eliminar"
            loading={loading}
            onDelete={deleteData} // Llama a la función de eliminación proporcionada
          />
        </div>
      </form>
    </div>
  );
}

export default ClienteForm;