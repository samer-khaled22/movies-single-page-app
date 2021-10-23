import { connect } from 'react-redux'
import axios from 'axios'
import style from "./Home.module.css"
import {Link} from "react-router-dom"
import React ,{useEffect , useState} from 'react'
import { getItem } from '../../Redux/Actions.js'


function Home(props) {
  const [movies, setmovies] = useState([]);
  const [tv, settv] = useState([]);

  async function getMovies(){
    let {data} = await axios (`https://api.themoviedb.org/3/trending/movie/week?api_key=fd8809b2b50ab2e7a7dc7c9937cbc68d`);
    setmovies(data.results)
    }

 async function getTv(){
    let {data} = await axios (`https://api.themoviedb.org/3/trending/tv/week?api_key=fd8809b2b50ab2e7a7dc7c9937cbc68d`);
    settv(data.results)
    }
 

   useEffect(()=>{
       getMovies()
       getTv() 
   },[])


    return (
<>
<div className="container my-5">
<div className="row">
<div className="col-md-4">
    <div className="title  mt-4">
    <h1 className="pt-2 pl-3 ml-5">Trending <br /> Movies <br /> This Week </h1> 
        </div>
</div>
{movies.slice(0,10).map((value,index)=>{
return(
    <div key={index} className="col-md-2 mb-4">
    <Link to="/moviedetails" onClick={()=>props.getItem(value)}>
    <div className={style.item} >
    <img src={`https://image.tmdb.org/t/p/w500${value.poster_path}`} alt="movie poster" className="w-100" />
    <h6 className="pt-2 text-center font-weight-bold">{value.name} {value.title}</h6>
    <div className={style.desc}>
    <p className="text-center">{value.overview.split(" " , 25).join(" ")}...</p>
    </div>
    <span className={style.vote}>{value.vote_average}</span>
    </div>
    </Link>
    </div>
)
})}
</div>

<div className="row mt-5 pt-3">
<div className="col-md-4">
    <div className="title mt-4">
    <h1 className="pt-4 pl-3 ml-5">Trending <br /> TV Shows <br /> This Week</h1>
    </div>
</div>
{tv.slice(0,10).map((value,index)=>{
return(
    <div key={index} className="col-md-2 mb-3">
    <Link to="/moviedetails" onClick={()=>props.getItem(value)}>
    <div className={style.item}>
    <img src={`https://image.tmdb.org/t/p/w500${value.poster_path}`} alt="tv show poster" className="w-100" />
    <h6 className="pt-2 text-center font-weight-bold">{value.name} {value.title}</h6>
    <div className={style.desc}>
    <p className="text-center">{value.overview.split(" " , 25).join(" ")} ...</p>
    </div>
    <span className={style.vote}>{value.vote_average}</span>
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
 return {userName:state.userName}   

}

export default connect(mapStateToProps,{getItem})(Home)

