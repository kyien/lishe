import React,{Component} from 'react'
import {ScrollView,StyleSheet,View} from 'react-native'
import Carousel from 'react-native-smart-carousel'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen'



const datacarousel = [
    {
        "id":'001',
        "title": "swahili cuisine",
        "imagePath": "http://healthyafricanfoodie.com/wp-content/uploads/2019/01/Beef-pilau-1024x1024.jpg",
    },
    {
        "id": '002',
        "title": "Kenyan cuisine",
        "imagePath": "https://www.capitalfm.co.ke/lifestyle/files/2019/04/img_4772-1024x1024.jpg",
    },
    {
        "id": '003',
        "title": "Swahili cuisine",
        "imagePath": "https://www.zumi.co.ke/wp-content/uploads/2017/04/15534909_356207074743884_596116734558076928_n1-1024x1024.jpg",
    },
    {
        "id": '004',
        "title": "Kenyan cuisine",
        "imagePath": "https://pbs.twimg.com/media/DoFSzJbW0AALKY-.jpg",
    },
    {
        "id": '005',
        "title": "Kenyan cuisine",
        "imagePath": "https://i.pinimg.com/originals/ab/76/9c/ab769c8055319703fdf2ba81b9905659.jpg",
    },
  ];

export default class PageCarousel extends Component {
    componentDidMount(){

        loc(this)
       
    }
    
    componentWillUnMount() {
          rol()
          
        }

    
    render(){

        return(
            <View
  ref={(c) => { this.parentScrollView = c; }}
  style={styles.container}
>
            <Carousel
                data={datacarousel}
                parentScrollViewRef={this.parentScrollView}
                titleColor={'#0DAFE7'}
                autoPlay={true}
                playTime={5000}
                navigation={true}
                navigationColor={'#36AF06'}
                navigationType={'dots'}
                height={hp('90%')}
                parallax={true}
                width={wp('95%')}
                overlayPath={require('../../assets/OverlayM.png')}
                />
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        width:wp('100%'),
        height:hp('90%'),
        // backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backgroundColor:'#09A7EC',

        // justifyContent: 'center',
        resizeMode: 'cover'
        // backgroundColor: '#fff'      
     },

    content:{
        flex:1,
        //  justifyContent: 'center',
        // alignItems: 'center',
    },
   
})