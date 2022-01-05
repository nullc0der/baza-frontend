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
            iframeID:
                Math.random().toString(36).substring(2, 10) +
                '-ekata-gateway-processor-iframe',
        }
    }

    handleEvents = (e) => {
        if (e.origin !== FORM_URL) {
            return
        }
        switch (e.data.type) {
            case 'GET_FORM_ID':
                document
                    .getElementById(this.config.iframeID)
                    .contentWindow.postMessage(
                        {
                            type: 'SET_FORM_ID',
                            payload: {
                                formID: this.config.formID,
                            },
                        },
                        FORM_URL
                    )
                document.getElementById(this.config.iframeID).style.visibility =
                    'visible'
                document.getElementById('gp-loading-anim').remove()
                break
            case 'PROJECT_ERROR':
                typeof this.config.onError === 'function' &&
                    this.config.onError(e.data.payload)
                document.getElementById(this.config.iframeID).style.visibility =
                    'visible'
                document.getElementById('gp-loading-anim').remove()
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
    }

    showPaymentForm(formID) {
        this.config['formID'] = formID
        const iFrameContainer = document.createElement('div')
        const loadingAnimation = document.createElement('img')
        const iFrame = document.createElement('iframe')
        Object.assign(iFrameContainer.style, {
            position: 'fixed',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            zIndex: 9999,
        })
        iFrameContainer.setAttribute('id', 'ekata-gateway-processor-container')
        document.getElementsByTagName('body')[0].appendChild(iFrameContainer)
        loadingAnimation.setAttribute('id', 'gp-loading-anim')
        loadingAnimation.setAttribute(
            'src',
            'data:image/svg+xml;base64, PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMOSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiCiAgdmlld0JveD0iMCAwIDEwMCAxMDAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDAgMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiAgICA8cGF0aCBmaWxsPSIjZmZmIiBkPSJNNzMsNTBjMC0xMi43LTEwLjMtMjMtMjMtMjNTMjcsMzcuMywyNyw1MCBNMzAuOSw1MGMwLTEwLjUsOC41LTE5LjEsMTkuMS0xOS4xUzY5LjEsMzkuNSw2OS4xLDUwIj4KICAgICAgPGFuaW1hdGVUcmFuc2Zvcm0gCiAgICAgICAgIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgCiAgICAgICAgIGF0dHJpYnV0ZVR5cGU9IlhNTCIgCiAgICAgICAgIHR5cGU9InJvdGF0ZSIKICAgICAgICAgZHVyPSIxcyIgCiAgICAgICAgIGZyb209IjAgNTAgNTAiCiAgICAgICAgIHRvPSIzNjAgNTAgNTAiIAogICAgICAgICByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz4KICA8L3BhdGg+Cjwvc3ZnPgo='
        )
        Object.assign(loadingAnimation.style, {
            width: '150px',
            height: '150px',
        })
        iFrame.setAttribute('id', this.config.iframeID)
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
            visibility: 'hidden',
        })
        iFrameContainer.appendChild(loadingAnimation)
        iFrameContainer.appendChild(iFrame)
        window.addEventListener('message', this.handleEvents)
    }

    closePaymentForm(reason) {
        const iFrame = document.getElementById(this.config.iframeID)
        const iFrameContainer = document.getElementById(
            'ekata-gateway-processor-container'
        )
        iFrame.remove()
        iFrameContainer.remove()
        typeof this.config.onCloseForm === 'function' &&
            this.config.onCloseForm(reason)
        window.removeEventListener('message', this.handleEvents)
    }
}
