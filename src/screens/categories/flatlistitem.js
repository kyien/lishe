import React,{PureComponent} from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen'

import {View,StyleSheet,TouchableOpacity,ImageBackground,Text} from 'react-native'

export default class Myitems extends PureComponent{
    constructor(props){
        super(props)
    }
    render(){

        return(
            <TouchableOpacity  onPress={()=>this.props.pressing(this.props.cats.key)}>
            <View style={styles.wrapper} >
       <ImageBackground
       source={{uri:this.props.cats.image}}
       style={styles.image}
       
       >
       <Text style={styles.keyitem}>{this.props.cats.key}</Text>
       </ImageBackground>
       </View> 
        </TouchableOpacity>
   )
       
    }
}

const styles=StyleSheet.create({
    wrapper:{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin:hp('2%')
     },
     keyitem:{
        color:'#000',
        fontSize:20
    },
    image:{
        // position: 'relative',
         height:hp('20%'),
         width:wp('40%'),
         justifyContent: 'center'

        //  marginBottom:hp('%'),
        //  left:wp('2%')
     }


})