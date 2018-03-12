import React, { Component } from 'react'
import classnames from 'classnames'

import s from './TooltipDropdown.scss'

import * as bsutils from 'utils/bsutils'

const debug = require('debug')('baza:comp:ui/TooltipDropdown')

export default class TooltipDropdown extends Component {
  state = {
    isOpen: false
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.popper = new window.Popper(this.containerEl, this.menuElement, {
        placement: 'bottom'
      })
    }, 1000)

    document.addEventListener('mousedown', this.handleClick, false)
  }

  componentWillUnmount = () => {
    if (this.popper) {
      this.popper.destroy()
      this.popper = null
    }
    document.removeEventListener('mousedown', this.handleClick, false)
  }

  getSelectedItem = () => {
    return this.props.items[this.props.selectedIndex] || {}
  }

  onItemClick = (item, index) => e => {
    debug('Clicked ', index, item)
    this.props.onItemClick(item, index)
    this.hideTooltip()
  }

  handleClick = e => {
    if (this.containerEl.contains(e.target)) {
      return
    }
    // On outside click
    this.hideTooltip()
  }

  hideTooltip = () => {
    if (this.state.isOpen) this.setState({ isOpen: false })
  }

  showTooltip = () => {
    if (!this.state.isOpen) this.setState({ isOpen: true })
  }

  toggleTooltip = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    const { className, items = [] } = this.props

    const selectedItem = this.getSelectedItem()

    const cx = classnames(s.container, 'ui-tooltip-dropdown', className)
    const menuClassName = classnames(
      'ui-tooltip-dropdown-menu tooltip bs-tooltip-bottom',
      { show: this.state.isOpen }
    )

    const btnClassName = classnames(
      'btn btn-light ui-tooltip-dropdown-btn',
      bsutils.toStringWithPrefix('mx', [1, 2, 3, 3, 3])
    )

    return (
      <div
        className={cx}
        onMouseOver={this.showTooltip}
        ref={node => (this.containerEl = node)}>
        <div className={btnClassName} onClick={this.toggleTooltip}>
          <span className="text"> {selectedItem.label} </span>
          <span className="icon">
            <i className="fa fa-chevron-down" />
          </span>
        </div>
        <div
          className={menuClassName}
          ref={node => (this.menuElement = node)}
          role="menu">
          <div className="arrow" />
          <div className="tooltip-inner">
            {items.map((item, index) => (
              <div
                key={index}
                className="ui-tooltip-dropdown-item"
                onClick={this.onItemClick(item, index)}>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
