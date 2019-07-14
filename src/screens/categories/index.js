import React, { Component } from 'react'
import {StyleSheet,Text,View,Image,ImageBackground,FlatList} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen'

//components
import ActionBar from '../../components/actionbar'
import Loader from "../../components/loader"
import { TouchableOpacity ,TouchableHighlight} from 'react-native-gesture-handler'
import foodItems from '../../services/foods.json'
import Myitems from './flatlistitem'


const categories=[{key:'BreakFast',image:'http://mutuamatheka.co.ke/wp-content/uploads/2012/08/Falls-by-phone_by-Mutua-Matheka-4.jpg'},
{key:'Hot Drinks',image:'https://scontent-lhr3-1.cdninstagram.com/vp/7b4e4b9bc2172d5a8694c42a1bc0bfe0/5D21F7ED/t51.2885-15/e35/51866056_344157453108105_332980625854358606_n.jpg?_nc_ht=scontent-lhr3-1.cdninstagram.com'},
{key:'SoftDrinks',image:'https://i1.wp.com/www.indulgemaldives.com/wp-content/uploads/2017/09/IMG_8915.jpg?resize=1024%2C768'},
{key:'MainDishes',image:'http://healthyafricanfoodie.com/wp-content/uploads/2019/01/Beef-pilau-1024x1024.jpg'},
{key:'Cuisines',image:'https://img.taste.com.au/Qs82qz4d/taste/2016/11/ripper-thai-beef-noodle-salad-62642-1.jpeg'},
{key:'Snacks',image:'https://afoodiescollective.com/wp-content/uploads/2017/11/IMG_3738-1024x1024.jpg'}
]

export default class Category extends Component{

    constructor(){
        super()
        this.state={
            foods:foodItems,
            isloading:false
        }
    }

componentDidMount(){
        loc(this)

    }

componentWillUnmount(){
    rol()
}

    // get_foods=()=>{
    //     this.setState({isloading:true})
    //         const foodarray=foodItems
    //         console.log(foodarray)
    //     this.setState({
    //         foods:[...this.state.foods,...foodarray]
    //     })
    //     // console.log(this.state.foods)
    //     this.setState({isloading:false})

    // }

    renderCategories=({item,index})=>{
        return(
            <Myitems cats={item} pressing={this.handlepress}/>
        )
    }

 handlepress=(item_category)=>{


    CategoryFoods=this.state.foods.filter((food)=>{

        return food.category == item_category
    })

    this.props.navigation.navigate('categorylist',{CategoryFoods})

    }
  

render(){
    return(
        <View style={styles.container}>
        <Loader
          isloading={this.state.isloading} />
                <ActionBar navigation={this.props.navigation} title={'Categories'}/>

            <View style={styles.holder}>

                <FlatList
                    data={categories}
                    renderItem={this.renderCategories}
                    numColumns={2}
                    // ItemSeparatorComponent={this.itemseparator}
                    // style={{justifyContent: 'space-between'}}
                />

        </View>
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
     holder:{
        //  flex:1,
        marginTop:hp('2%'),
        // alignItems: 'center',
        // justifyContent: 'space-around'
     },
     separator:{
        height: 0.5,
        width: wp('2%'),
        backgroundColor:"rgba(255,255,255,0.5)"
     },
    
    
   
    content:{
        flex:1,
        //  justifyContent: 'center',
        // alignItems: 'center',
    },
   
})