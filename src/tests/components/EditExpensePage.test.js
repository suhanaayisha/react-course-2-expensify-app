import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let startEditExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
    startEditExpense = jest.fn(() => Promise.resolve());
    startRemoveExpense = jest.fn(() => Promise.resolve());
    history = { push: jest.fn() };
    wrapper = shallow(
        <EditExpensePage 
            startEditExpense={startEditExpense} 
            startRemoveExpense={startRemoveExpense} 
            history={history} 
            expense={expenses[2]}
        />);
}
);

test('should render EditExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
}
);

test('should handle edit expense', async () => {
    await wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]); 
    expect(startEditExpense).toHaveBeenLastCalledWith(expenses[2].id,expenses[2]);
    expect(history.push).toHaveBeenLastCalledWith('/');
}
);

test('should handle remove expense', async () => {
    await wrapper.find('button').prop('onClick')();
    expect(startRemoveExpense).toHaveBeenLastCalledWith({
        id: expenses[2].id
    });
    expect(history.push).toHaveBeenLastCalledWith('/');
}
);

test('should show an error and stay on the page if removing fails', async () => {
    startRemoveExpense = jest.fn(() => Promise.reject(new Error('Network down')));
    wrapper.setProps({ startRemoveExpense });
    await wrapper.find('button').prop('onClick')();
    expect(history.push).not.toHaveBeenCalled();
    expect(wrapper.find('.page-error').text()).toContain('Network down');
}
);

test('should render not found message when expense is missing', () => {
    wrapper.setProps({ expense: undefined });
    expect(wrapper.find('ExpenseForm').length).toBe(0);
    expect(wrapper.find('.message-box').length).toBe(1);
});
