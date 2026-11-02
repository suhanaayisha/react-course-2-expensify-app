const jwt = require('jsonwebtoken');

const COOKIE_NAME = 'expensify_session';
const SESSION_DAYS = 7;

const cookieOptions = () => ({
    httpOnly: true, // not readable from page JavaScript
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production', // HTTPS-only once deployed
    path: '/'
});

const startSession = (res, user) => {
    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: `${SESSION_DAYS}d` });
    res.cookie(COOKIE_NAME, token, { ...cookieOptions(), maxAge: SESSION_DAYS * 24 * 60 * 60 * 1000 });
};

const endSession = (res) => {
    res.clearCookie(COOKIE_NAME, cookieOptions());
};

// Puts the signed-in user's id on req.userId, or rejects with 401
const requireAuth = (req, res, next) => {
    const token = req.cookies[COOKIE_NAME];
    if (token) {
        try {
            req.userId = jwt.verify(token, process.env.JWT_SECRET).sub;
            return next();
        } catch (e) {
            // expired or tampered with — fall through to 401
        }
    }
    res.status(401).json({ error: 'Please log in' });
};

module.exports = { startSession, endSession, requireAuth };
