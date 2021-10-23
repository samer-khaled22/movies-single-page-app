import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import { reducer } from "./Reducer";

const token = localStorage.getItem("token");

let middleware = [thunk]
let initialState = {itemDet:"" , userToken:token , favDet:""}


// console.log(initialState.userToken);


export let store = createStore(reducer , initialState , applyMiddleware(...middleware))

