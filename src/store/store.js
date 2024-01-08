import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './reducers/productsSlice'
import cartReducer from './reducers/CartSlice.js'

export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer
    },
})