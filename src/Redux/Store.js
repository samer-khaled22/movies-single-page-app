import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import { reducer } from "./Reducer";

let middleware = [thunk]
let initialState = {itemDet:"" , userToken:"" , favDet:""}



export let store = createStore(reducer , initialState , applyMiddleware(...middleware))

