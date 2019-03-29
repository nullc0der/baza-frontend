import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import classnames from 'classnames'
import take from 'lodash/take'
import words from 'lodash/words'

import { actions as groupFaqsActions } from 'store/GroupFaqs'

class FaqSection extends Component {
    componentDidMount = () => {
        this.props.fetchLandingFaqs()
    }

    renderOneFaq = (faq, index) => {
        const { navigateTo } = this.props
        const faqAnswerInWords = words(faq.answer)
        const faqAnswer =
            faqAnswerInWords.length <= 20
                ? faqAnswerInWords.join(' ')
                : faqAnswerInWords.slice(0, 20).join(' ')
        return (
            <div
                className="faq-item"
                key={index}
                onClick={() => navigateTo('#!faqs')}>
                <p className="faq-title">{faq.question}</p>
                <div className="faq-content">{faqAnswer}</div>
            </div>
        )
    }

    render() {
        const { className, faqs, navigateTo } = this.props
        const cx = classnames(className, 'faqs-section')

        return (
            <div className={cx}>
                <div className="faqs-header">
                    <p className="faqs-section-title">
                        FREQUENTLY ASKED QUESTIONS
                    </p>
                    <div
                        className="badge ml-1 read-more-badge"
                        onClick={() => navigateTo('#!faqs')}>
                        Read More
                    </div>
                </div>
                {take(faqs, 2).map(this.renderOneFaq)}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    faqs: state.GroupFaqs.landingFaqs
})

const mapDispatchToProps = dispatch => ({
    fetchLandingFaqs: () => dispatch(groupFaqsActions.fetchLandingFaqs()),
    navigateTo(url) {
        return dispatch(push(url))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FaqSection)
