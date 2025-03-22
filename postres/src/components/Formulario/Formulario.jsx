import React from 'react';
import ClienteForm from './ClienteForm';
import ClienteTable from './ClienteTable';
import useClientes from './useClientes';
import './Formulario.css';
import Header from '../Header';



function Formulario() {
  const {
    data,
    formData,
    loading,
    error,
    handleInputChange,
    handleSubmit,
  } = useClientes();

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
            handleChange={handleInputChange}
            handleSubmit={handleSubmit}
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