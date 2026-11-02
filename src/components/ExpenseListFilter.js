import React, { useState } from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate} from '../actions/filters';


export const ExpenseListFilter = (props) => {
    const [calendarFocused, setCalendarFocused] = useState(null);

    const onDatesChange = ({ startDate, endDate }) => {
        props.setStartDate(startDate);
        props.setEndDate(endDate);
    };
    const onTextChange = (e) => {
        props.setTextFilter(e.target.value);
    };
    const onSortChange = (e) => {
        if (e.target.value === 'amount') {
            props.sortByAmount();
        } else if (e.target.value === 'date') {
            props.sortByDate();
        }
    };

    return (
        <div className="content-container">
          <div className="input-group">
            <div className="input-group__item input-group__item--grow">
            <input
            type="text"
            className="text-input"
            placeholder="Search expenses"
            aria-label="Search expenses"
            value={props.filters.text}
            onChange={onTextChange}
            />
            </div>
            <div className="input-group__item">
            <select
            className="select"
            aria-label="Sort by"
            value={props.filters.sortBy}
            onChange={onSortChange} >
            <option value='date'>Sort by date</option>
            <option value='amount'>Sort by amount</option>
            </select>
            </div>
            <div className="input-group__item">
            <DateRangePicker
                startDate={props.filters.startDate} // momentPropTypes.momentObj or null,
                endDate={props.filters.endDate} // momentPropTypes.momentObj or null,
                onDatesChange={onDatesChange} // PropTypes.func.isRequired,
                focusedInput={calendarFocused} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={setCalendarFocused} // PropTypes.func.isRequired,
                showClearDates={true}
                numberOfMonths={1}
                isOutsideRange={()=> false }
            />
            </div>
          </div>
        </div>
    );
};

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
