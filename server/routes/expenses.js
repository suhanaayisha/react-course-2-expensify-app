const express = require('express');
const mongoose = require('mongoose');
const Expense = require('../models/expense');

const router = express.Router();

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

// GET /api/expenses — list all expenses, newest first
router.get('/', async (req, res, next) => {
    try {
        const expenses = await Expense.find().sort({ createdAt: -1 });
        res.json(expenses);
    } catch (e) {
        next(e);
    }
});

// POST /api/expenses — add an expense
router.post('/', async (req, res, next) => {
    try {
        const expense = await Expense.create(pickEditable(req.body));
        res.status(201).json(expense);
    } catch (e) {
        next(e);
    }
});

// PATCH /api/expenses/:id — update some fields of an expense
router.patch('/:id', async (req, res, next) => {
    try {
        const expense = await Expense.findByIdAndUpdate(
            req.params.id,
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
        const expense = await Expense.findByIdAndDelete(req.params.id);
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        res.status(204).end();
    } catch (e) {
        next(e);
    }
});

module.exports = router;
