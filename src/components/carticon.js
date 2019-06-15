import React, { PureComponent } from 'react'
import {StyleSheet,View,Text,TouchableOpacity,Alert} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen'
import {connect} from 'react-redux'

class CartIcon extends PureComponent{
    render(){
        console.log(this.props.cartItems)

        return(
            <TouchableOpacity   style={styles.menuicon} onPress={()=>this.props.navigation.navigate('cart')}>
            
            <Icon
                name="md-cart"
                color="#000"
                size={32}
                // onPress={() =>this.props.navigation.openDrawer()}
               
            />

           <View style={styles.badge}>
           <Text>{this.props.cartItems.length}</Text>
           </View>
           
           </TouchableOpacity>
        )
    }
}
const mapStateToProps= (state) =>{

    return {
        cartItems:state.cartItems
    }
}
export default connect(mapStateToProps)(CartIcon)

const styles= StyleSheet.create({

    // container:{

    // },

    menuicon:{
        zIndex: 0,
        position:'absolute',
        top:'32%',
        left:'90%'
    },
    badge:{
        alignItems: 'center',
        top:'60%',
        position:'absolute',
        left:'90%',
        width:wp('7%'),
        height:hp('2.5%'),
        borderRadius:wp('2.5%'),
        backgroundColor: '#0CC2E7'
    }
})
 