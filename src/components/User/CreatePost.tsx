import { Box, Button, FormControl, IconButton, ListSubheader, MenuItem, Paper, Select, TextField, Typography } from '@material-ui/core'
import React from 'react'
import PreviewImage from '../../pages/E-Commerce/Create/PreviewImage'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { useAppDispatch, useAppSelector } from '../../hooks/type';
import { useForm } from 'react-hook-form';
import { createPost } from '../../redux/Blog/blogAsyncAction';
interface IProps{
    classes:any,
    user:any
}
function CreatePost(props:IProps):JSX.Element {
    const {classes,user} = props;
    const currentUser = useAppSelector(state=>state.user.currentUser);
    const token = currentUser.token;
    const blogs = useAppSelector(state=>state.blogs);
    const { register, handleSubmit,control, reset,formState: { errors } } = useForm();
    const dispatch = useAppDispatch();
    // handle files previews
      const [file,setFile] = React.useState<Array<any>>([]);
      const [filePreview,setFilePreview] = React.useState<Array<any>>([]);  
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
    const onSubmit=async(data:any)=>{
        let formData = new FormData();
        if(file.length>0){
            for (let i = 0; i < file.length; i++) {
                formData.append('images', file[i].image);
            }
        }
        formData.append('content',data.content);
        formData.append('selling',data.selling);
        dispatch(createPost({item:formData,token}));
        reset();
        setFile([]);
        setFilePreview([]);
    }
    return (
            <form onSubmit={handleSubmit(onSubmit)}>
                       {/* input post */}
                        {currentUser.id===user?._id?<Paper className={classes.paper} style={{padding:"2rem",flexDirection:"column"}}>
                            <TextField 
                                style={{borderRadius:"16px"}}
                                placeholder="Share what do you think here..."
                                id="outlined-basic"
                                variant="outlined" 
                                fullWidth={true}
                                rows={5}
                                maxRows={Infinity}
                                multiline
                                {...register('content',{required:true})}
                                error={!!errors.content}
                                helperText={errors?.content?'Content is required!':''}
                                />
                                                            
                            <Box pt={2} sx={{display:'flex',flexDirection:"row"}}>
                            <Typography variant="body1">What are you gonna sell?</Typography>
                                <FormControl className={classes.formControl}>
                                    <Select defaultValue="" id="grouped-select"  {...register("selling")}>
                
                                    <ListSubheader style={{fontWeight: 700 }}>Clothing</ListSubheader>
                                        {['Shirts','T-shirts','Jeans','Dress','Jackets'].map(item=><MenuItem key={item} value={item}>{item}</MenuItem>)}
                                    <ListSubheader style={{fontWeight: 700 }}>Accessories</ListSubheader>
                                        {['Shoes','Backpacks and bags','Bracklets','Facemasks'].map(item=><MenuItem key={item} value={item}>{item}</MenuItem>)}
                                    <ListSubheader style={{fontWeight: 700 }}>Accessories</ListSubheader>
                                        {['Suits','Blazers','Trousers','Waistcoasts'].map(item=><MenuItem key={item} value={item}>{item}</MenuItem>)}
                                    </Select>
                                    {/* {errors.selling && (
                                        <span className={classes.errorMessage}>Category is required</span>
                                    )} */}
                                </FormControl>
                           </Box>
                            <Box pt={2}>
                                <PreviewImage  setFile={setFile} 
                                                file={file} 
                                                filePreview={filePreview}
                                                setFilePreview={setFilePreview}
                                    />
                            </Box>
                            <Box pt={2} sx={{display: 'flex',justifyContent:"space-between"}}>
                                <Box >
                                <input accept="image/*" className={classes.input__hide} id="icon-post-file"  multiple type="file" onChange={uploadMultipleFiles} />
                                        <label htmlFor="icon-post-file">
                                            <IconButton aria-label="upload picture" component="span">
                                                <PhotoLibraryIcon/>
                                            </IconButton>
                                     </label>
                                </Box>
                                <Button className={classes.buttonGreen} disabled={blogs.isLoading} type="submit">{blogs.isLoading?`Loading...`:`Post`}</Button>
                            </Box>
                        </Paper>:""}
                   </form>
    )
}

export default CreatePost
