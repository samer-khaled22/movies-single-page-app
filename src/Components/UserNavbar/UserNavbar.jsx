import React, { useState , useEffect} from 'react'
import {NavLink , Link} from "react-router-dom"
import { connect } from 'react-redux'
import jwt_decode from 'jwt-decode'
import { getToken } from '../../Redux/Actions.js'



function UserNavbar(props) {

    const [userName, setuserName] = useState("");

    function refreshPage(){
        window.location.reload();
     }
  
      function getUserName(){
      try {
        jwt_decode(props.userToken)
        setuserName(jwt_decode(props.userToken).first_name)
    } catch (error) {
        localStorage.clear();
        setuserName("")
    }}

    function logout(){
        localStorage.removeItem("token");
        props.getToken("")
    }

     useEffect(()=>{
      getUserName()
    
    },[userName])

return (
<>
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <NavLink className="navbar-brand" to="/">Home</NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      
       <li className="nav-item">
        <NavLink className="nav-link" to="/movies">Movies</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/tv">Tv</NavLink>
      </li>
      <li className="nav-item">
        <Link onClick={logout} className="nav-link" to="/home">Logout</Link>
      </li>
      </ul>
      <ul className="navbar-nav m-auto">
        <li><h5 className="m-0">Welcome : {userName}</h5></li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li><NavLink className="nav-link" to="/favorites" className="navFav">My favorites
        <i className="navFav fas fa-star my-2 ml-2"></i>
        </NavLink>
        </li>
      </ul>
      </div>
</nav>
</>
)
}

function mapStateToProps(state){
    return {userToken:state.userToken}
}

export default connect (mapStateToProps, {getToken})(UserNavbar)