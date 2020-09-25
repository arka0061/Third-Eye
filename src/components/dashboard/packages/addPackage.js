import React, { Component } from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Link } from '@material-ui/core';
class AddPackages extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('users');
    this.unsubscribe = null;
    this.handleSubmit1 = this.handleSubmit1.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      names: [], from: '', to: '', prefix: '', id1: undefined, email: '', check: null,
      errorPackage: null, users: [], key: '', error: null, clicked: null, status: null, assignWithId: null, assignWithoutId: null
    }
  }
  handleSubmit1 = (e) => {
    let packages1 = [];
    for (var i = this.state.from; i <= this.state.to; i++) {
      packages1.push(this.state.prefix + i);
     
    }
    this.setState({
      names: packages1
    })
    console.log(this.state.names,"from packages");
    const db = firebase.firestore()
    if (this.state.packages.length > 0) {
      this.state.packages.map((pack, key) => {
        this.state.names.map((name, key1) => {
          if (pack.name === name) {
            return this.setState({
              errorPackage: 'enter valid packages',
            }, () => {
              console.log()
            })
          }
        })
      })
    }
    if (this.state.errorPackage === undefined || this.state.errorPackage === null) {
      this.state.names.map(async (name, key1) => {
        console.log("adding data")
        await db.collection('packages').doc(name).set({
          name: name,
          check: true,
        }).finally((res) => {
          this.setState({
            status: true
          }, () => { })
        })
          .catch((err) => {
            console.log("error occured", err)
          });
      })
    } else {
      console.log("before return")
      return
      console.log("after return")

    }

    e.preventDefault()
  }
  onCollectionUpdate1 = (querySnapshot) => {
    const packages = [];
    querySnapshot.forEach((doc) => {
      const { name, check } = doc.data();
      packages.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        check
      });
    });
    this.setState({
      packages
    });
  }
  onCollectionUpdate = (querySnapshot) => {
    const users = [];
    querySnapshot.forEach((doc) => {
      const { name } = doc.data();
      users.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name
      });
    });
    this.setState({
      users
    });
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      status: false, errorPackage: null
    })
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    firebase.firestore().collection('packages').onSnapshot(this.onCollectionUpdate1)
  }

  render() {
    return (
      <div>
        <br />
        <h1>Add Package</h1>
        <br />
        {this.state.errorPackage ? <div className="alert alert-success" role="alert">
          {this.state.errorPackage}</div>
          : this.state.status ? <div className="alert alert-success" role="alert">
            Packages added</div> : null}

        {this.state.assignWithId || this.state.assignWithoutId ? this.state.assignWithId + "without id " + this.state.assignWithoutId : null}
        <form onSubmit={this.handleSubmit1}>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Enter kit's prefix</label>
            <input required type="text" value={this.state.prefix} onChange={this.handleChange} className="form-control" id="prefix" name="prefix" placeholder="Kit serial Number" />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1">From</label>
            <input required type="text" value={this.state.from} onChange={this.handleChange} className="form-control" id="from" name="from" placeholder="Kit serial Number" />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1">To</label>
            <input required type="text" value={this.state.to} onChange={this.handleChange} className="form-control" id="to" name="to" placeholder="Kit serial Number" />
          </div>

          <br />
          <div className="form-group">
            <button type="submit"  className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddPackages;






