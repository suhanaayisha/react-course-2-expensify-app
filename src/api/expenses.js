import request from './request';

export const fetchExpenses = () => request('GET', '/expenses');
export const createExpense = (expenseData) => request('POST', '/expenses', expenseData);
export const updateExpense = (id, updates) => request('PATCH', `/expenses/${id}`, updates);
export const deleteExpense = (id) => request('DELETE', `/expenses/${id}`);
