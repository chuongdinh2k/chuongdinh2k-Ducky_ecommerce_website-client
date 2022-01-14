
import React from 'react';
import { Box, Button, Checkbox, FormControl, FormControlLabel, Grid, Input, ListItemText, ListSubheader, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@material-ui/core";
import uploadImage from "../../../assets/images/upload.png";
import useStyles from './createStyle';
import {  Controller , useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from '../../../hooks/type';
import { createProduct } from '../../../redux/Product/asyncActions';
import PreviewImage from './PreviewImage';
const colors = ["black","blue","green","yellow","white","pink","orange","purple","grey","red"];
function Create():JSX.Element {
   const classes = useStyles();
   const [color, setColor] = React.useState<any>([]);
   const { register, handleSubmit,control, reset,formState: { errors } } = useForm();
   const token = useAppSelector(state=>state.user?.currentUser?.token);
   const dispatch = useAppDispatch();
   const product = useAppSelector(state=>state.product);
   const [file,setFile] = React.useState<Array<any>>([]);
   const [filePreview,setFilePreview] = React.useState<Array<any>>([]);
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
   const handleColorChange= (event: React.ChangeEvent<{ value: unknown }>) => {
    setColor(event.target.value as string[]);
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
    };
    // let convertColors = color.map((item:any)=>{
    //     return {"name":item}
    // });
    
    const onSubmit = async(data:any) => {
        if(file.length<=0){
            alert("select all please!");
            return;
        }
        let formData = new FormData();
        for (let i = 0; i < file.length; i++) {
            formData.append('images', file[i].image);
        }
        for (let i = 0; i < color.length; i++) {
            formData.append('color', color[i]);
        }
        formData.append('name',data.name);
        formData.append('description',data.desc);
        formData.append('countInStock',data.number);
        formData.append('price',data.price);
        formData.append('gender',data.gender);
        formData.append('category',data.category);
        dispatch(createProduct({item:formData,token}));
        reset()
    }
    return (
       <div style={{textAlign:"left"}}>
           <Typography variant="h6">Create a new product</Typography>

          <form onSubmit={handleSubmit(onSubmit)} >
            <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={8}>
                        <Box className={classes.root}>
                            <TextField
                                className={classes.input}
                                fullWidth
                                label="Name of product"
                                variant="outlined"
                                {...register('name',{required:"require!"})}
                                error={!!errors.name}
                                helperText={errors?.name?'Name is required!':''}
                            />

                            <TextField
                                className={classes.input}
                                fullWidth
                                rows={5}
                                maxRows={Infinity}
                                multiline
                                variant="outlined"
                                label="Description"
                                {...register('desc',{required:"require!"})}
                               
                            />
                                 {errors.desc && (
                                        <span className={classes.errorMessage}>description is required</span>
                                    )}
                            <Typography variant="body1">Add images</Typography>
                            <Box className={classes.boxUpload}>
                                <Box className={classes.boxUpload_child}>
                                    <img className={classes.logo} alt="logo upload" src={uploadImage}/>
                                    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:"column"}}>
                                        <Typography variant="h6">Select images</Typography>
                                        <Typography variant="body2">You can upload a single or multiple images
                                        </Typography>
                                        <input
                                            name="images"
                                            accept="image/*"
                                            className={classes.inputUpload}
                                            id="contained-button-file"
                                            multiple
                                            type="file"
                                            onChange={uploadMultipleFiles}
                                        />
                                        <label htmlFor="contained-button-file">
                                            <Button className={classes.buttonUpload}  size="small" variant="contained" color="primary" component="span">
                                                Upload
                                            </Button>
                                        </label>
                                    </Box>
                                    {/* Files previews */}
                                   
                                </Box>
                                     
                            </Box>
                            <PreviewImage 
                                            setFile={setFile} 
                                            file={file} 
                                            filePreview={filePreview}
                                            setFilePreview={setFilePreview}
                                            />
                            </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <Box className={classes.root}>
                            
                           
                            {/* allow only number */}
                            <TextField className={classes.input}
                                type="number"
                                InputProps={{
                                    inputProps: {min: 1}
                                }}
                                variant="outlined"
                                label="Number in stock"
                                {...register('number',{required:"require!"})}
                                
                               />
                                 {errors.number && (
                                        <span className={classes.errorMessage}>Number in stock is required</span>
                                    )}
                            <TextField className={classes.input}
                                type="number"
                                InputProps={{
                                    inputProps: {min: 1}
                                }}
                                variant="outlined"
                                label="Price"
                                {...register('price',{required:"require!"})}
                            />
                              {errors.price && (
                                        <span className={classes.errorMessage}>Price is required</span>
                                    )}
                            {/* radio select gender */}
                            <Typography variant="body1">Gender</Typography>
                            <Box>
                                <Controller  control={control} name="gender"  rules={{ required: true }}
                                    render={({ field }) => (
                                    <RadioGroup {...field} style={{display:'flex',flexDirection:"row"}}>
                                        <FormControlLabel
                                        value="men"
                                        control={<Radio color='primary' />}
                                        label="Men"
                                        />
                                        <FormControlLabel
                                        value="women"
                                        control={<Radio color='primary' />}
                                        label="Women"
                                        />
                                        <FormControlLabel
                                        value="kid"
                                        control={<Radio color='primary' />}
                                        label="Kid"
                                        />
                                    </RadioGroup>
                                    )}/>
                                  {errors.gender && (
                                        <span className={classes.errorMessage}>Gender is required</span>
                                    )}
                            </Box>
                            
                            {/* select category */}
                    
                            <Box pt={2} sx={{display:'flex',flexDirection:"row",justifyContent: 'space-between'}}>
                            <Typography variant="body1">Category</Typography>
                                <FormControl className={classes.formControl}>
                                    <Select defaultValue="" id="grouped-select"  {...register("category")}>
                
                                    <ListSubheader style={{fontWeight: 700 }}>Clothing</ListSubheader>
                                        {['Shirts','T-shirts','Jeans','Dress','Jackets'].map(item=><MenuItem key={item} value={item}>{item}</MenuItem>)}
                                    <ListSubheader style={{fontWeight: 700 }}>Accessories</ListSubheader>
                                        {['Shoes','Backpacks and bags','Bracklets','Facemasks'].map(item=><MenuItem key={item} value={item}>{item}</MenuItem>)}
                                    <ListSubheader style={{fontWeight: 700 }}>Accessories</ListSubheader>
                                        {['Suits','Blazers','Trousers','Waistcoasts'].map(item=><MenuItem key={item} value={item}>{item}</MenuItem>)}
                                    </Select>
                                    {errors.category && (
                                        <span className={classes.errorMessage}>Category is required</span>
                                    )}
                                </FormControl>
                           </Box>
                            {/* select color */}
                            <Box pt={2} sx={{display:'flex',flexDirection:"row",justifyContent: 'space-between'}}>
                            <Typography variant="body1">Colors</Typography>
                            <FormControl style={{width:"200px",maxWidth:"200px",marginLeft:"1rem"}}>
             
                                <Select
                                labelId="demo-mutiple-checkbox-label"
                                id="demo-mutiple-checkbox"
                                multiple
                                value={color}
                                input={<Input />}
                                renderValue={(selected) => (selected as string[]).join(', ')}
                                MenuProps={MenuProps}
                                variant="outlined"
                                onChange={handleColorChange}
                                >
                                {colors.map((i) => (
                                    <MenuItem key={i} value={i}>
                                    <Checkbox checked={color.indexOf(i) > -1} />
                                    <ListItemText primary={i} />
                                    </MenuItem>
                                ))}
                                </Select>
                               
                            </FormControl>
                          </Box>

                        </Box>
                        <Button type="submit" className={classes.buttonGreen} disabled={product.isLoading} >{product.isLoading?`Loading...`:`Create Product`}</Button>
                    </Grid>
            </Grid>
          </form>
       </div>
    )
}

export default Create;
