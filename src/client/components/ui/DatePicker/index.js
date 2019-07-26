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
        const { year, month } = e.target.form
        onChange(new Date(year.value, month.value))
    }

    return (
        <form className="DayPicker-Caption">
            <select
                name="month"
                onChange={handleChange}
                value={date.getMonth()}>
                {months.map((month, i) => (
                    <option key={month} value={i}>
                        {month}
                    </option>
                ))}
            </select>
            <select
                name="year"
                onChange={handleChange}
                value={date.getFullYear()}>
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
        popUpFocused: false,
        dateValue: '',
        selectedDate: undefined,
        month: startMonth
    }

    componentWillMount = () => {
        if (this.datePickerBlurTimeOut) {
            clearTimeout(this.datePickerBlurTimeOut)
        }
        document.removeEventListener('click', this.handleClickOutside, false)
    }

    toggleDatePicker = e => {
        if (!this.state.datePickerShown) {
            document.addEventListener('click', this.handleClickOutside, false)
        } else {
            document.removeEventListener(
                'click',
                this.handleClickOutside,
                false
            )
        }
        this.setState({
            datePickerShown: !this.state.datePickerShown
        })
    }

    togglePopupFocus = e => {
        this.setState({
            popUpFocused: !this.state.popUpFocused
        })
    }

    handleClickOutside = e => {
        if (this.datePickerNode.contains(e.target)) {
            return
        }
        this.toggleDatePicker()
    }

    handleSelectedDate = day => {
        this.setState(
            {
                dateValue: moment(day).format('YYYY-M-D'),
                selectedDate: day
            },
            () => {
                this.props.onDateChange(this.props.id, this.state.dateValue)
                this.toggleDatePicker()
            }
        )
    }

    onDatePickerFocus = e => {
        this.setState({
            datePickerShown: true
        })
    }

    onDatePickerBlur = e => {
        this.datePickerBlurTimeOut = setTimeout(() => {
            if (!this.state.popUpFocused) {
                this.setState({
                    datePickerShown: false
                })
            }
        }, 1)
    }

    handleYearMonthChange = month => {
        this.setState({ month })
    }

    render() {
        const { className, label, errorState } = this.props
        const cx = classnames(s.container, className)
        return (
            <div className={cx} ref={node => (this.datePickerNode = node)}>
                <TextField
                    readOnly
                    label={label}
                    value={this.state.dateValue}
                    errorState={errorState}
                    onFocus={this.onDatePickerFocus}
                    onBlur={this.onDatePickerBlur}
                />
                <div
                    className={`daypicker-container ${
                        this.state.datePickerShown ? 'show' : ''
                    }`}>
                    <DayPicker
                        onDayClick={this.handleSelectedDate}
                        selectedDays={this.state.selectedDate}
                        month={this.state.month}
                        fromMonth={startMonth}
                        toMonth={endMonth}
                        onFocus={this.togglePopupFocus}
                        onBlur={this.togglePopupFocus}
                        captionElement={({ date, localeUtils }) => (
                            <YearMonthForm
                                date={date}
                                localeUtils={localeUtils}
                                onChange={this.handleYearMonthChange}
                            />
                        )}
                    />
                </div>
                <div
                    className="calendar-toggle"
                    onClick={this.toggleDatePicker}>
                    <i className="fas fa-calendar-alt" />
                </div>
            </div>
        )
    }
}
