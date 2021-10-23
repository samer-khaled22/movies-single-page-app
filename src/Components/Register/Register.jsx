import axios from 'axios';
import React, { useState } from 'react'


function Register(props) {
const [user, setuser] = useState({first_name:"" , last_name:"" , email:"" , password:""})
const [error, seterror] = useState("")
const [loading, setloading] = useState(false)


function getUserData(e){
setuser({...user , [e.target.name]:e.target.value})
}

async function sendData(e){
e.preventDefault()
setloading(true)
let {data} = await axios.post(`https://route-egypt-api.herokuapp.com/signup` , user);
if(data.message === "success"){
props.history.replace("/login")}
else if (data.message === "citizen validation failed: email: Path `email` is required., password: Path `password` is required.")
{seterror(<div className="alertBox text-center rounded py-2 mt-2">Email and password are required</div>)}
else{seterror(<div className="alertBox text-center rounded py-2 mt-2">Email already registered</div>)}
setloading(false)

}

return (
<>
<div className="container">
    <form onSubmit={sendData}>
    <h6 className="mt-5">First Name:</h6>
    <input onInput={getUserData} type="text" name="first_name" className="form-control" placeholder="Enter your first name"/>
    <h6 className="mt-3">Last Name:</h6>
    <input onInput={getUserData} type="text" name="last_name" className="form-control" placeholder="Enter your last name"/>
    <h6 className="mt-3">Email:</h6>
    <input onInput={getUserData} type="email" name="email" className="form-control" placeholder="Enter your email"/>
    <h6 className="mt-3">Password:</h6>
    <input onInput={getUserData} type="password" name="password" className="form-control" placeholder="Enter your password"/>
    {error}
    <div className="d-flex">
   <button className="btn btn-outline-info mt-4 font-weight-bold" type="submit">Register</button>
    {loading ? <div className="mt-4 ml-3"><i className="color-info fas fa-spinner fa-spin fa-2x"></i></div> : "" }
   </div>
</form>   
</div>
</>
)
}

export default Register
