
import React, {PureComponent } from 'react'

import {StyleSheet,Text,TextInput,View,ScrollView,FlatList,Dimensions,TouchableOpacity} from 'react-native'
import {Card,CardItem,Body,Thumbnail} from "native-base"
import {connect} from 'react-redux'
import Icon from "react-native-vector-icons/Ionicons"
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen'
  
  //custom components
  import  ActionBar from '../../components/actionbar'
import { returnStatement } from '@babel/types';
 import RadioButtons from './radio' 



  const cardWidth = Dimensions.get('window').width*0.95

  const options = [
    {
        key: 'Mpesa',
        text: 'M-PESA',
    },
    {
        key: 'Cash',
        text:'CASH',
    },
    {
        key: 'airtel',
        text: 'AIRTEL',
    },
    {
        key: 'telkom',
        text: 'T-KASH',
    },
]



  


  class StepTre extends  PureComponent{

        componentDidMount(){
            loc(this)
        }
        componentWillMount(){
            rol()
        }
     

        render(){
          const {handlechange}=this.props

            

            return(

                <View style={styles.container}>

                <ActionBar navigation={this.props.navigation} title={'Payment Options'} icon={true}/>
                            
                            <View style={styles.holder}>
                        <Card style={{width:cardWidth,height:null, marginTop:hp('7%')}}>
                        <CardItem>
                        <View>
                       <RadioButtons options={options} handlechange={handlechange}/>
                       </View>
                          </CardItem>
                        </Card>

                       
                            </View>
                          
                            <View style={{flexDirection:'row',justifyContent:'space-around'}}>

                            <TouchableOpacity style={styles.buttonContainer} 
                            onPress={this.props.prevstep}
                            >      
                            <Text  style={styles.buttonText}>PREVIOUS</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.buttonContainer} 
                            // onPress={this.props.nextstep}
                            >      
                            <Text  style={styles.buttonText}>COMPLETE ORDER</Text>
                            </TouchableOpacity>

                            </View>
                </View>
            )
        }


  }

  // const mapStateToProps= (state)=>{

  //   return{
  //       Cart:state.cartItems
  //   }
  // }

  export default StepTre

  const styles=StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#CECFCF',
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
      // flex:1,
      alignItems:'center',
      marginBottom:hp('3%')
    //   justifyContent: 'center'

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
      // marginTop:hp('%')
     },
  
     buttonText:{
      color: '#fff',
      textAlign: 'center',
      fontWeight: '700'
     }

 
 })