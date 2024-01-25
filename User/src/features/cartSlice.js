import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        loading: false,
    },
    reducers: {
        addToCart: (state, action) => {
            if (state.cart.length == 0) {
                var item = action.payload;
                item.qty = 1;
                state.cart.push(item)
            } else {
                var arr = state.cart;
                var check = false;
                arr.forEach(el => {
                    if (el.id == action.payload.id) {
                        el.qty += 1;
                        check = true;
                    }
                });
                if (check == false) {
                    var item = action.payload;
                    item.qty = 1;
                    state.cart.push(item)
                }
            }
        },
        removeFromCart: (state, action) => {
            const productIdToRemove = action.payload;
            console.log(action.payload);
            state.cart = state.cart.filter(item => item.id !== productIdToRemove);
        },
        clearCart: (state) => {
            state.cart = [];
        },
        updateQuantity: (state, action) => {
            var arr = state.cart;
            var index = arr.findIndex(item => item.id === action.payload[0]);
            arr[index].qty = action.payload[1];
            state.cart = arr;
        }
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export const selectCart = (state) => state.cart.cart;
export const selectTotal = (state) => {
    return state.cart.cart.reduce((total, item) => {
        return total += (item.price * item.qty);
    }, 0);
};
export default cartSlice.reducer;