import React from 'react'
import classnames from 'classnames'

class TelegramSection extends React.Component {
    render() {
        const { className, id } = this.props
        const cx = classnames(className, 'telegram-section')
        return (
            <div className={cx} id={id}>
                <div className="container page-section">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="pr-0 pr-md-3 pb-3 pb-md-0 text-md-right text-center">
                                <img
                                    className="img-fluid telegram-img"
                                    alt="Telegram Logo"
                                    src="/public/img/telegram_logo.svg"
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="text-center text-md-left">
                                <h3 className="mb-3">Telegram Channel</h3>
                                <p>Send us a message on Telegram</p>
                                <a
                                    href="https://t.me/bazafoundation"
                                    target="_blank">
                                    t.me/bazafoundation
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TelegramSection
