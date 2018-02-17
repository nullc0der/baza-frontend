import React, { Component } from 'react'
import Dialog from 'components/ui/Dialog'

export default class PurchaseDialog extends Component {
  state = {
    isOpen: false
  }
  render() {
    return (
      <Dialog
        title="purchase"
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}>
        <h1> Purchase dialog </h1>
      </Dialog>
    )
  }
}
