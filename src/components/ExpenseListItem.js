import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import formatAmount from '../utils/formatAmount';


export const ExpenseListItem = ({ id, description, amount, createdAt, note }) => (
    <Link className="list-item" to={`/edit/${id}`}>
        <div>
            <h3 className="list-item__title">{description}</h3>
            <span className="list-item__sub-title">
                {moment(createdAt).format('MMMM Do, YYYY')}
                {note && <span className="list-item__note"> · {note}</span>}
            </span>
        </div>
        <h3 className="list-item__data">{formatAmount(amount)}</h3>
    </Link>
);

export default connect()(ExpenseListItem);
