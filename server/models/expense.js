const mongoose = require('mongoose');

// Mirrors the expense shape used by the React app:
// amount is in cents, createdAt is a millisecond timestamp chosen by the user
const expenseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    note: {
        type: String,
        default: '',
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
        validate: {
            validator: Number.isInteger,
            message: 'amount must be a whole number of cents'
        }
    },
    createdAt: {
        type: Number,
        required: true
    }
});

// Send `id` instead of Mongo's `_id`/`__v` so the client keeps using `expense.id`
expenseSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        delete ret._id;
        return ret;
    }
});

module.exports = mongoose.model('Expense', expenseSchema);
