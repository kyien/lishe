import {createStore, applyMiddleware} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import Rootreducer  from './reducers'

const middlewares = [ReduxThunk]

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
  }
  

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
   }

   const pReducer=persistReducer(persistConfig, Rootreducer)

// export const store = createStore (pReducer,{},applyMiddleware(ReduxThunk))

export const store = createStore (pReducer,composeWithDevTools(applyMiddleware(...middlewares)))
// export const store = createStore (Rootreducer,composeWithDevTools(applyMiddleware(...middlewares)))

export const persistor = persistStore(store)
