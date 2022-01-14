import {createSlice} from '@reduxjs/toolkit';

export interface ImageState{
    open:boolean;
    images?:Array<any>;
    singleImage?:string;
}
const initialState:ImageState={
    open:false,
}
export const imageSlice = createSlice({
    name:"image",
    initialState,
    reducers:{
        viewImageList:(state:any,action)=>{
            state.open = !state.open;
            state.images = action.payload;
            state.singleImage = undefined;
        },
        viewSingleImage:(state:any,action)=>{
            state.open = !state.open;
            state.singleImage = action.payload;
            state.images = undefined;
        },
    }
});
export const {viewImageList,viewSingleImage} = imageSlice.actions;
export default imageSlice.reducer
