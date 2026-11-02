import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export const EditExpensePage = ({ expense, startEditExpense, startRemoveExpense, history }) => {
   const [saving, setSaving] = useState(false);
   const [error, setError] = useState('');

   if (!expense) {
      return (
         <div className="content-container">
            <div className="message-box">
               <h2>Expense not found</h2>
               <p>It may have been removed, or the link is wrong.</p>
               <Link className="button" to="/">Back to dashboard</Link>
            </div>
         </div>
      );
   }

   // Runs an API call, then goes back to the dashboard; stays on the page with an error if it fails
   const save = async (apiCall, failureMessage) => {
      if (saving) {
         return;
      }
      setSaving(true);
      setError('');
      try {
         await apiCall();
         history.push('/');
      } catch (e) {
         setError(`${failureMessage}: ${e.message}`);
         setSaving(false);
      }
   };

   const onSubmit = (updates) => save(
      () => startEditExpense(expense.id, updates),
      "Couldn't save your changes"
   );
   const onRemove = () => save(
      () => startRemoveExpense({ id: expense.id }),
      "Couldn't remove the expense"
   );

   return (
      <div>
         <div className="page-header">
            <div className="content-container">
               <h1 className="page-header__title">Edit Expense</h1>
            </div>
         </div>
         <div className="content-container">
            {error && <p className="form__error page-error">{error}</p>}
            <ExpenseForm
              expense={expense}
              onSubmit={onSubmit}
            />
            <button className="button button--secondary" onClick={onRemove} disabled={saving}>
               Remove Expense
            </button>
         </div>
      </div>
   );
};

const mapStateToProps = (state, props) => ({
   expense: state.expenses.find((expense) => expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
   startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
   startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
