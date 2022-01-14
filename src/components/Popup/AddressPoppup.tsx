import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Controller, useForm } from 'react-hook-form';
import { Box,Divider,FormControlLabel, Radio, RadioGroup, TextField } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { address } from '../../interface/order';
import { addAddress } from '../../redux/Order/orderSlice';
import { useAppDispatch } from '../../hooks/type';
import { uuid } from 'uuidv4';
const useStyles= makeStyles((theme: Theme)=>
  createStyles({
    root:{
      // width:"60%",
      // [theme.breakpoints.down("xs")]: {
      //   width:"80%"
      // },
    },
    wrapperRow:{
      display:"flex",
      flexDirection:"row",
      [theme.breakpoints.down("xs")]: {
        flexDirection:"column",
      },
      },
    input:{
      width: "100%",
      borderRadius:"16px",
      marginBottom:theme.spacing(3),
      marginRight:"1rem"
    },
    errorMessage:{
      color:"red"
    }
  })
)
export default function AddressDialog(props:{
    openState:boolean,
    setOpenState:any
}):JSX.Element {
  const handleClose = () => {
    props.setOpenState(false);
  };
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const { register, handleSubmit,control,formState: { errors } } = useForm();
  const onSubmit = (data:address)=>{
    dispatch(addAddress({...data,id:uuid()}));
    props.setOpenState(false);
  }
  return (
    <div>
      <Dialog 
        className={classes.root}
        open={props.openState}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="alert-dialog-title">Add New Address</DialogTitle>
        <DialogContent>
          <Box pb={3}>
            <Controller  control={control} name="living"  rules={{ required: true }}
                                      render={({ field }) => (
                                      <RadioGroup {...field} style={{display:'flex',flexDirection:"row"}}>
                                          <FormControlLabel
                                          value="home"
                                          control={<Radio color='primary'/>}
                                          label="Home"
                                          />
                                          <FormControlLabel
                                          value="office"
                                          control={<Radio color='primary'/>}
                                          label="Office"
                                          />
                                      </RadioGroup>
                                      )}/>
                                    {errors.living && (
                                          <span className={classes.errorMessage}>Living is required</span>
                                      )}
          </Box>  
      <Box className={classes.wrapperRow}>     
         <TextField
                   className={classes.input}
                   fullWidth
                   label="Full name"
                   variant="outlined"
                   {...register('fullname',{required:true})}
                   error={!!errors.name}
                   helperText={errors?.name?'Full name is required!':''}
               />
         <TextField
                   className={classes.input}
                   
                   fullWidth
                   label="Phone number"
                   variant="outlined"
                   {...register('phoneNumber',{required:true})}
                   error={!!errors.phoneNumber}
                   helperText={errors?.phoneNumber?'Phone number is required!':''}
               />
      </Box>
      <Box>
        <TextField
                    className={classes.input}
                    
                    fullWidth
                    label="Address"
                    variant="outlined"
                    {...register('address',{required:true})}
                    error={!!errors.address}
                    helperText={errors?.address?'Address is required!':''}
                />
      </Box>
      <Box className={classes.wrapperRow}>
        <TextField
                      className={classes.input}
                      
                      fullWidth
                      label="City"
                      variant="outlined"
                      {...register('city',{required:true})}
                      error={!!errors.city}
                      helperText={errors?.city?'Address is required!':''}
                  />
         <TextField
                      className={classes.input}
                      
                      fullWidth
                      label="Country"
                      variant="outlined"
                      {...register('country',{required:true})}
                      error={!!errors.country}
                      helperText={errors?.country?'Address is required!':''}
                  />
      </Box>
      <Divider/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </form>
       {/* <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="firstName">First name</label>
      <input
        id="firstName"
        aria-invalid={errors.firstName ? "true" : "false"}
        {...register('firstName', { required: true })}
      />
      {errors.firstName && (
        <span role="alert">
          This field is required
        </span>
      )}

      <input type="submit" />
    </form> */}
      </Dialog>
    </div>
  );
}
