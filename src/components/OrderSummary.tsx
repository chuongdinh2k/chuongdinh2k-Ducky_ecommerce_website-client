import { Box, Divider, Paper, Typography } from '@material-ui/core'
import { makeStyles, Theme,createStyles } from "@material-ui/core";
import { useAppSelector } from '../hooks/type';
const useStyles = makeStyles((theme: Theme)=>
    createStyles({
        root:{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left',
            padding:'2rem',
            borderRadius:'15px',
             boxShadow:"rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px"
        },
        childBox:{
            display:'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop:"20px"
        }
    })
)
function OrderSummary():JSX.Element {
    const classes = useStyles();
    const cart = useAppSelector(state=>state.cart);
    const order = useAppSelector(state=>state.order);
    const shippingFee = order?.shipping==="fast"?2:0;
    const subTotal = cart?.product&&cart?.product?.length>0?cart?.product.reduce(
        (previousValue, currentValue) => currentValue?.total?previousValue + currentValue?.total:0
        ,0):0;
    const total = Number(subTotal)+Number(shippingFee);
    return (
        <div>
            <Paper className={classes.root}>
                <Typography variant="h6">Order Summary</Typography>
                <Box className={classes.childBox}>
                    <Typography variant="body2">Sub Total </Typography>
                    <Typography variant="body2">${subTotal }</Typography>
                </Box>
                <Box className={classes.childBox}>
                    <Typography variant="body2">Discount </Typography>
                    <Typography variant="body2">0</Typography>
                </Box>
                <Box className={classes.childBox}>
                    <Typography variant="body2">Shipping </Typography>
                    <Typography variant="body2">{shippingFee===2?"$2.00":"FREE"}</Typography>
                </Box>
                <Divider style={{marginTop:"16px"}}/>
                <Box className={classes.childBox}>
                    <Typography component="p">Total </Typography>
                    <Typography style={{color:"#FF4943"}} component="p">${total}</Typography>
                </Box>

            </Paper>
        </div>
    )
}

export default OrderSummary
