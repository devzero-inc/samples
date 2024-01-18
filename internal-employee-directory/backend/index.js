const database = require('./database');
const app = require('./app');
require('dotenv').config();

database.connect(process.env.MONGO_URI);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});