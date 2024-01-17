const database = require('./database');
const Employee = require('./models/employee');
const sampleData = require('./sample');
require('dotenv').config();

database.connect(process.env.MONGO_URI);

const seedDatabase = async () => {
    try {
        await database.connect(process.env.MONGO_URI);

        console.log('Connected to MongoDB for seeding');

        await Employee.deleteMany({})

        await Employee.insertMany(sampleData);
        console.log('Seeding complete');

    } catch (error) {
        console.error('Seeding error:', error);
    } finally {
        await database.disconnect();
    }
}

seedDatabase();