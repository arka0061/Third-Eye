import React, { Component } from 'react';
import LoggedInLinks from './loggedInLinks'
import LogoutLinks from './logoutLinks'
class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" >InfoDeck</a>
        {this.props.authenticated === false || null ? <LogoutLinks /> : <LoggedInLinks />}
      </nav>
    )

  }
}
export default Header;