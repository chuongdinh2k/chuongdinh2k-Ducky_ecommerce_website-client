import React from 'react'
import { Paper,Theme,makeStyles,createStyles, TextField, Box, Button } from '@material-ui/core'
import {useForm } from "react-hook-form";
import { Alert } from '@material-ui/lab';
import { useAppDispatch } from '../../redux/store';
import { changePasswordUser } from '../../redux/Auth/asyncActions';
import { useAppSelector } from '../../hooks/type';

const useStyles = makeStyles((theme: Theme)=>
    createStyles({
        paper:{
            textAlign: 'left',
            borderRadius:'15px',
            boxShadow:"rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
            marginBottom:theme.spacing(4),
            marginTop:"2rem",
            padding:"2rem"
        },
        input:{
            borderRadius:"10px",
            marginBottom:theme.spacing(3)
        },
        flexBox:{
            display:'flex',
            justifyContent:'space-between',
            width:"100%",
            [theme.breakpoints.down("xs")]:{
                flexDirection:"column"
            }
        },
        buttonGreen:{
            border:"none",
            boxShadow:"rgb(0 171 85 / 24%) 0px 8px 16px 0px",
            fontWeight:700,
            textTransform:"capitalize",
            padding:"10px 22px",
            borderRadius:theme.spacing(1),
            backgroundColor:"rgb(0, 171, 85)",
            color:"rgb(255, 255, 255)",
            cursor:'pointer',
            "&:hover":{
              backgroundColor:"rgb(10 147 78)"
            }
        },
    })
)
function TabChangePassword():JSX.Element {
    const classes = useStyles();
    const { register, handleSubmit,reset,formState: { errors } } = useForm();
    const [errCheckOldPassword,setErrCheckOldPassword] = React.useState<boolean>(false);
    const [err,setErr] = React.useState<boolean>(false);
    const isLoading = useAppSelector(state=>state.user.isLoading);
    const token = useAppSelector(state=>state.user?.currentUser?.token);
    const dispatch = useAppDispatch();
    // handleSubmit
    const onSubmit = (data:any)=>{
        if(data.newPassword!==data.confirmPassword){
            setErr(true);
            return;
        };
        dispatch(changePasswordUser({
            item:{
                oldPassword:data.oldPassword,
                newPassword:data.newPassword
            },
            token
        }));
        reset();

    }
    return (
        <Paper className={classes.paper}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                       className={classes.input}
                       fullWidth
                       type="password"
                        label="Old Password"
                        variant="outlined"
                        {...register('oldPassword',{required:true})}
                         error={!!errors.oldPassword}
                         helperText={errors?.oldPassword?'Old Password is required!':''}
                    />
                <TextField
                       className={classes.input}
                       type="password"
                       fullWidth
                        label="New Password"
                        variant="outlined"
                        {...register('newPassword',{required:true})}
                         error={!!errors.newPassword}
                         helperText={errors?.newPassword?'New Password is required!':''}
                    />
                <TextField
                       className={classes.input}
                       type="password"
                       fullWidth
                        label="Confirm Password"
                        variant="outlined"
                        {...register('confirmPassword',{required:true})}
                         error={!!err}
                         helperText={err?'Confirm password does not match!':''}
                    />
                <Box>
                        <Box className={classes.flexBox}>
                                    <Alert severity="warning">If you login with google account, you can not change password!</Alert>
                                    <Button className={classes.buttonGreen} disabled={isLoading} type="submit">{isLoading?`Loading...`:`saveChange`}</Button>
                            </Box>
                </Box>
            </form>
        </Paper>
    )
}

export default TabChangePassword
