export interface color{
    name?:string;
}
export interface review{
    name?:string;
    picture?:string;
    comment?:string;
    rating?:number;
    createdAt?:any;
}
export interface Product{
    id?: any;
    name?:string;
    color:Array<color>;
    image?:string;
    description?:string;
    category?:any;
    price:number;
    rating:number;
    countInStock:number;
    numReviews:number;
    email?:string;
    sellerId?:any;
    sellerName?:string;
    reviews:Array<review>;
    listImage?:any;
}