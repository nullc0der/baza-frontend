import React, { Component } from 'react'
import classnames from 'classnames'

import s from './Wallets.scss'

import AccountsSidebar from './AccountsSidebar'
import TransanctionsTable from './TransanctionsTable'

export default class WalletsPage extends Component {
  render() {
    const cx = classnames(s.container)
    return (
      <div className={cx}>
        <AccountsSidebar />
        <TransanctionsTable />
      </div>
    )
  }
}
