import React from 'react'
import {Switch, Route} from 'react-router-dom'

import HomePage      from 'pages/HomePage'
import NotFoundPage  from 'pages/NotFoundPage'

const AppRoutes = (
	<Switch>
		<Route path='/' exact component={HomePage}/>
		<Route path='/404' exact component={NotFoundPage}/>
		<Route component={NotFoundPage}/>
	</Switch>
)

export default AppRoutes