
export function getItem(item){
    return (dispatch)=>dispatch({type:"ITEM", payload:item})
} 

export function getFav(fav){
    return (dispatch)=>dispatch({type:"FAV" , payload:fav})
}

export function getToken(token){
    return (dispatch)=>dispatch({type:"TOKEN" , payload:token})
}


