import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createOrderApi } from "../../api";
import { toast } from "react-toastify";

interface MyError{
    message: unknown;
}
export const addOrder = createAsyncThunk(
    'order/addOrder',
    async(data:{token:any,item:any})=>{
        try{
            const response = await axios.post(createOrderApi,data.item,{
                headers: { Authorization: `Bearer ${data.token}` },
            });
            const order = response.data.order;
            return order;
        } catch(error){
            if(axios.isAxiosError(error) && error.response){
                const errorMessage = (error?.response?.data as MyError).message || error.message || 'There was an error';
                toast.error(errorMessage as string);
                throw new Error(errorMessage as string);
               
            }
          }   
    }
)