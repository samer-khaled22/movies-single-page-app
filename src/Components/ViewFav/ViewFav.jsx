import axios from 'axios';
import React, { useEffect , useState } from 'react'
import { connect } from 'react-redux'
import style from "./ViewFav.module.css"

function ViewFav(props) {

const movieId = props.favDet.movieID;
const [poster_path, setposter_path] = useState("")
const [original_title, setoriginal_title] = useState("")
const [tagline, settagline] = useState("")
const [vote_average, setvote_average] = useState("")
const [vote_count, setvote_count] = useState("")
const [release_date, setrelease_date] = useState("")
const [overview, setoverview] = useState("")
const [genres, setgenres] = useState([])


async function view(){
let {data} = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=fd8809b2b50ab2e7a7dc7c9937cbc68d`);
setposter_path(data.poster_path)
setoriginal_title(data.original_title)
settagline(data.tagline)
setvote_average(data.vote_average)
setvote_count(data.vote_count)
setrelease_date(data.release_date)
setoverview(data.overview)
setgenres(data.genres)
}


useEffect(() => {
    view()
    window.scrollTo({top:85, behavior:"smooth"})
}, [])


return (
<>
<div className="container my-5">
<div className="row">
<div className="col-md-5">
<div className={style.poster}>
<img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="movie poster"/>
</div>
</div>
<div className="col-md-6">
<div className="details ml-2">
<h2>{original_title}</h2> <br />
<p>{tagline}</p> <br />
<h5>Vote : {vote_average}</h5> <br />
<h5>Vote Count : {vote_count}</h5> <br />
<h5>Release Date : {release_date}</h5> <br />
<p>{overview}</p>
<div className={`${style.genres} d-flex`}>

{genres.map((value,index)=>{
return (
<h6 key={index}>{value.name}</h6>)})}

</div>
</div>
</div>
</div>
</div>
</>
    )
}

function mapStateToProps(state){
    return{favDet:state.favDet}
}

export default connect (mapStateToProps, null) (ViewFav)
