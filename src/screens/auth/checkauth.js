import React, {Component} from 'react'
import { connect } from "react-redux"

//custom components

// import Loader from '../../components/loader'

 class CheckAuth extends Component{


    componentDidMount(){
       this.nav_status()
    }

    nav_status=()=>{

        if(this.props.Authenticated ){
            
            global.User= this.props.AuthUser
            global.fav=this.props.favItems
            return   this.props.navigation.navigate('main' )

        }
        else{

            return   this.props.navigation.navigate('auth')

        }

 
    }

    render(){
        return null

        
        
    }
   
}

const mapStateToProps= (state) =>{
    return{
        Authenticated:state.Auth.loggedIn,
        AuthUser:state.Auth.user,  
        favItems:state.Favorites


    }
}

export default connect(mapStateToProps)(CheckAuth)
