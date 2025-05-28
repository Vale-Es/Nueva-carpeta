import React from 'react';
import './ClienteTable.css';

function ClienteTable({ data, loading }) {
    if (loading) return <p>Cargando...</p>;

    return (
        <div className="client__list-container">
            <h2 className='client__list-tittle'>Datos de la base de datos</h2>
            <table className="client__list-table">
                <thead>
                    <tr>
                        <th>Entrega ID</th> 
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Sabor</th>
                        <th>Cantidad Pedido</th> 
                        <th>Pago</th>
                        <th>Fecha Entrega</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item) => (
                            <tr key={item.entrega_id}> {/* Usa entrega_id como key */}
                                <td>{item.entrega_id}</td>
                                <td>{item.nombre_cliente}</td>
                                <td>{item.telefono}</td>
                                <td>{item.sabor_postre_1}</td>
                                <td>{item.cantidad_pedido}</td> {/* Muestra la cantidad del pedido */}
                                <td>{item.pago ? 'Sí' : 'No'}</td> {/* Formatea el booleano 'pago' */}
                                <td>{new Date(item.dia_entrega).toLocaleDateString()}</td> {/* Formatear la fecha */}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" style={{ textAlign: 'center' }}>No hay datos disponibles</td> {/* Ajustar colSpan */}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ClienteTable;