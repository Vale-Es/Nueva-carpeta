import React, { useEffect, useState } from 'react';
import Formulario from './components/Formulario/Formulario';
import Inventario from './components/Inventario/Inventario';
import Ganancias from './components/Ganancias/Ganancias';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Formulario />} />
        <Route path="/Inventario" element={<Inventario />} />
        <Route path="/Ganancias" element={<Ganancias />} />
      </Routes>
    </Router>
  );
}

export default App;