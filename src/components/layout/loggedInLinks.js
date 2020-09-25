import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import firebase from '../../config/fire'
import 'firebase/firestore';

class LoggedInLinks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
    };

  }

  logOutUser() {
    setTimeout(firebase.auth().signOut(), 3000);
  }


  render() {
    return (
      <div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">


            <li className="nav-item">
              <NavLink className="nav-link" exact to="/users">Users</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/retailers">Retailers</NavLink>
            </li>            <li className="nav-item">
              <NavLink className="nav-link" exact to="/addPackages">Add Packages</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" exact to="/assignPackages">Assign Packages</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" exact to="/listPackages">List packages</NavLink>
            </li>


            <li className="nav-item">
              <NavLink className="nav-link" exact to="/search">Search</NavLink>
            </li>
          </ul>
          <ul className="navbar-nav nav-right">

            <li className="nav-item">        <NavLink className="nav-link" exact to="/logout">
              <button onClick={this.logOutUser} type="button" className="btn btn-dark">logout</button></NavLink>

            </li>
          </ul>
        </div>

      </div>

    );

  }

}
export default LoggedInLinks;