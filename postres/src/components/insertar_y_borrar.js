import express from "express";
import cors from "cors";
import sql from "./db.js"; // Importa la conexión PostgreSQL desde db.js

const app = express();

app.use(cors());
app.use(express.json());

// Verificar la conexión a la base de datos
sql`SELECT NOW()`
    .then(() => console.log('Conexión exitosa a la base de datos PostgreSQL'))
    .catch((err) => console.error('Error al conectar a la base de datos:', err));

app.listen(5000, () => {
    console.log('Servidor backend corriendo en http://localhost:5000');
});

// Ruta para obtener datos
app.get('/api/data', async (req, res) => {
    try {
        const results = await sql`SELECT * FROM cliente`;
        res.json(results);
    } catch (err) {
        console.error('Error al obtener datos:', err);
        res.status(500).json({ message: 'Error al obtener datos', error: err });
    }
});

app.post('/api/data', async (req, res) => {
    const { nombre, telefono, sabor1, sabor2, dia, hora } = req.body; // Cambia fechaEntrega por dia y hora
    
    try {
        // 1. Validar y combinar fecha y hora
        if (!dia || !hora) {
            throw new Error("Fecha y hora son requeridas");
        }

        // Combina fecha y hora en formato ISO
        const fechaCompleta = new Date(`${dia}T${hora}:00`);
        
        if (isNaN(fechaCompleta.getTime())) {
            throw new Error("Formato de fecha/hora inválido");
        }

        // 2. Insertar en PostgreSQL
        const result = await sql`
            INSERT INTO cliente (nombre, telefono, sabor_1, sabor_2, dia_entrega)
            VALUES (
                ${nombre}, 
                ${telefono}, 
                ${sabor1}, 
                ${sabor2}, 
                ${fechaCompleta.toISOString()}
            )
            RETURNING *`;
        
        res.status(201).json({ message: 'Cliente agregado', result });
    } catch (err) {
        console.error('Error al insertar datos:', err);
        res.status(500).json({ 
            message: 'Error al insertar datos',
            error: err.message
        });
    }
});

// Ruta para eliminar datos
app.delete('/api/delete-data', async (req, res) => {
    try {
        // Asegúrate de usar el formato correcto que coincida con tus datos
        const results = await sql`DELETE FROM cliente WHERE pagos = 'si' RETURNING *`;
        res.json({ message: 'Datos eliminados correctamente', results });
    } catch (err) {
        console.error('Error al eliminar datos:', err);
        res.status(500).json({ message: 'Error al eliminar datos', error: err.message });
    }
});

// Ruta antigua para compatibilidad
app.post('/ape/data', async (req, res) => {
    try {
        const result = await sql`DELETE FROM cliente WHERE Pagos = TRUE RETURNING *`;
        res.status(200).json(result);
    } catch (err) {
        console.error('Error al eliminar datos:', err);
        res.status(500).json({ message: 'Error al consultar', error: err });
    }
});