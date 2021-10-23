import axios from 'axios'
import jwtDecode from 'jwt-decode'
import React, {useEffect , useState} from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import style from './MovieDetails.module.css'




function MovieDetails(props) {
    let location = useLocation();
    let currentItem = props.currentItem;
    let theId = currentItem.id;
    const [cast, setcast] = useState([]);
    const [favIcon, setfavIcon] = useState("")
    const [mediaType, setmediaType] = useState(currentItem.media_type)
    const [original_title, setoriginal_title] = useState("");
    const [tagline, settagline] = useState("")
    const [overview, setoverview] = useState("");
    const [vote_average, setvote_average] = useState("");
    const [vote_count, setvote_count] = useState("");
    const [release_date, setrelease_date] = useState("");
    const [poster_path, setposter_path] = useState("")
    const [genres, setgenres] = useState([])
    const [loading, setloading] = useState(false)


    if(mediaType===undefined){setmediaType(location.state.type)}

    async function viewDetails(){
    setloading(true)
    let {data} = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${theId}?api_key=fd8809b2b50ab2e7a7dc7c9937cbc68d`);
    setoriginal_title(data.original_title||data.original_name);
    settagline(data.tagline);
    setoverview(data.overview);
    setvote_average(data.vote_average);
    setvote_count(data.vote_count);
    setrelease_date(data.release_date||data.first_air_date);
    setposter_path(data.poster_path);
    setgenres(data.genres)
    setloading(false)
    }

    async function addFav(){
    let token = localStorage.getItem("token");
    let userId = jwtDecode(token)._id;
    let favItem = {"movieName":currentItem.original_title||currentItem.original_name ,
     "imgUrl":"https://image.tmdb.org/t/p/w500"+currentItem.poster_path , 
    "userID":userId , "movieID":theId , "token":token}
    let {data} = await axios.post(`https://route-egypt-api.herokuapp.com/addToFavorites` , favItem);
    setfavIcon(<i className="favIcon fas fa-star my-2 ml-2 "><span>This movie is marked as favorite</span></i>);
    }

   async function favChecker(){
        let token = localStorage.getItem("token");
        let userId = jwtDecode(token)._id;
        let {data} = await axios.get(`https://route-egypt-api.herokuapp.com/getFavorites` , {
        headers:{"token" : token , "userID" : userId}})
        let favs = data.Favorites;
        if (favs.some(e => e.movieID == theId)) {
         setfavIcon(<i className="favIcon fas fa-star my-2 ml-2 "><span>This movie is marked as favorite</span></i>);
          }else{setfavIcon(<i onClick={addFav} className="favIcon fas fa-star my-2 ml-2 "><span>Add to your favorites</span></i>)}
    }

   async function getCast(){
    let {data} = await  axios.get(`https://api.themoviedb.org/3/${mediaType}/${theId}/credits?api_key=fd8809b2b50ab2e7a7dc7c9937cbc68d`);
    setcast(data.cast)
    console.log(cast);
    }
 
 useEffect(()=>{ 
    if(localStorage.getItem("token") !== null ){
    favChecker()
    }else{setfavIcon("")}
    viewDetails()
    getCast()
    window.scrollTo({top:135, behavior:"smooth"})
    },[])    

return (
<>
<div className="container my-5 py-5">
<div className="row">
    <div className="col-md-5">
        <div className={`${style.movieDet}`}>
            <img className="w-100" src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="movie poster" />
        </div>
        </div>
        <div className="col-md-6">
        <div className={`${style.movieDet} ml-2 `}>
            {favIcon}
            <h2>{original_title}</h2> 
            <p>{tagline}</p> <br />
            <h5>Vote : {vote_average}</h5> <br />
            <h5>Vote count: {vote_count}</h5> <br />
            <div className="d-flex justify-content-center">
            {loading ? <i className="mt-5 color-info fas fa-spinner fa-spin fa-3x"></i> : "" }
            </div> 
            <h5>Release date: {release_date}</h5> <br />
            <p>{overview}</p>
            <div className={`${style.genres} d-flex `}>

            {genres.map((value,index)=>{
            return (
            <h6 key={index}>{value.name}</h6>)})}

            </div>
        </div>
    </div>
</div>
<div className="row mt-5">
{cast.slice(0,8).map((value,index)=>{
return (
<div key={index} className="col-md-2">
<div className="castMember mb-5 bg-white rounded">
<img src={`https://image.tmdb.org/t/p/w500${value.profile_path}`} className="w-100 rounded" alt="cast member photo" />
<h5 className="text-center mt-2 text-dark">{value.name}</h5>
<h6 className="text-center text-dark pb-2">As : {value.character}</h6>
</div>
</div>
)
})}
</div>
</div>
</>
)
}

function mapStateToProps(state){
    return {
        currentItem:state.itemDet,
        }
}



export default connect(mapStateToProps,null)(MovieDetails)


