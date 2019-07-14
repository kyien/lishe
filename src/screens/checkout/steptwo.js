
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
  



  const cardWidth = Dimensions.get('window').width*0.95


  class StepTwo extends  PureComponent{

        componentDidMount(){
            loc(this)
        }
        componentWillMount(){
            rol()
        }
     

        render(){

            const sums= this.props.Cart.map(item=>{
                return item.itemPrice.substring(4) * item.itemqty
          })
          const add = (a, b) => a + b

            return(

                <View style={styles.container}>

                <ActionBar navigation={this.props.navigation} title={'Order Details'} icon={true}/>
                     <ScrollView style={styles.fields} >
                            <View style={styles.holder}>
                        <Card style={{width:cardWidth,height:null,flex:1}}>
                        <View style={{flexDirection:'row'}}>
                            <CardItem>
    
                            <Text  style={{color:'#000',fontWeight:'bold'}} >Item</Text>
                            </CardItem>
                            
                            <CardItem>
    
                            <Text  style={{color:'#000',fontWeight:'bold'}} >               Quantity</Text>
                            </CardItem>
                            <CardItem>
    
                            <Text  style={{color:'#000',fontWeight:'bold'}} >       Item_total(Ksh.)</Text>
                            </CardItem>
                            
                            </View>

                    {this.props.Cart ? this.props.Cart.map((item,index) =>{
                                return (
                        <View key={index} style={{flexDirection:'row'}}>

                        <CardItem>
                        <View>
                        <Thumbnail square source={{ uri:item.itemPhoto}} />
                            <Text  style={{color:'#000'}} >{item.itemName}</Text>
                            </View>
                            </CardItem>
                            
                            <CardItem>
    
                            <Text  style={{color:'#000'}} >           {item.itemqty}</Text>
                            </CardItem>
                            <CardItem>
    
                            <Text  style={{color:'#000'}} >                  {item.itemPrice.substring(4) * item.itemqty}</Text>
                            </CardItem>
                            

                        </View>
                    )}
                    )
                    : null}
                             
                            <View style={{marginBottom:hp('3%'),marginTop:hp('3%'),left:wp('45%')}}>
                             <Text  style={{color:'#000',fontWeight:'bold',marginBottom:hp('1%')}} >VAT(16%):
                            <Text style={{fontWeight:'bold',color:'#ff0000'}}>  Kshs.{ 0.16*(sums.reduce(add))}</Text></Text>
                             
                             
                    <Text  style={{color:'#000',fontWeight:'bold'}} >Grand Total:
                            <Text style={{fontWeight:'bold',color:'#ff0000'}}>  Kshs.{ (0.16 *sums.reduce(add)) + sums.reduce(add) }</Text></Text>
                            </View> 
                        </Card>

                       
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-around'}}>

                                    <TouchableOpacity style={styles.buttonContainer} 
                                    onPress={this.props.prevstep}
                                    >      
                                    <Text  style={styles.buttonText}>PREVIOUS</Text>
                                    </TouchableOpacity>

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

  const mapStateToProps= (state)=>{

    return{
        Cart:state.cartItems
    }
  }

  export default connect(mapStateToProps)(StepTwo)

  const styles=StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#CECFCF',

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
      width:wp('25%'),
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
      marginTop:hp('7%'),
    
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