import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { commentPostApi, createPostApi, deletePostApi, getUserBlogApi, likePostApi } from "../../api";

interface MyError{
    message: unknown;
}
export const createPost = createAsyncThunk(
    'blogs/createPost',
    async(data:{item:any,token:any})=>{
        try{
            const response = await axios.post(createPostApi,data.item,{
                headers: { Authorization: `Bearer ${data.token}` },
            });
            toast.success("created post successfully!");
            const post = response.data;
            console.log(post);
            return post;
        }
        catch(error){
            if(axios.isAxiosError(error) && error.response){
                const errorMessage = (error?.response?.data as MyError).message || error.message || 'There was an error';
                toast.error(errorMessage as string);
                throw new Error(errorMessage as string);
            }
          }   
    }
);
// export const loadBlogs =createAsyncThunk(
//     'blogs/loadBlog',
//     async(data:{id:any,page?:number})=>{
//         try{
//             const response = await axios.get(`${getUserBlogApi}/${data.id}?limit=1&page=${data.page}`);
//             const blogs = response.data.blogs;
//             // toast.success("Add a item to cart successfully!");
//             return blogs;
//         }
//         catch(error){
//             if(axios.isAxiosError(error) && error.response){
//                 const errorMessage = (error?.response?.data as MyError).message || error.message || 'There was an error';
//                 toast.error(errorMessage as string);
//                 throw new Error(errorMessage as string);
               
//             }
//         }
//     }
// );
// export const loadMoreBlogs =createAsyncThunk(
//     'blogs/loadMoreBlogs',
//     async(data:{id:any,page:number})=>{
//         try{
//             const response = await axios.get(`${getUserBlogApi}/${data.id}?limit=1&page=${data.page}`);
//             const blogs = response.data.blogs;
//             // toast.success("Add a item to cart successfully!");
//             return blogs;
//         }
//         catch(error){
//             if(axios.isAxiosError(error) && error.response){
//                 const errorMessage = (error?.response?.data as MyError).message || error.message || 'There was an error';
//                 toast.error(errorMessage as string);
//                 throw new Error(errorMessage as string);
               
//             }
//         }
//     }
// );
export const likePost =createAsyncThunk(
    'blogs/likePost',
    async(data:{id:any,token:any})=>{
        try{
            const response = await axios.post(likePostApi,{id:data.id},{
                headers: { Authorization: `Bearer ${data.token}` },
            });
            const post = response.data;
            // toast.success("Add a item to cart successfully!");
            return post;
        }
        catch(error){
            if(axios.isAxiosError(error) && error.response){
                const errorMessage = (error?.response?.data as MyError).message || error.message || 'There was an error';
                toast.error(errorMessage as string);
                throw new Error(errorMessage as string);
               
            }
          }   
    }
);

export const commentPost = createAsyncThunk(
    'blogs/commentPost',
    async(data:{item:any,token:any})=>{
        try{
            const response = await axios.post(commentPostApi,data.item,{
                headers: { Authorization: `Bearer ${data.token}` },
            });
            const post = response.data;
            return post;
        }
        catch(error){
            if(axios.isAxiosError(error) && error.response){
                const errorMessage = (error?.response?.data as MyError).message || error.message || 'There was an error';
                toast.error(errorMessage as string);
                throw new Error(errorMessage as string);
            }
          }   
    }
);
export const deletePost = createAsyncThunk(
    'blogs/deletePost',
    async(data:{id:any,token:any})=>{
        try{
             await axios.delete(deletePostApi,{
                headers: { Authorization: `Bearer ${data.token}` },
                data:{id:data.id}
            });
            //  toast.success("deleted post successfully!");
            return data.id;
        }
        catch(error){
            if(axios.isAxiosError(error) && error.response){
                const errorMessage = (error?.response?.data as MyError).message || error.message || 'There was an error';
                toast.error(errorMessage as string);
                throw new Error(errorMessage as string);
            }
          }   
    }
);