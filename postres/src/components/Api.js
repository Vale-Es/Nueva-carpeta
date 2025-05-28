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

export const apiUrl = 'http://localhost:5000/api/data'; 


