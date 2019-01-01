import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'

import GroupRoutes from './GroupRoutes'

class Group extends Component {
    render() {
        return (
            <Fragment>
                <Helmet title="Groups" />
                {GroupRoutes(this.props.location)}
            </Fragment>
        )
    }
}

export default Group
