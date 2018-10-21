import React from 'react'
import classnames from 'classnames'

const WhitePaperSection = props => {
    const cx = classnames(props.className, 'white-paper-section')

    return (
        <div className={cx} id={props.id}>
            <div className="container page-section">
                <div className="row">
                    <div className="col-md-5">
                        <h4 className="section-title-underlined">
                            White Paper
                        </h4>
                        <p className="mb-3">
                            When donation reach the goal an automatic purchase
                            of the baza and crypto on the market will be
                            purchased then distributed to the qualifying Baza
                            account holders in the form of basic income
                        </p>
                        <a href="" className="btn btn-dark">
                            Download White Paper
                        </a>
                    </div>
                    <div className="col-md-7">Image here</div>
                </div>
            </div>
        </div>
    )
}

export default WhitePaperSection
