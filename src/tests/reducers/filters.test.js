import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('should set up default filter values', () => {
    const state= filtersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        text:'',
        sortBy:'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set up sortBy to amount', () => {
    const state= filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
    expect(state.sortBy).toBe('amount');
});

test('should set up sortBy to date', () => {
    const state= filtersReducer({...state,sortBy:'amount'}, { type: 'SORT_BY_DATE' });
    expect(state.sortBy).toBe('date');
});

test('should set up text filter', () => {
    const text = 'rent';
        
    const action= { 
        type: 'SET_TEXT_FILTER',
        text
     };
    const state= filtersReducer(undefined, action);
    expect(state.text).toBe('rent');
}); 

test('should set up start date filter', () => {
    const startDate = moment(0);
        
    const action= { 
        type: 'SET_START_DATE',
        startDate
     };
    const state= filtersReducer(undefined, action);
    expect(state.startDate).toBe(startDate);
}); 

test('should set up end date filter', () => {
    const endDate = moment(0);
        
    const action= { 
        type: 'SET_END_DATE',
        endDate
     };
    const state= filtersReducer(undefined, action);
    expect(state.endDate).toBe(endDate);
}); 