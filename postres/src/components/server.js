import express from "express";
import cors from "cors";
import sql from "./db.js"; // Importa la conexión PostgreSQL desde db.js

const app = express();

app.use(cors());
app.use(express.json());

const apiRoutes = express.Router();
app.use('/api/data', apiRoutes); 


sql`SELECT NOW()`
    .then(() => console.log('Conexión exitosa a la base de datos PostgreSQL'))
    .catch((err) => console.error('Error al conectar a la base de datos:', err));


app.listen(5000, () => {
    console.log('Servidor backend corriendo en http://localhost:5000');
});


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



apiRoutes.get('/pedidos', async (req, res) => {
    try {
        const result = await sql`SELECT * FROM pedidos`;
        res.json(result);
    } catch (err) {
        console.error('Error al obtener pedidos:', err);
        res.status(500).json({ error: 'Error al obtener pedidos' });
    }
});

apiRoutes.post('/pedidos', async (req, res) => {
    const { producto, cantidad } = req.body;
    try {
        await sql`INSERT INTO pedidos (producto, cantidad) VALUES (${producto}, ${cantidad})`;
        res.json({ message: 'Pedido agregado correctamente' });
    } catch (err) {
        console.error('Error al agregar pedido:', err);
        res.status(500).json({ error: 'Error al agregar pedido' });
    }
});

apiRoutes.delete('/delete-pedidos', async (req, res) => {
    try {
        await sql`DELETE FROM pedidos`;
        res.json({ message: 'Todos los pedidos han sido eliminados' });
    } catch (err) {
        console.error('Error al eliminar pedidos:', err);
        res.status(500).json({ error: 'Error al eliminar pedidos' });
    }
});


apiRoutes.get('/entregas', async (req, res) => {
    try {
        // Consulta SQL con JOINs para obtener toda la información relevante
        const result = await sql`
            SELECT
                e.id AS entrega_id,
                c.id AS cliente_id,
                c.nombre_clientes,
                c.telefono,
                p.id_pedido AS pedido_id,
                p.cantidad AS cantidad_pedido, 
                p.dia_entrega,
                p.pago,
                po.id AS postre_id,
                po.sabor

            FROM
                entregas e
            JOIN
                clientes c ON e.id_clientes = c.id
            JOIN
                pedidos p ON e.id_pedidos = p.id_pedido
            JOIN
                postres po ON e.id_postres = po.id;
        `;
        res.json(result);
    } catch (err) {
        console.error('Error al obtener entregas con detalles:', err);
        res.status(500).json({ error: 'Error al obtener entregas con detalles' });
    }
});

apiRoutes.post('/entregas', async (req, res) => {
    const { cliente_id, pedido_id } = req.body;
    try {
        await sql`INSERT INTO entregas (cliente_id, pedido_id) VALUES (${cliente_id}, ${pedido_id})`;
        res.json({ message: 'Entrega agregada correctamente' });
    } catch (err) {
        console.error('Error al agregar entrega:', err);
        res.status(500).json({ error: 'Error al agregar entrega' });
    }
});

apiRoutes.delete('/delete-entregas', async (req, res) => {
    try {
        await sql`DELETE FROM entregas`;
        res.json({ message: 'Todas las entregas han sido eliminadas' });
    } catch (err) {
        console.error('Error al eliminar entregas:', err);
        res.status(500).json({ error: 'Error al eliminar entregas' });
    }
});
