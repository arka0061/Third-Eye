import React  from 'react';
import { NavLink} from 'react-router-dom';
const LogoutLinks = () =>{
return(    
  
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
      <li className="nav-item ">
        <NavLink className="nav-link" exact to="/">Home <span className="sr-only">(current)</span></NavLink>
      </li>
      </ul>


<ul className="navbar-nav nav-right">
          <li className="nav-item">
        <NavLink className="nav-link" exact to="/login">Login</NavLink>
          </li>
          </ul>
  </div>
);}
export default LogoutLinks;