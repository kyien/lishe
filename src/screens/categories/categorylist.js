import React, { Component } from 'react'
import {StyleSheet,Text,View,ScrollView,FlatList,TouchableOpacity} from 'react-native'
import {Icon,Body,Right,ListItem,Thumbnail,Left} from 'native-base'

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen'

   
import ActionBar from '../../components/actionbar'

export default class CategoryList extends Component{

    // constructor(){

    //     this.state={
    //         products:this.props.navigation.state.params.CategoryFoods
    //     }
    // }

    getitem(id){
        
 const item=this.props.navigation.state.params.CategoryFoods.filter((product)=>{

            return product.id == id
 })

 this.props.navigation.navigate('listitem',{item})
    }

    render(){
       
        const params =this.props.navigation.state.params.CategoryFoods
        console.log(params)
        return(
            <View style={styles.container}>
    <ActionBar navigation={this.props.navigation} title={params[0].category} icon={true} />


      <ScrollView >

      <FlatList 
                    data={params}
                 renderItem={({ item: product }) => {
                     return(
                        <ListItem avatar button={true} 
                     onPress={()=>{this.getitem(product.id)}}
                     >
                    <Left>
                        <Thumbnail square source={{ uri:product.image}} />
                    </Left>
                    <Body>
                        <Text style={{color:'#000'}} >{product.name}</Text>
                        <Text note>{product.price}</Text>
                    </Body>
                    <Right>
                    <Icon name="arrow-dropright" />
                    </Right>
                    </ListItem>
                     )     
                        }}
                keyExtractor={(item, index) => index.toString()}
                    />
      </ScrollView>
      {/* </View> */}

            </View>
        )
    }
}


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
   
     
    title:{
        fontSize:20,
        color:'#fff',
        left:wp('2%'),
        top:hp('-2%'),
        zIndex:2
    }
 })