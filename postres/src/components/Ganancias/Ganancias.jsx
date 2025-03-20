import React from "react";
import Header from "../Header";
import FinancialChart from "./FinancialChart"; // Asegúrate de que esté en la misma carpeta

function Ganancias() {
  return (
    <>
      <Header />
      <div style={{ padding: "2rem" }}>
        <h2>Ganancias del Negocio</h2>
        <FinancialChart />
      </div>
    </>
  );
}

export default Ganancias;