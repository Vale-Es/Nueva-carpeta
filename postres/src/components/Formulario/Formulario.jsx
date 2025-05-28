import ClienteForm from './ClienteForm';
import ClienteTable from './ClienteTable';
import './Formulario.css';
import Header from '../Header';
import useEntrega from './useEntrega';

function Formulario() {
  const {
    formData,
    loading,
    error,
    handleChange,
    handleSubmit,
    deleteData,
    data,
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
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            deleteData={deleteData}
          />
        </div>
        <div className="formulario__tabla-container">
          <ClienteTable
            className="formulario__tabla"
            data={data}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
}

export default Formulario;