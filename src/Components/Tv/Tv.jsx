import React, {useState , useEffect} from 'react'
import { connect } from 'react-redux'
import style from "./Tv.module.css"
import axios from 'axios';
import {Link} from "react-router-dom"
import { getItem } from '../../Redux/Actions';


function Tv(props) {
  const [tv, settv] = useState([]);
  const [trending, settrending] = useState("week");
  const [trendBtn, settrendBtn] = useState("Trending today");
  const [trendHeader, settrendHeader] = useState("This Week");
  const [pageNum, setpageNum] = useState(1);
  const [firstPage, setfirstPage] = useState("");
  const [searchTerm, setsearchTerm] = useState("");


  async function getTv(){
    if(searchTerm===""){
     let {data} = await axios (`https://api.themoviedb.org/3/trending/tv/${trending}?api_key=fd8809b2b50ab2e7a7dc7c9937cbc68d&page=${pageNum}`);
    settv(data.results)
    }else{
    let {data} = await axios (`https://api.themoviedb.org/3/search/tv?api_key=fd8809b2b50ab2e7a7dc7c9937cbc68d&query=${searchTerm}`);
    settv(data.results)
    }
    }

    useEffect(()=>{
     getTv()
    },[trending , pageNum , searchTerm , firstPage])
  

    function changeTrend(){
    if (trending === "week" && trendBtn === "Trending today" && trendHeader==="This Week"){
    settrending("day");
    settrendBtn("Trending this week");
    settrendHeader("Today")   
          }else{
           settrending("week");
           settrendBtn("Trending today");
           settrendHeader("This Week")       
          } 
        }

        function moreTv(){
            setpageNum(pageNum+1);
            window.scrollTo({top:300, behavior:"smooth"})
            firstPageBtn()
        } 
        
        function firstPageBtn(){
            if(pageNum >= 1) {
                setfirstPage(<button onClick={first} className="btn btn-outline-info px-5 mr-3">First Page</button>)
            }
            }
        
        function first(){
     setpageNum(1);
     window.scrollTo({top:300, behavior:"smooth"});    
    }

    
 return (
    <>
<div className={`${style.search} container-fluid text-center `}>
    <div className={`${style.layer} d-flex flex-column align-items-center justify-content-center`}>
    <h2 className={style.topSearch}>Searching for a Tv show?</h2><br />
    <input className={`${style.searchInp} w-50`} onInput={(e)=>{setsearchTerm(e.target.value)}} placeholder="  Search here...." type="text" />
</div>
</div>
    <div className="container mb-3">
<div className="row">
<div className="col-md-12 mb-3">
    <div className={`${style.title} text-center`}>
    <h2 className={style.header}>Trending Tv Shows {trendHeader} </h2> 
    <span className={style.trendSpan}>Or Check</span>
    <button onClick={changeTrend} className="btn btn-outline-info my-3">{trendBtn}</button>
 </div>
</div>
{tv.map((value,index)=>{
return(
    <div key={index} className="col-md-3 mb-4">
    <Link to={{pathname: `/moviedetails`,state: {type:"tv"}}} onClick={()=>props.getItem(value)} >
    <div className={style.item} >
    <img src={`https://image.tmdb.org/t/p/w500${value.poster_path}`} alt="tv show poster" className="w-100" />
    <h6 className="pt-2 text-center font-weight-bold">{value.name} {value.title}</h6>
    <div className={style.desc}>
    <p>{value.overview.split(" " , 25).join(" ")}...</p>
    </div>
    <span className={style.vote}>{value.vote_average}</span>
    </div>
    </Link>
    </div>
)
})}
</div>
<div className="d-flex justify-content-center pb-5">
    {firstPage}
    <button onClick={moreTv} className="btn btn-outline-info px-5">More tv shows</button>
</div>
</div>
    </>
    )
    }

function mapStateToProps(state){
return {demo:state.demo}
}


export default connect(mapStateToProps,{getItem})(Tv)

