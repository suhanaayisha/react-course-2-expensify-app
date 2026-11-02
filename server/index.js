const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const mongoose = require('mongoose');
const app = require('./app');

const { MONGODB_URI, PORT = 3000 } = process.env;

if (!MONGODB_URI) {
    console.error('MONGODB_URI is not set. Copy server/.env.example to server/.env and add your Atlas connection string.');
    process.exit(1);
}

const start = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log(`Connected to MongoDB database "${mongoose.connection.name}"`);
    } catch (e) {
        console.error('Could not connect to MongoDB:', e.message);
        process.exit(1);
    }

    app.listen(PORT, () => {
        console.log(`API listening on http://localhost:${PORT}`);
    });
};

start();
