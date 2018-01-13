import React, { Component, Fragment } from "react";
import classnames from "classnames";

import { Link, NavLink } from "react-router-dom";

import "./Header.scss";

const HEADER_ITEMS_LEFT = [
  { title: "Home", href: "#hero-section" },
  { title: "Features", href: "#features-section" },
  { title: "Status", href: "#status-section" }
];

const HEADER_ITEMS_RIGHT = [
  { title: "Latest", href: "#latest-section" },
  { title: "Login", href: "#!login" },
  { title: "Contact", href: "#contact-section" }
];

export default class Header extends Component {
  static propTypes = {};

  renderOneLink = (item, index) => {
    return (
      <Link className="header-link" to={item.href} key={index}>
        {item.title}
      </Link>
    );
  };

  renderOneBSLink = (item, index) => {
    const cx = classnames("nav-item", {
      active: item.active
    });
    return (
      <li className={cx} key={index}>
        <NavLink className="nav-link" to={item.href}>
          {item.title}
        </NavLink>
      </li>
    );
  };

  render() {
    const { className, inCenter, showDonateButton = false } = this.props;

    const cx = classnames("app-header navbar navbar-expand-md", className, {
      "in-center": inCenter
    });

    return (
      <Fragment>
        <nav className={cx} id="app-header">
          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarContentContainer"
              aria-controls="navbarContentContainer"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarContentContainer"
            >
              <ul className="navbar-nav mx-auto align-items-center">
                {HEADER_ITEMS_LEFT.map(this.renderOneBSLink)}
                <li className="nav-item center-icon">
                  <NavLink className="nav-link" to="/" activeClassName="active">
                    <img
                      className="img-fluid"
                      alt="Baza"
                      src="/public/img/baza_logo.png"
                    />
                  </NavLink>
                </li>
                {HEADER_ITEMS_RIGHT.map(this.renderOneBSLink)}
              </ul>
            </div>
          </div>
          {showDonateButton && (
            <Link to='#!donate' className="btn btn-outline-primary btn-rounded donate-button">
              Donate Now
            </Link>
          )}
        </nav>
      </Fragment>
    );
  }
}
