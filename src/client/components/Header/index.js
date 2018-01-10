import React, {Component, Fragment} from 'react'
import classnames from 'classnames'

import {Link} from 'react-router-dom'

import './Header.scss'

const HEADER_ITEMS_LEFT = [
	{ title: 'Home', href: '/' },
	{ title: 'About', href: '/about' },
	{ title: 'Work', href: '/work' }
]

const HEADER_ITEMS_RIGHT = [
	{ title: 'Portfolio', href: '/portfolio' },
	{ title: 'Blog', href: '/blog' },
	{ title: 'Contact', href: '/contact' }
]

export default class Header extends Component {
	static propTypes = {

	}

	renderOneLink = (item, index)=> {
		return (
			<Link
				className='header-link'
				to={item.href}
				key={index}>
				{item.title}
			</Link>
		)
	}

	renderOneBSLink = (item, index)=> {
		const cx = classnames('nav-item', {
			active: item.active
		})
		return (
			<li className={cx} key={index}>
				<a className='nav-link' href={item.href}> {item.title} </a>
			</li>
		)
	}

	render(){
		const {
			className,
			inCenter,
			showDonateButton = false
		} = this.props

		const cx = classnames('app-header navbar navbar-expand-md', className, {
			'in-center': inCenter
		})

		return <Fragment>
        <nav className={cx}>
          <div className="container">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContentContainer" aria-controls="navbarContentContainer" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="navbarContentContainer">
              <ul className="navbar-nav mx-auto align-items-center">
                {HEADER_ITEMS_LEFT.map(this.renderOneBSLink)}
                <li className="nav-item center-icon">
                  <a className="nav-link" href="/">
                    <img className="img-fluid" alt="Baza" src="/public/img/baza_logo.png" />
                  </a>
                </li>
                {HEADER_ITEMS_RIGHT.map(this.renderOneBSLink)}
              </ul>
            </div>
          </div>
          {showDonateButton && <button className="btn btn-outline-primary btn-rounded donate-button">
              Donate Now
            </button>}
        </nav>
      </Fragment>;
	}
}