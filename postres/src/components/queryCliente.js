import { apiUrl } from "./Api";

const apiRoutes = express.Router();

apiRoutes.get('/clientes', async (req, res) => {
    try {
        const result = await sql`SELECT * FROM clientes`;
        res.json(result);
    } catch (err) {
        console.error('Error al obtener clientes:', err);
        res.status(500).json({ error: 'Error al obtener clientes' });
    }
});

apiRoutes.post('/clientes', async (req, res) => {
    const { nombre, telefono } = req.body;
    try {
        await sql`INSERT INTO clientes (nombre, telefono) VALUES (${nombre}, ${telefono})`;
        res.json({ message: 'Cliente agregado correctamente' });
    } catch (err) {
        console.error('Error al agregar cliente:', err);
        res.status(500).json({ error: 'Error al agregar cliente' });
    }
});

apiRoutes.delete('/delete-clientes', async (req, res) => {
    try {
        await sql`DELETE FROM clientes`;
        res.json({ message: 'Todos los clientes han sido eliminados' });
    } catch (err) {
        console.error('Error al eliminar clientes:', err);
        res.status(500).json({ error: 'Error al eliminar clientes' });
    }
});

