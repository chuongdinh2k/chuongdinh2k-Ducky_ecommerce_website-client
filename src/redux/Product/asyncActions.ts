import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { addReviewItemApi, createProductApi, getProductDetailApi } from "../../api";
import {IReview} from "../../interface/review";
interface MyError{
    message: unknown;
}

export const getDetail = createAsyncThunk(
    'product/detail',
    async(data:{item:any})=>{
        try{
            const response = await axios.post(getProductDetailApi,data.item);
            const product = response.data;
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
export const addReview = createAsyncThunk(
    'product/addReview',
    async(data:{item:IReview,token:any})=>{
        try{
            const response = await axios.post(addReviewItemApi,data.item,{
                headers: { Authorization: `Bearer ${data.token}` },
            });
            toast.success("Added a review successfully!");
            const product = response.data.product;
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
export const createProduct = createAsyncThunk(
    'product/create',
    async(data:{item:any,token:any})=>{
        try{
            const response = await axios.post(createProductApi,data.item,{
                headers: { Authorization: `Bearer ${data.token}` },
            });
            toast.success("created product successfully!");
            const product = response.data.product;
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
