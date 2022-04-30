import React from 'react'
import classnames from 'classnames'

class ExchangeSection extends React.Component {
    render() {
        const { className, id } = this.props
        const cx = classnames(
            className,
            'exchange-section text-center bg-light'
        )

        return (
            <div className={cx} id={id}>
                <div className="container page-section">
                    <h3 className="mb-3">Exchange</h3>
                    <p>Where can I buy, sell and trade BAZA coins?</p>
                    <a href="https://www.southxchange.com/" target="_blank">
                        <img
                            src="/public/img/southxchange.png"
                            alt="southxchange logo"
                            className="img-fluid exchange-logo"
                        />
                    </a>
                </div>
            </div>
        )
    }
}

export default ExchangeSection
