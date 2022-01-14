import React from 'react'
import clsx from 'clsx';
import detailStyles from './detailStyles';
import {Box,IconButton,Select,MenuItem,FormControl, FormControlLabel, Grid, Paper, Radio, RadioGroup, Typography, Button } from '@material-ui/core';
import StarRating from '../../../components/StarRating';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import SliderDetail from '../../../components/SliderDetail';
import {useParams} from 'react-router-dom';
import Spinner from '../../../components/Spinner';
import { addToCart } from '../../../redux/Cart/asyncAction';
import { useAppDispatch,useAppSelector } from '../../../hooks/type';
import { getDetail } from '../../../redux/Product/asyncActions';
import TabDetail from "../../../components/TabDetail";

const sizeShoes =['35','36','36.5','37','37.5','38','38.5','39','39.5','40','40.5','41','42'];
// const sizeClothes=['S','M','L','XL','XX'];

function Detail():JSX.Element {
  const dispatch = useAppDispatch();
   const token = useAppSelector(state=>state.user?.currentUser?.token);
    const [value, setValue] = React.useState('');
    const [size,setSize] = React.useState('');
    const [quantity,setQuantity] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue((event.target as HTMLInputElement).value);
    };

    const handleChangeSize = (event: React.ChangeEvent<{ value: unknown }>) => {
      setSize(event.target.value as string);
    };

    const classes = detailStyles(); 
    const {id}:any = useParams();
   
    
  // Call api
    React.useEffect(()=>{
      const getProductDetail =()=>{
        dispatch(getDetail({item:{_id:id}}));
      }
      const timer = setTimeout(() => {
        getProductDetail();
      }, 1000);
      return () => clearTimeout(timer);
    },[dispatch,id])
    const product = useAppSelector(state=>state.product.product);
     //add to cart
     const addToCartClick = ()=>{
      dispatch(addToCart({item:{
        name:product?.name,
        itemId:id,
        color:value,
        quantity:quantity,
        size:size,
        price:product?.price,
        image:product?.image,
        seller:product?.sellerId,
        // sellerName:product?.sellerName
      },token}));
    }
    if(product){
      return (
        <div className={classes.root}>
        <Typography variant="h6">{product?.name}</Typography>
        <Paper style={{padding:'8px',borderRadius:'15px',boxShadow:"rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",}}>
         <Grid container spacing={1}>
           <Grid item xs={12} sm={12} md={6}>
               <Box sx={{padding:"8px"}}>
                 <SliderDetail listImages={product?.listImage}/>
               </Box>
           </Grid>
           <Grid item xs={12} sm={12} md={6}>
             <Box className={classes.boxRight} mt={2} sx={{display: 'flex', flexDirection: 'column'}}>
              {/* <p className={classes.inStock}>IN STOCK</p>
              <p className={classes.outOfStock}>OUT OF STOCK</p> */}
              {product?.countInStock<=0?<p className={classes.outOfStock}>OUT OF STOCK</p>:<p className={classes.inStock}>IN STOCK</p>}
               <span style={{color:'red',fontWeight: 700,paddingTop:'1rem'}}>SALE</span>
               <Typography style={{paddingTop:'1rem'}} variant="h6">{product?.name}</Typography>
               <span style={{display:'flex',paddingTop:'1rem'}}>
                <StarRating star={product?.rating}/>
                ({product?.numReviews} reviews)
               </span>
               <Typography style={{padding:'1rem 0'}} variant="h5">${product.price}</Typography>
               <span style={{borderBottom:'1px dashed #e0d8d7'}}></span>
               <Box mt={3} className={classes.colorBox}>
                 <Typography component="p">Color</Typography>
                 <FormControl style={{width:"50%"}} component="fieldset" >
                   <RadioGroup className={classes.radioBox} aria-label="color" name="color1" value={value} onChange={handleChange}>
                     {product?.color.map((color:any,i:any)=>
                        <FormControlLabel key={i} value={`${color.name}`} control={<Radio color="primary"/>} label={`${color.name}`} />
                     )}
                   </RadioGroup>
                 </FormControl>
               </Box>
               <Box mt={3} sx={{display:'flex',justifyContent: 'space-between'}}>
                 <Typography component='p'>Size</Typography>
                 <FormControl className={classes.formControl}>
                 <Select
                   labelId="demo-mutiple-name-label"
                   id="demo-mutiple-name"
                   value={size}
                   onChange={handleChangeSize}
                 >
                   {sizeShoes.map((size,i) => (
                     <MenuItem key={i} value={size}>
                       {size}
                     </MenuItem>
                   ))}
                 </Select>
                 </FormControl>
               </Box>
               <Box mt={3} mb={3} sx={{display:'flex',justifyContent: 'space-between'}}>
                 <Typography component='p'>Quantity</Typography>
                 <Box>
                   <Box  className={classes.inputBox}>
                     <IconButton onClick={()=>setQuantity(quantity+1)} disabled={quantity>=product.countInStock?true:false}  size="small" color="primary"  component="span">
                       <AddIcon color='action' />
                     </IconButton>
                     <Typography  component='span' variant='body2' className={classes.inputBox_value}>{quantity}</Typography>
                     <IconButton onClick={()=>setQuantity(quantity-1)} disabled={quantity<=1?true:false} size="small" color="primary"  component="span">
                       <RemoveIcon  color='action' />
                     </IconButton>
                   </Box>
                   <Typography color='textSecondary' variant='body2'>Available: {product.countInStock}</Typography>
                 </Box>
               </Box>
               <span style={{borderBottom:'1px dashed #e0d8d7'}}></span>
               <Box mt={3} mb={3} sx={{display:'flex'}}>
                 <Button className={clsx(classes.button,classes.addToCart)} disabled={product.countInStock===0?true:false} variant="contained" onClick={addToCartClick}>
                   Add To Cart
                 </Button>
                 <Button className={clsx(classes.button,classes.buyNow)} disabled={product.countInStock===0?true:false} variant="contained" >
                   Buy Now
                 </Button>
               </Box>
              </Box>
           </Grid>
         </Grid>
        </Paper>

        <TabDetail/>

      </div>
        
      )
    }
    else{
      return(
        <Spinner/>
      )
    }
}

export default Detail
