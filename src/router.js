import React from "react";
import {Platform,Dimensions} from "react-native";
import {createDrawerNavigator,createAppContainer,
createStackNavigator,createSwitchNavigator} from 'react-navigation'


import Menudrawer from './components/menudrawer'

//screens
import Home from './screens/Home'
import Category from './screens/categories/index'
import CategoryList from "./screens/categories/categorylist";
import ListItem from "./screens/categories/listitem";
import Favorites from './screens/favorites/index'
import ShoppingCart from './components/cart'
import CheckOut from './screens/checkout/checkout'
import Login from './screens/auth/login'
import Register from './screens/auth/register'
import CheckAuth from './screens/auth/checkauth'
import Settings from './screens/settings'


const WIDTH=Dimensions.get('window').width

const Drawerconfig={
    drawerWidth:WIDTH*0.65,
    contentComponent:(props)=>{
        return(<Menudrawer {...props}/>)
    }
}
const categoryNav=createStackNavigator({
    category:{
        screen:Category
    },
    categorylist:{
        screen:CategoryList
    },
    listitem:{
        screen:ListItem
    },
    cart:{
        screen:ShoppingCart
    },
    checkout:{
        screen:CheckOut
    }
}
,
{
    headerMode: 'none'
}

)

categoryNav.navigationOptions={
    headerTintColor: 'blue'
}

const favorites=createStackNavigator({
    favorites:{

        screen:Favorites
    }

}
,
{
    headerMode: 'none'
}

)

const AuthNav=createStackNavigator({
    login:{
        screen:Login
    },
    register:{
        screen:Register
    }
},

{
    headerMode: 'none'
}

)


const MainNav =createDrawerNavigator({
    Home:{
        screen:Home
    },
    categories:{
        screen:categoryNav
    },
    Favorites:{
        screen:favorites
    },
    settings:{
        screen:Settings
    }

},
Drawerconfig
)

const RootNav=createSwitchNavigator({

    checkauth:{
        screen:CheckAuth
    },
    auth:{
        screen:AuthNav
    },
    main:{
        screen:MainNav
    }
},
{
    initialRouteName: 'checkauth'
}
)


export default createAppContainer(RootNav)