export function reducer(prevState , action){
    if(action.type ==="ITEM"){
        return{...prevState,itemDet:prevState.itemDet=action.payload}
    }else if(action.type === "FAV"){
        return{...prevState,favDet:prevState.favDet=action.payload}
    }else if(action.type === "TOKEN"){
        return{...prevState,userToken:prevState.userToken=action.payload}
    }
        return prevState
    }

