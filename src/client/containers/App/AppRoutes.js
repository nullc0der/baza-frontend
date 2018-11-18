import React from 'react'
import { Switch, Route } from 'react-router-dom'

import HomePage from 'pages/HomePage'
import SignUpPage from 'pages/SignUp'
import NotFoundPage from 'pages/NotFoundPage'
import ForbiddenPage from 'pages/ForbiddenPage'
import EmailVerificationPage from 'pages/SignUp/EmailVerification'
import ForgotPasswordPage from 'pages/SignUp/ForgotPasswordPage'
import AddSocialEmailPage from 'pages/SignUp/AddSocialEmailPage'
import TwoFactorPage from 'pages/SignUp/TwoFactorPage'

import AdminContainer from 'containers/AdminContainer/index'

const AppRoutes = location => (
    <Switch location={location}>
        <Route path="/" exact component={HomePage} />
        <Route path="/signup" exact component={SignUpPage} />
        <Route path="/404" exact component={NotFoundPage} />
        <Route path="/403" exact component={ForbiddenPage} />
        <Route
            path="/validateemail/:validationKey/"
            exact
            component={EmailVerificationPage}
        />
        <Route path="/resetpassword" exact component={ForgotPasswordPage} />
        <Route
            path="/resetpassword/:resetKey/"
            exact
            component={ForgotPasswordPage}
        />
        <Route path="/addemail/" exact component={AddSocialEmailPage} />
        <Route path="/twofactor/" exact component={TwoFactorPage} />
        <Route path="/profile" component={AdminContainer} />
        <Route path="/coinsale" component={AdminContainer} />
        <Route path="/wallets" component={AdminContainer} />
        <Route path="/distribution-signup" component={AdminContainer} />
        <Route path="/dashboard" component={AdminContainer} />
        <Route path="/community/2/members" component={AdminContainer} />
        <Route path="/community/2/groups" component={AdminContainer} />
        <Route path="/messenger" component={AdminContainer} />
        <Route component={NotFoundPage} />
    </Switch>
)

export default AppRoutes
