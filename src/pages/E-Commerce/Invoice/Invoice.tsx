import React from 'react'
import axios from 'axios';
import moment from "moment";
import { Box, Paper, Typography,Grid } from '@material-ui/core';
import { getInvoiceApi } from '../../../api';
import InvoiceTable from '../../../components/Invoice/InvoiceTable';
import { useAppSelector } from '../../../hooks/type';
import useStyles from "./invoiceStyle";
function Invoice():JSX.Element {
    const [invoices,setInvoices] = React.useState([]);
    const token = useAppSelector(state=>state.user?.currentUser?.token);
    React.useEffect(()=>{
        const getInvoices =async()=>{
          const response = await axios.get(getInvoiceApi,{
            headers: { Authorization: `Bearer ${token}` }
        });
            setInvoices(response.data.order);
        }
        const timer = setTimeout(() => {
            getInvoices();
        }, 500);
        return () => clearTimeout(timer);
      },[token])
      console.log(invoices);
    const classes = useStyles();
    return (
        <div style={{textAlign:"left"}}>
            <Typography variant="h6" style={{fontWeight: 600 }}>Invoice Detail</Typography>
            {invoices&&invoices?.length!==0?invoices.map((invoice:any)=>
                    <Paper key={invoice._id} className={classes.root}>
                    <Box className={classes.responsiveBox}>
                        <Typography variant="h6" style={{fontWeight: 600 }}>ID: {invoice?._id}</Typography>
                        <Box sx={{display:'flex',flexDirection:'column',alignItems:'flex-end'}} >
                            {invoice?.isPaid?<Typography className={classes.paid} variant="body2"  component="span">PAID</Typography>
                            :<Typography className={classes.unpaid} variant="body2" component="span">UNPAID</Typography>}
                            <Typography variant="body1">Order at: <i>{moment(invoice?.createdAt).format('lll')}</i></Typography>
                        </Box>
                    </Box>
                        <Typography color="secondary" variant="body2" style={{fontWeight: 600,color:"#8c98a2",paddingBottom:"2rem"}}>RECEIVER</Typography>
                    <Grid container>
                       <Grid item xs={12} md={6}>
                            <Typography variant="body1">{invoice?.shippingAddress?.fullname}</Typography>
                            <Typography variant="body1">({invoice?.shippingAddress?.living}) {invoice?.shippingAddress?.address} - {invoice?.shippingAddress?.city} - {invoice?.shippingAddress?.country}</Typography>
                            <Typography variant="body1">Phone: {invoice?.shippingAddress?.phoneNumber}</Typography>
                       </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body1">Payment method: <b>{invoice?.paymentMethod}</b></Typography>
                            <Typography variant="body1">Shipping price: <b>${invoice?.shippingPrice}</b></Typography>
                            <Typography variant="body1">Total: <b>${invoice?.totalPrice}</b></Typography>                        

                        </Grid>
                    </Grid>
                    {/* items from seller */}
                    <Box pt={3}>
                        <InvoiceTable product={invoice?.orderItems} />                    
                    </Box>
                </Paper>
                ):<Typography variant="body1">You dont have any invoice!</Typography>}
        </div>
    )
}

export default Invoice
