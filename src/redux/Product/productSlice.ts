import {createSlice} from '@reduxjs/toolkit';
import { Product } from '../../interface/Product';
import { addReview, createProduct, getDetail } from './asyncActions';

export interface ProductState{
    isLoading:boolean;
    product?:Product;
    errorMessage?:string;
}
const initialState:ProductState = {
    isLoading:false,
    product:undefined,
}
export const productSlice = createSlice({
    name:"product",
    initialState, 
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(getDetail.fulfilled,(state,{payload})=>{
            state.product = payload
        });
        //add a Review
        builder.addCase(addReview.fulfilled,(state,{payload})=>{
            state.product = payload
        });
        // create a new product
        builder.addCase(createProduct.pending,(state)=>{
            state.isLoading=true
        });
        builder.addCase(createProduct.fulfilled,(state)=>{
            state.isLoading=false
        });
        builder.addCase(createProduct.rejected,(state)=>{
            state.isLoading=false
        })
    }
    
});

export const productAction = productSlice.actions;
export default productSlice.reducer;