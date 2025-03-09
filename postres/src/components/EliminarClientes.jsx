function EliminarClientes({ loading, onDelete }) {
    return (
      <div className="action-buttons">
        <button onClick={onDelete} disabled={loading} className="delete-button">
          Eliminar Clientes Especiales
        </button>
      </div>
    );
  }
  
  export default EliminarClientes;