import React, { Component } from 'react'

export default class GoogleLogin extends Component {
    state = {
        google: {}
    }

    componentDidMount() {
        ;((d, s, id, cb) => {
            const element = d.getElementsByTagName(s)[0]
            const fjs = element
            let js = element
            js = d.createElement(s)
            js.id = id
            js.src = 'https://apis.google.com/js/api.js'
            if (fjs && fjs.parentNode) {
                fjs.parentNode.insertBefore(js, fjs)
            } else {
                d.head.appendChild(js)
            }
            js.onload = cb
        })(document, 'script', 'google-login', () => {
            window.gapi.load('auth2', this.initClient)
        })
    }

    initClient = () => {
        window.gapi.auth2
            .init({
                clientId:
                    '1080897833990-rdloivt81o4btk1u3cvk5nvbpm7nikhi.apps.googleusercontent.com',
                scope:
                    'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'
            })
            .then(res => {
                if (res.isSignedIn.get()) {
                    this.setState({
                        google: res.currentUser.get().getAuthResponse()
                    })
                }
            })
    }

    startGoogleSignIn = () => {
        if (this.state.google.access_token) {
            this.props.handleGoogleLogin(
                this.state.google.access_token,
                'google-plus'
            )
        } else {
            const auth2 = window.gapi.auth2.getAuthInstance()
            auth2
                .signIn()
                .then(res =>
                    this.props.handleGoogleLogin(
                        res.getAuthResponse().access_token,
                        'google-plus'
                    )
                )
        }
    }

    render() {
        const googleBtn = React.createElement(
            this.props.tag,
            {
                onClick: this.startGoogleSignIn,
                style: this.props.style,
                disabled: this.props.disabled,
                className: this.props.className
            },
            this.props.children ? (
                this.props.children
            ) : (
                <i
                    className="fa fa-google-plus"
                    onClick={this.startGoogleSignIn}
                />
            )
        )
        return googleBtn
    }
}
