import React from 'react'
import { Paper,makeStyles,createStyles,Theme, Box, Avatar } from '@material-ui/core'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useHistory } from 'react-router-dom';

const useStyles= makeStyles((theme: Theme)=>
    createStyles({
        paper: {
            // padding: theme.spacing(1),
            position: 'relative',
            backgroundColor:'rgb(255, 255, 255)',
            color: theme.palette.text.secondary,
            whiteSpace: 'nowrap',
            marginBottom: theme.spacing(1),
            borderRadius:'16px',
            overflow:'hidden',
            boxShadow:'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
            paddingBottom: theme.spacing(2)
          },
          image:{
            width:'100%',
            height:'250px',
            [theme.breakpoints.down("xs")]: {
              height:'300px',
             }
          },
          wrapperImage:{

        },
        content:{
            paddingLeft:'1rem',
            paddingRight:'1rem'
        },
        name:{
            color:'#2C272E',
            fontSize:'1rem',
            fontWeight:700,
            cursor:'pointer',
            "&:hover":{
              textDecoration: 'underline',
            }
        },
    })
)
function Product(props:{item:any}):JSX.Element {
    const classes = useStyles();
    const history = useHistory();
    return (
        <Paper  className={classes.paper}>
        <div className={classes.wrapperImage}>
            {/* <img className={classes.image} src={item.image}/> */}
            <LazyLoadImage
               // alt={image.alt}
               className={classes.image}
               effect="blur"
               src={props.item.image} />
        </div>
        <div className={classes.content}>
            <p className={classes.name} onClick={()=>history.push(`/dashboard/Shop/product/${props.item._id}`)}>
                {props.item.name.toString()}
            </p>
            <Box sx={{display:"flex",flexDirection:'row',justifyContent:'space-between'}}>
    
                <Box sx={{width:"50%",display:'flex',alignItems:"center"}}>{props.item.color.map((color:any)=>
                        <Avatar key={color._id} style={{backgroundColor:color.name,color:color.name,width:"15px",height:"15px"}}  />
                   )}</Box>
                <p className={classes.name}>${props.item.price}</p>
            </Box>
        </div>
    </Paper>
    )
}

export default Product
