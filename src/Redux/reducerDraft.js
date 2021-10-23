export function reducer(prevState , action){
    // console.log(action.payload);
    if(action.type ==="ITEM"){
        return{...prevState,itemDet:prevState.itemDet=action.payload}
    }else if(action.type === "FAV"){
        return{...prevState,favDet:prevState.favDet=action.payload}
    }
        return prevState
    }

