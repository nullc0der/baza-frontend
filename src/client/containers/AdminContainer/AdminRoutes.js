import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import AdminHome from 'pages/Admin/Home'
import CoinSalePage from 'pages/Admin/CoinSale'
import WalletsPage from 'pages/Admin/Wallets'
import DistributionSignUpPage from 'pages/Admin/DistributionSignUp'
import MemberProfilePage from 'pages/Admin/MemberProfile'
const AdminRoutes = location => (
    <Switch location={location}>
        <Route path="/dashboard" exact component={AdminHome} />
        <Route path="/coinsale" component={CoinSalePage} />
        <Route path="/wallets" component={WalletsPage} />
        <Route path="/distribution-signup" component={DistributionSignUpPage} />
        <Route path="/profile" component={MemberProfilePage} />
        <Redirect to="/dashboard" />
    </Switch>
)

export default AdminRoutes
