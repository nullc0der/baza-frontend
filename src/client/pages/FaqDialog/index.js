import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import classnames from 'classnames'
import Linkify from 'react-linkify'

import Dialog from 'components/ui/Dialog'

import s from './FaqDialog.scss'

class FaqDialog extends Component {
    state = {
        collapsedQuestions: []
    }

    closeFaqModal = () => {
        const { pathname, hash } = this.props.location
        this.props.navigate(pathname + (hash || '').replace(hash, ''))
    }

    toggleCollapse = index => {
        const collapsedQuestions =
            this.state.collapsedQuestions.indexOf(index) === -1
                ? [...this.state.collapsedQuestions, index]
                : this.state.collapsedQuestions.filter(x => x !== index)
        this.setState({
            collapsedQuestions
        })
    }

    onClickExpandAll = () => {
        this.setState({
            collapsedQuestions: []
        })
    }

    onClickCollapseAll = collapsedQuestions => {
        this.setState({
            collapsedQuestions
        })
    }

    renderOneModalFaq = (faq, index) => {
        const faqIsCollapsed =
            this.state.collapsedQuestions.indexOf(index) !== -1
        return (
            <div
                className={`faq-item mt-3 ${
                    faqIsCollapsed ? 'is-collapsed' : ''
                }`}
                key={index}>
                <div
                    className="faq-header d-flex justify-content-between align-items-baseline"
                    onClick={() => this.toggleCollapse(index)}>
                    <p className="faq-title">
                        Q{index + 1}: {faq.question}
                    </p>
                    <i className="fa fa-chevron-up expand-collapse-arrow" />
                </div>
                <div className="faq-content">
                    <Linkify properties={{ target: '_blank' }}>
                        {faq.answer}
                    </Linkify>
                </div>
            </div>
        )
    }

    render() {
        const cx = classnames(s.container)
        const { faqs } = this.props

        return (
            <Dialog
                className={cx}
                isOpen
                title="Frequently Asked Questions (FAQ)"
                onRequestClose={this.closeFaqModal}>
                <div className="d-flex justify-content-center">
                    <div
                        className="badge faq-badge"
                        onClick={this.onClickExpandAll}>
                        Expand All
                    </div>
                    <div
                        className="badge faq-badge"
                        onClick={() =>
                            this.onClickCollapseAll([
                                ...Array(faqs.length).keys()
                            ])
                        }>
                        Collapse All
                    </div>
                </div>
                {faqs.map(this.renderOneModalFaq)}
            </Dialog>
        )
    }
}

const mapStateToProps = state => ({
    faqs: state.GroupFaqs.landingFaqs
})

const mapDispatchToProps = dispatch => ({
    navigate(...args) {
        return dispatch(push(...args))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FaqDialog)
