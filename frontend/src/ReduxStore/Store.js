import { configureStore } from '@reduxjs/toolkit'
import  { authSlice } from './ReduxStore'
import {persistReducer,persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const presistConfic={
  key:'presist-store',
  storage,
}
const presistedAuthReducer=persistReducer(presistConfic,authSlice.reducer)

export const store = configureStore({
  reducer: {
    user:presistedAuthReducer
    },
})
export const persistor=persistStore(store)