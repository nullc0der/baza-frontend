import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import { CSSTransition } from 'react-transition-group'

import isBoolean from 'lodash/isBoolean'

import s from './Dialog.scss'

export default class Dialog extends Component {
    componentDidMount = () => {
        document.addEventListener('keydown', this.closeOnEscapeKey, false)
        if (this.props.isOpen) {
            document.addEventListener('click', this.handleClickOutside, false)
            this.toggleBodyScroll(true)
        }
    }

    componentWillUnmount = () => {
        document.removeEventListener('keydown', this.closeOnEscapeKey, false)
        document.removeEventListener('click', this.handleClickOutside, false)
        this.toggleBodyScroll(false)
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.isOpen !== this.props.isOpen) {
            this.toggleBodyScroll(this.props.isOpen)
            this.props.isOpen
                ? document.addEventListener(
                      'click',
                      this.handleClickOutside,
                      false
                  )
                : document.removeEventListener(
                      'click',
                      this.handleClickOutside,
                      false
                  )
        }
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

    handleClickOutside = e => {
        if (this.modalContent.contains(e.target)) {
            return
        }
        this.onRequestClose()
    }

    render() {
        const {
            className,
            isOpen,
            title,
            footer,
            showClose = true,
            hideModalContent = false
        } = this.props

        const cx = classnames(s.container, 'ui-dialog modal', className, {
            show: isOpen
        })
        // const backdropClass = classnames('modal-backdrop', {
        //     show: isOpen
        // })
        const modalContentClass = classnames('modal-content', {
            hide: hideModalContent
        })

        const modalMarkup = (
            <div
                className={cx}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="userLoginModal"
                aria-hidden="true">
                {/* <div className={backdropClass} onClick={this.onRequestClose} /> */}
                {!!isOpen && (
                    // HACK: The 'in' prop is a hack found from https://github.com/reactjs/react-transition-group/issues/216
                    // Check more on it when gets some time
                    <CSSTransition
                        classNames="fade"
                        appear
                        timeout={500}
                        in={true}>
                        <div
                            className="modal-dialog modal-dialog-centered"
                            role="document">
                            <div
                                className={modalContentClass}
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
                    </CSSTransition>
                )}
            </div>
        )

        return ReactDOM.createPortal(
            modalMarkup,
            document.getElementById('modal-portal-root')
        )
    }
}
