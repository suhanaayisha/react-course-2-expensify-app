import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class ExpenseForm extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            description:props.expense?props.expense.description:'',
            note:props.expense?props.expense.note:'',
            amount:props.expense? (props.expense.amount /100).toString():'',
            createdAt: props.expense? moment(props.expense.createdAt):moment(),
            calenderFocused:false,
            error:''
        };

        }
    
    
    onDescriptionChange = (e) =>{
        const description= e.target.value;
        this.setState(()=>({ description }));
    }
    onNoteChange = (e) => {
        const note= e.target.value;
        this.setState(()=>({ note }));
    }
    onAmountChange = (e) => {
        const amount= e.target.value;
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)){
            this.setState(()=>({ amount }));
        }
        
    }
    onDateChange = (createdAt) =>{
        if(createdAt){
            this.setState(()=>({createdAt} ));
        }

    };

    onFocusChange = ({focused }) =>{
        this.setState(()=>({calenderFocused: focused} ));
    };
    onSubmit = (e) => {
        e.preventDefault();

        if(!this.state.description || !this.state.amount){
            this.setState(()=>({error: "Please provide description and amount"}))
        } else {
            this.setState(()=>({error: ""}))
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount,10) *100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
        }
    };
    render(){
        return(
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <label className="form__field">
                    <span className="form__label">Description</span>
                    <input 
                        type='text' 
                        className="text-input"
                        placeholder='e.g. Groceries' 
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                </label>
                <div className="form__row">
                    <label className="form__field">
                        <span className="form__label">Amount</span>
                        <input 
                            type='text' 
                            inputMode='decimal'
                            className="text-input"
                            placeholder='0.00' 
                            value={this.state.amount}
                            onChange={this.onAmountChange}
                        />
                    </label>
                    <div className="form__field">
                        <span className="form__label">Date</span>
                        <SingleDatePicker //see the documentation for single date picker
                            date={this.state.createdAt}
                            onDateChange={this.onDateChange}
                            focused={this.state.calenderFocused}
                            onFocusChange={this.onFocusChange}
                            numberOfMonths={1}
                            isOutsideRange={() => false}
                        />
                    </div>
                </div>
                <label className="form__field">
                    <span className="form__label">Note <em>(optional)</em></span>
                    <textarea 
                        className="textarea"
                        placeholder='Add a note for this expense'
                        value={this.state.note}
                        onChange={this.onNoteChange} 
                    >
                    </textarea>
                </label>
                <div>
                    <button className="button">{this.props.expense ? 'Save Expense' : 'Add Expense'}</button>
                </div>
            </form>
        )
    }
}
