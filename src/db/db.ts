import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.CONNECTION_STRING })

export const query = (text: string, params?: string[]) => pool.query(text, params);