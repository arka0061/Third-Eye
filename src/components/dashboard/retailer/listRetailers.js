import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Link } from 'react-router-dom'
import Paginationonretailers from './Paginationonretailers'

class ListRetailers extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('retailersList');
    this.unsubscribe = null;
    this.state = {
      users: [],
      search: '',
      filtered:[],
      trigger:true,
      showPerPage: 7,
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
    console.log(this.state.Pagination.start, this.state.Pagination.end)
  }

  onCollectionUpdate = (querySnapshot) => {
    const users = [];
    querySnapshot.forEach((doc) => {
      const { name, imageUrls, profilrUrl, userName, gst, retailerId, userId, address, phone, location } = doc.data();
      users.push({
        key: doc.id,
        imageUrls,
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
      users,
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
  }

  getitem=()=>
  {
    this.unsubscribe = this.ref.orderBy("name", "asc").onSnapshot(this.onCollectionUpdate);
  }

 

  render() {
    const trigger=this.state.trigger
     const { search } = this.state;
       this.state.filtered = this.state.users.filter(user => {
      return user.userName.toString().toLowerCase().indexOf(search.toString().toLowerCase()) !== -1;

    });
    console.log(this.state.filtered,"from component");
   console.log(this.state.filtered,"from render");
   
    return (
      <div  > <br />

        <div className="form-group"> <label htmlFor="exampleInputEmail1">Place your text  </label>

          <input id="search" type="text" className="form-control" placeholder="Search .."
            name="search"
            value={this.state.search}
            onChange={this.updateSearch} />
          <br /></div>

        <h1> List Of Retailers</h1>
        <br />

        <table className="table table-striped table-sm">
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
          {this.getitem()}
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
        <Paginationonretailers
        showPerPage={this.state.showPerPage}
        onPaginationChange={this.onPaginationChange.bind(this)}
        total={this.state.filtered.length} />
      </div>

    );
  }
}

export default ListRetailers;