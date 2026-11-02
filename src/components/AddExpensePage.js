import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';

export const AddExpensePage = ({ addExpense, history }) => {
   const onSubmit = (expense) => {
      addExpense(expense);
      history.push('/');
   };
   return (
      <div>
         <div className="page-header">
            <div className="content-container">
               <h1 className="page-header__title">Add Expense</h1>
            </div>
         </div>
         <div className="content-container">
            <ExpenseForm
            onSubmit={onSubmit}
            />
         </div>
      </div>
   );
};


const mapDispatchToProps = (dispatch) => ({
   addExpense: (expense) => dispatch(addExpense(expense))
});


 export default connect(undefined, mapDispatchToProps)(AddExpensePage);
