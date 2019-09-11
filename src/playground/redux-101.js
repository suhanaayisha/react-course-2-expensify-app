import {createStore} from 'redux';
import { type } from 'os';

// const add = (data) => ( data.a + data.b );
// const add = ({a,b}) => ( a + b ); // destructured above line
// console.log(add({ a:1 , b:12 }));

const incrementCount = ({ incrementBy =1} = {}) => ({
        type: 'INCREMENT',
        // incrementBy: (typeof incrementBy === 'number')&&(incrementBy)
        // incrementBy: incrementBy
        incrementBy //same variable and property name
    });

const decrementCount = ({ decrementBy = 1} = {}) => ({
        type: 'DECREMENT',
        decrementBy
    });

const reset = () => ({
    type: 'RESET'
});

const set = ({ count = 1} = {}) => ({
    type: 'SET',
    count
});

const countReducer = (state = { count:0},action) =>{
    // const incrementBy = typeof action.incrementBy === 'number'? action.incrementBy : 1;
    // const decrementBy = typeof action.decrementBy === 'number'? action.decrementBy : 1
    switch(action.type){
        case 'INCREMENT':
            return{
                count: state.count+ action.incrementBy
            }
        case 'DECREMENT':
            return{
                count: state.count-action.decrementBy
            }
        case 'SET':
            return{
                count: action.count
            }
        case 'RESET':
            return{
                count: 0
            }
        default:
        return state   
    }
    
}


const store= createStore(countReducer());

const unsubscribe = store.subscribe(()=>{
    console.log(store.getState());
}
);


// store.dispatch({
//     type: 'INCREMENT',
//     incrementBy: 5
// });

// unsubscribe();

store.dispatch(reset());

store.dispatch(incrementCount({incrementBy:5}));

store.dispatch(incrementCount());

store.dispatch(decrementCount({decrementBy:10}));

store.dispatch(decrementCount());

store.dispatch(set({count: 101}));



