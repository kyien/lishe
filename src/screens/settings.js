import React, { PureComponent } from "react";
import {
    View,
    Text,TextInput,ScrollView,
    StyleSheet,ToastAndroid,TouchableHighlight,
    Image,TouchableOpacity
} from "react-native"
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen'
  import firebase from "react-native-firebase"
  import Icon from "react-native-vector-icons/Ionicons"
  import {connect} from 'react-redux'

  //cutom components
  import Loader from '../components/loader'
  import ActionBar from '../components/actionbar'

  class Settings extends PureComponent{
        constructor(){
            super()

            this.state={
                isloading:false,
                newdisplayname:'',
                photo_url:'',
                phone:''
            }
        }
        componentDidMount(){

            loc(this)

      this.setState({newdisplayname:this.props.AuthUser.displayname})
      this.setState({photo_url:this.props.AuthUser.avatar_url})
      this.setState({phone:this.props.AuthUser.phone})
            
        }


        componentWillMount(){
            rol()

        }
        // toggle_input=()=>{

        //     if(!this.state.editable){
  
        //       this.setState({editable:true})
        //     }
        //     else{
        //       this.setState({editable:false})
  
        //     }
          // }




    render(){

        return(
            <View style={styles.container}>
            <Loader
                isloading={this.state.isloading} />
                <ActionBar navigation={this.props.navigation} title={'Settings'}/>
                        {/* <ImageView
                        images={images}
                        imageIndex={0}
                        isVisible={this.state.isvisible}
                    /> */}
                  <ScrollView style={styles.sub_container}>
                <View style={styles.holder}>
      
                   

                          
                      <View style={styles.fields} >

                       
                        <View style={{alignItems:'center'}}>
                            {/* <TouchableOpacity onPress={this.zoom_image}> */}
                            {this.state.photo_url ?
                            <Image
                                  // source={require('../assets/icon.png')}
                                //   source={{uri:this.state.photo_url}}
                                  source={{uri:this.state.photo_url}}
                                  style={styles.image_icon}
                              /> 
                              :

                              <Image
                                  // source={require('../assets/icon.png')}
                                //   source={{uri:this.state.photo_url}}
                                  source={{uri:this.props.AuthUser.avatar_url}}
                                  style={styles.image_icon}
                              /> }
                              </View>
                             <View style={styles.photo_picker}>
                                <Icon
                                  name="md-camera"
                                  size={32}
                                  color="#fff"
                                  onPress={()=>{this.chooseFile()}} 
                                />
                              </View>
                              <View style={{alignItems:'flex-start'}}>
                              {/* <Text style={styles.inputlabel}></Text> */}
                             <Text style={styles.displaytext}> DisplayName: </Text>
                              <TextInput
                                value={this.state.newdisplayname}
                                editable={true}
                                keyboardType='default'
                                onChangeText={(newdisplayname)=> this.setState({newdisplayname})}
                                style={styles.cust_input}
                              />
                             <Text style={styles.displaytext}> Phone: </Text>
                              <TextInput
                                value={this.state.phone}
                                keyboardType='numeric'
                                editable={true}
                                onChangeText={(phone)=> this.setState({phone})}
                                style={styles.cust_input}
                              />
                              
                         
                              </View>
                        </View>
                       
                          
                               <TouchableOpacity style={styles.buttonContainer} 
                          onPress={this.change_profile}
                          >      
                              <Text  style={styles.buttonText}>MAKE CHANGES</Text>
                          </TouchableOpacity>
      
                        
                         
                  </View>
                  </ScrollView>
                  
            </View>
                 
        )
    }
  }


  const mapStateToProps=(state) =>{

    return{
  
    AuthUser:state.Auth.user
    }
  }

  export default connect(mapStateToProps)(Settings)


  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  },
  inputlabel:{
    color:'#27ae60',
    fontSize:15
},

  displaytext:{
    fontSize:15,
    marginBottom:hp('2%')
  }
  ,
  
  image_icon:{
    marginTop: hp('10%'),
    marginBottom: hp('5%'),
    width:wp('55%'), 
    height:hp('27.5%') ,
    borderRadius:wp('27.5%'),

  },
  cust_input:{
    height:hp('6%'),
    width:wp('50%'),
    backgroundColor: '#9B928D',
    borderRadius: 2,
    marginBottom:hp('2%'),
    paddingLeft:wp('20%'),
    color: '#fff'
},
  input:{
    height:hp('6%'),
    width:wp('75%'),
    backgroundColor: '#9B928D',
    borderRadius: 2,
    marginBottom:hp('2%'),
    paddingLeft:wp('10%'),
    color: '#fff'
},
photo_picker:{
  marginTop:hp('27%'),
  left:wp('45%'),
  alignItems:'center',
  justifyContent: 'center',
  backgroundColor: '#0CC2E7',
  width:wp('15%'),
  height:hp('7.5%'),
  position:'absolute',
  borderRadius:wp('7.5%'),
  
},
 
  holder:{
    alignItems:'center'
},
sub_container:{
    // flex:1,
    // paddingLeft:wp('-10%'),
    marginTop: hp('2%'),
    borderRadius:hp('1%'),
    backgroundColor:'#b2afaf',
    // alignItems: 'center',
    width:wp('90%'),
    height:hp('80%'),
    left:wp('4.4%')

},
  buttonContainer:{
    backgroundColor: '#2980b6',
    paddingVertical:hp('1.6%'),
    width:wp('50%'),
    marginTop:hp('1%'),
    marginBottom:hp('5%')
   },
   uploadbtn:{
    backgroundColor: '#2980b6',
    paddingVertical:hp('1.6%'),
    marginBottom:hp('3%'),
    width:wp('35%')
    // left:wp('7%')

   },
   dis_btn:{
    marginTop:hp('0.5%'),
    backgroundColor: '#2980b6',
    // paddingVertical:hp('0.5%'),
    left:wp('3%'),
    height:hp('5%'),
    width:wp('20%')
},
dis_buttonText:{
  color: '#fff',
  paddingVertical:hp('1%'),
  textAlign: 'center',
  fontSize:10
 },
   buttonText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
   }

  
})