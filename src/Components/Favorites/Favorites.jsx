import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useState , useEffect} from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFav } from '../../Redux/Actions';

 function Favorites(props) {

const [favs, setfavs] = useState([])
const [loading, setloading] = useState(false)

async function viewFavs(){
    setloading(true)
    let token = localStorage.getItem("token");
    let userId = jwtDecode(token)._id;
    let {data} = await axios.get(`https://route-egypt-api.herokuapp.com/getFavorites` , {
    headers:{"token" : token , "userID" : userId}})
    if (data.Favorites.length === 0){
    setfavs([]) ; return false }else{setfavs(data.Favorites) ; setloading(false)
    }
    }


useEffect(() => {
viewFavs()
}, [])

if(viewFavs == false){return(<>
<div className="empty">
<h2>You don't have any favorites to show yet</h2>
</div>
</>)}

else 

return (
<>
<div className="d-flex justify-content-center">
{loading ? <i className="mt-5 color-info fas fa-spinner fa-spin fa-3x"></i> : "" }
</div>
<div className="container my-5">
<div className="row">
{favs.map((value , index)=>{
return (
<div key={index} className="col-md-3 mb-4">
<Link to="/viewfav" onClick={()=>props.getFav(value)}>
<div className="item">
<img src={value.imgUrl} className="w-100 rounded" alt="movie poster"/>
<h5 className="text-center">{value.movieName}</h5>
</div>
</Link>
</div>
)
})}
</div>
</div>
</>
)
}

function mapStateToProps(state){
    return{favDet:state.favDet}
}

export default connect (mapStateToProps , {getFav}) (Favorites)
