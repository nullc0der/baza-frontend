import React, { Component } from 'react'

function initFB(callback) {
    window.FB.init({
        appId: '468956423553849',
        version: 'v3.0'
    })
    callback()
}

export function injectFBSDK(callback) {
    const fbReady = window.FB && typeof window.FB === 'object'
    if (!fbReady) {
        ;(function(d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0]
            if (d.getElementById(id)) return
            js = d.createElement(s)
            js.id = id
            js.src = 'https://connect.facebook.net/en_US/sdk.js'
            fjs.parentNode.insertBefore(js, fjs)
        })(document, 'script', 'facebook-jssdk')
    }

    if (fbReady) {
        initFB(callback)
    } else {
        window.fbAsyncInit = () => initFB(callback)
    }
}

export default class FacebookLogin extends Component {
    state = {
        fb: {}
    }

    componentDidMount = () => {
        injectFBSDK(() => {
            window.FB.getLoginStatus(response => {
                this.setState({ fb: response })
            })
        })
    }

    facebookLogin = () => {
        const { handleFacebookLogin } = this.props
        if (this.state.fb.status === 'connected') {
            handleFacebookLogin(
                this.state.fb.authResponse.accessToken,
                'facebook'
            )
        } else {
            window.FB.login(
                function(response) {
                    if (response.authResponse) {
                        handleFacebookLogin(
                            response.authResponse.accessToken,
                            'facebook'
                        )
                    }
                },
                { scope: 'email' }
            )
        }
    }

    render() {
        const facebookBtn = React.createElement(
            this.props.tag,
            {
                onClick: this.facebookLogin,
                style: this.props.style,
                disabled: this.props.disabled,
                className: this.props.className
            },
            this.props.children ? (
                this.props.children
            ) : (
                <i className="fa fa-facebook" onClick={this.facebookLogin} />
            )
        )
        return facebookBtn
    }
}
