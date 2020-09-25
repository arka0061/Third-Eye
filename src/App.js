import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.js'
import Header from './components/layout/header';
import Retailers from './components/dashboard/retailer/listRetailers';
import Packages from './components/dashboard/packages/packages'
import addPackage from './components/dashboard/packages/addPackage'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AssignPackage from './components/dashboard/packages/assignPackage'
import Login from './components/auth/login';
import NotFound from './components/misc/notFound';
import listUsers from './components/dashboard/users/listUsers'
import UserDetail from './components/dashboard/users/userDetail'
import PackageDetail from './components/dashboard/packages/packageDetail';
import RetailerDetail from './components/dashboard/retailer/retailerDetails'
import logout from './components/misc/logout'
import firebase from './config/fire'
import search from './components/dashboard/search'
import LoggedInLinks from './components/layout/loggedInLinks';
import ListPackage from './components/dashboard/packages/ListPackage';
import AssignPackage1 from './components/dashboard/packages/assignPackage1';
function AuthenticatedRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render=
      {(props) => authenticated === true ? <Component {...props} {...rest} />
        : authenticated === null ? <Component {...props} {...rest} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      }
    />
  )
}


class App extends Component {

  constructor() {
    super();
    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.state = {
      authenticated: null,
      currentUser: null,
    };
  }

  setCurrentUser(u) {
    if (u) {
      this.setState({
        currentUser: u,
        authenticated: true
      })
    } else {
      this.setState({
        currentUser: null,
        authenticated: null
      })
    }
  }

  componentDidMount() {
    this.removeAuthListener = firebase.auth().onAuthStateChanged((u) => {
      if (u) {
        this.setState({
          authenticated: true,
          currentUser: u,
        })
      } else {
        this.setState({
          authenticated: null,
          currentUser: null,
        })
      }
    })
  }
  componentWillUnmount() {
    this.removeAuthListener();
  }
  render() {
    return (
      <div className="App">
        <Router>

          <Header authenticated={this.state.authenticated} />

          <Switch>
            <Route exact path='/' render={(props) => { return <Login setCurrentUser={this.setCurrentUser} {...props} /> }} />
            <Route exact path="/login" render={(props) => { return <Login setCurrentUser={this.setCurrentUser} {...props} /> }} />

            <AuthenticatedRoute authenticated={this.state.authenticated} exact path="/users" component={listUsers} />
            <AuthenticatedRoute authenticated={this.state.authenticated} exact path="/retailers" component={Retailers} />
            <AuthenticatedRoute authenticated={this.state.authenticated} exact path="/addPackages" component={Packages} />
            <AuthenticatedRoute authenticated={this.state.authenticated} exact path="/listPackages" component={ListPackage} />

            <AuthenticatedRoute authenticated={this.state.authenticated} exact path="/addPackages" component={addPackage} />

            <AuthenticatedRoute authenticated={this.state.authenticated} exact path='/showRetailer/:id' component={RetailerDetail} />

            <AuthenticatedRoute
              authenticated={this.state.authenticated}
              exact path='/assignPackages'
              component={AssignPackage} />

            <AuthenticatedRoute
              authenticated={this.state.authenticated}
              exact path='/assignPackage/:id'
              component={AssignPackage1} />

            <AuthenticatedRoute
              authenticated={this.state.authenticated}
              exact path='/showUser/:id'
              component={UserDetail} />

            <AuthenticatedRoute
              authenticated={this.state.authenticated}
              exact path="/showPackage/:id"
              component={PackageDetail} />

            <AuthenticatedRoute
              authenticated={this.state.authenticated}
              exact path="/search"
              component={search} />


            <AuthenticatedRoute
              authenticated={this.state.authenticated}
              exact path="/addPackages"
              component={addPackage} />
            <Route exact path="/logout" component={logout} />


            <Route component={NotFound} />
          </Switch>

        </Router>
      </div>
    );
  }
}


export default App;
