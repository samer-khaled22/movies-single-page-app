import axios from 'axios'
import React , {useState} from 'react'
import { connect } from 'react-redux';




function Login(props) {

const [user, setuser] = useState({email:"" , password:""});
const [error, seterror] = useState("");
const [loading, setloading] = useState(false)

// email doesn't exist
// incorrect password

function refreshPage(){
    window.location.reload();
 }

function getUserData(e){
// console.log(e.target.value);
setuser({...user , [e.target.name]:e.target.value})
}
// console.log(user);

async function sendData(e){
e.preventDefault()
setloading(true)
let {data} = await axios.post(`https://route-egypt-api.herokuapp.com/signin` , user);
if(data.message === "success"){
localStorage.setItem("token",data.token);
props.history.replace("/");
refreshPage()}
else if (data.message === "email doesn't exist")
{seterror(<div className="alertBox text-center rounded py-2 mt-2">This email isn't registered</div>)}
else{seterror(<div className="alertBox text-center rounded py-2 mt-2">Incorrect password</div>)}
// console.log(data.message);
setloading(false)
}
return (
<>
<div className="container mt-5">
    <form onSubmit={sendData}>
    <h6 className="mt-3">Email:</h6>
    <input onInput={getUserData} type="email" name="email" className="form-control" placeholder="Enter your email"/>

    <h6 className="mt-3">Password:</h6>
    <input onInput={getUserData} type="password" name="password" className="form-control" placeholder="Enter your password"/>
    {error}
   <div className="d-flex">
   <button className="btn btn-outline-info mt-4 font-weight-bold" type="submit">Login</button>
    {loading ? <div className="mt-4 ml-3"><i className="color-info fas fa-spinner fa-spin fa-2x"></i></div> : "" }
   </div>
</form>   
</div>
</>
)
}

function mapStateToProps(state){
    return {userToken:state.userToken}
}

export default connect(mapStateToProps, null) (Login)


// <div className="mt-4 ml-3"><i className="color-info fas fa-spinner fa-spin fa-2x"></i></div>