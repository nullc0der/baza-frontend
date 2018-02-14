import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import AdminHome from 'pages/Admin/Home'

const AdminRoutes = location => (
  <Switch location={location}>
    <Route path="/admin" exact component={AdminHome} />
    <Redirect to="/admin" />
  </Switch>
)

export default AdminRoutes
