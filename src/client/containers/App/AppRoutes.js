import React from 'react'
import { Switch, Route } from 'react-router-dom'

import HomePage from 'pages/HomePage'
import SignUpPage from 'pages/SignUp'
import NotFoundPage from 'pages/NotFoundPage'

import AdminContainer from 'containers/AdminContainer'

const AppRoutes = location => (
    <Switch location={location}>
        <Route path="/" exact component={HomePage} />
        <Route path="/signup" exact component={SignUpPage} />
        <Route path="/404" exact component={NotFoundPage} />
        <Route path="/admin" component={AdminContainer} />
        <Route component={NotFoundPage} />
    </Switch>
)

export default AppRoutes
