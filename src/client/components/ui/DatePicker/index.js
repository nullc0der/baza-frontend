import React, { Component } from 'react'
import moment from 'moment'
import classnames from 'classnames'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'

import TextField from 'components/ui/TextField'

import s from './DatePicker.scss'

const startYear = new Date('1/1/1980').getFullYear()
const endYear = new Date().getFullYear()
const startMonth = new Date(startYear, 0)
const endMonth = new Date(endYear, 11)

const YearMonthForm = props => {
    const { date, localeUtils, onChange } = props
    const months = localeUtils.getMonths()

    const years = []
    for (let i = startMonth.getFullYear(); i <= endMonth.getFullYear(); i++) {
        years.push(i)
    }

    const handleChange = e => {
        const { year, month } = e.target.form;
        onChange(new Date(year.value, month.value));
    }

    return (
        <form className="DayPicker-Caption">
            <select name="month" onChange={handleChange} value={date.getMonth()}>
                {months.map((month, i) => (
                    <option key={month} value={i}>
                        {month}
                    </option>
                ))}
            </select>
            <select name="year" onChange={handleChange} value={date.getFullYear()}>
                {years.map(year => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </form>
    )
}


export default class DatePicker extends Component {
    state = {
        datePickerShown: false,
        dateValue: '',
        selectedDate: undefined,
        month: startMonth
    }

    toggleDatePicker = e => {
        this.setState({
            datePickerShown: !this.state.datePickerShown
        })
    }

    handleSelectedDate = day => {
        this.setState({
            dateValue: moment(day).format('YYYY-M-D'),
            selectedDate: day,
            datePickerShown: false
        }, () => this.props.onDateChange(this.props.id, this.state.dateValue))
    }

    handleYearMonthChange = month => {
        this.setState({ month })
    }

    render() {
        const {
            className,
            label,
            errorState
        } = this.props
        const cx = classnames(s.container, className)
        return (
            <div className={cx}>
                <TextField
                    label={label}
                    value={this.state.dateValue}
                    errorState={errorState}
                    onClick={this.toggleDatePicker}
                    onFocus={this.toggleDatePicker}
                />
                <div className={`daypicker-container ${this.state.datePickerShown ? 'show' : ''}`}>
                    <DayPicker
                        onDayClick={this.handleSelectedDate}
                        selectedDays={this.state.selectedDate}
                        month={this.state.month}
                        fromMonth={startMonth}
                        toMonth={endMonth}
                        captionElement={({ date, localeUtils }) => (
                            <YearMonthForm
                                date={date}
                                localeUtils={localeUtils}
                                onChange={this.handleYearMonthChange}
                            />
                        )}
                    />
                </div>
            </div>
        )
    }
}
