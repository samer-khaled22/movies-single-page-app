import React, { useState , useEffect} from 'react'
import { connect } from 'react-redux'
import {NavLink} from "react-router-dom"
import jwt_decode from 'jwt-decode'



function Navbar(props) {
  // console.log(props.userToken);
  const [userName, setuserName] = useState("")  
  
      function getUserName(){
      try {
        jwt_decode(props.userToken)
        setuserName(jwt_decode(props.userToken).first_name)
    } catch (error) {
        localStorage.clear();
        setuserName("")
    }}

     useEffect(()=>{
      getUserName()
    
    },[userName])

 


    if(props.userToken===null){
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
      </ul>
      <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <NavLink className="nav-link" to="/register">Register</NavLink>
      </li> 
      <li className="nav-item">
        <NavLink className="nav-link" to="/login">Login</NavLink>
      </li>

      </ul>

      </div>
</nav>
        </>
    )
    }else{
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
      </ul>
      <ul className="navbar-nav ml-auto">
        <li>Welcome : {userName}</li>
      </ul>
      </div>
</nav>
        </>
    )
    }
}

function mapStateToProps(state){
    return {userToken:state.userToken}
}

export default connect (mapStateToProps, null)(Navbar)

  //  useEffect(()=>{
  //     getUserName()
  // },[])

  // Favorite icon <i className="favIcon fas fa-star my-2 ml-2"></i>