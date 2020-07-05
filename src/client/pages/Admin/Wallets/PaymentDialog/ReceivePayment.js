import React from 'react'
import QRCode from 'qrcode.react'

import classnames from 'classnames'

class ReceivePayment extends React.Component {
    onClickWalletAddressCopy = () => {
        const { addNotification, onRequestClose } = this.props
        this.walletAddressContainer.select()
        document.execCommand('copy')
        addNotification({
            message: 'Wallet address copied to clipboard',
            level: 'info'
        })
        onRequestClose()
    }

    render() {
        const cx = classnames(
            'receive-payment',
            'payment-tab-content',
            'flex-vertical'
        )
        return (
            <div className={cx}>
                <div className="tab-content-inner">
                    <div className="qr-code mt-3 ">
                        <QRCode
                            value={this.props.wallet.address}
                            renderAs="svg"
                            className="qr-code-img img-fluid"
                        />
                    </div>
                    <div className="mt-3 copy-code">
                        <div
                            className="input-group input-group-sm"
                            onClick={this.onClickWalletAddressCopy}>
                            <textarea
                                readOnly
                                className="form-control"
                                value={this.props.wallet.address}
                                ref={node =>
                                    (this.walletAddressContainer = node)
                                }
                            />
                            <div className="input-group-append btn-copy">
                                <i className="material-icons">content_copy</i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1" />
            </div>
        )
    }
}

export default ReceivePayment
