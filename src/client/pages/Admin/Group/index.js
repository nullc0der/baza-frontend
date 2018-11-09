import React, { Component, Fragment } from 'react'

import GroupRoutes from './GroupRoutes'

class Group extends Component {
    render() {
        return <Fragment>{GroupRoutes(this.props.location)}</Fragment>
    }
}

export default Group
