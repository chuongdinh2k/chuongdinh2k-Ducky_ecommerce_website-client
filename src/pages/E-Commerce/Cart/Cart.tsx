import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme,createStyles,withStyles, Box, IconButton } from "@material-ui/core";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory } from 'react-router-dom';
import { useAppSelector,useAppDispatch } from '../../../hooks/type';
import cartEmpty from '../../../assets/images/illustration_empty_cart.svg';
import { decreaseCart, increaseCart, loadCart, removeCartItem } from '../../../redux/Cart/asyncAction';
const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "#F4F6F8",
      color: "#637381",
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const useStyles = makeStyles((theme: Theme)=>
    createStyles({
      wrapperTable:{
        padding:'2rem',
        width:"100%",
         [theme.breakpoints.up("xs")]: {
            padding:'0'
            },
        textAlign: 'left',
        borderRadius:'15px',
        boxShadow:"rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
        overflowX:"auto",
      },
      table: {
            display:"table",
            minWidth:"800px",
        },
      item__image:{
        width: "90px",
        height: "70px",
        borderRadius:"10px",
        marginRight: theme.spacing(2),
      },
      inputBox:{
        display:'flex',
        border:'1px solid #e0d8d7',
        borderRadius:'15px'
    },
      inputBox_value:{
        margin: '0px',
        lineHeight: 1.57143,
        fontSize: '0.875rem',
        fontWeight: 400,
        width: '40px',
        textAlign: 'center',
        display: 'inline-block',
        paddingTop:'0.2rem'
      },
      paddingCell:{
        padding:"0.5rem 1rem"
      }
    })
);

export default function TableCheckOut() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state=>state.cart);
  const token = useAppSelector(state=>state.user?.currentUser?.token);

  const classes = useStyles();
  // call api when component did mount
  // React.useEffect(()=>{
  //   dispatch(loadCart({token}))
  // },[dispatch,token])
  return (
    <div>
      <TableContainer className={classes.wrapperTable}  component={Paper}>
      <Typography variant="h6">Card <span style={{fontSize:"14px"}}>{cart.product?`(${cart.product.length} items)`:"(0 item)"}</span></Typography>
      {cart.product&&cart.product.length>0?<Table className={classes.table} size="small" aria-label="a dense table">
         <TableHead>
          <TableRow>
            <StyledTableCell>Product</StyledTableCell>
            <StyledTableCell className={classes.paddingCell}  align="center">Price</StyledTableCell>
            <StyledTableCell className={classes.paddingCell}  align="center">Quantity</StyledTableCell>
            <StyledTableCell className={classes.paddingCell}  align="center">Total Price</StyledTableCell>
            <StyledTableCell className={classes.paddingCell}  align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {cart.product.map((item,index)=><TableRow key={index}>
              <TableCell size="medium" component="th" scope="row">
                <Box sx={{display:'flex'}}>
                  <img className={classes.item__image} src={item.image} alt={item.image} />
                  <Box sx={{display:'flex',flexDirection:'column'}}>
                    <Typography variant="body1">{item.name}</Typography>
                    <Box>
                      <Typography style={{paddingRight:"1rem"}} component='span'>size: {item.size}</Typography>
                      <Typography component='span'>color: {item.color}</Typography>
                    </Box>
                  </Box>
                </Box>
              </TableCell>
              <TableCell className={classes.paddingCell}  size="medium" align="right">${item.price}</TableCell>
              <TableCell className={classes.paddingCell} align="right">
                <Box  className={classes.inputBox} style={{marginTop:'1rem'}}>
                  <IconButton 
                  onClick={()=>dispatch(decreaseCart({item:{
                    itemId:item.itemId,
                    color:item.color,
                    size:item.size
                  },token}))} size="small" color="primary"  component="span">
                   <RemoveIcon/>
                  </IconButton>
                   <Typography  component='span' variant='body2' className={classes.inputBox_value}>{item.quantity}</Typography>
                  <IconButton onClick={()=>dispatch(increaseCart({
                    item:{
                      itemId:item.itemId,
                      color:item.color,
                      size:item.size
                  },token}))} disabled={item?.quantity>=item?.available?true:false} size="small" color="primary"  component="span">
                   <AddIcon/>
                  </IconButton>
                </Box>
                <Typography variant="body2" component="span" style={{fontSize:"12px",textAlign:"left"}}>Available: {item.available}</Typography>
              </TableCell>
              <TableCell className={classes.paddingCell}  align="right">${item.total}</TableCell>
              <TableCell className={classes.paddingCell}  align="right">
                <IconButton size="small" onClick={()=>dispatch(removeCartItem({item:{
                  _id:item._id
                },token}))}><DeleteOutlineIcon/></IconButton>
              </TableCell>
            </TableRow>)}
        </TableBody>
      </Table>: <Box sx={{textAlign:"center"}}>
          <img src={cartEmpty} alt="cart empty"/>
          <Typography >Cart is empty!</Typography>
          <Typography variant="body2">Look like you have no items in your shopping cart.</Typography>
        </Box>}
    </TableContainer>
    <Box  pt={2} sx={{textAlign:"left"}}>
      <IconButton size="small" style={{fontSize: '14px',color:"#212121",borderRadius:"5px"}} onClick={()=>history.push('/dashboard/Shop')}>
          <ArrowBackIosIcon style={{fontSize: '14px'}}/>
          Continue Shopping
      </IconButton>
    </Box>
    </div>
  );
}
