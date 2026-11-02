import React from 'react';
import { Link } from 'react-router-dom';
import { removeExpense } from '../actions/expenses';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense } from '../actions/expenses';

export const EditExpensePage = ({ expense, editExpense, removeExpense, history }) => {
   // Expenses only live in memory, so this happens after a page refresh
   if (!expense) {
      return (
         <div className="content-container">
            <div className="message-box">
               <h2>Expense not found</h2>
               <p>It may have been removed, or the page was refreshed.</p>
               <Link className="button" to="/">Back to dashboard</Link>
            </div>
         </div>
      );
   }

   const onSubmit = (updates) => {
      editExpense(expense.id, updates);
      history.push('/');
   };
   const onRemove = () => {
      removeExpense({ id: expense.id });
      history.push('/');
   };

   return (
      <div>
         <div className="page-header">
            <div className="content-container">
               <h1 className="page-header__title">Edit Expense</h1>
            </div>
         </div>
         <div className="content-container">
            <ExpenseForm
              expense={expense}
              onSubmit={onSubmit}
            />
            <button className="button button--secondary" onClick={onRemove}>
               Remove Expense
            </button>
         </div>
      </div>
   );
};

const mapStateToProps = (state, props) => ({
   expense: state.expenses.find((expense) => expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
   editExpense: (id, expense) => dispatch(editExpense(id, expense)),
   removeExpense: (data) => dispatch(removeExpense(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
