import React, { Component } from 'react';
import firebase from '../../config/fire'

import { Redirect } from 'react-router-dom'
class Login extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.handleChange = this.handleChange.bind(this)
    this.state = {
      redirect: false,
      email: '',
      password: '',
      error: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.email === 'admin@gmail.com' && this.state.password === 'admin1') {
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((u) => {
          this.props.setCurrentUser(u)
          console.log(this.props.setCurrentUser(u)
          )
          this.setState({ redirect: true },
            () => { console.log("redirect state changed") })
        })
        .catch((err) => {
          this.setState({ error: err },
            () => { console.log("error occured") })
        })

    } else {
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then()
        .catch((err) => {
          this.setState({ error: err },
            () => { console.log("error occured") })
        })
    }

  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  render() {

    const { from } = this.props.location.state || { from: { pathname: '/addPackages' } }

    if (this.state.redirect === true) {
      return <Redirect to={from} />
    }
    return (
      <div>
        <br />
        <h1>Welcome to InfoDeck</h1>
        <br />
        {this.state.error && <p className="text-danger">{this.state.error.message}</p>}


        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input required value={this.email} type="email" onChange={this.handleChange} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input required value={this.password} type="password" onChange={this.handleChange} className="form-control" id="password" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;