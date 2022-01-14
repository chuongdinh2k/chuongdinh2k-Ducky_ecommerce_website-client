import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import clsx from 'clsx';
import { useAppSelector,useAppDispatch } from '../../hooks/type';
import { addReview } from '../../redux/Product/asyncActions';
import { useParams } from 'react-router-dom';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    collapse: {
      padding:"2rem",
      borderRadius:"16px",
      backgroundColor:"#F4F6F8"
    },
    star:{
      color:"#C4CCD3",
      cursor:'pointer',
      "&:hover":{
        paddingBottom:"5px"
      },
      transition:"0.2s"
    },
    active:{
      color:"#FAAF00"
    },
    buttonGreen:{
      backgroundColor:"rgb(0, 171, 85)",
      color:"rgb(255, 255, 255)",
      "&:hover":{
        backgroundColor:"rgb(10 147 78)"
      }
    },

    button:{
      marginLeft:"1rem",
      minWidth:"64px",
      border:"none",
      boxShadow:"rgb(0 171 85 / 24%) 0px 8px 16px 0px",
      fontWeight:700,
      textTransform:"capitalize",
      padding:"6px 16px",
      borderRadius:theme.spacing(1),
      cursor:'pointer'
    }
  }),
);

function AddReview(props:{
  openCollapse: boolean,
  setOpenCollapse:any
}) {
  const classes = useStyles();
  const [stars,setStars] = React.useState(0);
  const valueRef = React.useRef<any>('')
  const dispatch = useAppDispatch();
  const user = useAppSelector(state=>state.user?.currentUser);
  const {id}:any = useParams();
  const [error,setError] = React.useState(false);
  const addComment = ()=>{
    if(valueRef.current?.value===""){
      setError(true);
    }
    else{
      dispatch(addReview({
            item:{
              _id:id,
              comment:valueRef.current?.value,
              rating:stars
            },
            token:user.token
          }))
    }
  }
  return (
        <div>
        <Collapse in={props.openCollapse}>
          <Box pt={2} className={classes.collapse}>
              <Typography variant="body1" style={{textTransform:"capitalize"}}>Add Review</Typography>
              <Box pb={2} sx={{display:'flex',flexDirection:'row'}}>
                <Typography variant="body2">Your review about this product:</Typography>
                <Typography component="span">
                  {[1,2,3,4,5].map((index)=>
                      <StarIcon 
                        key={index} 
                        className={clsx(stars>=index?classes.active:"",classes.star)} 
                        onClick={()=>setStars(index)}
                        />
                      
                  )}
                </Typography>

               
              </Box>
              <form>
                  <TextField
                    fullWidth
                    rows={4}
                    maxRows={Infinity}
                    multiline
                    style={{width: "100%",borderRadius:"10px"}}
                    label="Reviews"
                    variant="outlined"
                    inputRef={valueRef}
                    error={error}
                   helperText={error?'Empty field':''}
                  />
                  <Box pt={2} sx={{display:'flex',justifyContent: 'end'}}>
                    <Box>
                      <Button className={classes.button} onClick={()=>props.setOpenCollapse(false)} >Cancel</Button>
                       <Button className={clsx(classes.button,classes.buttonGreen)} onClick={addComment}>Post Review</Button>
                    </Box>
                  </Box>
                </form>
          
          </Box>
          
         </Collapse>
      </div>
    )
}

export default AddReview
