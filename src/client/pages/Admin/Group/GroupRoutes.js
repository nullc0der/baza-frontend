import React from 'react'
import { Switch, Route } from 'react-router-dom'

import GroupTiles from 'pages/Admin/Group/GroupTiles'
import GroupProfilePage from 'pages/Admin/Group/Profile'
import GroupMembersPage from 'pages/Admin/Group/Member'
import GroupPostsPage from 'pages/Admin/Group/Post'
import GroupNewsPage from 'pages/Admin/Group/News'

const GroupRoutes = location => (
    <Switch location={location}>
        <Route
            path="/community/2/groups/:id/profile/"
            component={GroupProfilePage}
        />
        <Route
            path="/community/2/groups/:id/members/"
            component={GroupMembersPage}
        />
        <Route
            path="/community/2/groups/:id/posts/"
            component={GroupPostsPage}
        />
        <Route path="/community/2/groups/:id/news/" component={GroupNewsPage} />
        <Route path="/community/2/groups/" exact component={GroupTiles} />
    </Switch>
)

export default GroupRoutes
