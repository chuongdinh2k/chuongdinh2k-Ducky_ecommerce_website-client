import axios from "axios";
import { toast } from "react-toastify";
// export const url = 'http://localhost:5000';sadsad
export const url = 'https://ducky-ecommerce-server.herokuapp.com';
export const clientUrl = 'http://localhost:3000'
export const registerApi = `${url}/api/auth/register`;
export const loginApi = `${url}/api/auth/login`;
export const loginWithGoogleApi = `${url}/api/auth/loginWithGoogle`;
export const getAllProductsApi = `${url}/api/product/all`;
export const getProductDetailApi = `${url}/api/product/detail`;
    
// add to cart
export const addToCartApi = `${url}/api/cart/addToCart`;

//load my cart 
export const loadCartApi = `${url}/api/cart/mine`;

//decrease items in cart
export const decreaseCartApi = `${url}/api/cart/decrease`;

//decrease items in cart
export const increaseCartApi = `${url}/api/cart/increase`;

//remove cartItem 
export const removeCartItemApi = `${url}/api/cart/remove`;
//add review item
export const addReviewItemApi = `${url}/api/product/review`;
//create new product
export const createProductApi=`${url}/api/product/upload`
//create a order
export const createOrderApi = `${url}/api/order/`;
//get invoice
export const getInvoiceApi = `${url}/api/order/mine`;
//get own products
export const getOwnProductsApi = `${url}/api/product/mine`;

interface MyError{
    message: unknown;
}

//delete products
export const deleteProductsApi= `${url}/api/product/delete`;

//get user blog 
export const getUserBlogApi = `${url}/api/blog/userBlog`;
// export view profile
export const viewProfileApi = `${url}/api/auth/user/viewProfile`;
export const viewProfile = async(data:{id:any,token:any})=>{
        try{
            const response = await axios.post(viewProfileApi,data.id,{
                headers: { Authorization: `Bearer ${data.token}` },
            });
            const user = response.data;
            // toast.success("Add a item to cart successfully!");
            return user;
        }
        catch(error){
            if(axios.isAxiosError(error) && error.response){
                // const errorMessage = (error?.response?.data as MyError).message || error.message || 'There was an error';
                // toast.error(errorMessage as string);
                // throw new Error(errorMessage as string);
            }
          }   
}

// follow
export const followUserApi = `${url}/api/auth/user/follow`;
export const followUser = async(data:{id:any,token:any})=>{
    try{
        const response = await axios.post(followUserApi,{id:data.id},{
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
            // throw new Error(errorMessage as string);
        }
      }   
}


//  get follow list
export const getFollowApi = `${url}/api/auth/user/getFollow`;
export const getFollow = async(token:any)=>{
    try{
        const response = await axios.get(getFollowApi,{
            headers: { Authorization: `Bearer ${token}` },
        });
        const user = response.data;
        // toast.success("Add a item to cart successfully!");
        return user;
    }
    catch(error){
        if(axios.isAxiosError(error) && error.response){
            const errorMessage = (error?.response?.data as MyError).message || error.message || 'There was an error';
            toast.error(errorMessage as string);
            // throw new Error(errorMessage as string);
        }
      }   
}

//like post
export const likePostApi = `${url}/api/blog/userBlog/like`;
// comment post
export const commentPostApi = `${url}/api/blog/userBlog/comment`;
//add post
export const createPostApi = `${url}/api/blog/userBlog/upload`;
//delete post 
export const deletePostApi = `${url}/api/blog//userBlog/delete`;
//update user
export const updateUserApi = `${url}/api/auth/user/update`;
// change user password
export const changePasswordUserApi = `${url}/api/auth/user/changePassword`;
