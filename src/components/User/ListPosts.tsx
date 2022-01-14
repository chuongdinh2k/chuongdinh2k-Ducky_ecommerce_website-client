import React from 'react'
import { Box } from '@material-ui/core'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router';
import axios from 'axios';
import { getUserBlogApi } from '../../api';
import Post from './Post';
import { useAppDispatch, useAppSelector } from '../../hooks/type';
import { blogActions } from '../../redux/Blog/blogSlice';
function ListPosts():JSX.Element {
    const {id}:any = useParams();
    const [page,setPage] =React.useState(1);
    const dispatch = useAppDispatch();
    const blog = useAppSelector(state=>state.blogs);
    console.log(blog);
    React.useEffect(()=>{
        // if(blog.hasMore){
            const getUserBlogs=async()=>{
                const response = await axios.get(`${getUserBlogApi}/${id}?limit=5&page=${page}`);

                dispatch(blogActions.loadData({
                    page:blog?.page+1,
                    hasMore:true,
                    blogs:[...response.data.blogs]
                }));
                dispatch(blogActions.setHasMore({
                    hasMore:true
                }))
                setPage(page+1);
            }
            getUserBlogs();
        // }
    },[]);
   
    const fetchMoreData = async() => {
        const response = await axios.get(`${getUserBlogApi}/${id}?limit=5&page=${page}`);
        if(response.data.blogs.length == 0) {
            dispatch(blogActions.setHasMore({
                hasMore:false
            }));
            return;
        }
        else{
            setTimeout(() => {
                // setBlogs([...blogs,...response.data.blogs]);
                setPage(page+1);
                dispatch(blogActions.loadData({
                    page:blog?.page+1,
                    blogs:[...blog.blogs,...response.data.blogs]
                }));
            }, 1000);
        }
      };
    return (
        <Box>
            <InfiniteScroll
               
                style={{overflow: 'hidden'}}
                dataLength={blog.blogs?.length}
                next={fetchMoreData}
                hasMore={blog.hasMore}
                loader={<h4 style={{textAlign:'center'}}>Loading...</h4>}
                >
                     <div style={{padding:"1rem"}}>{blog.blogs.map((blog:any,index:any)=>
                           <Post key={blog._id} blog={blog}/>
                        )}</div>
                
                </InfiniteScroll>
        </Box>
    )
}

export default ListPosts
