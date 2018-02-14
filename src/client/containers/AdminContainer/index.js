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

import AdminRoutes from './AdminRoutes'

// var debug = require('debug')('baza:client:app')

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
            {AdminRoutes(this.props.location)}
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

const mapStateToProps = state => ({
  location: state.router.location
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(App)
