const express = require('express');
const database = require('./database');
const employeeRoutes = require('./routes/employeeRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

database.connect(process.env.MONGO_URI);

app.get('/test', (req, res) => {
  res.send('Hello from server!');
});

app.use('/api/employees', employeeRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});