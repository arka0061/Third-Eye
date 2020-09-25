import React, { Component } from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
import * as ReactBootStrap from 'react-bootstrap';
class AssignPackages extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('users');
    this.unsubscribe = null;
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      loading:false,counter:0,
      names: [], from: '', to: '', prefix: '', id1: undefined, email: '', check: true,
      errorPackage: null, users: [], key: '', error: null, status: null, packages: [], assign: null
    }
  }

  handleSubmit = (e) => {
    let packages = [];
    var i=0;
    for (i = this.state.from; i <= this.state.to; i++) {
      this.state.loading=true
      this.state.counter=i
      packages.push(this.state.prefix + i);
      this.setState({
        names: packages,
      })
      console.log(this.state.loading)
    }
    if(i===this.state.to)
    {
      this.setState({loading:false})
  
    }
  
    const db = firebase.firestore()
    let errorPackage = [];
    let assign = []

    if (this.state.packages.length === 0) {

      this.setState({
        errorPackage: 'Can not assign packages : List is empty'
      })
    } else {
      this.state.names.map(async (name) => {
        this.state.packages.map(async (pack) => {
          if (pack.name === name && pack.check === true) {
            console.log(pack.name, name, pack.check)
            await db.collection('users').doc(this.state.id1).get()
              .then((res) => {
                this.setState({
                  email: res.data().email
                })
              })
            await db.collection('packages').doc(name).set({
              name: name,
              check: false,
              userId: this.state.id1,
              email: this.state.email
            })
              .finally((res) => {
                this.setState({
                  status: true
                })
                console.log("Succefully inserted packages")
              })
              .catch((err) => {
                console.log("error occured", err)
              });

            assign.push(name + '  ')
            // assigning packages to users into db
            await db.collection('users').doc(this.state.id1).collection('assignedpackages').doc(name).set({
              name: name,
              check: false
            }, { merge: true }).finally((res) => {

              this.setState({
                assign: assign,
                names: null,
                id1: null,
                status: true, errorPackage: null
              })
            })
              .catch((err) => {
                console.log("error occured", err)
              });
          } else if (pack.check === false && pack.name === name) {

            this.setState({
              errorPackage: 'Packages are already assigned'
            })
          }

          else {
            errorPackage.push(name + ' ')
            this.setState({
              errorPackage: 'No Such Package exist'
            })
          }

        })
      })

    }
    e.preventDefault()
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


  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    const pack = firebase.firestore().collection('packages').onSnapshot(this.onCollectionUpdate1);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      status: false,
      errorPackage: null
    })
  }

  render() {
    /*if(this.state.counter===this.state.to)
    {
    this.setState({loading:false})
    }
    console.log(this.state.loading)
    console.log(this.state.counter,this.state.to);*/

    const loading=this.state.loading
    return (
      <div>
        <br />
        <h1>Assign Package</h1>
        <br />
        {this.state.assign ? <div className="alert alert-success" role="alert">
          Assigned Packages :{this.state.assign}
        </div> : this.state.errorPackage ? <div className="alert alert-success" role="alert">
          {this.state.errorPackage}
        </div> : this.state.status ? <div className="alert alert-success" role="alert">
          Packages assigned
        </div> : null}
        <form onSubmit={this.handleSubmit}>

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

          <div>
            <label htmlFor="exampleInputPassword1">Select User</label>
            <br />

            {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}

            <select
              placeholder="select your choice"
              className="browser-default custom-select"
              name="id1"
              value={this.state.id1}
              onChange={this.handleChange}
            >
              <option key='undefined' value="undefined" > Select </option>
              {this.state.users.map((user, key) =>

                <option key={user.key} value={user.key}>{user.name}</option>
              )}</select>
          </div>
          <br />
          <div className="form-group">
            <button type="submit" onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
          </div>
        </form>




       {loading ? (<ReactBootStrap.Spinner animation="border" />):(null)}
        
      </div >
    );
  }
}

export default AssignPackages;
