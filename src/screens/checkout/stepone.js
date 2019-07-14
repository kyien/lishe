
import React, {PureComponent } from 'react'

import {StyleSheet,Text,TextInput,View,ScrollView,FlatList,TouchableOpacity} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen'
  
  import  ActionBar from '../../components/actionbar'


  class StepOne extends  PureComponent{

        componentDidMount(){
            loc(this)
        }
        componentWillMount(){
            rol()
        }
     

        render(){

            const {values,handlechange}=this.props
            return(

                <View style={styles.container}>

                <ActionBar navigation={this.props.navigation} title={'Customer Details'} icon={true}/>
                     <ScrollView style={styles.fields} >
              <View style={{flexDirection:'row',justifyContent:'space-around',marginBottom:hp('2%')}}>
                  <View >
                    <Text>Name:</Text>
                    <TextInput 
                       style = {styles.input}   
                        returnKeyType="go" 
                        placeholder='your name' 
                        keyboardType='email-address'
                        value={values.name}
                        placeholderTextColor='#7E807F' 
                        // onFocus={()=> this.setState({clear_err:true})}
                        onChange={(name)=>handlechange('name',name)}
                        />
                          {/* {this.state.clear_err ? null :
                 <Text>{this.checkerr('email')}</Text> }
  */}
                    </View>
                <View>
                    <Text>email:</Text>
                    <TextInput 
                        style = {styles.input}  
                        returnKeyType="go" 
                        placeholder='your email' 
                        keyboardType='default'
                        value={values.email}
                        placeholderTextColor='#7E807F' 
                        onChangeText={(email)=>handlechange('email',email)}
                        />
                  </View>
                
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-around',marginBottom:hp('2%')}}>
                        <Text>mobile number:</Text>
                    <TextInput 
                        style = {styles.cust_input}  
                        returnKeyType="go" 
                        placeholder='+254 xxxxxxxxx' 
                        keyboardType='default'
                        value={values.phone}
                        placeholderTextColor='#7E807F' 
                        onChange={(phone) =>handlechange('phone',phone)}
                        />
                        </View>
                        
                       
                        <View style={{flexDirection:'row',justifyContent:'space-around',marginBottom:hp('2%')}}>
                        <View>
                        <Text>Location:</Text>
                        <TextInput 
                            style = {styles.input}  
                            returnKeyType="go" 
                            placeholder='+254 xxxxxxxxx' 
                            secureTextEntry={true}
                            keyboardType='default'
                            placeholderTextColor='#7E807F' 
                            onChange={(location) =>handlechange('location',location)}
                            />
                            </View>
                        <View>
                        <Text>Street:</Text>
                        <TextInput 
                            style = {styles.input}  
                            returnKeyType="go" 
                            placeholder='+254 xxxxxxxxx' 
                            secureTextEntry={true}
                            keyboardType='default'
                            placeholderTextColor='#7E807F' 
                            onChange={(street) =>handlechange('street',street)}
                            />
                            </View>
                        </View>

                        <View style={{flexDirection:'row',justifyContent:'space-around',marginBottom:hp('2%')}}>
                        <View>
                        <Text>Address:</Text>
                        <TextInput 
                            style = {styles.input}  
                            returnKeyType="go" 
                            placeholder='+254 xxxxxxxxx' 
                            secureTextEntry={true}
                            keyboardType='default'
                            placeholderTextColor='#7E807F' 
                            onChange={(address) =>handlechange('address',address)}
                            />
                            </View>
                        <View>
                        <Text>Postal/Zip  Code:</Text>
                        <TextInput 
                            style = {styles.input}  
                            returnKeyType="go" 
                            placeholder='+254 xxxxxxxxx' 
                            secureTextEntry={true}
                            keyboardType='default'
                            placeholderTextColor='#7E807F' 
                            onChange={(postal_code) =>handlechange('postal_code',postal_code)}
                            />
                            </View>
                        </View>
                        

                        <View style={{alignItems:'center'}}>

                         <TouchableOpacity style={styles.buttonContainer} 
                    onPress={this.props.nextstep}
                    >      
                        <Text  style={styles.buttonText}>NEXT</Text>
                    </TouchableOpacity>

                    </View>
                    </ScrollView>
                </View>
            )
        }


  }

  export default StepOne
  const styles=StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#fff',

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
      width:wp('35%'),
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
      marginTop:hp('5%'),
    
      // alignItems:'flex-start'
  },
  input:{
      height:hp('6%'),
      width:wp('45%'),
      backgroundColor: '#DBDFDC',
      borderRadius: 2,
      color: '#2B332F',
      marginBottom:hp('3%')
  },
  cust_input:{
    height:hp('6%'),
      width:wp('55%'),
      backgroundColor: '#DBDFDC',
      borderRadius: 2,
      color: '#2B332F',
      marginBottom:hp('3%')
  }
 })