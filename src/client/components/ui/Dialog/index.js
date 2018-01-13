import React, {Component} from 'react'
import classnames from 'classnames'

import s from './Dialog.scss'

export default class Dialog extends Component {
    
    componentDidMount = ()=> {
        document.addEventListener('keydown', this.closeOnEscapeKey, false)
        document.addEventListener('mousedown', this.handleClick, false)
        
        this.toggleBodyScroll(this.props.isOpen);
    }

    componentWillUnmount = ()=> {
        document.removeEventListener("keydown", this.closeOnEscapeKey, false);
        document.removeEventListener("mousedown", this.handleClick, false);

        this.toggleBodyScroll(false);
    }

    componentWillReceiveProps = (nextProps)=> {
        this.toggleBodyScroll(nextProps.isOpen)
    }

    onRequestClose = ()=> {
        if (typeof this.props.onRequestClose === 'function'){
            this.props.onRequestClose()
            this.toggleBodyScroll(false);
        }
    }

    handleClick = (e)=> {
        if (this.modalContent.contains(e.target))
            return

        // Close the dialog if outside click is detected
        this.onRequestClose()
    }

    toggleBodyScroll = (force)=> {
        document.body.classList.toggle('modal-open', force);
    }

    closeOnEscapeKey = (e)=> {
        if (e.which === 27)
            this.onRequestClose()
    }

    render() {
        const {
            className,
            isOpen,
            title
        } = this.props

        const cx = classnames(s.container, 'ui-dialog modal fade', className, {
            'show': isOpen
        })
        const backdropClass = classnames('modal-backdrop fade', {
            'show': isOpen
        })

        return (
            <div className={cx} tabIndex="-1" role="dialog" aria-labelledby="userLoginModal" aria-hidden="true">
                <div className={backdropClass}/>
                <div className='modal-dialog modal-dialog-centered' role="document">
                    <div className='modal-content' ref={node => this.modalContent = node }>
                        <div className='modal-header'>
                            {!!title && <h5 className='modal-title'> {title} </h5>}
                            <button type="button" className="close" aria-label="Close" onClick={this.onRequestClose}>
                                <i className='material-icons'>close</i>
                            </button>
                        </div>
                        <div className='modal-body'>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}