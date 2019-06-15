import React, { PureComponent } from 'react'
import {View,Text,StyleSheet,FlatList,TextInput,Image,ScrollView,TouchableOpacity} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen'
import Icon from "react-native-vector-icons/Ionicons"

import {Body,Thumbnail,List,ListItem,Left,Right} from 'native-base'
import { connect } from "react-redux"


//custom components

import ActionBar from './actionbar'

class ShoppingCart extends PureComponent{


        
        // add = (a, b) =>{
        //         a + b
        //         }
            
    total_cost(){

       const sums= this.props.cartItems.map(item=>{
              return item.itemPrice.substring(4) * item.itemqty
        })

        // let total= 0

        // for(var i=0;i<sums.length;i++){

        //     total=total + sums[i]
        // }
        // const add = (a, b) => a + b
        
     const total=sums.reduce(add)
        console.log(total)
    }


    render(){
        console.log(this.props.cartItems)
        console.log(this.props.cartItems.length)

        const sums= this.props.cartItems.map(item=>{
            return item.itemPrice.substring(4) * item.itemqty
      })
      const add = (a, b) => a + b
        

        return(

            <View style={styles.container}>

            <ActionBar navigation={this.props.navigation} title={'cart'} icon={true}/>
        {this.props.cartItems.length > 0 ?
            <ScrollView  style={{marginTop:hp('2%'),marginBottom:hp('2%'),height:hp('100%')}}>
      
            <FlatList
            style={{marginBottom:hp('5%')}}
                   data={this.props.cartItems}
                 renderItem={({ item: rowData }) => {
                        
                     return(
          
                    <ListItem avatar button={false} 
                    itemDivider={true}
                    //  onPress={()=>{this.getitem(rowData.id)}}
                    style={{backgroundColor:'#fff',marginBottom:hp('1%'),zIndex:1}}
                     >
                    <Left>
                        <Image source={{uri:rowData.itemPhoto}} style={{width:wp('20%'),height:hp('10%')}} />

                    </Left>
                    <Body>
                   
                    <View style={{flexDirection:'row',justifyContent:'space-around'}}> 
                            <View>
                    <Text style={{color:'#000',fontSize:22}} >{rowData.itemName}</Text>

                        <Text note> unit Price:{rowData.itemPrice}</Text>
                        </View>
                      

                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:hp('2%')}}> 
                        <Text style={{color:'#000',fontSize:20}}>QTY:</Text>

                    <Icon
                name="md-add-circle"
                color="#09AB1F"
                size={30}
                onPress={()=>this.props.increase_qty(rowData)}
                // style={styles.menuicon}
            />
                      <TextInput style = {styles.cust_input}
                        ref='qty'   
                        returnKeyType="go" 
                        editable={false}
                        // onEndEditing={()=>this.changeqty(qty)}
                        value={rowData.itemqty.toString() }
                        />

                       
                    <Icon
                name="md-remove-circle"
                color="#ff0000"
                size={30}
                onPress={()=>this.props.decrease_qty(rowData)}
                // style={styles.menuicon}
            />


                        </View>
                       
                        <View style={{flexDirection:'row'}}>
                        <Icon
                name="md-trash"
                color="#000"
                size={30}
                onPress={()=>this.props.removeItem(rowData.itemId)}
                // style={styles.trashicon}
            />
                       
    <Text style={{ fontFamily:'Roboto',fontSize:16,left:wp('27%')}} note> Item total:Ksh.<Text style={{fontWeight:'700'}}>
    {rowData.itemPrice.substring(4) * rowData.itemqty}</Text></Text>

                        </View>


                    </Body>
                    <Right>
                    <Text note>{rowData.itemqty}</Text>
                    </Right>
                    </ListItem>
            
              
                
                     )     
                        }}
                keyExtractor={(item, index) => index.toString()}
                    />


        <View style={styles.total_layer}>
                        <View style={{flexDirection:'row',marginBottom:hp('5%')}}>
            <Text style={{fontSize:18,fontWeight:'bold',marginTop:hp('2%')}}>  CART  TOTAL:</Text>
            <Text style={{fontSize:18,marginTop:hp('2%'),fontFamily:'Roboto',left:wp('35%'),color:'#010607'}}>  
             Kshs.{


                sums.reduce(add)

            }</Text>
            </View>
            <TouchableOpacity style={styles.cat_btn} >
                <Text style={{color:'#fff',fontSize:20}}>CHECK OUT</Text>
            </TouchableOpacity>
        </View>
        
        
        </ScrollView>
        
        
        :<Text> No items in cart</Text>}

      


            </View>
        )
    }
}

const mapStateToProps= (state) =>{

    return {
        cartItems:state.cartItems
    }
}

const mapDispatchToProps= (dispatch)=>{

    return {
  
      removeItem:(productId)=> dispatch({type:'REMOVE_FROM_CART',
      payload:productId
    }),

    increase_qty:(productId) =>dispatch({
        type:'ADD_QUANTITY',
        payload:productId

    }),
    decrease_qty:(productId) =>dispatch({
        type:'DECREASE_QUANTITY',
        payload:productId
    })
    }
  }
export default connect(mapStateToProps,mapDispatchToProps) (ShoppingCart)

const styles=StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor: '#b2afaf'
    },
    cust_input:{
        height:hp('6%'),
        width:wp('10%'),
        backgroundColor: '#9B928D',
        borderRadius: 2,
        marginBottom:hp('3%'),
        textAlign: 'center',
        color: '#fff'
    },
    trashicon:{
       
        right:wp('20%')
    },
    total_layer:{
        height:hp('20%'),
        backgroundColor:'#fff'
    },
    cat_btn:{
        backgroundColor:'#04AD20',
        alignItems: 'center',
        justifyContent:'center',
        marginBottom: hp('7%'),
        left:wp('15%'),
        height:hp('6%'),
        width:wp('70%')


    }
})