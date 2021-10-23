import React from 'react'
import { connect } from 'react-redux'
import GuestNavbar from '../GuestNavbar/GuestNavbar'
import UserNavbar from '../UserNavbar/UserNavbar'



function Navbar(props) {

  if (props.userToken=="") {
    return <GuestNavbar/>;
  }
  return <UserNavbar/>;
}


function mapStateToProps(state){
    return {userToken:state.userToken}
}

export default connect (mapStateToProps, null)(Navbar)