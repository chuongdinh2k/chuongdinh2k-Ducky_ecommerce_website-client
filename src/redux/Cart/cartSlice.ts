import { createSlice} from "@reduxjs/toolkit";
import {cartItem} from "../../interface/cart"; 
import { addToCart, decreaseCart, loadCart, removeCartItem } from "./asyncAction";
export interface cartState{
    isLoading: boolean,
    product?:Array<cartItem>,
    errorMessage?: string;
}

const initialState:cartState = {
    isLoading: false,
    product:undefined,
}
export const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addToCart.fulfilled,(state,{payload})=>{
            state.product = payload;
        });
        builder.addCase(loadCart.fulfilled,(state,{payload})=>{
            state.product =payload;
        });
        builder.addCase(decreaseCart.fulfilled,(state,{payload})=>{
            state.product = payload;
        });
        // remove cart item
        builder.addCase(removeCartItem.fulfilled,(state,{payload})=>{
            state.product = payload;
        })
    }
})
export const cartAction = cartSlice.actions;
export default cartSlice.reducer;
