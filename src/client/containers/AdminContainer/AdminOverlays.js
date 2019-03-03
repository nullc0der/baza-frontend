import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'

import AdminSignUpDialog from 'pages/Admin/AdminSignUp'

const AdminOverlays = location => {
    const hash = location.hash || ''
    return (
        <Fragment>
            {hash.includes('#!baza-registration') && (
                <Route component={AdminSignUpDialog} />
            )}
        </Fragment>
    )
}

export default AdminOverlays
