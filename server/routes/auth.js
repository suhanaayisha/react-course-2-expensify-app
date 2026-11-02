const express = require('express');
const rateLimit = require('express-rate-limit');
const User = require('../models/user');
const { hashPassword, verifyPassword } = require('../auth/password');
const { startSession, endSession, requireAuth } = require('../auth/session');

const router = express.Router();

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 200;

// Slow down password guessing: 20 sign-up/login attempts per 15 minutes per IP
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { error: 'Too many attempts. Please wait a few minutes and try again.' }
});

const readCredentials = (body = {}) => ({
    username: typeof body.username === 'string' ? body.username.trim().toLowerCase() : '',
    password: typeof body.password === 'string' ? body.password : ''
});

// POST /api/auth/signup — create an account and sign in
router.post('/signup', authLimiter, async (req, res, next) => {
    try {
        const { username, password } = readCredentials(req.body);
        if (password.length < MIN_PASSWORD_LENGTH || password.length > MAX_PASSWORD_LENGTH) {
            return res.status(400).json({ error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` });
        }
        if (await User.exists({ username })) {
            return res.status(409).json({ error: 'That user ID is taken' });
        }
        const user = await User.create({ username, passwordHash: await hashPassword(password) });
        startSession(res, user);
        res.status(201).json({ user });
    } catch (e) {
        // Two sign-ups racing for the same user ID
        if (e.code === 11000) {
            return res.status(409).json({ error: 'That user ID is taken' });
        }
        next(e);
    }
});

// POST /api/auth/login
router.post('/login', authLimiter, async (req, res, next) => {
    try {
        const { username, password } = readCredentials(req.body);
        const user = username && await User.findOne({ username });
        // Same message either way, so it doesn't reveal which user IDs exist
        if (!user || !password || !(await verifyPassword(password, user.passwordHash))) {
            return res.status(401).json({ error: 'Incorrect user ID or password' });
        }
        startSession(res, user);
        res.json({ user });
    } catch (e) {
        next(e);
    }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
    endSession(res);
    res.status(204).end();
});

// GET /api/auth/me — who is signed in (used when the app starts)
router.get('/me', requireAuth, async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            endSession(res);
            return res.status(401).json({ error: 'Please log in' });
        }
        res.json({ user });
    } catch (e) {
        next(e);
    }
});

module.exports = router;
