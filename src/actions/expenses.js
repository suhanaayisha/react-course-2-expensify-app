import * as api from '../api/expenses';

// The plain action generators update the store; the start* thunks call the
// API first and only update the store once the server has saved the change.

//Add Expense
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = ({
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
} = {}) => async (dispatch) => {
    const expense = await api.createExpense({ description, note, amount, createdAt });
    dispatch(addExpense(expense));
    return expense;
};

//Remove Expense
export const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

export const startRemoveExpense = ({ id } = {}) => async (dispatch) => {
    await api.deleteExpense(id);
    dispatch(removeExpense({ id }));
};

//Edit Expense
export const editExpense = (id,updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

export const startEditExpense = (id, updates) => async (dispatch) => {
    const expense = await api.updateExpense(id, updates);
    dispatch(editExpense(id, expense));
    return expense;
};

//Set Expenses
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpenses = () => async (dispatch) => {
    const expenses = await api.fetchExpenses();
    dispatch(setExpenses(expenses));
    return expenses;
};
