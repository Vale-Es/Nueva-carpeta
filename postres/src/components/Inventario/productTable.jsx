import React, { useState } from 'react';
import "./ProductTable.css";

function ProductoTable({ data, loading, error }) {
  const [filter, setFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  if (loading) return <p>Cargando inventario...</p>;
  if (error) return <p className="error-message">Error al cargar los datos de inventario</p>;

  // Función para manejar el ordenamiento
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Función para filtrar y ordenar los datos
  const processedData = () => {
    let filteredData = data;
    
    // Aplicar filtro
    if (filter) {
      filteredData = data.filter(item => 
        item.nombre.toLowerCase().includes(filter.toLowerCase()) ||
        item.precio.toString().includes(filter) ||
        item.cantidad.toString().includes(filter) ||
        item.gramos.toString().includes(filter)
      );
    }
    
    // Aplicar ordenamiento
    if (sortConfig.key) {
      filteredData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return filteredData;
  };

  return (
    <div className="producto__list-container">
      <h2 className='producto__list-title'>Inventario de Productos</h2>
      
      <div className="table-controls">
        <div className="control-group">
          <label>Filtrar:</label>
          <input 
            type="text" 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Buscar en inventario..."
          />
        </div>
        
        <div className="control-group">
          <button 
            className="sort-btn"
            onClick={() => requestSort('nombre')}
          >
            Ordenar por Nombre {sortConfig.key === 'nombre' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
          </button>
          <button 
            className="sort-btn"
            onClick={() => requestSort('precio')}
          >
            Ordenar por Precio {sortConfig.key === 'precio' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>

      <table className="producto__list-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Gramos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {processedData().length > 0 ? (
            processedData().map((item) => (
              <tr key={item.overid_invent}>
                <td>{item.nombre || '-'}</td>
                <td>${item.precio ? item.precio.toFixed(2) : '0.00'}</td>
                <td>{item.cantidad || '0'}</td>
                <td>{item.gramos || '0'}g</td>
                <td className="actions-cell">
                  <button className="action-btn insert">Insertar</button>
                  <button className="action-btn edit">Editar</button>
                  <button className="action-btn delete">Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                No hay productos disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductoTable;