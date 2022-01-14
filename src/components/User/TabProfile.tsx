import React from 'react'
import {Box,makeStyles,Theme,createStyles, Typography, Paper, Grid} from "@material-ui/core";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LocalPostOfficeIcon from '@material-ui/icons/LocalPostOffice';
import ListPosts from './ListPosts';
import CreatePost from './CreatePost';
const useStyles = makeStyles((theme: Theme)=>
    createStyles({
        root:{display:"flex",padding:"0rem 0"},
        paper:{
                display:"flex",
                borderRadius:"16px",
                padding:theme.spacing(2),
                marginBottom: "2rem",
                textAlign:"left",
                boxShadow:"rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
            },
        textHide:{
            // whiteSpace: 'nowrap',
            width: '100%', 
            overflow: 'hidden',
            textOverflow: 'ellipsis', 
        },
        smallText:{color:"#758390",fontSize:"14px"},
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
        input__hide:{
            display:"none"
        },
        formControl:{
            minWidth:"127px",
            marginLeft:"1rem"
        },
        errorMessage:{
            color:"red"
        }
    })
)
interface IProps{
    user:any
}
function TabProfile({user}:IProps):JSX.Element {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
           <Grid spacing={2} container>
               <Grid item xs={12} md={4}>
                <Box>
                    <Paper className={classes.paper} style={{justifyContent:"space-between"}}>
                        <Box sx={{textAlign: "center",width:"33.33%"}} >
                            <Typography variant="h6" style={{fontWeight:700}}>{user?.follower?.length}</Typography>
                            <Typography className={classes.smallText}>Follower</Typography>
                        </Box>
                        <Box style={{height:"50px",width:"2px",backgroundColor:"#758390"}}></Box>
                        <Box  sx={{textAlign: "center",width:"33.33%"}}>
                            <Typography variant="h6" style={{fontWeight:700}}>{user?.following?.length}</Typography>
                            <Typography className={classes.smallText}>Following</Typography>
                        </Box>
                    </Paper>

                    <Paper className={classes.paper} style={{flexDirection: 'column'}}>
                        <Typography variant="h6" style={{fontWeight:700}}>About</Typography>
                        <Typography variant="body1" className={classes.smallText}>{user?.about}</Typography>
                        <Box pt={2} sx={{display:'flex'}}><LocationOnIcon style={{marginRight:"0.5rem"}}/><Typography variant="body2">Live at <b style={{fontWeight:600}}>{user?.city},{user?.country}</b></Typography></Box>
                        <Box pt={2} sx={{display:'flex'}}><LocalPostOfficeIcon style={{marginRight:"0.5rem"}}/><Typography variant="body2">{user?.email}</Typography></Box>
                    </Paper>
                </Box>
               </Grid>
               <Grid item xs={12} md={8}>
                   <Box component="div">
                        {/* create post */}
                        <CreatePost classes={classes} user={user}/>
                        {/* List Post */}
                        <ListPosts/>
                   </Box>
               </Grid>
           </Grid>
    </Box>
    )
}

export default TabProfile
