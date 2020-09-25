import React, { Component } from 'react';
import firebase from 'firebase/app';
import { Switch } from '@material-ui/core'

import Paginationonsearch from './Paginationonsearch'
import 'firebase/firestore';
import { Link } from 'react-router-dom'
class ListUsers extends Component {
  constructor(props) {
    super(props);
    this.updateSearch = this.updateSearch.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.unsubscribe = null;
    this.state = {
      users: [],
      id1: '',
      search: '',
      filtered: [],
      trigger:[],
      showPerPage: 5,
      Pagination: {
        start: 0,
        end: this.showPerPage
      }


    };
  }
  onPaginationChange = (start, end) => {
    //console.log(this.state.pagination.start, "Testing Pagination")
    this.setState({
      Pagination: {
        start: start,
        end: end
      }
    });
    console.log(this.state.start, this.state.end)
  }

  onCollectionRetailers = (querySnapshot) => {
    const users = [];
    querySnapshot.forEach((doc) => {
      const { name, profilrUrl, userName, gst, retailerId, userId, address, phone, location } = doc.data();
      users.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        profilrUrl,
        userName,
        gst,
        retailerId,
        userId,
        address,
        phone,
        location
      });
    });
    this.setState({
      users
    });
  }

  onCollectionPackages = (querySnapshot) => {
    const users = [];
    querySnapshot.forEach((doc) => {
      const { name, check } = doc.data();
      users.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        check
      });
    });
    this.setState({
      users
    });
  }

  onCollectionUsers = (querySnapshot) => {
    const users = [];
    querySnapshot.forEach((doc) => {
      const { name, email, address, phone, location } = doc.data();
      users.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        email,
        address,
        phone,
        location
      });
    });
    this.setState({
      users
    });
  }
  handleSubmit = async (e) => {

    e.preventDefault();
    if (this.state.id1 === 'users') {
      const db = firebase.firestore();
      await db.collection(this.state.id1).orderBy("name", "asc").onSnapshot(this.onCollectionUsers);
    }
    else if (this.state.id1 === 'retailersList') {
      const db = firebase.firestore();
      await db.collection(this.state.id1).orderBy("name", "asc").onSnapshot(this.onCollectionRetailers);
    } else if (this.state.id1 === 'packages') {
      const db = firebase.firestore();
      await db.collection(this.state.id1).orderBy("name", "asc").onSnapshot(this.onCollectionPackages);
    } else {
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state.id1)
  }
  updateSearch = (e) => {
    this.setState({
      search: e.target.value,
      trigger:false
    })
    var v=this.state.search.length
    if(v===1)
    {
      this.setState({
        trigger:true
      })
    }
    console.log(v);
    console.log(this.state.search)
    console.log(this.state.trigger)
  
  }


  componentDidMount() {
    //  this.unsubscribe = firebase.firestore().
    //collection('users').orderBy("name", "asc").onSnapshot(this.onCollectionUpdate);
  }

  render() {
    const trigger=this.state.trigger
    const { search } = this.state;
    this.state.filtered = this.state.users.filter(user => {
      return user.name.toString().toLowerCase().indexOf(search.toString().toLowerCase()) !== -1;
    });

    return (
      <div>
        <div>   <form onSubmit={this.handleSubmit}>
          <br />

          <label htmlFor="exampleInputEmail1">Select option </label>
          <br />
          <select
            className="browser-default custom-select"
            name="id1"
            value={this.state.id1}
            onChange={this.handleChange}
          >
            <option key="Select" value="Select" >  Select </option>
            <option key="packages" value="packages">Packages</option>
            <option key="users" value="users">Users</option>
            <option key="retailersList" value="retailersList">Retailers</option>

          </select>
          <div>
            <br />
            <button type="submit" className="btn btn-primary">Submit</button> </div>
        </form>
        </div>
        <br />
        <div className="input-group">
          <input id="email" type="text" className="form-control" placeholder="Search .."
            name="search"
            value={this.state.search}
            onChange={this.updateSearch} />
          <br />
        </div>

        {this.state.id1 === 'users' ? <div>
          <br />
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th> User Id </th>
                <th>User Name</th>
                <th>User Email</th>

                <th>Detail</th>
              </tr>
            </thead>
            {trigger ? (
            <tbody>
            {this.state.users.slice(this.state.Pagination.start, this.state.Pagination.end).map(user => {
              return (
                <tr key={user.key}>
                  <td> {user.key} </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td> <Link to={`/showUser/${user.key}`} className="btn btn-secondary">View</Link> </td>
                </tr>
              )
            })
          }
            </tbody>):
            (<tbody>
            {this.state.filtered.map(user => {
              return (
                <tr key={user.key}>
                  <td> {user.key} </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td> <Link to={`/showUser/${user.key}`} className="btn btn-secondary">View</Link> </td>
                </tr>
              )
            })
          }
            </tbody>)}
          </table>
        </div>
          : this.state.id1 === 'packages' ? <div>
            <br />
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th>Package Id</th>
                  <th>View Package</th>
                  <th>Assign </th>
                  <th>Activate </th>
                </tr>
              </thead>
              {trigger ? (
              <tbody>
              {this.state.users.slice(this.state.Pagination.start, this.state.Pagination.end).map(pack => {
                return (
                  <tr key={pack.key}>
                    <td>{pack.key}</td>
                    <td><Link to={`/showPackage/${pack.key}`} className="btn btn-secondary">View</Link></td>
                    <td>
                      {pack.check === true ?
                        <Link to={`/assignPackage/${pack.key}`}
                          className="btn btn-secondary">Assign</Link> :
                        <label htmlFor="exampleInputEmail1">Assigned</label>
                      }
                    </td>

                    <td>
                      <Switch
                        id="activate"
                        size="medium"
                        color="primary"
                        value={this.state.display}
                        onChange={this.toggleHandler} />
                    </td>

                  </tr>
                )
              })
            }
              </tbody>):
              (<tbody>
              {this.state.filtered.map(pack => {
                return (
                  <tr key={pack.key}>
                    <td>{pack.key}</td>
                    <td><Link to={`/showPackage/${pack.key}`} className="btn btn-secondary">View</Link></td>
                    <td>
                      {pack.check === true ?
                        <Link to={`/assignPackage/${pack.key}`}
                          className="btn btn-secondary">Assign</Link> :
                        <label htmlFor="exampleInputEmail1">Assigned</label>
                      }
                    </td>

                    <td>
                      <Switch
                        id="activate"
                        size="medium"
                        color="primary"
                        value={this.state.display}
                        onChange={this.toggleHandler} />
                    </td>

                  </tr>
                )
              })
            }
              </tbody>)}

            </table>
          </div>
            : <div>
              <br />
              <table className="table">
                <thead className="table-striped">
                  <tr>
                    <th> Retailer Id </th>
                    <th>Retailer Name</th>
                    <th>User Id</th>
                    <th>User Name</th>
                    <th>Detail</th>
                  </tr>
                </thead>
                {trigger ? (
                <tbody>
                {this.state.users.slice(this.state.Pagination.start, this.state.Pagination.end).map(user => {
                  return (
                    <tr key={user.key}>
                      <td> {user.key} </td>
                      <td>{user.name}</td>
                      <td>{user.userId}</td>
                      <td>{user.userName}</td>
                      <td> <Link to={`/showRetailer/${user.key}`} className="btn btn-secondary">View</Link> </td>
                    </tr>
                  )
                })
              }
                </tbody>):
                (<tbody>
                {this.state.filtered.map(user => {
                  return (
                    <tr key={user.key}>
                      <td> {user.key} </td>
                      <td>{user.name}</td>
                      <td>{user.userId}</td>
                      <td>{user.userName}</td>
                      <td> <Link to={`/showRetailer/${user.key}`} className="btn btn-secondary">View</Link> </td>
                    </tr>
                  )
                })
              }
                </tbody>)}
                
              </table>
            </div>
        }
        <Paginationonsearch
          showPerPage={this.state.showPerPage}
          onPaginationChange={this.onPaginationChange.bind(this)}
          total={this.state.filtered.length} />

      </div>

    );
  }
}


export default ListUsers;