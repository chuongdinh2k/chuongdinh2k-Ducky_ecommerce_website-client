import React from 'react'
import clsx from 'clsx';
import GoogleLogin from 'react-google-login';
import { login, loginWithGoogle } from '../../redux/Auth/asyncActions';
import {useAppSelector,useAppDispatch} from '../../hooks/type';
import { Redirect,useHistory } from 'react-router-dom';
import { Avatar, CssBaseline, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Tooltip } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GoogleButton from 'react-google-button';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useForm } from "react-hook-form";
import loginStyles  from './loginStyle';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import logo from '../../assets/images/logo2.png';
import login_illus from '../../assets/images/illustration_login.png';
import { Alert } from '@material-ui/lab';
const googleKey: string = (process.env.REACT_APP_GOOGLELOGIN_KEY as string);
const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
})

interface State {
  email:string;
  password: string;
}
function Login(): JSX.Element {
  const userInfo = useAppSelector((state)=>state.user);

  const history = useHistory();
  const dispatch = useAppDispatch();
  // const user = useAppSelector(state=>state.user);
  const classes = loginStyles();

  const [showPassword,setShowPassword] = React.useState(false);
  const { register, handleSubmit, watch,reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data:State)=> {
    dispatch(login(data));
    reset();
  };

  const handleClickShowPassword = () => {
   setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  
    const handleLogin =(googleData:any)=> {
      dispatch(loginWithGoogle(googleData));
      }
    if(userInfo.currentUser){
      history.push('/Dashboard/Shop/all');
    }
    return (
        <div className={classes.root}>
          <CssBaseline/>
           <Box boxShadow={6} className={classes.leftBox}>
              <Box className={classes.logo}>
                <Avatar alt="L" src={logo} />
              </Box>
              <Typography variant="h5" align="left"style={{ fontWeight: 700 }}   >
                Hello, Welcome back!
              </Typography>
              <img className={classes.image} alt="login illus picture" src={login_illus}/>
           </Box>
           <Box sx={{display:'flex',flexDirection:'column'}} className={classes.rightBox}>
              <Typography variant="h6" style={{fontWeight: 700}}>Sign in to Ducky</Typography>
              <Typography component="p" className={classes.p2}>
                Enter your details below
              </Typography>

              <GoogleLogin className={`${classes.btnGoogle} ${classes.p2}`}
                clientId={googleKey}
                buttonText="Sign In With Google"
                render={renderProps => (
                  <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign in with Google</GoogleButton>
                )}
                onSuccess={handleLogin}
                onFailure={handleLogin}
                cookiePolicy={'single_host_origin'}
                />
                <Typography variant="h6">OR</Typography>
              <Tooltip title="Account for test!" placement="top">
                <Alert severity="info">Email: <b>jame95@gmail.com</b> Password: <b>123456789</b></Alert> 
                </Tooltip>    
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <InputLabel htmlFor="outlined-email">Email</InputLabel>
                  <OutlinedInput
                    error={!!errors.email}
                    id="outlined-adornment-password"
                    value={watch('email')}
                    {...register('email',{required:true})}
                    labelWidth={50}
                  />
                  <Typography variant="body2" className={classes.err}>{errors.email?.message}</Typography>

                </FormControl>

              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    error={!!errors.password}
                    value={watch('password')}
                    {...register('password')}
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

              </FormControl>
              <Button className={classes.button} type="submit" >Log In</Button>
              </form>
              <Typography component="p">Don't have an account? 
                <span className={classes.getStarted} onClick={()=>history.push('/register')}>Get started</span>
                </Typography>
           </Box>
          </div>
    )
}

export default Login
