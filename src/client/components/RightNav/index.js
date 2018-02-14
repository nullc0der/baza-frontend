import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import s from './RightNav.scss'

const Tabs = props => <div className="tabs" {...props} />
const Tab = props => <div className="tab" {...props} />

export default class RightNav extends Component {
  state = {
    selected: 0
  }

  switchTab = selected => {
    this.setState({ selected })
  }

  render() {
    const { className, open } = this.props

    const cx = classnames(s.container, className, {
      'is-open': open
    })

    return (
      <div className={cx}>
        <Tabs
          id="rightnav-tabs"
          className="rightnav-tabs"
          onSelect={this.switchTab}>
          <Tab
            className="rightnav-tab"
            title={<i className="fa fa-fw fa-wrench" />}>
            Content 1
          </Tab>
          <Tab
            className="rightnav-tab"
            title={<i className="fa fa-fw fa-home" />}>
            Content 2
          </Tab>
          <Tab
            className="rightnav-tab"
            title={<i className="fa fa-fw fa-cogs" />}>
            Content 3
          </Tab>
        </Tabs>
      </div>
    )
  }
}
