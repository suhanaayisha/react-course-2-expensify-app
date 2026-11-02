import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

let startAddExpense, history, wrapper;

beforeEach(() => {
    startAddExpense = jest.fn(() => Promise.resolve());
    history = { push: jest.fn() };
    wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history={history} />);
}
);

test('should render AddExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
}
);

test('should handle onSubmit', async () => {
    await wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
}
);

test('should show an error and stay on the page if saving fails', async () => {
    startAddExpense = jest.fn(() => Promise.reject(new Error('Network down')));
    wrapper.setProps({ startAddExpense });
    await wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(history.push).not.toHaveBeenCalled();
    expect(wrapper.find('.page-error').text()).toContain('Network down');
}
);
