import React from 'react'
import {StyleSheet,Text,TextInput,View,ScrollView,Image,ToastAndroid,
  Alert,TouchableOpacity,Modal} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen'
  import firebase from 'react-native-firebase'

  //custom component
  import ValidationComponent from 'react-native-form-validator'
  import Loader from '../../components/loader'


  class Register extends ValidationComponent{

    constructor(props){
        super(props)
        this.state={
          email:'',
          password:'',
          name:'',
          phone:'',
          clear_err:true,
          isloading:false
          
        }
      }

    componentDidMount(){
        loc(this)
    }
    componentWillUnmount(){
        rol()
    }

    // check_user_exists=()=>{
    //   const usersref=firebase.firestore().
    // }

    checkerr=(field)=>{

      if(this.isFieldInError(field) && this.getErrorsInField(field).length>0){

          return this.getErrorsInField(field)
          .map((errorMessage,index) => <Text style={styles.err_field}>{errorMessage}</Text>)
      }
      else{
          return null
      }
    }


    reg=()=> {
      this.setState({clear_err:false})
      this.setState({isloading:true})
      this.validate({
        email: {email: true, required: true},
        name: {required: true,minlength:6,maxlength:30},
        password: {required: true,minlength:6,maxlength:30},
        phone:{required:true,minlength:9,maxlength:10}
      })

      if(this.isFormValid()){
        this.usersref =firebase.firestore().collection('users')
        // console.log(this.pettycashref)
        firebase.auth()
              .createUserWithEmailAndPassword(this.state.email, this.state.password)
              .then((result)=>{ 
                  this.usersref.doc(result.user.uid)
                  .set(
                    {
                      user_id:result.user.uid,
                      displayname:this.state.name,
                      phone:this.state.phone,
                      avatar_url:'https://firebasestorage.googleapis.com/v0/b/m-restaurant.appspot.com/o/blank_avatar3.gif?alt=media&token=e0de6e17-f9ea-47e0-8cec-a02dd913e064'
                    }
                
                
              )})
                  .then((doc)=>{
               
                    console.log(doc)
                    this.setState({isloading:false})

                    ToastAndroid.showWithGravity(
                      'User created succesfully!',
                      ToastAndroid.LONG,
                      ToastAndroid.TOP,
                      )
                    this.props.navigation.navigate('login')
                  

                  }).catch((error)=>{
                    console.log(error)
                  })
      }

      else {
        this.setState({isloading:false})
        Alert.alert('Error in form fields!')
      }

    }

  

    render(){
        return(
            <View style={styles.container}>
            <Loader
          isloading={this.state.isloading} />
                <View style={styles.holder}>
            <View style={styles.sub_container}>

                    
                    
                <ScrollView style={styles.fields} >
                  <View style={{alignItems:'center',marginBottom:hp('4%')}}>
                  <Image
                            source={ require('../../../assets/icon.png')}
                            style={styles.image_icon}
                        />
                  </View>
                 

                    <TextInput 
                       style = {styles.input}   
                        ref="email"
                        returnKeyType="go" 
                        placeholder='email' 
                        keyboardType='default'
                        value={this.state.email}
                        placeholderTextColor='#7E807F' 
                        onFocus={()=>this.setState({clear_err:true})} 
                        onChangeText={(email) => this.setState({email})}


                        />
                  {this.state.clear_err ? null :
                 <Text>{this.checkerr('email')}</Text> }
 

                    <TextInput 
                        style = {styles.input}   
                        ref="password"
                        returnKeyType="go" 
                        placeholder='password' 
                        secureTextEntry={true}
                        keyboardType='default'
                        value={this.state.password}
                        placeholderTextColor='#7E807F' 
                        onFocus={()=>this.setState({clear_err:true})} 

                        onChangeText={(password) => this.setState({password})}
                        />

                {this.state.clear_err ? null :
                    <Text>{this.checkerr('password')}</Text> }

                    <TextInput 
                    style = {styles.input}   
                        ref="name"
                        returnKeyType="go" 
                        placeholder='username' 
                        keyboardType='default'
                        value={this.state.name}
                        placeholderTextColor='#7E807F' 
                        onFocus={()=>this.setState({clear_err:true})} 

                        onChangeText={(name) => this.setState({name})}
                        />

                  {this.state.clear_err ? null :
                        <Text>{this.checkerr('name')}</Text> }

                    <TextInput 
                    style = {styles.input}   
                        ref="phone"
                        returnKeyType="go" 
                        placeholder='phone number' 
                        keyboardType='numeric'
                        value={this.state.phone}
                        placeholderTextColor='#7E807F' 
                        onFocus={()=>this.setState({clear_err:true})} 

                        onChangeText={(phone) => this.setState({phone})}
                        />

                      {this.state.clear_err ? null :
                        <Text>{this.checkerr('phone')}</Text> }

                         <TouchableOpacity style={styles.buttonContainer} 
                        onPress={this.reg}
                        >      
                        <Text  style={styles.buttonText}>REGISTER</Text>
                    </TouchableOpacity>
                    </ScrollView>
                   
            </View>
            </View>


            </View>
        )
    }
  }

  export default Register
  
  const styles=StyleSheet.create({
      container:{
          flex:1,
          backgroundColor:'#068A14',
          justifyContent: 'center'


          
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
        marginTop:hp('1%'),
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
        marginBottom:hp('2%')

    }

  })