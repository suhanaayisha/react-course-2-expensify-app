import {
    addExpense, startAddExpense,
    editExpense, startEditExpense,
    removeExpense, startRemoveExpense,
    setExpenses, startSetExpenses
} from '../../actions/expenses';
import * as api from '../../api/expenses';
import expenses from '../fixtures/expenses';

jest.mock('../../api/expenses');

const resolveWith = (value) => () => Promise.resolve(value);

beforeEach(() => {
    jest.resetAllMocks();
});

test('should set up remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id:'123abc'
})
});

test('should remove expense on the server, then from the store', async () => {
    const dispatch = jest.fn();
    api.deleteExpense.mockImplementation(resolveWith(null));
    await startRemoveExpense({ id: expenses[2].id })(dispatch);
    expect(api.deleteExpense).toHaveBeenLastCalledWith(expenses[2].id);
    expect(dispatch).toHaveBeenLastCalledWith(removeExpense({ id: expenses[2].id }));
});

test('should set up edit expense action object', () => {
    const action = editExpense('123abc', { description:'milk' });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id:'123abc',
        updates: {
            description:'milk'
        }

})
});

test('should edit expense on the server, then in the store', async () => {
    const dispatch = jest.fn();
    const updated = { ...expenses[0], amount: 300 };
    api.updateExpense.mockImplementation(resolveWith(updated));
    await startEditExpense(expenses[0].id, { amount: 300 })(dispatch);
    expect(api.updateExpense).toHaveBeenLastCalledWith(expenses[0].id, { amount: 300 });
    expect(dispatch).toHaveBeenLastCalledWith(editExpense(expenses[0].id, updated));
});

test('should set up add expense action object', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type:'ADD_EXPENSE',
        expense: expenses[2]
    })
});

test('should add expense to the server, then the saved expense to the store', async () => {
    const dispatch = jest.fn();
    const expenseData = {
        description:'rent',
        amount:109500,
        createdAt:1000,
        note:"This was last month's rent"
    };
    const saved = { ...expenseData, id: 'abc123' };
    api.createExpense.mockImplementation(resolveWith(saved));
    await startAddExpense(expenseData)(dispatch);
    expect(api.createExpense).toHaveBeenLastCalledWith(expenseData);
    expect(dispatch).toHaveBeenLastCalledWith(addExpense(saved));
});

test('should add expense with default values', async () => {
    const dispatch = jest.fn();
    api.createExpense.mockImplementation((data) => Promise.resolve({ ...data, id: 'abc123' }));
    await startAddExpense()(dispatch);
    expect(api.createExpense).toHaveBeenLastCalledWith({
        description:'',
        note:'',
        amount:0,
        createdAt:0
    });
});

test('should not update the store if the server rejects the expense', async () => {
    const dispatch = jest.fn();
    api.createExpense.mockImplementation(() => Promise.reject(new Error('Invalid expense')));
    let error;
    try {
        await startAddExpense({ description: 'x' })(dispatch);
    } catch (e) {
        error = e;
    }
    expect(error.message).toBe('Invalid expense');
    expect(dispatch).not.toHaveBeenCalled();
});

test('should set up set expenses action object', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch expenses from the server and put them in the store', async () => {
    const dispatch = jest.fn();
    api.fetchExpenses.mockImplementation(resolveWith(expenses));
    await startSetExpenses()(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith(setExpenses(expenses));
});
