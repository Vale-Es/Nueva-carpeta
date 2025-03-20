/*import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";

const FinancialChart = () => {
  const [financialData, setFinancialData] = useState({ ganancias: 0, gastos: 0 });

  // Función para obtener datos de la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.misdatos.com/finanzas"); // Reemplaza con tu endpoint
        setFinancialData({
          ganancias: response.data.ganancias,
          gastos: response.data.gastos,
        });
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []); // Se ejecuta solo una vez al montarse el componente

  // Datos para el gráfico
  const data = {
    labels: ["Ganancias", "Gastos"],
    datasets: [
      {
        label: "Finanzas del Negocio",
        data: [financialData.ganancias, financialData.gastos],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const options = {
    cutout: "50%",
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default FinancialChart; */

import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// ✅ Necesario para registrar los elementos del gráfico
ChartJS.register(ArcElement, Tooltip, Legend);

const FinancialChart = () => {
  const [financialData, setFinancialData] = useState({
    ganancias: 0,
    gastos: 0,
  });

  // Simulación de datos
  useEffect(() => {
    // Simulamos una "llamada a la API" después de 1 segundo
    const timeout = setTimeout(() => {
      setFinancialData({
        ganancias: 3000,
        gastos: 1200,
      });
    }, 1000);

    // Limpieza
    return () => clearTimeout(timeout);
  }, []);

  const data = {
    labels: ["Ganancias", "Gastos"],
    datasets: [
      {
        label: "Finanzas del Negocio",
        data: [financialData.ganancias, financialData.gastos],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const options = {
    cutout: "50%",
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div style={{ width: "400px", margin: "0 auto" }}>
      <h3 style={{ textAlign: "center" }}>Balance Financiero</h3>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default FinancialChart;