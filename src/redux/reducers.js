

import {combineReducers} from 'redux'
import { Switch } from 'native-base';

const AuthinitialState = {
    loggedIn: false,
    isFetching: false,
    hasError: false,
    errorMessage: '',
    user: null
  }



const cartItems=(state = [] ,action)=>{
    switch(action.type)
    {
        case 'ADD_TO_CART':
        const p_index = state.findIndex(product_p => product_p.itemId == action.payload.itemId)

        // product not in cart 
        if(p_index  === -1){

            return [...state,action.payload]
            // return {incart:incart.concat(action.payload)}
        }


                //item already exists in cart
        else {
                return state.map(item=>{
                        if(item.itemId === action.payload.itemId){

                            item={...item, itemqty:item.itemqty +1 }
                        }

                        return item



                })
            
        
        }
        
        case 'REMOVE_FROM_CART':

        return state.filter((cartItem) =>{
            return cartItem.itemId  != action.payload
        })

        case 'ADD_QUANTITY':


              return state.map( i_item => {
        if (i_item.itemId=== action.payload.itemId) {
          i_item = { ...i_item, itemqty: i_item.itemqty +1 }
        
        }
        return i_item
      })
      

        case 'DECREASE_QUANTITY':
            let itemX=state.find(item_t => item_t.itemId == action.payload.itemId)

            let indexT=state.indexOf(itemX)
                // console.log(state[indexT])
            if(state[indexT].itemqty ==1){
                return state.filter((Item) =>{
                    return Item.itemId  != action.payload.itemId
                })
            }

                 return state.map( r_item => {
                        if (r_item.itemId=== action.payload.itemId) {

                           
                        r_item = { ...r_item, itemqty: r_item.itemqty - 1 }
                        
                        }
                        return r_item
                    })

                    default:
                            return state
                     
       
            }

  
}



const Favorites=(state = [] ,action)=>{
    switch(action.type){
        case 'ADD_TO_FAVORITES':

            return [...state,action.payload]

        // return {favorites:favorites.concat(action.payload)}


        case 'REMOVE_FROM_FAVORITES':

        return state.filter((favItem)=>{

            return favItem.id != action.payload
        })

        default:
                return state
         
             }


}

const Auth=(state=AuthinitialState,action) =>{
    switch(action.type){
        case 'LOGIN_START': {
            return {
              ...state,
              isFetching: true
            };
          }
          case 'LOGIN_FINISHED': {
            const { user } = action
            return {
              ...state,
              user,
              loggedIn: true,
              isFetching: false
            };
          }
          case 'LOGIN_ERROR': {
            const { error } = action
            return {
              ...state,
              isFetching: false,
              loggedIn: false,
              hasError: true,
              user: null,
              errorMessage: error
            };
          }
          case 'LOGOUT_START': {
            return {
              ...state,
              isFetching: true
            }
          }
          case 'LOGOUT_FINISHED': {
            return {
              ...state,
              loggedIn: false,
              isFetching: false,
              hasError: false,
              errorMessage: '',
              user: null
            }
          }
          case 'LOGOUT_ERROR': {
            const { error } = action
            return {
              ...state,
              isFetching: false,
              loggedIn:true,
              hasError: true,
              errorMessage: error,
              
            }
          }
          default: {
            return state
          }
    }
}



const Rootreducer= combineReducers({

    cartItems,
    Favorites,
    Auth

})

export default Rootreducer