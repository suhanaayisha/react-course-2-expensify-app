const express = require('express');
const mongoose = require('mongoose');
const Expense = require('../models/expense');
const { requireAuth } = require('../auth/session');

const router = express.Router();

// Every expense route needs a signed-in user, and only sees that user's expenses
router.use(requireAuth);

const EDITABLE_FIELDS = ['description', 'note', 'amount', 'createdAt'];

// Only keep the fields the client is allowed to set
const pickEditable = (body = {}) => EDITABLE_FIELDS.reduce((fields, key) => {
    if (body[key] !== undefined) {
        fields[key] = body[key];
    }
    return fields;
}, {});

// Unknown or malformed ids should be a 404, not a CastError
router.param('id', (req, res, next, id) => {
    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ error: 'Expense not found' });
    }
    next();
});

// GET /api/expenses — list the user's expenses, newest first
router.get('/', async (req, res, next) => {
    try {
        const expenses = await Expense.find({ owner: req.userId }).sort({ createdAt: -1 });
        res.json(expenses);
    } catch (e) {
        next(e);
    }
});

// POST /api/expenses — add an expense
router.post('/', async (req, res, next) => {
    try {
        const expense = await Expense.create({ ...pickEditable(req.body), owner: req.userId });
        res.status(201).json(expense);
    } catch (e) {
        next(e);
    }
});

// PATCH /api/expenses/:id — update some fields of an expense
router.patch('/:id', async (req, res, next) => {
    try {
        const expense = await Expense.findOneAndUpdate(
            { _id: req.params.id, owner: req.userId },
            pickEditable(req.body),
            { new: true, runValidators: true }
        );
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        res.json(expense);
    } catch (e) {
        next(e);
    }
});

// DELETE /api/expenses/:id — remove an expense
router.delete('/:id', async (req, res, next) => {
    try {
        const expense = await Expense.findOneAndDelete({ _id: req.params.id, owner: req.userId });
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        res.status(204).end();
    } catch (e) {
        next(e);
    }
});

module.exports = router;
