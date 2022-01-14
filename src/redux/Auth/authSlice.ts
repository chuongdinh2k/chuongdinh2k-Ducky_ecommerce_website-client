import { createSlice} from "@reduxjs/toolkit";
import { changePasswordUser, login, loginWithGoogle, updateUser,registerAccount} from "./asyncActions";

export interface LoginPayload{
    username:string;
    password:string; 
}

export interface AuthState{
    isLoading: boolean,
    isLoggedIn: boolean,
    logging?:boolean,
    currentUser?:any,
    errorMessage?: string;
}
const initialState:AuthState = {
    isLoading:false,
    isLoggedIn:false,
    logging:false,
    currentUser:localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser') as string) : undefined,
}

export const authSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        logOut(state){
            state.isLoggedIn = false;
            state.currentUser = undefined;
        }
    },
    extraReducers: (builder)=>{
        // register
        builder.addCase(registerAccount.pending,(state)=>{
            state.isLoading=true;
        });
        builder.addCase(registerAccount.fulfilled,(state)=>{
            state.isLoading=false;
        });
        builder.addCase(registerAccount.rejected,(state)=>{
            state.isLoading=false;
        });
        // login with email
        builder.addCase(login.pending,(state)=>{
            state.logging=true;
        });
        builder.addCase(login.fulfilled,(state,{payload})=>{
            state.logging=false;
            state.isLoggedIn = true;
            state.currentUser = payload;
            state.errorMessage = undefined;
        });
        builder.addCase(login.rejected,(state,action)=>{
            state.logging=false;
            state.isLoggedIn=false;
            state.currentUser= undefined;
            state.errorMessage = action.error.message;
        });
        
        // Login with google
        builder.addCase(loginWithGoogle.pending,(state)=>{
            state.logging=true;
        });
        builder.addCase(loginWithGoogle.fulfilled,(state,{payload})=>{
            state.logging=false;
            state.isLoggedIn = true;
            state.currentUser = Object.assign(payload);
            state.errorMessage = undefined;
        });
        builder.addCase(loginWithGoogle.rejected,(state,action)=>{
            state.logging=false;
            state.isLoggedIn=false;
            state.currentUser= undefined;
            state.errorMessage = action.error.message;
        });
        // update user
        builder.addCase(updateUser.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(updateUser.fulfilled,(state,{payload})=>{
            state.isLoading = false;
            
            state.currentUser = payload;
        });
        builder.addCase(updateUser.rejected,(state)=>{
            state.isLoading = false;
        });
        // change password
        builder.addCase(changePasswordUser.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(changePasswordUser.fulfilled,(state)=>{
            state.isLoading = false;
        });
        builder.addCase(changePasswordUser.rejected,(state)=>{
            state.isLoading = false;
        });
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;