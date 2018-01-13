import React from 'react-router'

import { connect } from 'react-redux'

import { push } from 'react-router-redux'
import { Link } from 'react-router-dom'

const UILink = (props)=> {
    
    const {strip, to, location, ...others} = props

    if (!strip)
        return <Link to={to} {...others}/>

}

const mapStateToProps = state => ({
    location: state.router.location
})

const mapDispatchToProps = dispatch => ({
    navigate(...args){
        return dispatch(push(...args))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UILink)