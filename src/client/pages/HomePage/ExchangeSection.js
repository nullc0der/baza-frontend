import React from 'react'
import classnames from 'classnames'

class ExchangeSection extends React.Component {
    render() {
        const { className, id } = this.props
        const cx = classnames(className, 'exchange-section text-center')

        return (
            <div className={cx} id={id}>
                <div className="container page-section">
                    <h3 className="mb-3">Exchange</h3>
                    <p>Where can I buy, sell and trade BAZ tokens?</p>
                    <a href="https://www.southxchange.com/">
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
