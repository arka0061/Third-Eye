import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
class PackageDetail extends Component{
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('packages').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          user: doc.data(),
          key: doc.id
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id , uid){
    firebase.firestore().collection('packages').doc(id).delete().then(() => {
     this.props.history.push("/packages")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });

if(uid){

  firebase.firestore().collection('users').doc(uid).collection('assignedpackages').doc(id).delete().then(() => {
  
    console.error("removed from package and users");
    this.props.history.push("/packages")
   }).catch((error) => {
     console.error("Error removing document: ", error);
   });
}    
 
 
  }

render(){

  return (
    
    <div className = "container">
    <br/>
    <div className="card" styles="width: 18rem;">
    <div className="card-body">
<h5 className="card-title">{this.state.user.name} </h5>
      {this.state.user.userId ? <h6 className="card-subtitle mb-2 text-muted">{this.state.user.userId} </h6> : null}
      {this.state.user.email ? <h6 className="card-subtitle mb-2 text-muted">{this.state.user.email} </h6> : null}
      
  <button onClick={this.props.history.goBack} className="btn btn-secondary">Back</button> &nbsp;&nbsp;
          <button onClick={this.delete.bind(this, this.state.key ,this.state.user.userId)} className="btn btn-danger">Delete</button>
         
            </div>
            </div>
  </div>
 );

}
}
export default PackageDetail;
