import React from 'react';
const HelpExpensePage = () => (
    <div>
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Help</h1>
            </div>
        </div>
        <div className="content-container">
            <div className="message-box message-box--left">
                <h3>Adding an expense</h3>
                <p>Click <strong>Add Expense</strong>, fill in a description and amount, pick a date, and save.</p>
                <h3>Finding expenses</h3>
                <p>Use the search box, sort order and date range on the dashboard. The date range starts on the current month. Clear it with the × to see everything.</p>
                <h3>Editing or removing</h3>
                <p>Click any expense in the list to edit or remove it.</p>
                <h3>Your account</h3>
                <p>Expenses are saved to your account, so you'll see them on any device you log in from. Only you can see them. Use <strong>Log out</strong> in the header when you're on a shared computer.</p>
            </div>
        </div>
    </div>
);
export default HelpExpensePage;
