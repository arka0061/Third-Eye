import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Link } from 'react-router-dom'
import Paginationusers from './Paginationusers';

class ListUsers extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('users');
    this.updateSearch = this.updateSearch.bind(this)

    this.unsubscribe = null;
    this.state = {
      users: [],
      search: '',
      trigger:true,
      filtered: [],
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

  }


  onCollectionUpdate = (querySnapshot) => {
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
  getitem = () => {
    this.unsubscribe = this.ref.orderBy("name", "asc").onSnapshot(this.onCollectionUpdate);

   
  }
  



  render() {
    const trigger=this.state.trigger
    const { search } = this.state;
    this.state.filtered = this.state.users.filter(user => {
     return user.name.toString().toLowerCase().indexOf(search.toString().toLowerCase()) !== -1;

   });

    return (
      <div  >
        <br />
        <div className="form-group"> <label htmlFor="exampleInputEmail1">Place your text  </label>

          <input id="search" type="text" className="form-control" placeholder="Search .." 
            name="search"
            value={this.state.search}
            onChange={this.updateSearch} />
          <br /></div>

        <h1> List Of Users</h1>
        <br />

        <table className="table table-striped table-sm">
          <thead className="table-striped">
            <tr>
              <th> User Id </th>
              <th>User Name</th>
              <th>User Email</th>

              <th>Detail</th>
            </tr>
          </thead>
          {trigger ? (
          <tbody>
          {this.getitem()}
          
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
         ( <tbody>
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
        <Paginationusers
          showPerPage={this.state.showPerPage}
          onPaginationChange={this.onPaginationChange.bind(this)}
          total={this.state.filtered.length} />

      </div>

    );
  }
}

export default ListUsers;