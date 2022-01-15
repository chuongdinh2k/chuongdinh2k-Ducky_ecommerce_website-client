import React from 'react'
import {makeStyles, Typography,IconButton,Box, Badge, Avatar, Popover, List, ListItem, ListItemIcon, ListItemText, Divider, Button} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useAppSelector,useAppDispatch } from '../hooks/type';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import { authActions } from '../redux/Auth/authSlice';
import { useHistory } from 'react-router-dom';
import {getFirstLetter} from '../helpers/string';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { loadCart } from '../redux/Cart/asyncAction';
const useStyles = makeStyles(theme=>({
    root:{
        display:"flex",
        width:'100%',
        justifyContent:'space-between',
    },
    typography: {
        padding: theme.spacing(1),
      },
      userBox:{
         width:"200px",
         fontSize:"15px",
          padding: theme.spacing(2),
      },
      button:{
          width:"100%",
          borderColor:'#e0e0e0',
      },
   
}))
function TopToolBar():JSX.Element {
    const history = useHistory();
    const dispatch = useAppDispatch();
    const userInfo = useAppSelector(state=>state.user);
    const token = userInfo.currentUser.token;
    const cart = useAppSelector(state=>state.cart);
    console.log(cart);
    const logOut = ()=>{
        localStorage.removeItem('currentUser');
        dispatch(authActions.logOut());
        history.push('/login');
    }
    
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const classes = useStyles();
    React.useEffect(()=>{
        dispatch(loadCart({token}))
      },[dispatch,token])
    return (
        <div className={classes.root}>
            <Typography variant='h6'>DUCKY.COM</Typography>
            <Box>
                <label htmlFor="icon-button-file">
                    <IconButton color="primary" component="span" onClick={()=>history.push("/dashboard/Checkout")}>
                        <Badge badgeContent={cart?.product?cart?.product?.length:0} color="secondary">
                            <ShoppingCartIcon style={{color:"#637381"}} />
                        </Badge>
                    </IconButton>
                    <IconButton color="primary" onClick={handleClick} component="span">
                        <Avatar alt="my Avatar" src={userInfo?.currentUser?.picture}>
                            {getFirstLetter(userInfo?.currentUser?.name)}
                        </Avatar>
                    </IconButton>
                    <Popover 
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                        }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                        }}
                    >
                        <List component="nav" className={classes.userBox}>
                            <ListItem>
                                <ListItemText style={{fontWeight:700}} primary={userInfo?.currentUser?.name} />
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemIcon style={{minWidth:"30px"}}>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary="Profile" onClick={()=>history.push(`/Dashboard/Profile/${userInfo?.currentUser?.id}`)} />
                            </ListItem>
                            <ListItem button onClick={()=>history.push(`/Dashboard/Setting`)}>
                                <ListItemIcon style={{minWidth:"30px"}}>
                                    <SettingsIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Setting" />
                            </ListItem>
                            <Divider/>
                            <Box sx={{padding:"0.5rem"}}>
                                <Button className={classes.button}
                                    onClick={logOut}
                                >Logout</Button>
                            </Box>
                        </List>
                    </Popover>
                </label>
              
            </Box>
        </div>
    )
}

export default TopToolBar
