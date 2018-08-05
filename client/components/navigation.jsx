import React, { Component } from 'react';
import { Link } from 'react-router';
/**
 * This represents Layout component
 */
export default class Navigation extends Component {
  /**
   * This returns nothing.
   * @returns {Object} component.
   */
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary" >
          <Link className="navbar-brand" to="/index.html">Weconnect</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/index.html">Home
                </Link>
              </li>
              <li className="nav-item dropdown active">
                <Link to="/" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span className="sr-only">(current)</span>
            Category
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item " to="/index.html?category=agriculture">Agriculture</Link>
                  <Link className="dropdown-item " to="/index.html?category=technology">Technology</Link>
                  <Link className="dropdown-item " to="/index.html?category=commerce">Commerce</Link>
                  <Link className="dropdown-item " to="/index.html?category=health">Health</Link>
                  <Link className="dropdown-item " to="/index.html?category=engineering">Engineering</Link>
                  <Link className="dropdown-item " to="/index.html?category=fashion">Fashion</Link>
                  <div className="dropdown-divider" />
                  <Link className="dropdown-item " to="/index.html">All</Link>
                </div>
              </li>
              <li className="nav-item dropdown active">
                <Link to="/" className="nav-link dropdown-toggle" id="navbarDropdown2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Location
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item " to="/index.html?location=lagos">Lagos</Link>
                  <Link className="dropdown-item " to="/index.html?location=jos">Jos</Link>
                  <Link className="dropdown-item " to="/index.html?location=abuja">Abuja</Link>
                  <Link className="dropdown-item " to="/index.html?location=rivers">Rivers</Link>
                  <Link className="dropdown-item " to="/index.html?location=sokoto">Sokoto</Link>
                  <Link className="dropdown-item " to="/index.html?location=oyo">Oyo</Link>
                  <div className="dropdown-divider" />
                  <Link className="dropdown-item " to="/index.html">All</Link>
                </div>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>
        <div className="app-content">
          {this.props.children}
        </div>
        <hr />
        <footer className="text-primary">
    <Link id="footer" to="/https://weconnect-com.herokuapp.com/api-docs">Documentation</Link>
  Powered&nbsp;by&nbsp;Weconnect&nbsp;Team&nbsp;&copy;2018
  </footer>
      </div>
    );
  }
}
