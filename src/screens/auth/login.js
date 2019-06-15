import React from 'react'
import {StyleSheet,Text,TextInput,View,Alert,ScrollView,TouchableOpacity,Modal,Image} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen'
  import * as AuthActions from '../../redux/Actions/auth'
  import {connect} from 'react-redux'

  //custom components
  import ValidationComponent from 'react-native-form-validator'
  import Loader from '../../components/loader'

  import firebase from 'react-native-firebase'




  class Login extends ValidationComponent{

    constructor(props){
        super(props)
        this.state={
          email:'',
          password:'',
          clear_err:true
          
        }
      }

    componentDidMount(){
        loc(this)
    }
    componentWillUnmount(){
        rol()
    }

    checkerr=(field)=>{

      if(this.isFieldInError(field) && this.getErrorsInField(field).length>0){

          return this.getErrorsInField(field)
          .map((errorMessage,index) => <Text style={styles.err_field}>{errorMessage}</Text>)
      }
      else{
          return null
      }
    }

    login = async ()=>{
      this.setState({clear_err:false})

      this.validate({
        email: {email: true, required: true},
        password: {required: true}
      })
      if(this.isFormValid()){

      await  this.props.loginUser(this.state.email,this.state.password)


          global.User= this.props.AuthUser
        this.props.navigation.navigate('main')
        

     
        // if (this.props.Authenticated){
        
      // }
    }
      else {
        Alert.alert('Errors on form!')
      }

      
    }

    render(){
        return(
            <View style={styles.container}>
            <Loader isloading={this.props.Fetching}/>
                <View style={styles.holder}>
            <View style={styles.sub_container}>

                    
                    
                <ScrollView style={styles.fields} >
                  <View style={{alignItems:'center',marginBottom:hp('7%')}}>
                  <Image
                            source={ require('../../../assets/icon.png')}
                            style={styles.image_icon}
                        />
                  </View>
                 

                    <TextInput 
                       style = {styles.input}   
                        ref="email"
                        returnKeyType="go" 
                        placeholder='your email' 
                        keyboardType='email-address'
                        value={this.state.email}
                        placeholderTextColor='#7E807F' 
                        onFocus={()=> this.setState({clear_err:true})}
                        onChangeText={(email) => this.setState({email})}
                        />
                          {this.state.clear_err ? null :
                 <Text>{this.checkerr('email')}</Text> }
 
 

                    <TextInput 
                        style = {styles.input}   
                        ref="password"
                        returnKeyType="go" 
                        placeholder='your password' 
                        secureTextEntry={true}
                        keyboardType='default'
                        value={this.state.password}
                        onFocus={()=> this.setState({clear_err:true})}
                        placeholderTextColor='#7E807F' 
                        onChangeText={(password) => this.setState({password})}
                        />

                  {this.state.clear_err ? null :
                                  <Text>{this.checkerr('password')}</Text> }
                  
                   

                         <TouchableOpacity style={styles.buttonContainer} 
                    onPress={this.login}
                    >      
                        <Text  style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>

                    <Text style={{color:'#fff',marginTop:hp('4%')}}> Not Registered? <Text style={styles.link_text}
                        onPress={() => this.props.navigation.navigate('register')}>
                    click here to register
                    </Text>
                    </Text>
                    </ScrollView>
                   
            </View>
            </View>


            </View>
        )
    }
  }

  const usersref= firebase.firestore().collection('users')

  const mapStateToProps = (state) =>{

    return{
      Fetching:state.Auth.isFetching,
      AuthUser:state.Auth.user
      // Authenticated:state.Auth.loggedIn
    }

  }

  const mapDispatchToProps=(dispatch) =>{

    return {
      loginUser:async (email,pass) => {
        dispatch(AuthActions.loginStart())
        
       await firebase.auth()
        .signInWithEmailAndPassword(email,pass)
        .then( async(AuthUser)=>{ 
                await usersref.doc(AuthUser.user.uid).get() 
          .then( async(doc)=>{
             await  dispatch(AuthActions.loginFinished(doc._data))
              // this.props.navigation.navigate('main')
            }).catch((error)=>console.log(error))
        })
    .catch ((error) =>{
      dispatch(AuthActions.loginError(error));
    })
      }
    }
      
  }

  export default connect(mapStateToProps,mapDispatchToProps)(Login)
  
  const styles=StyleSheet.create({
      container:{
          flex:1,
          backgroundColor:'#068A14',

          // alignItems:'center',
          justifyContent: 'center'

      },
      link_text:{
        color: 'blue',
        fontSize:13 ,
        textDecorationLine: 'underline'  
       },
      drawerHeader: {
        flex:0,
        backgroundColor: '#F56006',
        paddingTop: hp('4%'),
        zIndex:1
      },
      title:{
        fontSize:20,
        color:'#fff',
        left:wp('2%'),
        top:hp('-2%'),
        zIndex:2
    },
      image_icon:{
        marginTop: hp('2%'),
    
        width:wp('30%'), 
        height:hp('15%') ,
        borderRadius:wp('18%'),
    
      },
      err_field:{
        marginBottom:hp('2%'),
        color:'#F30C0C'
    },
      holder:{
        alignItems:'center',
        justifyContent: 'center'

    },
    sub_container:{
        // flex:1,
        paddingLeft:wp('-10%'),
        marginTop: hp('2%'),
        borderRadius:hp('1%'),
        backgroundColor:'#068A14',
        alignItems: 'center',
        width:wp('90%'),
        height:hp('80%'),
        
        // left:wp('0%')
    
    },
      buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical:hp('1.6%'),
        width:wp('65%'),
        marginBottom:hp('4%'),
        marginTop:hp('4%')
       },
       uploadbtn:{
        backgroundColor: '#2980b6',
        paddingVertical:hp('1.6%'),
        marginBottom:hp('3%'),
        width:wp('35%'),
        // left:wp('7%')
    
       },
       buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
       },
    fields:{
        flex:1,
        marginTop:hp('2%'),
      
        // alignItems:'flex-start'
    },
    input:{
        height:hp('6%'),
        width:wp('70%'),
        backgroundColor: '#DBDFDC',
        borderRadius: 2,
        color: '#2B332F',
        marginBottom:hp('3%')
    }

  })