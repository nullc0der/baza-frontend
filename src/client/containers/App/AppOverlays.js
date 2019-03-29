import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'

import LoginDialog from 'pages/SignUp/LoginDialog'
import DonationDialog from 'pages/Donation/DonationDialog'
import NewsDialog from 'pages/NewsDialog'
import FaqDialog from 'pages/FaqDialog'

const AppOverlays = location => {
    const hash = location.hash || ''
    return (
        <Fragment>
            {hash.includes('#!login') && <Route component={LoginDialog} />}
            {hash.includes('#!donate') && <Route component={DonationDialog} />}
            {hash.includes('#!news') && <Route component={NewsDialog} />}
            {hash.includes('#!faqs') && <Route component={FaqDialog} />}
        </Fragment>
    )
}

export default AppOverlays
