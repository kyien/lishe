import  React,{Component } from "react"
import {StyleSheet,Text}from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen'
import {Header,Icon} from 'native-base'
import Menubar from "./menubar"
import CartIcon from "./carticon"

export default class ActionBar extends Component {
constructor(props){
    super(props)

}

render(){
    
    return(

        <Header style={styles.drawerHeader}>
       {this.props.icon ?<Icon name="arrow-back" 
                    style={styles.back_arrow} 
                        onPress={() =>this.props.navigation.goBack()}
                    />:
                    <Menubar navigation={this.props.navigation} />}
        <Text style={styles.title}>{this.props.title}</Text>
      <CartIcon navigation={this.props.navigation}/>
        </Header>

    )
}


}

const styles=StyleSheet.create({
   
    
    drawerHeader: {
        flex:0,
        backgroundColor: '#36AF06',
        paddingTop: hp('4%'),
        zIndex:1
      },
      back_arrow:{
        left:wp('5%'),
        marginTop:hp('2%'),
        position:'absolute',
        color:'#fff'

    },
    title:{
        fontSize:20,
        color:'#fff',
        left:wp('2%'),
        top:hp('-2%'),
        zIndex:2
    }

})