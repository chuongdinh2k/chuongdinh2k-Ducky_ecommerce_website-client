import React from 'react'
import { Avatar, Box, createStyles,Button,TextField, Grid, IconButton, makeStyles, Paper, Theme,Typography, MenuItem } from '@material-ui/core'
import clsx from 'clsx';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { useAppDispatch, useAppSelector } from '../../hooks/type';
import {viewProfile} from '../../api';
import Spinner from '../Spinner';
import {useForm } from "react-hook-form";
import countries from "../../helpers/country";
import { updateUser } from '../../redux/Auth/asyncActions';
const useStyles = makeStyles((theme: Theme)=>
    createStyles({
        root:{},
        paper:{
            textAlign: 'left',
            borderRadius:'15px',
            boxShadow:"rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
            marginBottom:theme.spacing(4),
            marginTop:"2rem",
            padding:"2rem"
        },
        leftBox:{
            display:'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        leftBox__wrapper:{
            width:"70%",
            padding:"6rem 0"
        },
        avatar_Wrapper:{
            width:"12rem",
            height:"12rem",
            position:"relative",

        },
        uploadImage:{
            position:"absolute",
            bottom: 0,
            right: '2rem'
        },
        avatar:{
            width:"100%",
            height:"100%",
            fontSize:"5rem",
            border:"1px solid #8E99A4"
        },
        inputUpload:{
            display:"none"
        },
        input:{
            borderRadius:"10px",
            marginBottom:theme.spacing(3)
        },
        errorMessage:{
            color:"red"
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
function TabGeneral():JSX.Element {
    const classes = useStyles();
    const { register, handleSubmit,formState: { errors } } = useForm();
    const currentUser = useAppSelector(state=>state.user.currentUser);
    // const [user,setUser] = React.useState<any>({});
    const [file,setFile] = React.useState<Array<any>>([]);
    const [country,setCountry] = React.useState<string>(currentUser?.country||"");
    const [err,setErr] = React.useState<boolean>(false); 
    const [filePreview,setFilePreview] = React.useState<Array<any>>([]);
    const dispatch = useAppDispatch();
    // handle files previews
    let fileObj:Array<any> =[];
    let fileArray:Array<any> = [];
    let filePreviewArray:Array<any> = [];
    const uploadMultipleFiles=(e:any)=>{
        fileObj.push(e.target.files);
        for (let i = 0; i < fileObj[0].length; i++) {
            fileArray.push({image:fileObj[0][i]});
            filePreviewArray.push(URL.createObjectURL(fileObj[0][i]))
        }
        setFile(fileArray);
        setFilePreview(filePreviewArray);
    }
      const handleChangeGetCountry = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCountry(event.target.value);
      };
      //handleSubmit
      const onSubmit = async(data:any)=>{
        let formData = new FormData();
          if(country.length<=0){
              setErr(true);
              return;
          }
          if(file.length>0){
            formData.append('image', file[0].image);
         }
         formData.append('username',data.name);
        formData.append('address',data.address);
        formData.append('city',data.city);
        formData.append('country',country);
        formData.append('phoneNumber',data.phone);
        formData.append('about',data.about);
        formData.append('token',currentUser.token);
        dispatch(updateUser({
            item:formData,
            token:currentUser.token
        }));
      }
      console.log(currentUser);
    return (
        <div className={classes.root} >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Paper className={clsx(classes.paper, classes.leftBox)} >
                        <Box className={clsx(classes.leftBox__wrapper)} >
                            <Box className={classes.avatar_Wrapper}>
                                <Avatar className={classes.avatar} src={filePreview.length>0?filePreview[0]:currentUser.picture}>C</Avatar> 
                                <input
                                            name="images"
                                            accept="image/*"
                                            className={classes.inputUpload}
                                            id="upload-profile"
                                            type="file"
                                            onChange={uploadMultipleFiles}
                                        />
                                        <label htmlFor="upload-profile">
                                             <IconButton className={classes.uploadImage} component="span"><CameraAltIcon/></IconButton>
                                        </label>
                            </Box>
                            <Typography variant="body2" style={{paddingTop:"1rem",color:"#8E99A4"}}>Allowed *.jpeg, *.jpg, *.png, max size of 3.1 MB</Typography>
                        </Box>
                    </Paper>
                </Grid>
                {/* right side */}
                <Grid item xs={12} md={8}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    className={classes.input}
                                    fullWidth
                                    label="Username"
                                    variant="outlined"
                                    defaultValue={currentUser?.name}
                                    {...register('name',{required:"require!"})}
                                    error={!!errors.name}
                                    helperText={errors?.name?'Name is required!':''}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    className={classes.input}
                                    fullWidth
                                    label="Email"
                                    defaultValue={currentUser?.email}
                                    variant="outlined"
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    className={classes.input}
                                    fullWidth
                                    label="Phone Number"
                                    defaultValue={currentUser?.phoneNumber}
                                    variant="outlined"
                                    {...register('phone',{required:"require!"})}
                                    error={!!errors.phone   }
                                    helperText={errors?.phone?'Phone number is required!':''}
                                    />  
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    className={classes.input}
                                    fullWidth
                                    label="Address"
                                    defaultValue={currentUser?.address}
                                    variant="outlined"
                                    {...register('address',{required:"require!"})}
                                    error={!!errors.address}
                                    helperText={errors?.address?'address is required!':''}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    className={classes.input}
                                    fullWidth
                                    label="City"
                                    defaultValue={currentUser?.city}
                                    variant="outlined"
                                    {...register('city',{required:"require!"})}
                                    error={!!errors.city}
                                    helperText={errors?.city?'city is required!':''}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="filled-select-currency"
                                    fullWidth
                                    select
                                    label="Country"
                                    defaultValue={currentUser?.country}
                                    value={country}
                                    onChange={handleChangeGetCountry}
                                    error={err}
                                    helperText={err?"Please select your currency":""}
                                    variant="outlined"
                                    >
                                    {countries.map((country) => (
                                        <MenuItem key={country.name} value={country.name}>
                                            {country.name}
                                        </MenuItem>
                                    ))}
                                    </TextField>
                            </Grid>
                            <Grid item xs={12} md={12}>
                            <TextField
                                id="outlined-multiline-static"
                                label="About"
                                fullWidth
                                multiline
                                rows={4}
                                defaultValue={currentUser?.about}
                                variant="outlined"
                                {...register('about',{required:"require!"})}
                                error={!!errors.about}
                                helperText={errors?.about?'About is required!':''}
                                />
                            </Grid>
                           
                                <Box sx={{display:'flex',justifyContent:'flex-end',width:"100%"}}>
                                    <Button className={classes.buttonGreen} type="submit">Save Changes</Button>
                                </Box>
                            
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            </form>
        </div>
    )
}

export default TabGeneral
