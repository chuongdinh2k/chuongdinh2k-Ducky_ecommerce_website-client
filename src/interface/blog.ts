
export default interface Blog{
    _id:any,
    user:any,
    content?:string,
    status?:string,
    checkIn?:string,
    images?:Array<any>,
    tag?:string,
    userLikes?:Array<any>,
    comments?:Array<any>
}