import React, { Component } from 'react'

export default class FacebookLogin extends Component {
    state = {
        fb: {}
    }

    componentDidMount = () => {
        ;(function(d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0]
            if (d.getElementById(id)) return
            js = d.createElement(s)
            js.id = id
            js.src = 'https://connect.facebook.net/en_US/sdk.js'
            fjs.parentNode.insertBefore(js, fjs)
        })(document, 'script', 'facebook-jssdk')
        window.fbAsyncInit = function() {
            window.FB.init({
                appId:
                    process.env.NODE_ENV === 'development'
                        ? '238327430291512'
                        : '468956423553849',
                version: 'v3.0'
            })
            window.FB.getLoginStatus(response => {
                this.setState({ fb: response })
            })
        }.bind(this)
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
        return <i className="fa fa-facebook" onClick={this.facebookLogin} />
    }
}
