import React, { Component } from 'react'
import { View, Text, Dimensions, StyleSheet,Modal } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import NetInfo from "@react-native-community/netinfo"
// import { connect } from "react-redux"

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen'
  
const { width } = Dimensions.get('window')

OfflineSign=()=>{

  return (

    <Modal
    transparent={true}
    animationType={'none'}
    visible={true}
    onRequestClose={() => {console.log('close modal')}}>
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
      <Icon
            name="md-refresh"
            color="#000000"
            size={40}
            onPress={() =>this.forceUpdate()}
            style={styles.menuicon}
        />
    </View>
  </Modal>
    
  )
}


export default class OfflineNotice extends Component {
constructor(){
  super()
  this.state={

    connection_Status : true
    // isvisible:false

   
  }
}
  
   componentDidMount(){
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange)

    loc(this)
   }

   componentWillUnMount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange)

    rol()
    
  }

  handleConnectivityChange = (isConnected) => {

    if(isConnected == true)
      {
        this.setState({connection_Status : true})
      }
      else
      {
        this.setState({connection_Status : false})
      }
  }
  render() {
    if(!this.state.connection_Status){
      return <OfflineSign/>
    }else{
      return null
    }
   
  }



}
const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height:hp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
    width,
    position: 'absolute',
    top:hp('0%')
  },
  offlineText: { 
    color: '#fff',
    fontSize:15,
    marginBottom:hp('5%')

  },
  menuicon:{

  }
})