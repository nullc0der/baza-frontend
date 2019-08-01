import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import createAsyncComponent from 'utils/create-async-component'

// const CoinSalePage = createAsyncComponent(() => import('pages/Admin/CoinSale'))
const WalletsPage = createAsyncComponent(() =>
    import(/* webpackChunkName: "WalletsPage" */ 'pages/Admin/Wallets')
)
const DistributionSignUpPage = createAsyncComponent(() =>
    import(
        /* webpackChunkName: "DistributionSignUpPage" */ 'pages/Admin/DistributionSignUp'
    )
)
const MembersPage = createAsyncComponent(() =>
    import(/* webpackChunkName: "MembersPage" */ 'pages/Admin/Members')
)
const MessengerPage = createAsyncComponent(() =>
    import(/* webpackChunkName: "MessengerPage" */ 'pages/Admin/Messenger')
)
const HashTagPage = createAsyncComponent(() =>
    import(/* webpackChunkName: "HashTagPage" */ 'pages/Admin/HashTag')
)
const GroupPage = createAsyncComponent(() =>
    import(/* webpackChunkName: "GroupPage" */ 'pages/Admin/Group')
)
const MemberProfilePage = createAsyncComponent(() =>
    import(
        /* webpackChunkName: "MemberProfilePage" */ 'pages/Admin/MemberProfile'
    )
)
const AdminHome = createAsyncComponent(() =>
    import(/* webpackChunkName: "AdminHome" */ 'pages/Admin/Home')
)

// TODO: I think routing is not done properly by me, improve when
// some extra time

const AdminRoutes = location => (
    <Switch location={location}>
        <Route path="/dashboard" exact component={AdminHome} />
        <Route path="/hashtag" component={HashTagPage} />
        {/* <Route path="/coinsale" component={CoinSalePage} /> */}
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
