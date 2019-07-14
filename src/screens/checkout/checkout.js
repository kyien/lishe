import React, {PureComponent } from 'react'
import {Text} from 'react-native'
import {connect} from 'react-redux'
import firebase from 'react-native-firebase'

import StepOne from './stepone'
import StepTwo from './steptwo'
import StepTre from './steptre'

class CheckOut extends PureComponent{

    constructor(){
        super()
    this.state ={
        step:1,
        name:'',
        phone:'',
        email:'',
        location:'',
        street:'',
        address:'',
        postal_code:'',
        payment_option:''

    }
   
    }

    initials=()=>{
        this.setState({name:this.props.AuthUser.displayname,
            phone:this.props.AuthUser.phone,
            email:firebase.auth().currentUser.email
        })
    }

    componentWillMount(){
        this.initials()
    }

    componentDidMount(){
        console.log(this.state.phone)
        console.log(this.state.email)
    }

    nextstep = () =>{

        const { step } =this.state
        this.setState({step:step+1})
    }

    prevstep = () =>{

        const { step } =this.state
        this.setState({step:step-1})
    }

    handlechange(fieldname,value){
        this.setState({[fieldname]:value})

    }
    
    submit(){

    }

    render(){
        
        const {step,name,phone,email,location,street,adress,collection_point,postal_code} =this.state
        
        const values={name,phone,email,location,street,adress,collection_point,postal_code}

        switch(step){

            case 1:
                return (
                    <StepOne 
                        nextstep={this.nextstep}
                        handlechange={this.handlechange}
                        values={values}
                        navigation={this.props.navigation}
                    />
                )
            case 2:
                return(

                    <StepTwo 
                        nextstep={this.nextstep}
                        prevstep={this.prevstep}
                        handlechange={this.handlechange}
                        values={values}
                        navigation={this.props.navigation}
                    />

                )
            case 3:
                return(
                    <StepTre 
                      prevstep={this.prevstep}
                        handlechange={this.handlechange}
                        values={values}
                        navigation={this.props.navigation}  
                    />
                )

            default:
                return null


        }


        
    }
}

const mapStateToProps=(state)=>{
    return {
        AuthUser:state.Auth.user
    }

}
export default connect(mapStateToProps)(CheckOut)
