import React, { useState } from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';

export const AddExpensePage = ({ startAddExpense, history }) => {
   const [saving, setSaving] = useState(false);
   const [error, setError] = useState('');

   const onSubmit = async (expense) => {
      if (saving) {
         return;
      }
      setSaving(true);
      setError('');
      try {
         await startAddExpense(expense);
         history.push('/');
      } catch (e) {
         setError(`Couldn't save the expense: ${e.message}`);
         setSaving(false);
      }
   };
   return (
      <div>
         <div className="page-header">
            <div className="content-container">
               <h1 className="page-header__title">Add Expense</h1>
            </div>
         </div>
         <div className="content-container">
            {error && <p className="form__error page-error">{error}</p>}
            <ExpenseForm
            onSubmit={onSubmit}
            />
         </div>
      </div>
   );
};


const mapDispatchToProps = (dispatch) => ({
   startAddExpense: (expense) => dispatch(startAddExpense(expense))
});


 export default connect(undefined, mapDispatchToProps)(AddExpensePage);
