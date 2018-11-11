import React from 'react'
import s from './Loader.scss'

const Loader = props => {
    const { message } = props
    return (
        <div className={s.container}>
            {!!message && <div className='loader-message'>{message}</div>}
            <div className='loader-element'>
                <div className='loader-child'></div>
                <div className='loader-child'></div>
                <div className='loader-child'></div>
                <div className='loader-child'></div>
            </div>
        </div>
    )
}

export default Loader
