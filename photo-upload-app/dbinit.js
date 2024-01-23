const pool = require('./lib/db.js');

const createTableQuery = `
CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    path TEXT,
    type VARCHAR(50)
);`;

async function createTable() {
    try {
        const res = await pool.query(createTableQuery);
        console.log('Table is successfully created');
    } catch (err) {
        console.error('Error creating table', err.stack);
    } finally {
        await pool.end();
    }
}

createTable();