// Expenses Reducer
const expensesReducerDefaultState = [];

export default (state =expensesReducerDefaultState, action) => {
    switch(action.type){
        case 'ADD_EXPENSE':
        //    return state.concat(action.expense) //concat does does manipulate the state itself
            return [
                ...state,
                action.expense //using spread operator instead of concat
            ];

        case 'REMOVE_EXPENSE':
            return state.filter(({id}) =>  action.id !== id);

        case 'EDIT_EXPENSE':
            return state.map((expense) =>{
                if(expense.id === action.id){
                    return {
                        ...expense,
                        ...action.updates
                    };
                }else{
                    return expense;
                }
            });
        default:
        return state;
    }
};