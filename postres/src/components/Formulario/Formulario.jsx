import ClienteForm from './ClienteForm';
import ClienteTable from './ClienteTable';
import './Formulario.css';
import Header from '../Header';
import useEntrega from './useEntrega'; // <--- Este useEntrega es el que importa los otros hooks

function Formulario() {
  const {
    formData,
    loading,
    error,
    handleInputChange, // Renombrado de 'handleChange' a 'handleInputChange' para ser consistente con los hooks
    handleSubmit,     // Este es el handleSubmit de useEntrega (para una sola entrega)
    deleteData,
    entregas,         // Renombrado de 'data' a 'entregas' para ser consistente con el hook
  } = useEntrega();

  return (
    <>
      <Header />
      <div className="formulario__container">
        <div className="formulario__datos">
          <h2>Formulario de Pedido</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <ClienteForm
            className="formulario__cliente"
            formData={formData}
            loading={loading}
            handleChange={handleInputChange} // Pasa handleInputChange
            handleSubmit={handleSubmit}     // <--- Aquí está la inconsistencia principal
            deleteData={deleteData}
          />
        </div>
        <div className="formulario__tabla-container">
          <ClienteTable
            className="formulario__tabla"
            data={entregas} // Pasa 'entregas'
            loading={loading}
          />
        </div>
      </div>
    </>
  );
}

export default Formulario;