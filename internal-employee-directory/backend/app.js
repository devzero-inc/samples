const express = require('express');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/test', (req, res) => {
    res.send('Hello from server!');
});

app.use('/api/employees', employeeRoutes);

module.exports = app;