import React, { Component } from 'react'
import AddPackages from './addPackage'

class Packages extends Component {
  render() {
    return (
      <div className="package container">
        <AddPackages />
      </div>
    );
  }
}
export default Packages