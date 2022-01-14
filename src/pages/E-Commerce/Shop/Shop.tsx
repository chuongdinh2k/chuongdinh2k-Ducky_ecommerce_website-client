import { Typography,Grid,Box } from '@material-ui/core';
import React from 'react';
import shopStyles from './shopStyles';
import axios from 'axios';
import Spinner from '../../../components/Spinner';
import SearchProduct from '../../../components/SearchProduct';
import FilterProducts from '../../../components/FilterProducts';
import Product from '../../../components/Shop/Product';
import InfiniteScroll from "react-infinite-scroll-component";
import {useParams } from "react-router-dom";
import { ArrayToURL } from '../../../helpers/utils';
import {url} from '../../../api';
function Shop() {
    const classes = shopStyles();
    const [products,setProducts] = React.useState<any>([]);
    const [page,setPage] =React.useState(1);
    const [hasMore,setHasMore] =React.useState<boolean>(true);
    const {id}:any = useParams();

    //get value of params on url
    const queryParams = new URLSearchParams(window.location.search);
    const q = queryParams.get('q');
    const rating = new URLSearchParams(window.location.search).get("rating");
    const category = new URLSearchParams(window.location.search).get("category");
    const colors = new  URLSearchParams(window.location.search).getAll("color");
    const [filter,setFilter] = React.useState<any>({
        gender:id?id:"all",
        rating: rating?rating:0,
        q:q?q:"",
        category:category?category:"",
        color:colors?colors:""

    });
    const colorParams = filter.color.length>0?ArrayToURL(filter.color,"&color[]"):"";
    React.useEffect(()=>{
        const getAllProducts=async()=>{
            const response = await axios.get(`${url}/api/product/filter/${filter.gender}?limit=4&page=${1}&name=${filter.q}&rating=${filter.rating}&category=${filter.category}${colorParams}`);
            setProducts(response.data)
            setPage(page+1);
            setHasMore(true);
        }
        getAllProducts();
    },[filter]);

    const fetchMoreData = async() => {
        const response = await axios.get(`${url}/api/product/filter/${filter.gender}?limit=4&page=${page}&name=${filter.q}&rating=${filter.rating}&category=${filter.category}${colorParams}`);
        if(response.data.categories.length == 0) {
            setHasMore(false);
            return;
        }
        else{
            setTimeout(() => {
                setProducts({
                    categories:[...products.categories,...response.data.categories]
                });
                setPage(page+1);
            }, 1500);
        }
      };
    return (
        <div className={classes.root}>
           <Typography variant='h6'>
               Shop
           </Typography>
            <Box pb={5} className={classes.filter}>
                <SearchProduct products={products} filter={filter} setFilter={setFilter} setPage={setPage}/>
                <FilterProducts products={products} setProducts={setProducts} filter={filter} setFilter={setFilter} setPage={setPage}/>
            </Box>
          <div>
            {products?.categories? 
             <InfiniteScroll
                style={{overflow: 'hidden'}}
                dataLength={products.categories?.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4 style={{textAlign:'center'}}>Loading...</h4>}
                >
                    <Grid  container spacing={3}>
                        {products?.categories.map((item:any,index:any)=>
                            <Grid key={index} item xs={12} md={3} sm={6}>
                                <Product item={item}/>
                            </Grid>
                            
                        )}
                        
                     </Grid>
                
                </InfiniteScroll>:<Spinner/>}
          </div>
        </div>
    )
}

export default Shop
