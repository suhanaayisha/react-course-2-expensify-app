import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { ExpenseListFilter } from '../../components/ExpenseListFilter';
import { filters, altFilters } from '../fixtures/filters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilter
            filters = {filters}
            setTextFilter ={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />
        )
}
);

test('should render ExpenseListFilter correctly', () =>{
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilter with alt data correctly', () =>{
    wrapper.setProps({
        filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () =>{
    const value = 'rent';
    wrapper.find('input').simulate('change', {
        target: {
            value
        }
    });
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should sort by date', () =>{
    const value='date'
    wrapper.setProps({
        filters: altFilters
    });
    wrapper.find('select').simulate('change', {
        target: { value }
    });
    expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount', () =>{
    const value='amount'
    wrapper.find('select').simulate('change', {
        target: { value }
    });
    expect(sortByAmount).toHaveBeenCalled();
});

test('should handle date change', () =>{
    const startDate = moment(0).add(4, 'years');
    const endDate = moment(0).add(8, 'years');
    wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate});
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle date focus changes', () =>{
    const calenderFocused = 'endDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')(calenderFocused);
    expect(wrapper.state('calenderFocused')).toBe(calenderFocused);
});