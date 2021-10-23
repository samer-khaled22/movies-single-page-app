import React from 'react'
import {Switch , Route, Redirect} from "react-router-dom"
import Home from './Components/Home/Home'
import MovieDetails from './Components/MovieDetails/MovieDetails'
import Movies from './Components/Movies/Movies'
import Navbar from './Components/Navbar/Navbar'
import Tv from './Components/Tv/Tv'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import Favorites from './Components/Favorites/Favorites'
import ViewFav from './Components/ViewFav/ViewFav'
import NotFound from './Components/NotFound/NotFound'


function App() {
  
  return (
    <>

      <Navbar/>
      <Switch>
         <Route path="/movies" component={Movies}/>
         <Route path="/home" component={Home}/>
         <Route path="/tv" component={Tv}/>
         <Route path="/register" component={Register}/>
         <Route path="/login"  component={Login}/>
         <Route path="/favorites" component={Favorites}/>
         <Route path="/moviedetails" component={MovieDetails} />
         <Route path="/viewfav" component={ViewFav}/>
         <Redirect exact from="/" to="/home" />
         <Route path="*" component={NotFound}/>
      </Switch>

    </>
  )
}

export default App
