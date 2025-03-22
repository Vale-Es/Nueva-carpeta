import React from "react";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";
import Header from "../Header";
import useInventario from "./useInventario";
import "./Inventario.css";

function Inventario() {
  const {
    data,
    formData,
    loading,
    error,
    handleInputChange,
    handleSubmit,
    deleteData,
  } = useInventario();

  return (
    <>
    <Header />
    <h2>Inventario</h2>
    <div className="inventario__container">
      <div>
      <div className="formulario__productos">
        <h2>Ingreso Productos</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ProductForm
          className="formulario__producto"
          formData={formData}
          loading={loading}
          handleChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
      <div className="inventario__tabla-container">
      </div>
      </div>
    </div>
    </>
  );
}

export default Inventario;