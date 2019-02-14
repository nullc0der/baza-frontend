import React, { PureComponent } from 'react'

import { Route } from 'react-router-dom'

export default class ForbiddenPage extends PureComponent {
    render() {
        return (
            <Route
                render={({ staticContext }) => {
                    if (staticContext) staticContext.status = 403
                    return (
                        <div className="flex-vertical a-center j-center forbidden-page">
                            <h1> 403 </h1>
                            <h4> Sorry this page has restricted access </h4>
                        </div>
                    )
                }}
            />
        )
    }
}
