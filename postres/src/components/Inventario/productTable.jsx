import React from "react";


function productTable (){
    return (
        <div className="table__container">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre del Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Mapear los productos */}
            {/* ... */}
            <tr>
              <td>Producto 1</td>
              <td>10</td>
              <td>$100</td>
              <td>
                <button className="table__button">Editar</button>
                <button className="table__button">Eliminar</button>
              </td>
            </tr>
            {/* ... */}
          </tbody>
        </table>
      </div>
    );
}

export default productTable;