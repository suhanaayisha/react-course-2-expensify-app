import React from 'react';
import { connect } from 'react-redux';
import moment from "moment";
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate} from '../actions/filters';


export class ExpenseListFilter extends React.Component {
    state = {
        calenderFocused: null
    };

    onDatesChange = ({startDate,endDate}) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };

    onFocusChange = (calenderFocused) => {
        this.setState(() => ({ calenderFocused }));
    };
    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
    };
    onSortChange = (e) => {
        if(e.target.value==='amount'){
            this.props.sortByAmount(e.target.value);
        }
        else if (e.target.value==='date'){
            this.props.sortByDate(e.target.value);
        }
    
    };

    render() {
          return  (
                <div>
                    <input type="text" value={this.props.filters.text} onChange={this.onTextChange}/>
                    <select 
                    value={this.props.filters.sortBy}
                    onChange={this.onSortChange} >
                    <option value='date'> Date</option>
                    <option value='amount'> Amount</option>
                    </select>
                    <DateRangePicker
                        startDate={this.props.filters.startDate} // momentPropTypes.momentObj or null,
                        endDate={this.props.filters.endDate} // momentPropTypes.momentObj or null,
                        onDatesChange={this.onDatesChange} // PropTypes.func.isRequired,
                        focusedInput={this.state.calenderFocused} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={this.onFocusChange} // PropTypes.func.isRequired,
                        showClearDates={true}
                        numberOfMonths={1}
                        isOutsideRange={()=> false }
                    />
                </div>
            );
        
    }
}

const mapStateToProps = (state) => ({
    filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate))
});


export default connect(mapStateToProps,mapDispatchToProps)(ExpenseListFilter);
