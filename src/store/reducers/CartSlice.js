import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {items: [], isInitialCart: true},
    reducers: {
        addToCart: (state, action) => {
            state.items.push({
                ...action.payload,
                count: 1
            });
            state.isInitialCart = false;
        },
        increaseCount: (state, action) => {
            const selectedItem = state.items.find(item => item.id === action.payload);
            state.isInitialCart = false;
            if (selectedItem) {
                selectedItem.count++;
            }
        },
        decreaseCount: (state, action) => {
            const selectedItem = state.items.find(item => item.id === action.payload);
            state.isInitialCart = false;
            if (selectedItem) {
                if (selectedItem.count > 1) {
                    selectedItem.count--;
                } else {
                    delete selectedItem.count;
                    state.items = state.items.filter(item => item.id !== action.payload)
                }
            }
        },
        setCartItems: (state, action) => {
            state.isInitialCart = false;
            state.items = action.payload;
        }
    },
});

export const {addToCart, increaseCount, decreaseCount, setCartItems} = cartSlice.actions;
export default cartSlice.reducer;
