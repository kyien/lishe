import React,{Component}  from 'react'
import { View,Text, StyleSheet,Platform,Dimensions,Image,ScrollView} from "react-native"

import {Container,List,ListItem,Left,Header,Right,Content,Body,Icon} from 'native-base'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen'
  import firebase from 'react-native-firebase'

  import {connect} from 'react-redux'
  import * as AuthActions  from '../redux/Actions/auth'


 class MenuDrawer extends Component{

    constructor(props){
        super(props)
        this.state={
            User:global.User

        }
    }
    componentDidMount(){

        loc(this)

        // this.setState({profile_pic:this.props.AuthUser.avatar_url})
    }
    componentWillUnMount() {
        rol()
      }
    
    logout= async ()=>{


     await this.props.logoutUser()

       this.props.navigation.navigate('auth')

    
      }
    render(){
     
        
        return(

            <Container style={styles.container}>
       
            <Header style={styles.drawerHeader}>

                 <Icon name="arrow-back" 
                    style={styles.back_arrow} 
                        onPress={() =>this.props.navigation.closeDrawer()}
                    />
               
            <Body>
               
               

              <Image
                style={styles.drawerImage}
                  // source={require('../assets/icon.png')} />  
                source={{uri:this.state.User.avatar_url}} />


    <Text style={{ color:'#fff'}}> Welcome    <Text style={styles.displayname}>{this.state.User.displayname}</Text></Text>
            </Body>
            </Header>
            <ScrollView>
            <ListItem onPress={()=>this.props.navigation.navigate('Home')} last>
            <Icon type="FontAwesome" name="home" style={{color:'white'}}></Icon>
            <Text style={styles.nav_text} >Home</Text>
            </ListItem>
            <ListItem onPress={()=>this.props.navigation.navigate('category')}last>
            <Icon type="Ionicons" name="logo-buffer" style={{color:'white'}}></Icon>

            <Text style={styles.nav_text}>Categories</Text>
             </ListItem>
            
            <ListItem onPress={()=>this.props.navigation.navigate('favorites')}last>
            <Icon type="Ionicons" name="heart" style={{color:'white'}}></Icon>

            <Text style={styles.nav_text}>Favorites</Text>
             </ListItem>
            <ListItem onPress={()=>this.props.navigation.navigate('favorites')}last>
            <Icon type="FontAwesome" name="truck" style={{color:'white'}}></Icon>

            <Text style={styles.nav_text}>My Orders</Text>
             </ListItem>
            <ListItem onPress={()=>this.props.navigation.navigate('settings')}last>
            <Icon type="Ionicons" name="settings" style={{color:'white'}}></Icon>

            <Text style={styles.nav_text}>Settings</Text>
             </ListItem>
            
           
            <ListItem onPress={this.logout} last>
            <Icon type="Ionicons" name="log-out" style={{color:'white'}}></Icon>

            <Text style={styles.nav_text}>Logout</Text>
             </ListItem>
             </ScrollView>
        </Container>
        )

    }
  }
const mapStateToProps=(state) =>{

  return{

  AuthUser:state.Auth.user
  }
}
  const mapDispatchToProps= (dispatch)=>{

    return{

      logoutUser: async ()=>{
        dispatch(AuthActions.logoutStart())

        await firebase.auth().signOut().then( async() => {

         await dispatch(AuthActions.logoutFinished())
          // this.props.navigation.navigate('auth')

      }).catch((error)=>{
  
          dispatch(AuthActions.logoutError(error))
  
      })
      }
    }
      
  }

  export default connect(mapStateToProps,mapDispatchToProps)(MenuDrawer)

  const styles=StyleSheet.create({
    container:{
        flex:1,
        // alignItems: 'center',

        backgroundColor:'#36AF06'
    },nav_text:{
        color:'#fff',
        fontWeight: 'normal',
        paddingLeft: 50,
      },
      drawerHeader: {
        height: hp('28%'),
        backgroundColor: '#b2afaf'
      },
      drawerImage: {
        height: hp('17%'),
        width: wp('34%'),
        borderRadius: wp('18%'),
        left:wp('12%'),
         marginTop:hp('4%'),
         marginBottom: hp('2%'),
      },
      displayname:{
        color:'#8F09BA',
        fontSize:15
      },
      back_arrow:{
          left:wp('50%'),
          marginTop:hp('1%'),
          position:'absolute'

      }
})