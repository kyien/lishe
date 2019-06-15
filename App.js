import React, {Component} from 'react'
import {View,Text} from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'

import SplashScreen from 'react-native-smart-splash-screen'

//components
import RootNav from './src/router'
import {store,persistor} from './src/redux/store'
import OfflineNotice from './src/components/offline'
import Loader from './src/components/loader'


export default class App extends Component{

  componentDidMount(){
    SplashScreen.close({
      animationType: SplashScreen.animationType.scale,
      duration: 1000,
      delay: 500,
   })
   console.log('mounted...')

  }
  render() {
    return (
      <View style={{flex:1}}>
        <OfflineNotice />
      <Provider store={store}>
       <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
         <RootNav/>
      </PersistGate>
     </Provider>
     </View>
    )
  }
}

