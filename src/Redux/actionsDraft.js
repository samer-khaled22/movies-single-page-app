// function mapDispatchToProps(dispatch){

//     return {
//         getItem:(item)=>dispatch({type:"ITEM", payload:item}),
//     }
//     }


export function getItem(item){
    return (dispatch)=>dispatch({type:"ITEM", payload:item})
} 

export function getFav(fav){
    return (dispatch)=>dispatch({type:"FAV" , payload:fav})
}



