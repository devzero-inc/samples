CREATE TABLE IF NOT EXISTS images (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    path TEXT,
    type VARCHAR(50)
);
