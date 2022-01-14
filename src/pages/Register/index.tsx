import React, { useEffect } from 'react'
import clsx from 'clsx';
import {loginWithGoogle, registerAccount } from '../../redux/Auth/asyncActions';
import {useAppSelector,useAppDispatch} from '../../hooks/type';
import {useHistory } from 'react-router-dom';
import { Avatar, CssBaseline, FormControl, IconButton, InputAdornment, InputLabel, makeStyles, MenuItem, OutlinedInput, Paper, Select, TextField } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useForm } from "react-hook-form";
import loginStyles  from '../Login/loginStyle';
import logo from '../../assets/images/logo2.png';
import register_illus from '../../assets/images/illustration_register.png';
import countries from "../../helpers/country";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
  username: yup.string().required(),
  country:yup.string().required()
})

interface State {
  email:string;
  password: string;
  country:string;
  username:string;
}
function Register(): JSX.Element {
  const userInfo = useAppSelector((state)=>state.user);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state=>state.user);
  const classes = loginStyles();

  const [showPassword,setShowPassword] = React.useState(false);
  const { register, handleSubmit, watch,reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data:State)=> {
    dispatch(registerAccount(data));
    console.log(data);
    reset();
  };

  const handleClickShowPassword = () => {
   setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  
    // const handleLogin =(googleData:any)=> {
    //   dispatch(loginWithGoogle(googleData));
    //   }
    if(userInfo?.isLoggedIn){
      history.push('/');
    }
    return (
        <div className={classes.root}>
          <CssBaseline/>
           <Box pb={2} boxShadow={6} className={classes.leftBox}>
              <Box className={classes.logo}>
                <Avatar alt="L" src={logo} />
              </Box>
              <Typography variant="h5" align="left"  >
                Take part in Ducky's Community, We can build dreams together!
              </Typography>
              <img className={classes.image} src={register_illus}/>
           </Box>
           <Box sx={{display:'flex',flexDirection:'column'}} className={classes.rightBox}>
              <Typography variant="h5" >
                Register to be a crucial member 
              </Typography>
              <Typography component="p" className={classes.p2}>
              It's absolutely free to have an account
              </Typography>
                {/* <Typography variant="h4">Register</Typography> */}

            <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                {/* <InputLabel htmlFor="outlined-email">Email</InputLabel> */}
                  <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    id="outlined-adornment-password"
                    value={watch('username')}
                    {...register('username',{required: true})}
                    error={!!errors.username}
                    helperText={errors?.username?'username is required!':''}
                  />
                </FormControl>

              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                {/* <InputLabel htmlFor="outlined-email">Email</InputLabel> */}
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    id="outlined-adornment-password"
                    value={watch('email')}
                    {...register('email',{required:true})}
                    error={!!errors.email}
                    helperText={errors?.email?errors.email?.message:''}
                  />
                </FormControl>

              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password" className={errors.password?classes.err:""}>Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    // label="password"
                    type={showPassword ? 'text' : 'password'}
                    value={watch('password')}
                    {...register('password')}
                    error={!!errors.password}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                  <Typography variant="body2" className={classes.err}>{errors.password?.message}</Typography>
              </FormControl >
              {/* select country */}
              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" error={errors.country?true:false}>
                <InputLabel id="select-country-label">Country</InputLabel>
                  <Select
                    labelId="select-country-label"
                    id="select-country-label"
                    label="Country"
                    value={watch('country')}
                    {...register("country")}
                  >
                    {countries.map((country) => (
                                        <MenuItem key={country.name} value={country.name}>
                                            {country.name}
                                        </MenuItem>
                                    ))}
                  </Select>   
                  <p className={classes.err}>{errors.country?.message}</p>                
              </FormControl>
              <Button className={classes.button} disabled={user.isLoading} type="submit" >Register</Button>
              </form>
              <Typography style={{paddingBottom:"2rem"}} component="p">Already have an account? 
                <span className={classes.getStarted} onClick={()=>history.push('/login')}>Login</span>
                </Typography>
           </Box>
          </div>
    )
}

export default Register
