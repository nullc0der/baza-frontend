import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import AdminHome from 'pages/Admin/Home'
import CoinSalePage from 'pages/Admin/CoinSale'
import WalletsPage from 'pages/Admin/Wallets'

const AdminRoutes = location => (
  <Switch location={location}>
    <Route path="/admin" exact component={AdminHome} />
    <Route path="/admin/coinsale" component={CoinSalePage} />
    <Route path="/admin/wallets" component={WalletsPage} />
    <Redirect to="/admin" />
  </Switch>
)

export default AdminRoutes
