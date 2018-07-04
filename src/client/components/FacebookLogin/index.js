import React, { Component } from 'react'

export default class FacebookLogin extends Component {
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
                appId: '238327430291512',
                version: 'v3.0'
            })
        }
    }

    facebookLogin = () => {
        const { handleFacebookLogin } = this.props
        window.FB.getLoginStatus(response => {
            if (response.status === 'connected') {
                handleFacebookLogin(response)
            } else {
                window.FB.login(
                    function(response) {
                        if (response.authResponse) {
                            handleFacebookLogin(response)
                        }
                    },
                    { scope: 'email' }
                )
            }
        })
    }

    render() {
        return <i className="fa fa-facebook" onClick={this.facebookLogin} />
    }
}
