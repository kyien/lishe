import React, { PureComponent } from 'react'
import {StyleSheet,Text,TextInput,View,ScrollView,Image,Dimensions,TouchableOpacity,Modal} from 'react-native'
import StarRating from 'react-native-star-rating'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen'
  import Icon from "react-native-vector-icons/Ionicons"
  import {connect} from 'react-redux'
  import {Card,CardItem,Body,Thumbnail,Left,Right} from 'native-base'
  import firebase from 'react-native-firebase'

  //custom components
  import ActionBar from '../../components/actionbar'


const cardWidth = Dimensions.get('window').width*0.95

 class ListItem extends PureComponent{

    constructor(props) {
        super(props)
        this.state = {
          AvgstarCount: 3.5,
          starCount:4.5,
          comment:'',
          favorite:false,
          isvisible:false
        }

        this.ref=firebase.firestore().collection('favorites')
      }

      onStarRatingPress(rating) {
        this.setState({
          starCount: rating
        })
      }
      submit=()=>{
        
      }
      show_modal=()=>{
        this.setState({isvisible:true})
      }
      Toggle_Favorites=()=>{
        if(!this.state.favorite){
        this.setState({favorite:true})
      }

      else{
        this.setState({favorite:false})
      }
    }
    render(){
      var modalBackgroundStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
      }
        const menuItem=this.props.navigation.state.params.item[0]
        return(
            <View style={styles.container}>
           
            <ActionBar navigation={this.props.navigation} title={menuItem.name} icon={true}/>


            
      <Modal animationType = {"slide"} transparent = {true}
               visible = {this.state.isvisible}
               onRequestClose = {() => { this.setState({isvisible:false}) } }>
               
               <View style = {[styles.modal,modalBackgroundStyle]}>

                  {/* <Text style = {styles.text}>Modal is open2!</Text> */}
                    <View style={styles.innermodal}>
                    <Text style = {styles.modalhead}>Rate Product:</Text>
                   
                    <StarRating
                    disabled={false}
                    fullStarColor={'#F7EC05'}
                    halfStarEnabled={true}
                    maxStars={5}
                    starSize={20}
                    rating={this.state.starCount}
                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                  />
                   <Text style={{marginTop:hp('2%'),marginBottom:hp('2%')}}>{this.state.starCount}</Text>

                   <Text style = {{fontSize:15}}>Comment:</Text>

                   <TextInput
                   style={styles.input}
                        returnKeyType="go" 
                        multiline={true}
                        // placeholder='unit_price' 
                        keyboardType='email-address'
                        value={this.state.comment}
                        placeholderTextColor='#DDDBDA' 
                        onChangeText={(comment) => this.setState({comment})}
                   />
                    <View style={{flexDirection:'row',marginTop:hp('4%')}}>

                      <TouchableOpacity  style={styles.modal_btn_close} onPress = {() => {
                     this.setState({isvisible:false})}}>
                     
                     <Text style = {{color:'#fff',textAlign: 'center', paddingVertical:hp('0.7%')}}>CLOSE</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.modal_btn} onPress = {() => {
                     this.submit}}>
                     
                     <Text style = {{color:'#fff',textAlign: 'center', paddingVertical:hp('0.7%')}}>SUBMIT</Text>
                  </TouchableOpacity>

                    </View>

                  </View>
                  {/* <TouchableHighlight onPress = {() => {
                     this.toggleModal(!this.state.modalVisible)}}>
                     
                     <Text style = {styles.text}>Close Modal</Text>
                  </TouchableHighlight> */}
               </View>
            </Modal>
      <ScrollView style={styles.cardview}>
      <View style={styles.holder}>

      <Card style={{width:cardWidth,height:null,flex:1}}>
      <Icon
                name="md-heart"
                color={this.state.favorite ?'#F21F12':'#C6C6C5'}
                size={32}
                onPress={this.Toggle_Favorites}
                style={styles.favorite}
            />
      
     
      <CardItem>
      <CardItem cardBody>
                              
                                <Image
                                 style={{ height:hp('40%'), width:wp('85%')}}
                                  source={{uri:menuItem.image}} 
                                
                                  />
                               
                            </CardItem>
                            </CardItem>


    <CardItem>
    
    <Text  style={{color:'#F56006',fontSize:15}} >Price:{menuItem.price}</Text>
    </CardItem>
    <View style={{flexDirection:'row',marginBottom:hp('2%')}}>
        <CardItem>
<StarRating
        disabled={true}
        fullStarColor={'#F7EC05'}
        halfStarEnabled={true}
        maxStars={5}
        starSize={30}
        rating={this.state.AvgstarCount}
        // selectedStar={(rating) => this.onStarRatingPress(rating)}
      />
        </CardItem>
        <CardItem>
        <TouchableOpacity style={styles.rate_btn} onPress={this.show_modal}>
                <Text style={{color:'#fff',textAlign: 'center', paddingVertical:hp('0.7%')}}>RATE PRODUCT</Text>
            </TouchableOpacity>
        </CardItem>

    </View>
    <CardItem>
      <Text>Average Rating:{this.state.AvgstarCount}</Text>
    </CardItem>
    <CardItem>
            <TouchableOpacity style={styles.cart_btn} onPress={()=> this.props.addItemToCart(menuItem)}>
                <Text style={{color:'#fff',textAlign: 'center', paddingVertical:hp('0.7%')}}>ADD TO CART</Text>
            </TouchableOpacity>
</CardItem>

{/* <CardItem>
    
    <Text  style={{color:'#F56006'}} >Is vegeterian:  {menuItem. isVegetarian ? menuItem. isVegetarian : 'false' }</Text>
    </CardItem> */}
      </Card>

      </View>
      </ScrollView>
            </View>
        )
    }
}

