import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import createAsyncComponent from 'utils/create-async-component'

const AdminSignUpDialog = createAsyncComponent(() =>
    import(
        /* webpackChunkName: "AdminSignupDialog" */ 'pages/Admin/AdminSignUp'
    )
)
const WithdrawBazaDialog = createAsyncComponent(() =>
    import(
        /* webpackChunkName: "WithdrawBazaDialog" */ 'pages/Admin/WithdrawBaza'
    )
)

const AdminOverlays = (location) => {
    const hash = location.hash || ''
    return (
        <Fragment>
            {hash.includes('#!baza-registration') && (
                <Route component={AdminSignUpDialog} />
            )}
            {hash.includes('#!withdraw-baza') && (
                <Route component={WithdrawBazaDialog} />
            )}
        </Fragment>
    )
}

export default AdminOverlays
