import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import { CSSTransitionGroup } from 'react-transition-group'

import isBoolean from 'lodash/isBoolean'

import s from './Dialog.scss'

export default class Dialog extends Component {
    componentDidMount = () => {
        document.addEventListener('keydown', this.closeOnEscapeKey, false)
        if (this.props.isOpen) {
            this.toggleBodyScroll(true)
        }
    }

    componentWillUnmount = () => {
        document.removeEventListener('keydown', this.closeOnEscapeKey, false)
        this.toggleBodyScroll(false)
    }

    componentDidUpdate = () => {
        this.toggleBodyScroll(this.props.isOpen)
    }

    onRequestClose = () => {
        if (typeof this.props.onRequestClose === 'function') {
            this.props.onRequestClose()
            this.toggleBodyScroll(false)
        }
    }

    closeOnEscapeKey = e => {
        if (e.which === 27) {
            this.onRequestClose(false)
        }
    }

    toggleBodyScroll = force => {
        if (isBoolean(force)) {
            return document.body.classList.toggle('modal-open', force)
        }

        document.body.classList.contains('modal-open')
            ? document.body.classList.remove('modal-open')
            : document.body.classList.add('modal-open')
    }

    render() {
        const {
            className,
            isOpen,
            title,
            footer,
            showClose = true
        } = this.props

        const cx = classnames(s.container, 'ui-dialog modal', className, {
            show: isOpen
        })
        const backdropClass = classnames('modal-backdrop', {
            show: isOpen
        })

        const modalMarkup = (
            <div
                className={cx}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="userLoginModal"
                aria-hidden="true">
                <div className={backdropClass} onClick={this.onRequestClose} />
                {!!isOpen && (
                    <CSSTransitionGroup
                        transitionName="fade"
                        transitionAppear={true}
                        transitionAppearTimeout={500}
                        transitionEnter={false}
                        transitionLeave={false}>
                        <div
                            className="modal-dialog modal-dialog-centered"
                            role="document">
                            <div
                                className="modal-content"
                                ref={node => (this.modalContent = node)}>
                                <div className="modal-header">
                                    {!!title && (
                                        <h5 className="modal-title">
                                            {' '}
                                            {title}{' '}
                                        </h5>
                                    )}
                                    {!!showClose && (
                                        <button
                                            type="button"
                                            className="close"
                                            aria-label="Close"
                                            onClick={this.onRequestClose}>
                                            <i className="material-icons">
                                                close
                                            </i>
                                        </button>
                                    )}
                                </div>
                                <div className="modal-body">
                                    {this.props.children}
                                </div>
                                {!!footer && (
                                    <div className="modal-footer">{footer}</div>
                                )}
                            </div>
                        </div>
                    </CSSTransitionGroup>
                )}
            </div>
        )

        return ReactDOM.createPortal(
            modalMarkup,
            document.getElementById('modal-portal-root')
        )
    }
}