const mapDispatchToProps= (dispatch)=>{

  return {

    addItemToCart:(product)=> dispatch({type:'ADD_TO_CART',
    payload:{
      itemId:product.id,
      itemPhoto:product.image,
      itemName:product.name,
      itemPrice:product.price,
      itemqty:1
    }
  })
  }
}

export default connect(null,mapDispatchToProps)(ListItem)

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b2afaf',
      //   alignItems: 'center',
      //   justifyContent: 'center',
      },
      holder:{
        alignItems:'center'
    },
    cardview:{
        // backgroundColor:'#fff',
        marginTop:hp('2%')
    },
    cart_btn:{
        backgroundColor:'#04AD20',
        marginBottom: hp('7%'),
        left:wp('5%'),
        height:hp('4%'),
        width:wp('75%')
    },
    rate_btn:{
      backgroundColor:'#057A9C',
        left:wp('2%'),
        height:hp('4%'),
        width:wp('30%')
    },
    modal_btn:{
      backgroundColor:'#09A7EC',
      height:hp('4%'),
      left:wp('30%'),
      width:wp('25%')
    },
    modal_btn_close:{
      backgroundColor:'#09A7EC',
      left:wp('5%'),
      height:hp('4%'),
      width:wp('25%')
    },
    innermodal:{
      // flex:1,
      backgroundColor: '#fff', 
      padding: 20,
      // paddingLeft: wp('0.5%'),
      height:hp('45%'),
      width:wp('95%')
    },
    input:{
      height:hp('8%'),
      width:wp('80%'),
      backgroundColor: '#9B928D',
      borderRadius: 2,
      // marginBottom:hp('0.5%'),
      // paddingLeft:wp('10%'),
      color: '#fff'
  },
    modal:{
      // flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width:wp('100%'),
      height:hp('100%'),
      backgroundColor: '#ecf0f1',
      // padding: 100
    },
    modalhead:{
      marginTop:hp('2%'),
      marginBottom: hp('2%'),
      fontSize:20
    },
      drawerHeader: {
        flex:0,
        backgroundColor: '#36AF06',
        paddingTop: hp('4%'),
        zIndex:1
      },
      favorite:{
        left:wp('85%'),
        marginTop:hp('2%'),
        // position:'absolute',
        // color:'#7F8085'
      },
      back_arrow:{
        left:wp('5%'),
        marginTop:hp('2%'),
        position:'absolute',
        // color:'#fff'

    },
    title:{
        fontSize:20,
        color:'#fff',
        left:wp('2%'),
        top:hp('-2%'),
        zIndex:2
    }
})