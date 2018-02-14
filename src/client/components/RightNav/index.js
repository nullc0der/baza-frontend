import React, { Component } from 'react'
import classnames from 'classnames'

import s from './RightNav.scss'

const Tab = props => (
  <li className="nav-item">
    <a
      className={`nav-link ${props.active ? 'active' : ''}`}
      id={props.id}
      data-toggle="tab"
      href={props.href}
      role="tab"
      aria-controls={props.href.replace('#', '')}
      aria-selected={props.active}>
      {props.children}
    </a>
  </li>
)

export default class RightNav extends Component {
  state = {
    selected: 0
  }

  componentDidMount = () => {
    $('#rightnav-tabs .nav-link').on('click', this.handleClick)
  }

  componentWillUnmount = () => {
    $('#rightnav-tabs .nav-link').off('click', this.handleClick)
  }

  handleClick(e) {
    $(this).tab('show')
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
        <ul
          id="rightnav-tabs"
          className="nav nav-tabs rightnav-tabs"
          role="tablist">
          <Tab
            id="tab-1"
            active={this.state.selected === 0}
            onClick={() => this.setState({ selected: 0 })}
            href="#rightnav-tab-content-1">
            <i className="fa fa-fw fa-wrench" />
          </Tab>
          <Tab
            id="tab-1"
            active={this.state.selected === 1}
            onClick={() => this.setState({ selected: 1 })}
            href="#rightnav-tab-content-2">
            <i className="fa fa-fw fa-home" />
          </Tab>
          <Tab
            id="tab-1"
            active={this.state.selected === 2}
            onClick={() => this.setState({ selected: 2 })}
            href="#rightnav-tab-content-3">
            <i className="fa fa-fw fa-cogs" />
          </Tab>
        </ul>
        <div className="tab-content" id="rightnav-tabs-content">
          <div
            className={`tab-pane fade ${
              this.state.selected === 0 ? 'show active' : ''
            }`}
            id="rightnav-tab-content-1">
            Content 1
          </div>
          <div
            className={`tab-pane fade ${
              this.state.selected === 1 ? 'show active' : ''
            }`}
            id="rightnav-tab-content-2">
            Content 2
          </div>
          <div
            className={`tab-pane fade ${
              this.state.selected === 2 ? 'show active' : ''
            }`}
            id="rightnav-tab-content-3">
            Content 3
          </div>
        </div>
      </div>
    )
  }
}
