import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conexión exitosa a la base de datos');
});

app.listen(5000, () => {
    console.log('Servidor backend corriendo en http://localhost:5000');
});

// Ruta para obtener datos
app.get('/api/data', (req, res) => {
    const query = "SELECT * FROM `clientes`";
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener datos', error: err });
        }
        res.json(results);
    });
});

// Ruta para insertar datos
app.post('/api/data', (req, res) => {
    const { nombre, telefono, sabor1, sabor2, fechaEntrega } = req.body;
    const query = "INSERT INTO `clientes` (Nombre, Telefono, Sabor_1, Sabor_2, Dia_de_la_entrega) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [nombre, telefono, sabor1, sabor2, fechaEntrega], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al insertar datos', error: err });
        }
        res.status(201).json({ message: 'Cliente agregado', result });
    });
});

// Ruta para eliminar datos
app.delete('/api/delete-data', (req, res) => {
    const query = "DELETE FROM `clientes` WHERE Pagos='pago'";
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al eliminar datos', error: err });
        }
        res.json({ message: 'Datos eliminados correctamente', results });
    });
});

// También puedes mantener la ruta antigua para compatibilidad
app.post('/ape/data', (req, res) => {
    const query = "DELETE FROM `clientes` WHERE Pagos='pagos'";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al consultar', error: err });
        }
        res.status(200).json(result);
    });
});