import React, {Component} from 'react'
import { connect } from "react-redux"

//custom components

// import Loader from '../../components/loader'

 class CheckAuth extends Component{


    componentDidMount(){
       this.nav_status()
    }

    nav_status=()=>{

        return   this.props.navigation.navigate(this.props.Authenticated ? 'main' : 'auth')
 
    }

    render(){
        return null

        
        
    }
   
}

const mapStateToProps= (state) =>{
    return{
        Authenticated:state.Auth.loggedIn
    }
}

export default connect(mapStateToProps)(CheckAuth)
