import React from 'react'
import {makeStyles,Theme,createStyles, Paper, Box, Avatar, Typography, IconButton, Popover,List, ListItem, ListItemText, Divider,Grid, InputAdornment, TextField, Collapse} from "@material-ui/core";
import moment from 'moment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { AvatarGroup } from '@material-ui/lab';
import clsx from 'clsx';
import {getFirstLetter} from "../../helpers/string";
import { useAppDispatch, useAppSelector } from '../../hooks/type';
import { deletePost, likePost } from '../../redux/Blog/blogAsyncAction';
import CommentForm from './CommentForm';
import { clientUrl, url } from '../../api';
import ViewImagePopup from "../Popup/ImagePopup";
const useStyles = makeStyles((theme: Theme)=>
    createStyles({
        root:{},
        paper:{
            display:"flex",
            flexDirection:"column",
            borderRadius:"16px",
            padding:"2rem",
            marginBottom: "2rem",
            textAlign:"left",
            // boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            boxShadow:"rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
        },
        smallText:{color:"#758390",fontSize:"14px"},
        imageWrapper:{
            width:"100%",
            height:"640px",
            [theme.breakpoints.down("xs")]:{
                height:"350px"
            }
        },
        image:{width:"100%",height:"100%",borderRadius:"16px"},
        userBox:{
            width:"200px",
            fontSize:"15px",
             padding: theme.spacing(2),
         },
         avatar: {
            width: theme.spacing(4),
            height: theme.spacing(4)
           },
        activeHeart:{
            color:"red"
        },
        imagePost:{
            width: '100%',
            height: '350px'
        }
    })
) 

interface Comment{
    comment:any
}
const Comments=(props:Comment)=> {
    const {comment} = props;
    return(
        <Box pt={2}>
            <Grid spacing={2} container>
            <Grid item xs={2} md={1}>
            <Avatar src={comment?.user?.picture}>{getFirstLetter(comment?.user?.username)}</Avatar>
            </Grid>
           <Grid item xs={10} md={11}>
            <Box style={{display:'flex',flexDirection:'column',padding:"1rem",backgroundColor:"#F4F6F8",borderRadius:"8px"}}>
                    <Box sx={{display:'flex',justifyContent:"space-between"}}>
                        <Typography variant="body2" style={{fontWeight: 600}}>{comment?.user?.username}</Typography>
                        <Typography variant="body2" style={{color:"#758390"}}>{moment(comment?.createdAt).format('LLL')}</Typography>
                    </Box>
                    <Typography variant="body2" style={{color:"#758390",wordBreak: 'break-all'}}>{comment?.content}</Typography>
                    {comment?.image?<img style={{width:"140px",height:"140px"}}  src={comment?.image}/>:""}
                </Box>
           </Grid>
        </Grid>
        </Box>
    )
}
interface IProps{
    blog:any
}
function Post(props:IProps):JSX.Element {
    const {blog} = props;
    const classes = useStyles();
    const currentUser = useAppSelector(state=>state.user?.currentUser);
    const token = currentUser?.token;
    const [openCollapse,setOpenCollapase] = React.useState(false);
    const dispatch = useAppDispatch();
    // open popover
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [openImage,setOpenImage] = React.useState<boolean>(false);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    
    let heart = Boolean(false);

    // check user like post or not
    let getIndexUserLikes = blog?.userLikes?.length>0?blog?.userLikes.findIndex((x:any)=>x.user._id==currentUser.id):-1;
    heart = getIndexUserLikes<0?false:true;

    return (
        <Paper className={classes.paper}  >
            <ViewImagePopup openImage={openImage} setOpenImage={setOpenImage} images={blog.images}/>

            <Box sx={{display:'flex',justifyContent:"space-between",width:"100%"}}>
                <Box sx={{display:'flex'}}>
                    <Avatar src={blog?.user?.picture} onClick={()=>window.location.href=`${clientUrl}/Dashboard/Profile/${blog?.user?._id}`}>{`${blog?.user?.username?getFirstLetter(blog?.user?.username):""}`}</Avatar>
                    <Box pl={2}>
                        <Typography variant="body2" style={{cursor:'pointer'}} onClick={()=>window.location.href=`${clientUrl}/Dashboard/Profile/${blog?.user?._id}`}>{blog?.user?.username}</Typography>
                        <Typography variant="body2" className={classes.smallText}>{moment(blog?.createdAt).format('LLL')}</Typography>
                    </Box>
                </Box>
                <IconButton aria-describedby={id}  onClick={handleClick}><MoreVertIcon/></IconButton>
                <Popover 
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'center',
                            horizontal: 'left',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                    >
                        <List component="nav" className={classes.userBox}>
                            <ListItem button onClick={()=>dispatch(deletePost({
                                id:blog?._id,
                                token
                            }))}>
                                <ListItemText style={{color:"red"}} primary="Delete" />
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemText primary="Edit" />
                            </ListItem>
                        </List> 
                    </Popover>
            </Box>
            {/* show content */}
           <Box pt={2}>
                <Typography variant="body1">{blog?.content}</Typography>
                <div onClick={()=>setOpenImage(!openImage)}>
                    {blog?.images?.length>2?<Grid container spacing={1}>
                        <Grid item xs={12} md={8}>
                            <img src={blog?.images[0].link} alt={blog?.images[0]._id} className={classes.imagePost}/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <img src={blog?.images[1].link} alt={blog?.images[0]._id} style={{width: '100%', height: '120px'}}/>
                                </Grid>
                                <Grid item xs={12}>
                                    {/* <img src={images[2].link} style={{width: '100%', height: '120px'}}/> */}
                                    <Typography variant="h4" align="center">+{blog?.images?.length-2}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>:<div>
                        {blog?.images?.length>0&&blog?.images?.length<=2?blog?.images.map((image:any)=>
                        <Box key={image._id} pt={2} className={classes.imageWrapper}>
                            <img className={classes.image} alt={blog?.images[0]._id} src={image?.link}/>
                        </Box>):""}
                    </div>}
                 </div>
                {/* like post */}
                <Box sx={{display:'flex',justifyContent: 'space-between'}}>
                    <Box sx={{display:'flex',flexDirection:'row',alignItems:"center"}}>
                        <IconButton onClick={()=>dispatch(likePost({
                            id:blog._id,
                            token
                        }))}><FavoriteIcon className={clsx(heart?classes.activeHeart:"")}/></IconButton>
                        <Typography variant="body2" style={{paddingRight:"0.5rem"}}>{blog?.userLikes?.length}</Typography>
                        <AvatarGroup style={{fontSize:"10px"}} classes={{avatar: classes.avatar}} max={4} >

                            {blog?.userLikes?.length>0?blog?.userLikes.map((user:any)=>
                                   <Avatar key={user.user._id} src={user.user?.picture} alt={user.user?.username}>{getFirstLetter(user.user?.username)}</Avatar>
                            ):""}
                        </AvatarGroup>
                    </Box>
                </Box>
                {/* show user comments */}
                <Box sx={{display:'flex',justifyContent: 'flex-end'}}>
                    <Typography className={classes.smallText} onClick={()=>setOpenCollapase(!openCollapse)} variant="body2">View comment ({blog?.comments?.length})</Typography>
                </Box>
                <Collapse in={openCollapse}>
                    {blog?.comments?.length>0?blog?.comments.map((comment:any)=>
                        <Comments key={comment._id} comment={comment}/>
                    ):""}
                </Collapse>
                {/* comment form */}
                <CommentForm blog={blog}/>
           </Box>
            
        </Paper>
    )
}

export default Post
