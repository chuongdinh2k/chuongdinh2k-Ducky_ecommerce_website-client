import React from 'react'
import {makeStyles,Theme,createStyles, Box, Avatar, IconButton,Grid, InputAdornment, TextField} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import { useAppDispatch, useAppSelector } from '../../hooks/type';
import { getFirstLetter } from '../../helpers/string';
import PreviewImage from '../../pages/E-Commerce/Create/PreviewImage';
import { useForm } from 'react-hook-form';
import { commentPost } from '../../redux/Blog/blogAsyncAction';

function CommentForm(props:{blog:any}):JSX.Element {
    const {blog} = props;
    const currentUser = useAppSelector(state=>state.user?.currentUser);
    const token = currentUser.token;
    const dispatch = useAppDispatch(); 
    const { register, handleSubmit, reset,formState: { errors } } = useForm();
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
     const onSubmit = async(data:any) => {
        let formData = new FormData();
        if(file.length>0){
            formData.append('image', file[0].image);
        }
        formData.append('id',blog?._id);
        formData.append('content',data.content);
        dispatch(commentPost({item:formData,token}));
        reset()
    }
    return(
        <Box pt={2}>
            <form onSubmit={handleSubmit(onSubmit)}>
            <Grid spacing={2} container>
             <Grid item xs={2} md={1}>
            <Avatar src={currentUser?.picture}>{getFirstLetter(currentUser.name)}</Avatar>
            </Grid>
                <Grid item xs={10} md={11}>
                    <Box pb={2} sx={{display:'flex',flexDirection:'row'}}>
                       
                        <TextField
                                placeholder="Write a comment..."
                                id="standard-start-adornment"
                                variant="outlined"
                                style={{width:'90%',borderRadius:"8px"}}
                                {...register('content',{required:true})}
                                error={!!errors.content}
                                helperText={errors?.content?'Content is required!':''}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                        <label htmlFor={`${blog?._id}`}><IconButton component="span" ><InsertPhotoIcon/></IconButton></label>
                                    </InputAdornment>,
                                }}/>
                        
                        <IconButton type="submit"><SendIcon/></IconButton>
                        <input accept="image/*" style={{display:'none'}} id={`${blog?._id}`} type="file"  onChange={uploadMultipleFiles} />
                    </Box>
                    <PreviewImage 
                            setFile={setFile} 
                            file={file} 
                            filePreview={filePreview}
                            setFilePreview={setFilePreview}
                            />
                </Grid>
                 </Grid>
            </form>
         </Box>
    )
}

export default CommentForm
