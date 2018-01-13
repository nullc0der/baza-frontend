import React from 'react'
import {Switch, Route} from 'react-router-dom'

import HomePage      from 'pages/HomePage'
import SignUpPage 	 from 'pages/SignUp'
import NotFoundPage  from 'pages/NotFoundPage'

const AppRoutes = (
	<Switch>
		<Route path='/' exact component={HomePage}/>
		<Route path='/signup' exact component={SignUpPage}/>
		<Route path='/404' exact component={NotFoundPage}/>
		<Route component={NotFoundPage}/>
	</Switch>
)

export default AppRoutes