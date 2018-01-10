import React, {Component} from 'react'
import classnames from 'classnames'


import s from './TextField.scss'

export default class TextField extends Component {
    render(){

        const {
            className,
            inputClassName,
            label = false,
            icon  = false,
            ...others
        } = this.props 

        const cx = classnames(s.container, 'ui-textfield', className)

        const inputClass = classnames('ui-textfield-input', inputClassName)

        const _Label = !!label && (
            <label className='ui-textfield-label'>
                { !!icon && <span className='label-icon'> {icon} </span> }
                <span className='label-text'> {label} </span>
            </label>
        )

        return (
            <div className={cx}>
                {_Label}
                <input 
                    type='text' 
                    className={inputClass}
                    {...others}/>
            </div>
        )
    }
}