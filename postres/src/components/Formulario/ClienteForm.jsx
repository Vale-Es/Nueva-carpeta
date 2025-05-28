import { useEffect, useState } from 'react';
import './ClienteForm.css';
import EliminarClientes from './EliminarClientes';

function ClienteForm({
  formData,
  handleChange,
  handleSubmitCliente,
  handleSubmitPedido,
  handleSubmitEntrega,
  buscarPostrePorSabor, // función de usePostre para obtener id_postre
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

  const handleSubmitTodo = async (e) => {
    e.preventDefault();

    try {
      // Crear cliente
      const cliente = await handleSubmitCliente(formData);
      if (!cliente?.id) throw new Error('Error al crear cliente');

      // Crear pedido
      const pedido = await handleSubmitPedido(formData);
      if (!pedido?.id) throw new Error('Error al crear pedido');

      // Obtener postre por sabor
      const postre = await buscarPostrePorSabor(formData.sabor1);
      if (!postre?.id) throw new Error('Sabor no válido');

      // Crear entrega
      await handleSubmitEntrega({
        id_cliente: cliente.id,
        id_pedido: pedido.id,
        id_postre: postre.id
      });

      // Opcional: puedes limpiar el formulario aquí si deseas

    } catch (error) {
      console.error('Error al procesar la entrega:', error);
    }
  };

  return (
    <div className="form__container">
      <form onSubmit={handleSubmitTodo}>
        {/* Nombre */}
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

        {/* Teléfono */}
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

        {/* Sabor */}
        <div className="form__group">
          <label htmlFor="sabor1" className="form__label">Sabor:</label>
          <select
            id="sabor1"
            name="sabor1"
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

        {/* Cantidad */}
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

        {/* Día */}
        <div className="form__group">
          <label htmlFor="dia" className="form__label">Día:</label>
          <input
            type="date"
            id="dia"
            name="dia"
            value={formData.dia}
            onChange={handleChange}
            required
            className="form__input"
          />
        </div>

        {/* Pago */}
        <div className="form__group">
          <label htmlFor="entregado" className="form__label">Pago:</label>
          <select
            id="entregado"
            name="entregado"
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

        <div className="form__btn">
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