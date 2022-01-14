import { combineReducers } from '@reduxjs/toolkit';
import store from '../redux/store';
import user from './Auth/authSlice';
import cart from './Cart/cartSlice';
import product from './Product/productSlice';
import order from './Order/orderSlice';
import blogs from './Blog/blogSlice';
import image from './Image/imageSlice';
const rootReducer = combineReducers({
    user,
    cart,
    product,
    order,
    blogs,
    image
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export default rootReducer;