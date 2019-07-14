import React, { PureComponent } from 'react'
import {StyleSheet,Text,TextInput,View,ScrollView,Image,ToastAndroid,
  Dimensions,TouchableOpacity,Modal} from 'react-native'
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
  import Loader from '../../components/loader'


const cardWidth = Dimensions.get('window').width*0.95
const favoritesRef = firebase.firestore().collection('favorites')
const ratingRef =firebase.firestore().collection('Ratings')
 class ListItem extends PureComponent{

    constructor(props) {
        super(props)
        this.state = {
          AvgstarCount: 3.5,
          starCount:4.5,
          comment:'',
          rated:null,
          favorite:null,
          isvisible:false,
          loading:false
        }

        // this.ref=firebase.firestore().collection('favorites')
      }

      async componentDidMount(){
        await this.check_rating()
          await ratingRef.doc(this.props.navigation.state.params.item[0].id).onSnapshot((doc)=>{
            let ratingarray=doc.data().rating
            let avg=ratingarray.reduce((a, b) => a + b)/ratingarray.length
            this.setState({AvgstarCount:this.round_rating(avg)})
            
          })
        loc(this)
        console.log(this.state.favorite)
      }

      componentWillMount(){
       this.isfavorite()
      }

      async check_rating(){
        const checkrating= await ratingRef.doc(this.props.navigation.state.params.item[0].id).get()
        if(!checkrating.exists){
          this.setState({rated:false})
        }
        else{
          this.setState({rated:true})
        }
      }
      
      componentWillUnmount(){

        rol()
      }

      async onStarRatingPress(rating) {
        this.setState({loading:true})
        const Rating=[]
        let item=this.props.navigation.state.params.item[0]
        
            //first product rating
          if(!this.state.rated){
            Rating.push(rating)
              await ratingRef.doc(item.id).set({
                rating:Rating
              }).then(()=>{
                this.setState({rated:true})
                this.setState({loading:false})
              }).catch(error=>console.log(error.message))
          }

          else{
            await ratingRef.doc(item.id).update({
              rating:firebase.firestore.FieldValue.arrayUnion(rating)
            }).then(()=>{
              this.setState({loading:false})
            }).catch(error => console.log(error.message))
          }
        
        // this.setState({
        //   starCount: rating
        // })
      }
        round_rating(n){
          let rounded = n + 0.25
            return rounded - (rounded % 0.5)
        }

      isfavorite=()=>{
        let item=this.props.navigation.state.params.item[0]
        let fav=this.props.favorites.some(product => product.id===item.id)
        this.setState({favorite:fav})
        
      }
      show_modal=()=>{
        this.setState({isvisible:true})
      }

      async Toggle_Favorites(item){
        if(!this.state.favorite){
          await this.add_to_favorites(item)
        this.setState({favorite:true})
      }

      else{
        await this.remove_from_favorites(item.id)
        this.setState({favorite:false})
      }
    }
      add_to_favorites= async(Item)=>{

          this.setState({loading:true})

         const checkref= await  favoritesRef.doc(this.props.AuthUser.user_id).get()
          
            if(!checkref.exists){
              const products=[]
              products.push(Item.id)
             await favoritesRef.doc(this.props.AuthUser.user_id).set({
                products:products
              }).then(async()=>{
                //success 
                await this.props.add_favorites(Item)
                // await console.log(doc)
                this.setState({loading:false})

              }).catch((error)=> console.log(error.message))
            }
            //document exists so just append data
            else {
             await favoritesRef.doc(this.props.AuthUser.user_id).update({
                products:firebase.firestore.FieldValue.arrayUnion(Item.id)
              }).then(async()=>{
                await this.props.add_favorites(Item)

                this.setState({loading:false})

              }).catch((error)=>console.log(error))
            }
        
      }
    remove_from_favorites = async(id) =>{
      this.setState({loading:true})
      await favoritesRef.doc(this.props.AuthUser.user_id).update({
        products:firebase.firestore.FieldValue.arrayRemove(id)
      }).then(async()=>{
        //success
        await this.props.remove_from_favorites(id)
        this.setState({loading:false})

      }).catch((error)=>console.log(error))
    }
  
    render()
    {
      var modalBackgroundStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
      }
        const menuItem=this.props.navigation.state.params.item[0]
        return(
            <View style={styles.container}>
           <Loader isloading={this.state.loading}/>
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
                    halfStarEnabled={false}
                    maxStars={5}
                    starSize={20}
                    rating={this.state.rated ? this.state.AvgstarCount:this.state.starCount}
                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                  />
                   {/* <Text style={{marginTop:hp('2%'),marginBottom:hp('2%')}}>{this.state.starCount}</Text> */}

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
                color={ this.state.favorite? '#F21F12' :'#C6C6C5'}
                size={32}
                onPress={()=>this.Toggle_Favorites(menuItem)}
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
    
    <Text  style={{color:'#F56006',fontSize:17,fontFamily:'sans-serif-medium'}} >Price:{menuItem.price}</Text>
    </CardItem>
    <View style={{flexDirection:'row',marginBottom:hp('2%'),justifyContent:'space-around'}}>
    {this.state.rated ? <View>
  
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
        <Text>     Average Rating:{this.state.AvgstarCount}</Text>

        </View>:<Text style={{marginTop:hp('2%')}}> NOT RATED</Text>}
        <CardItem>
        <TouchableOpacity style={styles.rate_btn} onPress={this.show_modal}>
                <Text style={{color:'#fff',textAlign: 'center', paddingVertical:hp('0.7%')}}>RATE PRODUCT</Text>
            </TouchableOpacity>
        </CardItem>

    </View>
    <CardItem>
      
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
const mapStateToProps = (state) =>{

  return {
    AuthUser:state.Auth.user,
    favorites:state.Favorites
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
  }),
  add_favorites:(product) => dispatch({
    type:'ADD_TO_FAVORITES',
    payload:product
  }),
  remove_from_favorites:(id) => dispatch({
    type:'REMOVE_FROM_FAVORITES',
    payload:id
  })
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ListItem)

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