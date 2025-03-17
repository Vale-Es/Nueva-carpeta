import React from 'react';
import ClienteForm from './ClienteForm';
import ClienteTable from './ClienteTable';
import EliminarClientes from './EliminarClientes';
import useClientes from './useClientes';
import './Formulario.css';

function Formulario() {
  const {
    data,
    formData,
    loading,
    error,
    handleInputChange,
    handleSubmit,
    deleteData,
  } = useClientes();

  return (
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

      <EliminarClientes
        className="formulario__eliminar"
        loading={loading}
        onDelete={deleteData}
      />
      </div>
      <div className='formulario__tabla-container'>
      <ClienteTable
        className="formulario__tabla"
       data={data} loading={loading} />
       </div>
    </div>
  );
}

export default Formulario;