import React from 'react';
import { connect } from 'react-redux';
import { NavLink} from 'react-router-dom';


export const ExpenseListItem = ({dispatch, id, description, amount, createdAt}) => (
    <div>
    <NavLink to={`/edit/${id}`}><h3>{description}</h3></NavLink>
    <p>{amount} - {createdAt}</p>
    
    </div>
);

export default connect()(ExpenseListItem);

