import React, { Component } from 'react';
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
          <a className="navbar-brand" href="index.html">Weconnect</a>
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
                <a className="nav-link" href="index.html">Home
                </a>
              </li>
              <li className="nav-item dropdown active">
                <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span className="sr-only">(current)</span>
            Category
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item " href="index.html?category=agriculture">Agriculture</a>
                  <a className="dropdown-item " href="index.html?category=technology">Technology</a>
                  <a className="dropdown-item " href="index.html?category=commerce">Commerce</a>
                  <a className="dropdown-item " href="index.html?category=health">Health</a>
                  <a className="dropdown-item " href="index.html?category=engineering">Engineering</a>
                  <a className="dropdown-item " href="index.html?category=fashion">Fashion</a>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item " href="index.html">All</a>
                </div>
              </li>
              <li className="nav-item dropdown active">
                <a className="nav-link dropdown-toggle" id="navbarDropdown2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Location
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item " href="index.html?location=lagos">Lagos</a>
                  <a className="dropdown-item " href="index.html?location=jos">Jos</a>
                  <a className="dropdown-item " href="index.html?location=abuja">Abuja</a>
                  <a className="dropdown-item " href="index.html?location=rivers">Rivers</a>
                  <a className="dropdown-item " href="index.html?location=sokoto">Sokoto</a>
                  <a className="dropdown-item " href="index.html?location=oyo">Oyo</a>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item " href="index.html">All</a>
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
    <a id="footer" href="https://weconnect-com.herokuapp.com/api-docs">Documentation</a>
  Powered&nbsp;by&nbsp;Weconnect&nbsp;Team&nbsp;&copy;2018
  </footer>
      </div>
    );
  }
}
