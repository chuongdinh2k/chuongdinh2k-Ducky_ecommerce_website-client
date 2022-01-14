import React from 'react';
import { Box, FormControl, FormControlLabel, Grid,IconButton,Paper, Radio, RadioGroup, Typography } from '@material-ui/core';
import { makeStyles, Theme,createStyles } from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useAppSelector,useAppDispatch } from '../../../hooks/type';
import { changePayment,changeShipping } from '../../../redux/Order/orderSlice';
import paypal_logo from "../../../assets/images/ic_paypal.svg";
import visa_logo from "../../../assets/images/ic_visa.svg";
import creditCard_logo from "../../../assets/images/ic_mastercard.svg";
const useStyles = makeStyles((theme: Theme)=>
    createStyles({
        root:{
            padding:'2rem',
            textAlign: 'left',
            marginBottom:'2rem',
            borderRadius:'15px',
            boxShadow:"rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px"
        },
        childBox:{
            padding:'2rem',
            borderRadius:'15px',
            boxShadow:"rgba(0, 0, 0, 0.05) 0px 0px 0px 1px"
        },
        radio: {
            '&$checked': {
               color: '#4B8DF8'
            }
         },
    })
)
function Payment(props:{
    handleBack:()=>void
}):JSX.Element{
    const classes = useStyles();
    const order = useAppSelector(state=>state.order);
    const dispatch = useAppDispatch();
    const handleShippingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       dispatch(changeShipping((event.target as HTMLInputElement).value));
      };
      const handlePaymenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changePayment((event.target as HTMLInputElement).value));
       };
    return (
        <div>
            <Paper className={classes.root}>
                <Typography variant="h6" style={{fontWeight: 700 }}>Delivery options</Typography>
                <FormControl component="fieldset" style={{width: '100%'}}>
                    <RadioGroup aria-label="delivery" value={order?.shipping} name="delivery" onChange={handleShippingChange} >
                    <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                            <Paper className={classes.childBox}>
                                    <FormControlLabel  value="standard" control={<Radio  color='primary'  />} 
                                                        label={
                                                            <Box sx={{display:'flex',flexDirection:'column'}}>
                                                                <Typography variant="body1">Standard delivery (Free)</Typography>
                                                                <Typography variant="body2">Delivered on Monday, August 12</Typography>
                                                                </Box>
                                                       } />
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Paper className={classes.childBox}>
                                    <FormControlLabel   value="fast" control={<Radio  color='primary'  />} 
                                                        label={
                                                            <Box sx={{display:'flex',flexDirection:'column'}}>
                                                                <Typography variant="body1">Fast delivery ($2,00)</Typography>
                                                                <Typography variant="body2">Delivered on Monday, August 5</Typography>
                                                                </Box>
                                                       } />
                                </Paper>
                            </Grid>
                    </Grid>
                    </RadioGroup>
                </FormControl>
            </Paper>
            
            <Paper className={classes.root}>
            <Typography variant="h6" style={{fontWeight: 700 }}>Payment options</Typography>
                <FormControl component="fieldset" style={{width: '100%'}}>
                    <RadioGroup aria-label="payment" value={order?.payment} name="payment" onChange={handlePaymenChange}>
                    <Grid container spacing={2}>
                            <Grid item xs={12}>
                            <Paper className={classes.childBox}>
                                    <FormControlLabel  value="paypal" control={<Radio  color='primary'  />} 
                                                        label={
                                                          <Box sx={{display:'flex',flexDirection:'row'}}>
                                                                <Box sx={{display:'flex',flexDirection:'column'}}>
                                                                    <Typography variant="body1">Pay with Paypal</Typography>
                                                                    <Typography variant="body2">You will be redirected to PayPal website to complete your purchase securely.</Typography>
                                                                </Box>
                                                               <span><img src={paypal_logo} alt={paypal_logo}/></span>
                                                          </Box>
                                                       } />
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper className={classes.childBox}>
                                    <FormControlLabel   value="credit" control={<Radio  color='primary'  />} 
                                                        label={
                                                            <Box sx={{display:'flex',flexDirection:'row',justifyContent: 'space-between'}}>
                                                                <Box sx={{display:'flex',flexDirection:'column'}}>
                                                                 <Typography variant="body1">Credit / Debit Card</Typography>
                                                                 <Typography variant="body2">We support Mastercard, Visa, Discover and Stripe</Typography>
                                                                </Box>
                                                                <Box sx={{display:'flex',flexDirection:'row'}}>
                                                                    <img src={visa_logo} alt="visa logo"/>
                                                                    <img src={creditCard_logo} alt="credit card logo"/>                                                                    
                                                                </Box>
                                                            </Box>
                                                       } />
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper className={classes.childBox}>
                                    <FormControlLabel   value="cash" control={<Radio  color='primary'  />} 
                                                        label={
                                                            <Box sx={{display:'flex',flexDirection:'column'}}>
                                                                <Typography variant="body1">Cash on CheckoutDelivery</Typography>
                                                                <Typography variant="body2">Pay with cash when your order is delivered.</Typography>
                                                                </Box>
                                                       } />
                                </Paper>
                            </Grid>
                    </Grid>
                    </RadioGroup>
                </FormControl>
            </Paper>
            <Box  pt={2} sx={{textAlign:"left"}}>
                <IconButton size="small" style={{fontSize: '14px',color:"#212121",borderRadius:"5px"}} onClick={props.handleBack}>
                    <ArrowBackIosIcon style={{fontSize: '14px'}}/>
                    Back
                </IconButton>
                </Box>
        </div>
    )
}

export default Payment
