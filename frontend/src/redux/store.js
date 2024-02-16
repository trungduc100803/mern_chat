import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authReducer from './authSlice'
import chatReducer from './chatSlice'
import messageReducer from './messageSlice'
import welcomeReducer from './showWelcome'
import friendReducer from './friendSlice'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}



const rootReducer = combineReducers({
    auth: authReducer,
    chat: chatReducer,
    message: messageReducer,
    welcome: welcomeReducer,
    friend: friendReducer
})

const persistedReducer = persistReducer(
    persistConfig, rootReducer
)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export default store