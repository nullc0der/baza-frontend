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

  componentDidMount = () => {
    this.injectFontIfAbsent()
    document.body.classList.add('is-admin-ui')
  }
  componentWillUnmount = () => {
    document.body.classList.remove('is-admin-ui')
  }

  injectFontIfAbsent = () => {
    const link = document.querySelectorAll(`[data-font='admin-ss-pro']`)
    if (link.length) return
    var l = document.createElement('link')
    l.rel = 'stylesheet'
    l.type = 'text/css'
    l.dataset.font = 'admin-ss-pro'
    l.href =
      'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700'
    document.head.appendChild(l)
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
        <Helmet titleTemplate="%s | Baza" defaultTitle="Baza" />
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
