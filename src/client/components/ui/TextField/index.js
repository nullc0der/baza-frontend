import React, {Component} from 'react'
import classnames from 'classnames'

import debounce from 'lodash/debounce'

import s from './TextField.scss'

export default class TextField extends Component {
    state = {
        value: ''
    }

    componentWillMount = ()=> {
        this.setState({ value: this.props.value })
    }

    componentDidMount = ()=> {
        this._onChange = debounce(this.onChange, 100)
    }

    onChange = (value)=> {
        if (typeof this.props.onChange === 'function')
            this.props.onChange(value)
    }

    onInputChange = (e)=> {
        const value = e.target.value
        this.setState({ value })
        this._onChange(value)
    }
    
    render(){

        const {
            className,
            inputClassName,
            label = false,
            icon  = false,
            type  = 'text',
            onChange,
            ...others
        } = this.props 

        const cx = classnames(s.container, 'ui-textfield', className)

        const inputClass = classnames('ui-textfield-input', inputClassName, {
            'has-value': !!this.state.value
        })

        

        const _Label = !!label && (
            <label className='ui-textfield-label'>
                { !!icon && <span className='label-icon'> {icon} </span> }
                <span className='label-text'> {label} </span>
            </label>
        )

        return (
            <div className={cx}>
                <input 
                    type={type} 
                    className={inputClass} 
                    onChange={this.onInputChange} 
                    {...others} />
                {_Label}
            </div>
        )
    }
}