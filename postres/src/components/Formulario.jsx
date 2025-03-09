import React from 'react';
import ClienteForm from './ClienteForm';
import ClienteTable from './ClienteTable';
import EliminarClientes from './EliminarClientes';
import useClientes from './useClientes';

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
    <div className="container">
      <h1>Formulario de Pedido</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <ClienteForm
        formData={formData}
        loading={loading}
        handleChange={handleInputChange}
        handleSubmit={handleSubmit}
      />

      <EliminarClientes
        loading={loading}
        onDelete={deleteData}
      />

      <ClienteTable data={data} loading={loading} />
    </div>
  );
}

export default Formulario;