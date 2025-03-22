import React from "react";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";
import Header from "../Header";

function Inventario() {
  return (
    <div>
      <Header />
      <h2>Inventario</h2>
      <ProductForm />
    </div>
  );
}

export default Inventario;