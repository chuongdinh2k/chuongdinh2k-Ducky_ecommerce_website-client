import { createSlice} from "@reduxjs/toolkit";
import { address } from "../../interface/order";
import { addOrder } from "./orderAsyncAction";
export interface orderState{
    isLoading: boolean;
    shipping?:string;
    payment?:string;
    address?:Array<address>;
    result?:any;
    itemsPrice?:number;
    total?:number;
    shippingPrice?:number;
    pickedAddress?:any;
    errorMessage?: string;
    
}

const initialState:orderState={
    isLoading:false,
    address:[],
    shipping:'standard',
    payment:'cash'

}
export const orderSlice = createSlice({
    name:'order',
    initialState,
    reducers:{
        addAddress:(state:any,action)=>{
            state?.address.push(action.payload);
        },
        removeAddress:(state:any,action)=>{
            state.address = state?.address.filter((x:any)=>x.id!==action.payload);        
        },
        changeShipping:(state:any,action)=>{
            state.shipping = action.payload;
        },
        changePayment:(state:any,action)=>{
            state.payment = action.payload;
        },
        pickAddress:(state:any,action)=>{
            state.pickedAddress = state.address.filter((x:any)=>x.id===action.payload); 
        },
        resetResult:(state:any)=>{
            state.result = undefined
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(addOrder.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(addOrder.fulfilled,(state,{payload})=>{
            state.isLoading = false;
            state.result = payload;
        });

    }
})
export const {addAddress,removeAddress,changeShipping,changePayment,pickAddress,resetResult} = orderSlice.actions;
export default orderSlice.reducer
