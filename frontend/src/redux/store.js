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

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}



const rootReducer = combineReducers({
    auth: authReducer,
    chat: chatReducer,
    message: messageReducer
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