import React, { useState } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

const ExpenseForm = ({ expense, onSubmit }) => {
    const [description, setDescription] = useState(expense ? expense.description : '');
    const [note, setNote] = useState(expense ? expense.note : '');
    const [amount, setAmount] = useState(expense ? (expense.amount / 100).toString() : '');
    const [createdAt, setCreatedAt] = useState(expense ? moment(expense.createdAt) : moment());
    const [calendarFocused, setCalendarFocused] = useState(false);
    const [error, setError] = useState('');

    const onDescriptionChange = (e) => {
        setDescription(e.target.value);
    };
    const onNoteChange = (e) => {
        setNote(e.target.value);
    };
    const onAmountChange = (e) => {
        const value = e.target.value;
        if (!value || value.match(/^\d{1,}(\.\d{0,2})?$/)) {
            setAmount(value);
        }
    };
    const onDateChange = (date) => {
        if (date) {
            setCreatedAt(date);
        }
    };
    const onFocusChange = ({ focused }) => {
        setCalendarFocused(focused);
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!description || !amount) {
            setError('Please provide description and amount');
        } else {
            setError('');
            onSubmit({
                description,
                amount: parseFloat(amount, 10) * 100,
                createdAt: createdAt.valueOf(),
                note
            });
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            {error && <p className="form__error">{error}</p>}
            <label className="form__field">
                <span className="form__label">Description</span>
                <input
                    type='text'
                    className="text-input"
                    placeholder='e.g. Groceries'
                    autoFocus
                    value={description}
                    onChange={onDescriptionChange}
                />
            </label>
            <div className="form__row">
                <label className="form__field">
                    <span className="form__label">Amount</span>
                    <input
                        type='text'
                        inputMode='decimal'
                        className="text-input"
                        placeholder='0.00'
                        value={amount}
                        onChange={onAmountChange}
                    />
                </label>
                <div className="form__field">
                    <span className="form__label">Date</span>
                    <SingleDatePicker //see the documentation for single date picker
                        date={createdAt}
                        onDateChange={onDateChange}
                        focused={calendarFocused}
                        onFocusChange={onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                </div>
            </div>
            <label className="form__field">
                <span className="form__label">Note <em>(optional)</em></span>
                <textarea
                    className="textarea"
                    placeholder='Add a note for this expense'
                    value={note}
                    onChange={onNoteChange}
                >
                </textarea>
            </label>
            <div>
                <button className="button">{expense ? 'Save Expense' : 'Add Expense'}</button>
            </div>
        </form>
    );
};

export default ExpenseForm;
