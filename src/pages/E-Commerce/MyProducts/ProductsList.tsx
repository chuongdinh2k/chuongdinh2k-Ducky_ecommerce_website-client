import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Box,Typography,makeStyles, Theme,createStyles, IconButton, Paper } from '@material-ui/core'
import ListTable from '../../../components/MyProducts/ListTable';
import axios from "axios";
import {getOwnProductsApi} from "../../../api";
import { useAppSelector } from '../../../hooks/type';
import { useHistory,useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme)=>
    createStyles({
        root:{
            textAlign:"left"
        },
        buttonGreen:{
            fontSize:"14px",
            border:"none",
            boxShadow:"rgb(0 171 85 / 24%) 0px 8px 16px 0px",
            fontWeight:600,
            textTransform:"capitalize",
            padding:"8px 15px",
            borderRadius:theme.spacing(1),
            backgroundColor:"rgb(0, 171, 85)",
            color:"rgb(255, 255, 255)",
            cursor:'pointer',
            marginTop:"1rem",
            "&:hover":{
              backgroundColor:"rgb(10 147 78)"
            }
        },
        paper:{
            marginTop:theme.spacing(4),
            padding:'2rem',
            textAlign: 'left',
            borderRadius:'15px',
            boxShadow:"rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
            [theme.breakpoints.down("xs")]:{
                padding:"0"
            }
        },

    })
)

function ProductsList() {
    const classes = useStyles();
    const [products,setProducts] = React.useState<Array<any>>([]);
    const history = useHistory();
    const token = useAppSelector(state=>state.user?.currentUser?.token);
    // const location = useLocation()
    // Call api
    React.useEffect(()=>{
        const getOwnProducts =async()=>{
          const response = await axios.get(getOwnProductsApi,{
            headers: { Authorization: `Bearer ${token}` }
        });
            setProducts(response.data.products);
        }
        const timer = setTimeout(() => {
            getOwnProducts();
        }, 500);
        return () => clearTimeout(timer);
      },[token])
    return (
        <Box className={classes.root}>
            <Typography variant="h6" style={{fontWeight:600}}>Product List</Typography>
            <IconButton className={classes.buttonGreen} color="primary" onClick={()=>history.push('/Dashboard/Create')}>
                <AddIcon style={{fontSize:"16px",marginRight:"0.5rem"}}/>
                New Product
            </IconButton>
            <Paper className={classes.paper}>
                <Box>
                   
                        <Box>
                            <ListTable products={products} setProducts = {setProducts}/>
                       
                        </Box>
                </Box>
            </Paper>
        </Box>
    )
}

export default ProductsList
