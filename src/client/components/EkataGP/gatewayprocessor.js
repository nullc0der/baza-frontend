const SITE_TYPE = 'production'
let FORM_URL = ''

if (SITE_TYPE === 'development') {
    FORM_URL = 'http://localhost:3100'
}

if (SITE_TYPE === 'staging') {
    FORM_URL = 'https://gatewayprocessorform.ekata.io'
}

if (SITE_TYPE === 'production') {
    FORM_URL = 'https://gpform.ekata.io'
}

export class EkataGatewayProcessorForm {
    constructor(config) {
        this.config = {
            projectID: config.projectID,
            formID: '',
            onCloseForm: config.onCloseForm,
            onError: config.onError,
            onSuccess: config.onSuccess,
        }
        this.iframeID =
            Math.random().toString(36).substring(2, 10) +
            'ekata-gateway-processor-iframe'
        window.addEventListener('message', (e) => {
            if (e.origin !== FORM_URL) {
                return
            }
            switch (e.data.type) {
                case 'GET_FORM_ID':
                    const iFrame = document.getElementById(this.iframeID)
                    iFrame.contentWindow.postMessage(
                        {
                            type: 'SET_FORM_ID',
                            payload: {
                                formID: this.config.formID,
                            },
                        },
                        FORM_URL
                    )
                    break
                case 'PROJECT_ERROR':
                    typeof this.config.onError === 'function' &&
                        this.config.onError(e.data.payload)
                    break
                case 'USER_CANCEL':
                    this.closePaymentForm('User Canceled')
                    break
                case 'PAYMENT_SUCCESS':
                    typeof this.config.onSuccess === 'function' &&
                        this.config.onSuccess(e.data.payload)
                    this.closePaymentForm('Payment Success')
                    break
                default:
                    console.log(e.data.payload)
                    break
            }
        })
    }

    showPaymentForm(formID) {
        this.config['formID'] = formID
        const iFrameContainer = document.createElement('div')
        const iFrame = document.createElement('iframe')
        Object.assign(iFrameContainer.style, {
            position: 'fixed',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            zIndex: 9999,
        })
        iFrameContainer.setAttribute('id', 'ekata-gateway-processor-container')
        document.getElementsByTagName('body')[0].appendChild(iFrameContainer)
        iFrame.setAttribute('id', this.iframeID)
        iFrame.setAttribute(
            'src',
            FORM_URL + `?project-id=${this.config.projectID}`
        )
        Object.assign(iFrame.style, {
            position: 'fixed',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            zIndex: 9999,
            border: 'none',
        })
        iFrameContainer.appendChild(iFrame)
    }

    closePaymentForm(reason) {
        const iFrame = document.getElementById(this.iframeID)
        const iFrameContainer = document.getElementById(
            'ekata-gateway-processor-container'
        )
        iFrame.remove()
        iFrameContainer.remove()
        typeof this.config.onCloseForm === 'function' &&
            this.config.onCloseForm(reason)
    }
}
