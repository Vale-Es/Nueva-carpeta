import postgres from 'postgres';

// URL de conexión a Supabase
const connectionString = "postgresql://postgres.qnthpjlkspycitmkzxek:dOo1qI9QMQlaqUye@aws-0-us-east-1.pooler.supabase.com:6543/postgres";

// Crear la conexión a PostgreSQL
const sql = postgres(connectionString, {
    ssl: {
        rejectUnauthorized: false, // Necesario para conexiones SSL con Supabase
    },
});

export default sql;