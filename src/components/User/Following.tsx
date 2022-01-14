import React from 'react'
import { createStyles, Typography,makeStyles,Theme, Box, Grid, Paper, Avatar, Button } from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { getFirstLetter } from '../../helpers/string';
// import DoneIcon from '@material-ui/icons/Done';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles((theme: Theme)=>
    createStyles({
        root:{textAlign:"left"},
        paper:{
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-between",
            borderRadius:"16px",
            padding:theme.spacing(4),
            marginBottom: "2rem",
            textAlign:"left",
            boxShadow:"rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
        },
        smallText:{color:"#758390",fontSize:"14px"},
        buttonFollow:{
            borderRadius:"10px",
            fontWeight:600,
            textTransform:"capitalize"
        },
        followed:{
            fontSize:"14px",
            borderRadius:"5px",
            fontWeight:600,
            textTransform:"capitalize",
            color:"#00AB55"
        }
    })
)
// interface MyError{
//     message: unknown;
// }
interface IProps{
    user:any
}
const FollowerCard=(props:{classes:any,user:any})=>{
    const history = useHistory();
                    return(
                        <Paper className={props.classes.paper}>
                        <Box sx={{display:'flex',textAlign: "center"}}>
                            <Box pr={2} ><Avatar src={props?.user?.picture}>{getFirstLetter(props?.user?.username)}</Avatar></Box>
                            <Box>
                                <Typography variant="body2" style={{fontWeight:600}}>{props?.user?.username}</Typography>
                                {props?.user?.city?<Box sx={{display: 'flex'}}><LocationOnIcon style={{fontSize: '14px'}}/><Typography variant="body2" className={props.classes.smallText}>{props?.user?.city}</Typography></Box>:""}
                                
                            </Box>
                        </Box>
                        <Box sx={{textAlign: "center",width:"33.33%"}}>
                            <Button className={props.classes.followed} onClick={()=>history.push(`/Dashboard/Profile/${props?.user?._id}`)}>View Profile</Button>
                            </Box>
                    </Paper>
                    )
}
function Following({user}:IProps):JSX.Element {
    const classes = useStyles();
    
    //follow user
   
    return (
        <Box className={classes.root}>
           <Box pt={2} pb={2}><Typography variant="h6" style={{fontWeight:700}}>Followers</Typography></Box>
            <Grid spacing={3} container>
                {user?.following&&user?.following?.length>0?user.following.map((following:any)=>        
                    <Grid key={following._id} item xs={12} md={4}><FollowerCard classes={classes} user={following?.user}/></Grid>
                ):<h5>There no following!</h5>}
            </Grid>
        </Box>
    )
}

export default Following
