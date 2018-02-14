import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import s from './SubHeader.scss'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import startCase from 'lodash/startCase'
import take from 'lodash/take'

class SubHeader extends Component {
  render() {
    const { className, location } = this.props

    const cx = classnames(s.container, className, 'flex-horizontal', 'a-center')

    const paths = location.pathname.split('/').filter(x => !!x)
    const mainPath = startCase(paths[paths.length - 1])

    const crumbs = paths.map((x, i) => {
      return {
        href: location.basename + take(paths, i + 1).join('/'),
        text: startCase(x)
      }
    })

    // console.log(paths)

    return (
      <div className={cx}>
        <div>
          <div className="title"> {mainPath} </div>
          <div className="list-links flex-horizontal">
            {crumbs.map((x, i) => {
              return (
                <Link to={x.href} className="bread-link" key={i}>
                  {' '}
                  {x.text} /{' '}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  location: state.router.location
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(SubHeader)
