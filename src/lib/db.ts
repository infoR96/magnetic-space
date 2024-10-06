// src/lib/db.ts
import { sql } from '@vercel/postgres';

// No es necesario realizar una configuración adicional,
// la conexión se manejará automáticamente al usar el cliente `sql`.

export default sql;
