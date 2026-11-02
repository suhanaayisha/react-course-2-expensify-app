const express = require('express');
const mongoose = require('mongoose');
const expensesRouter = require('./routes/expenses');

const app = express();

app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({ ok: true, db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

app.use('/api/expenses', expensesRouter);

app.use('/api', (req, res) => {
    res.status(404).json({ error: 'Not found' });
});

// Turn validation errors into 400s; anything else is a 500
app.use((err, req, res, next) => {
    if (err instanceof mongoose.Error.ValidationError) {
        const details = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json({ error: 'Invalid expense', details });
    }
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ error: 'Request body is not valid JSON' });
    }
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
});

module.exports = app;
