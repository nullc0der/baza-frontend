import React, { Fragment } from "react";
import { Route } from "react-router-dom";

import LoginDialog from 'pages/SignUp/LoginDialog'
import DonationDialog from 'pages/Donation/DonationDialog'

const AppOverlays = (location)=> {
    const hash = location.hash || ''
    return (
        <Fragment>
            { hash.includes('#!login') && <Route component={LoginDialog}/> }
            { hash.includes('#!donate') && <Route component={DonationDialog}/> }
        </Fragment>
    )
}

export default AppOverlays