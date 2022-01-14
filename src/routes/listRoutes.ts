import IRoute from "../interface/route";
import Home from "../pages/DashBoard";
import Login from "../pages/Login";
import Register from "../pages/Register";
export const routes: IRoute[] = [
    {
        path: '/dashboard',  
        exact: false,
        component: Home,
        name: 'Home Page',
        protected:true
    },
    {
        path:'/login', 
        exact:true,
        component: Login,
        name:'Login Page',
        protected:false,
    },
    {
        path:'/register', 
        exact:true,
        component: Register,
        name:'Register Page',
        protected:false,
    },
   
];