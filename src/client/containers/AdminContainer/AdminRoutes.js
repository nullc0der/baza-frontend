import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import AdminHome from 'pages/Admin/Home'
import CoinSalePage from 'pages/Admin/CoinSale'
import WalletsPage from 'pages/Admin/Wallets'
import DistributionSignUpPage from 'pages/Admin/DistributionSignUp'
import MemberProfilePage from 'pages/Admin/MemberProfile'
import MembersPage from 'pages/Admin/Members'
import MessengerPage from 'pages/Admin/Messenger'
import GroupPage from 'pages/Admin/Group'

//TODO: I think routing is not done properly by me, improve when
// some extra time

const AdminRoutes = location => (
    <Switch location={location}>
        <Route path="/dashboard" exact component={AdminHome} />
        <Route path="/coinsale" component={CoinSalePage} />
        <Route path="/wallets" component={WalletsPage} />
        <Route path="/distribution-signup" component={DistributionSignUpPage} />
        <Route path="/profile" component={MemberProfilePage} />
        <Route path="/community/2/members" component={MembersPage} />
        <Route path="/community/2/groups" component={GroupPage} />
        <Route path="/messenger/:id" component={MessengerPage} />
        <Route path="/messenger" component={MessengerPage} />
        <Redirect to="/dashboard" />
    </Switch>
)

export default AdminRoutes
