import React, { Component } from 'react'
import classnames from 'classnames'
import take from 'lodash/take'
import get from 'lodash/get'
import words from 'lodash/words'

import { fetchLandingFaq } from 'api/group-faq'

import Dialog from 'components/ui/Dialog'

class FaqSection extends Component {
    state = {
        faqs: [],
        isFaqModalOpen: false,
        collapsedQuestions: [1, 3]
    }

    componentDidMount = () => {
        fetchLandingFaq()
            .then(res => {
                this.setState({
                    faqs: get(res, 'data', [])
                })
            })
            .catch(() => {})
    }

    toggleFaqModal = () => {
        this.setState({
            isFaqModalOpen: !this.state.isFaqModalOpen
        })
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

    renderOneFaq = (faq, index) => {
        const faqAnswerInWords = words(faq.answer)
        const faqAnswer =
            faqAnswerInWords.length <= 20
                ? faqAnswerInWords.join(' ')
                : faqAnswerInWords.slice(0, 20).join(' ')
        return (
            <div className="faq-item" key={index} onClick={this.toggleFaqModal}>
                <p className="faq-title">{faq.question}</p>
                <div className="faq-content">{faqAnswer}</div>
            </div>
        )
    }

    renderOneModalFaq = (faq, index) => {
        const faqIsCollapsed =
            this.state.collapsedQuestions.indexOf(index) !== -1
        return (
            <div
                className={`faq-item mt-3 ${
                    faqIsCollapsed ? 'is-collapsed' : ''
                }`}
                key={index}
                onClick={() => this.toggleCollapse(index)}>
                <div className="faq-header d-flex justify-content-between align-items-baseline">
                    <p className="faq-title">
                        Q{index + 1}: {faq.question}
                    </p>
                    <i className="fa fa-chevron-up expand-collapse-arrow" />
                </div>
                <div className="faq-content">{faq.answer}</div>
            </div>
        )
    }

    render() {
        const { className, faqModalClass } = this.props
        const { faqs } = this.state
        const cx = classnames(className, 'faqs-section')

        return (
            <div className={cx}>
                <div className="faqs-header">
                    <p className="faqs-section-title">
                        FREQUENTLY ASKED QUESTIONS
                    </p>
                    <div
                        className="badge ml-1 read-more-badge"
                        onClick={this.toggleFaqModal}>
                        Read More
                    </div>
                </div>
                {take(faqs, 2).map(this.renderOneFaq)}
                <Dialog
                    className={faqModalClass}
                    isOpen={this.state.isFaqModalOpen}
                    title="Frequently Asked Questions (FAQ)"
                    onRequestClose={this.toggleFaqModal}>
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
            </div>
        )
    }
}

export default FaqSection
