import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { addToCartApi, decreaseCartApi, increaseCartApi, loadCartApi, removeCartItemApi } from "../../api";
interface MyError{
    message: unknown;
}
// load my cart
export const loadCart = createAsyncThunk(
    'cart/loadCart',
    async(data:{token:any})=>{
        try{
            const response = await axios.get(loadCartApi,{
                headers: { Authorization: `Bearer ${data.token}` }
            });
            const product = response.data.cart.products;
            return product;
        }
        catch(error){
            if(axios.isAxiosError(error) && error.response){
                const errorMessage = (error?.response?.data as MyError).message || error.message || 'There was an error';
                toast.error(errorMessage as string);
                throw new Error(errorMessage as string);
               
            }
          }   
    }
)

// add to cart 
export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async(data:{item:any,token:any})=>{
        try{
            const response = await axios.post(addToCartApi,data.item,{
                headers: { Authorization: `Bearer ${data.token}` },
            });
            const product = response.data.cart.products;
            toast.success("Add a item to cart successfully!");
            return product;
        }
        catch(error){
            if(axios.isAxiosError(error) && error.response){
                const errorMessage = (error?.response?.data as MyError).message || error.message || 'There was an error';
                toast.error(errorMessage as string);
                throw new Error(errorMessage as string);
               
            }
          }   
    }
)

// decrease items in cart
export const decreaseCart = createAsyncThunk(
    'cart/decreaseCart',
    async(data:{item:any,token:any})=>{
        try{
            const response = await axios.post(decreaseCartApi,data.item,{
                headers: { Authorization: `Bearer ${data.token}` },
            });
            const product = response.data.cart.products;
            return product;
        }
        catch(error){
            if(axios.isAxiosError(error) && error.response){
                const errorMessage = (error?.response?.data as MyError).message || error.message || 'There was an error';
                toast.error(errorMessage as string);
                throw new Error(errorMessage as string);
               
            }
          }   
    }
)

// increase items in cart
export const increaseCart = createAsyncThunk(
    'cart/decreaseCart',
    async(data:{item:any,token:any})=>{
        try{
            const response = await axios.post(increaseCartApi,data.item,{
                headers: { Authorization: `Bearer ${data.token}` },
            });
            const product = response.data.cart.products;
            return product;
        }
        catch(error){
            if(axios.isAxiosError(error) && error.response){
                const errorMessage = (error?.response?.data as MyError).message || error.message || 'There was an error';
                toast.error(errorMessage as string);
                throw new Error(errorMessage as string);
               
            }
          }   
    }
)
//remove from cart
export const removeCartItem = createAsyncThunk(
    'cart/remove',
    async(data:{item:any,token:any})=>{
        try{
            const response = await axios.post(removeCartItemApi,data.item,{
                headers: { Authorization: `Bearer ${data.token}` },
            });
            const product = response.data.cart.products;
            return product;
        }
        catch(error){
            if(axios.isAxiosError(error) && error.response){
                const errorMessage = (error?.response?.data as MyError).message || error.message || 'There was an error';
                toast.error(errorMessage as string);
                throw new Error(errorMessage as string);
               
            }
          }   
    }
)