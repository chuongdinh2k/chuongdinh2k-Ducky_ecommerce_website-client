import React from 'react';
import clsx from 'clsx';
import { makeStyles,createStyles,Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { Box, Typography,RadioGroup,FormControlLabel,Radio, Button, FormControl, Select, ListSubheader, MenuItem, Input, Checkbox, ListItemText } from '@material-ui/core';
import {  Controller , useForm } from "react-hook-form";
import {colors} from "../../helpers/color";
import { useHistory } from 'react-router-dom';
import {ArrayToURL} from "../../helpers/utils";
const useStyles = makeStyles((theme: Theme)=>
  createStyles({
    root:{
    },
    list: {
      width: 250,
      padding:theme.spacing(2)
    },
    fullList: {
      width: 'auto',
    },
    errorMessage:{
      color:"red"
  },
  radio: {
    '&$checked': {
       color: theme.palette.primary
    }
 },
 checked:{
 },
 formControl:{
   maxWidth:"200px",
  minWidth:"127px",
  marginTop:"1rem"
},
 button:{
  marginTop:"0.5rem", 
  borderRadius:"5px",
  textTransform:"capitalize",
  fontWeight:600
 },
 fontWeight700:{
   fontWeight:700
 }
})
);

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function FilterDrawer(props:{
   openDrawer:any,
   setOpenDrawer:any,
  filter:any,
  setFilter:any,
  setPage:any
  }) {
  // const url = window.location.pathname;
  const classes = useStyles();
  const history = useHistory();
  const { register, handleSubmit,control,formState: { errors } } = useForm();
  const [color, setColor] = React.useState<any>([]);
  const handleColorChange= (event: React.ChangeEvent<{ value: unknown }>) => {
    setColor(event.target.value as string[]);
  };

  const onSubmit = async(data:any) => {
    props.setPage(1);
    props.setFilter({
      ...props.filter,
      q:"",
      category:data.category,
      gender:data.gender,
      color:color
    })
    //parse params url to array
      const colorParams = color.length>0?ArrayToURL(color,"color"):"";
      history.push(`${data.gender}?category=${data.category}&${colorParams}`)
      // reset();
  }
  const clear = ()=>{
    props.setPage(1);
    props.setFilter({
      ...props.filter,
      q:"",
      category:""
    });
    history.push(`all`)

  }
  const list = (anchor: Anchor) => (
    <Box 
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
    >
      <form  onSubmit={handleSubmit(onSubmit)}>
        <Box pb={2} sx={{display:'flex',justifyContent: 'space-between'}}>
            <Typography style={{fontWeight: 700 }} variant="body1">Filter</Typography>
            <span>X</span>
        </Box>
        <Divider/>
        <Box style={{overflowY:"auto",height:"70vh"}}>
          <Box pt={2} sx={{height: "100vh"}}>
            <Box>
              <Typography style={{fontWeight: 700 }} variant="body1">Gender</Typography>
               <Box>
                <Controller  control={control} name="gender" rules={{ required:true}}
                  render={({ field }) => (
                  <RadioGroup {...field} style={{display:'flex',flexDirection:"column"}}>
                      {["all","men","women","kid"].map((gender,index)=> <FormControlLabel
                        key={index}
                        value={gender}
                        control={<Radio  color='primary' />}
                        label={gender}
                        />)}
                      </RadioGroup>
                                      )}/>
                    {errors.gender && (
                        <span className={classes.errorMessage}>Gender is required</span>
                      )}
                </Box>
            </Box>
            {/* categories */}
            <Box pt={2} sx={{display:'flex',flexDirection:"column"}}>
                                <FormControl className={classes.formControl}>
                                  <Typography style={{fontWeight: 700 }} variant="body1">Category</Typography>
                                    <Select defaultValue="" id="grouped-select"  {...register("category")}>
                
                                    <ListSubheader style={{fontWeight: 700 }}>Clothing</ListSubheader>
                                        {['Shirts','T-shirts','Jeans','Dress','Jackets'].map(item=><MenuItem key={item} value={item}>{item}</MenuItem>)}
                                    <ListSubheader style={{fontWeight: 700 }}>Accessories</ListSubheader>
                                        {['Shoes','Backpacks and bags','Bracklets','Facemasks'].map(item=><MenuItem key={item} value={item}>{item}</MenuItem>)}
                                    <ListSubheader style={{fontWeight: 700 }}>Accessories</ListSubheader>
                                        {['Suits','Blazers','Trousers','Waistcoasts'].map(item=><MenuItem key={item} value={item}>{item}</MenuItem>)}
                                    </Select>
                                    {/* {errors.category && (
                                        <span className={classes.errorMessage}>Category is required</span>
                                    )} */}
                                </FormControl>
                           </Box>
             {/* color */}
             <Box pt={2} sx={{display:'flex',flexDirection:"column"}}>
                            <FormControl  className={classes.formControl}>
                            <Typography style={{fontWeight: 700 }} variant="body1">Colors</Typography>
             
                                <Select
                                labelId="demo-mutiple-checkbox-label"
                                id="demo-mutiple-checkbox"
                                multiple
                                value={color}
                                input={<Input />}
                                renderValue={(selected) => (selected as string[]).join(', ')}
                                // MenuProps={MenuProps}
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
              
              {/* price */}
              <Box pt={2}>
                <Typography style={{fontWeight: 700 }} variant="body1">Price</Typography>
                <Box>
                  <Controller  control={control} name="price" 
                    render={({ field }) => (
                    <RadioGroup {...field} style={{display:'flex',flexDirection:"column"}}>
                       <FormControlLabel
                          value="below25"
                          control={<Radio  color='primary' />}
                          label={<Typography variant="body2">Below $25</Typography>}
                          />
                             <FormControlLabel
                          value="25to75"
                          control={<Radio  color='primary' />}
                          label={<Typography variant="body2">Between $25 - $75</Typography>}
                          />
                             <FormControlLabel
                          value="above75"
                          control={<Radio  color='primary' />}
                          label={<Typography variant="body2">Above $75</Typography>}
                          />
                        </RadioGroup>
                                        )}/>
                      {/* {errors.price && (
                          <span className={classes.errorMessage}>Price is required</span>
                        )} */}
                  </Box>
              </Box>
          </Box>
        </Box>
        
        <Box sx={{display: 'flex',flexDirection: 'column'}}>
         <Button type="submit" className={classes.button} color='primary' variant='outlined'>Filter</Button>
         <Button className={classes.button} color='default' variant='outlined' onClick={clear}>Clear All</Button>  
        </Box>            
      </form>

    </Box>
  );

  return (
    <div>
      {(['left', 'right', 'top', 'bottom'] as Anchor[]).map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <Drawer anchor={'right'} open={props.openDrawer[anchor]} onClose={()=>props.setOpenDrawer({left:false})}>
            {list('right')}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
