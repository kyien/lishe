import React, { Component } from 'react'
import {StyleSheet,Text,View} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen'


//components
import ActionBar from '../components/actionbar'
import PageCarousel from '../components/carousel'

export default class Home extends Component{
    componentDidMount(){

        loc(this)
       
    }
    
    componentWillUnMount() {
          rol()
          
        }

    render(){

        return(
            <View style={styles.container}>
                <ActionBar navigation={this.props.navigation} title={'Home'}/>
                <PageCarousel/>

               
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        width:null,
        height:null,
        // justifyContent: 'center',
        resizeMode: 'cover',
        backgroundColor: '#fff'      
     },

    content:{
        flex:1,
        //  justifyContent: 'center',
        // alignItems: 'center',
    },
   
})