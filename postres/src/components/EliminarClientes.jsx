import React from "react";
import "./EliminarClientes.css";

function EliminarClientes({ loading, onDelete }) {
    return (
      <div className="delete__button-container">
        <button onClick={onDelete} disabled={loading} className="delete__button">
          Eliminar Clientes Especiales
        </button>
      </div>
    );
  }
  
  export default EliminarClientes;