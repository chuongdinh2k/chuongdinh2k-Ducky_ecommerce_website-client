import { createSlice} from "@reduxjs/toolkit";
import Blog from "../../interface/blog";
import { commentPost, createPost, deletePost, likePost } from "./blogAsyncAction";

export interface BlogState{
    isLoading:boolean,
    blogs:Array<Blog>, 
    hasMore:boolean,
    page:number,
    errorMessage?:string
}

const initialState:BlogState = {
    isLoading:false,
    blogs:[],
    hasMore:true,
    page:1,

}
export const blogsSlice = createSlice({
    name:"blogs",
    initialState,
    reducers:{
        setPage:(state,action)=>{
            state.page = action.payload;
        },
        loadData:(state,action)=>{
                state.page= action.payload.page;
                state.blogs = action.payload.blogs;
        },
        setHasMore:(state,action)=>{
            state.hasMore = action.payload.hasMore;
        }
    },
    extraReducers: (builder)=>{
        // builder.addCase(loadBlogs.fulfilled,(state,{payload})=>{
        //     state.blogs = payload;
        // });
        // builder.addCase(loadMoreBlogs.fulfilled,(state,{payload})=>{
        //     state.blogs = state.blogs?[...state.blogs,...payload]:payload;
        // });
        builder.addCase(likePost.fulfilled,(state,{payload})=>{
            state.blogs = state.blogs.map((blog)=>
                blog._id == payload._id
                ? {
                    ...blog,
                    userLikes:payload.userLikes
                }: blog
            )
        });
        builder.addCase(commentPost.fulfilled,(state,{payload})=>{
            state.blogs = state.blogs.map((blog)=>
            blog._id == payload._id
            ? {
                ...blog,
                comments:payload.comments
            }: blog
        )
        });
        builder.addCase(createPost.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(createPost.fulfilled,(state,{payload})=>{
            state.isLoading = false;
            state.blogs.unshift(payload);
        });
        builder.addCase(createPost.rejected,(state)=>{
            state.isLoading = false;
        });
        builder.addCase(deletePost.fulfilled,(state,{payload})=>{
            state.blogs = state.blogs.filter((blog)=>
                blog._id != payload
            )
        })
        
    }
});
export const blogActions = blogsSlice.actions;
export default blogsSlice.reducer;
