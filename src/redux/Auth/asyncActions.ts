import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { changePasswordUserApi, followUserApi, loginApi, loginWithGoogleApi,registerApi,updateUserApi } from "../../api";

interface MyError{
    message: unknown;
}
export const registerAccount = createAsyncThunk(
    'user/register',
    async(data:{email:string,password:string,country:string,username:string})=>{
        try{
            const response = await axios.post(registerApi,data);
            const result = response.data;          
            toast.success(result.message);
             return result;
            
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
export const login = createAsyncThunk(
    'user/login',
    async(data:{email:string,password:string})=>{
        try{

            const response = await axios.post(loginApi,data);
             const user = response.data;          
             localStorage.setItem('currentUser', JSON.stringify(user));
             return user;
            
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
 export const loginWithGoogle = createAsyncThunk(
     'user/loginWithGoogle',
     async(googleData:any)=>{
         try{
  
             const response = await axios.post(loginWithGoogleApi,{
                 token:googleData.tokenId
             })
             const user = response.data;
             localStorage.setItem('currentUser', JSON.stringify(user));
             return user;
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
 export const followUser = createAsyncThunk(
    'user/follow',
    async(data:{id:any,token:any})=>{
        try{
            const response = await axios.post(followUserApi,data.id,{
                headers: { Authorization: `Bearer ${data.token}` },
            });
            const user = response.data;
            // toast.success("Add a item to cart successfully!");
            return user;
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
// update informations of user
export const updateUser = createAsyncThunk(
    'user/update',
    async(data:{item:any,token:any})=>{
        try{
            const response = await axios.post(updateUserApi,data.item,{
                headers: { Authorization: `Bearer ${data.token}` }
            });
            const user = response.data;
            toast.success("Update user's information successfully!");
            localStorage.setItem('currentUser', JSON.stringify(user));
            return user;
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
// change user's password
export const changePasswordUser = createAsyncThunk(
    'user/changePassword',
    async(data:{item:any,token:any})=>{
        try{
            const response = await axios.post(changePasswordUserApi,data.item,{
                headers: { Authorization: `Bearer ${data.token}` }
            });
            const user = response.data;
            toast.success(user.message);
            return user;
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