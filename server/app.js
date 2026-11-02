const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const expensesRouter = require('./routes/expenses');

const app = express();
const publicPath = path.join(__dirname, '..', 'public');

// Render (and most hosts) sit behind one proxy; needed for secure cookies and per-IP rate limits
app.set('trust proxy', 1);

app.use(express.json());
app.use(cookieParser());

app.get('/api/health', (req, res) => {
    res.json({ ok: true, db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

app.use('/api/auth', authRouter);
app.use('/api/expenses', expensesRouter);

app.use('/api', (req, res) => {
    res.status(404).json({ error: 'Not found' });
});

// Serve the built React app (yarn build:prod writes it to public/dist)
app.use(express.static(publicPath));

// Client-side routes like /edit/123 should load the app, not 404
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// Turn validation errors into 400s; anything else is a 500
app.use((err, req, res, next) => {
    if (err instanceof mongoose.Error.ValidationError) {
        const details = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json({ error: details.join('. '), details });
    }
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ error: 'Request body is not valid JSON' });
    }
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
});

module.exports = app;
