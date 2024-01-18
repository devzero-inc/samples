const mongoose = require('mongoose');

class Database {
    constructor() {
        this.connection = null;
    }

    async connect(uri) {
        if (!this.connection) {
            try {
                this.connection = await mongoose.connect(uri);

                console.log('Connected to the database');
            } catch (error) {
                console.error('Error connecting to the database:', error);
                throw error;
            }
        }

        return this.connection;
    }

    async disconnect() {
        if (this.connection) {
            try {
                await mongoose.disconnect();

                console.log('Disconnected from the database');
            } catch (error) {
                console.error('Error disconnecting from the database:', error);
                throw error;
            } finally {
                this.connection = null;
            }
        }
    }
}

const database = new Database();

module.exports = database;
