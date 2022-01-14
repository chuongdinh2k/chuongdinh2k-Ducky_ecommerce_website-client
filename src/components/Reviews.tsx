import React from 'react'
import { Avatar, Box, Button, Grid, Typography,IconButton } from '@material-ui/core';
import { makeStyles, Theme,createStyles } from "@material-ui/core";
import clsx from 'clsx';
import  convertTime  from '../helpers/time';
import { useAppSelector } from '../hooks/type';
import StarRating from './StarRating';
import AddReview from './Popup/AddReview';
const useStyles= makeStyles((theme: Theme)=>
    createStyles({
        root:{},
        childBox:{
            textAlign: 'center',
            display:'flex',
            flexDirection: 'column',
            height:"100%",
            padding:"2rem",
            alignItem:"center",
            justifyContent:'center',
            border:"1px solid #E5E8EB",
        },
        childBox2:{
            padding:"2rem",
            [theme.breakpoints.down("xs")]: {
                padding:"0",
              },

        },
        mb1:{
            marginBottom:"1rem"
        },
        large:{
            marginLeft:theme.spacing(3),
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
        button:{
            color:"#07AD5A",
            borderColor:"#07AD5A",
            fontWeight:700
        }
    })
)
function Reviews():JSX.Element {
    const classes = useStyles();
    const product = useAppSelector(state=>state.product.product);
    const [openCollapse,setOpenCollapse] = React.useState<boolean>(false);
    return (
       <Box className={classes.root}>
          {product? <Grid container >
                <Grid item xs={12} sm={12} md={4}>
                   <Box className={classes.childBox}>
                        <Typography variant="body1">Average rating</Typography>
                        <Typography variant="h4">{`${product?.rating}/5`}</Typography>
                        <Typography component="p"><StarRating star={product.rating}/></Typography>
                        <Typography variant="body1">({product.numReviews} reviews)</Typography>
                   </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                   <Box className={classes.childBox}>
                    <Typography variant="body1">5 stars</Typography>
                    <Typography variant="body1">4 stars</Typography>
                    <Typography variant="body1">3 stars</Typography>
                    <Typography variant="body1">2 stars</Typography>
                    <Typography variant="body1">1 stars</Typography>
                   </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                   <Box className={classes.childBox}>
                        <Button onClick={()=>setOpenCollapse(!openCollapse)} variant="outlined"  className={classes.button}>Add Your Review</Button>
                   </Box>
                </Grid>
           </Grid>:""}
           <AddReview setOpenCollapse={setOpenCollapse} openCollapse={openCollapse}/>
           <Box>
               {product&&product.reviews?product.reviews.map((item:any, index:number)=>
                   <Grid key={index} container style={{paddingTop:"1rem"}}>
                    <Grid item xs={6} sm={6} md={2}>
                        <Box className={classes.childBox2}>
                            <Avatar className={clsx(classes.mb1,classes.large)} src={item.user.picture}/>
                            <Typography variant="body1">{item.user.username}</Typography>
                            <Typography variant="body2">{convertTime(item.updatedAt)}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6} sm={6} md={10}>
                    <Box className={classes.childBox2}>
                            <StarRating star={item.rating}/>
                            <Typography style={{padding:"0.5rem 0"}} variant="body2">{item.comment}</Typography>
                            <IconButton style={{textTransform:"capitalize",fontSize:"16px",fontWeight:700,padding:"2px",borderRadius:"2px"}}>
                                Reply
                            </IconButton>
                    </Box>
                    </Grid>
               </Grid>
               ):""}
           </Box>
       </Box>
    )
}   

export default Reviews
