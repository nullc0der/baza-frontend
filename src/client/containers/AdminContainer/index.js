import React, { Component } from 'react'
import { connect } from 'react-redux'

import Helmet from 'react-helmet'

import s from './AdminContainer.scss'

import Header from 'components/AdminHeader'
import LeftNav from 'components/LeftNav'
import RightNav from 'components/RightNav'
import SubHeader from 'components/SubHeader'
import Footer from 'components/AdminFooter'
import MiniChat from 'components/HeaderMiniChat/MiniChat'

// var debug = require('debug')('ekata:client:app')

class App extends Component {
  state = {
    isLeftNavOpen: false,
    isRightNavOpen: false
  }

  toggleLeftNav = () => {
    this.setState({ isLeftNavOpen: !this.state.isLeftNavOpen })
  }
  toggleRightNav = () => {
    this.setState({ isRightNavOpen: !this.state.isRightNavOpen })
  }

  render() {
    return (
      <section className={s.container}>
        <Helmet titleTemplate="%s | Ekata" defaultTitle="Ekata Social" />
        <MiniChat />
        <LeftNav
          className={s.leftNav}
          open={this.state.isLeftNavOpen}
          onRequestToggle={this.toggleLeftNav}
        />

        <section className={s.content}>
          <Header
            className={s.header}
            onMenuToggle={this.toggleLeftNav}
            onSettingsToggle={this.toggleRightNav}
          />
          <SubHeader className={s.subHeader} />
          <section className="content-inner flex-vertical">
            {this.props.children}
          </section>
          <Footer />
        </section>

        <RightNav
          className={s.rightNav}
          open={this.state.isRightNavOpen}
          onRequestClose={this.toggleLeftNav}
        />
      </section>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(App)
